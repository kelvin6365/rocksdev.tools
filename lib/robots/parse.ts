/**
 * robots.txt parsing, linting and path matching.
 *
 * Follows Google's implementation of RFC 9309: rules are grouped by consecutive
 * User-agent lines, `*` matches any run of characters, `$` anchors the end of
 * the path, and the longest matching rule wins with Allow breaking ties.
 */

export type RobotsRule = {
  type: "allow" | "disallow";
  path: string;
  line: number;
};

export type RobotsGroup = {
  userAgents: string[];
  rules: RobotsRule[];
  crawlDelay?: number;
  startLine: number;
};

export type RobotsIssue = {
  severity: "error" | "warning" | "info";
  /** Translation key suffix, e.g. "ruleBeforeUserAgent". */
  code: string;
  line: number;
  /** The offending text, for display. */
  context?: string;
};

export type RobotsDocument = {
  groups: RobotsGroup[];
  sitemaps: { url: string; line: number }[];
  issues: RobotsIssue[];
};

const KNOWN_DIRECTIVES = new Set([
  "user-agent",
  "allow",
  "disallow",
  "sitemap",
  "crawl-delay",
  "host",
  "clean-param",
  "noindex",
]);

export function parseRobots(input: string): RobotsDocument {
  const groups: RobotsGroup[] = [];
  const sitemaps: { url: string; line: number }[] = [];
  const issues: RobotsIssue[] = [];

  let current: RobotsGroup | null = null;
  // Consecutive User-agent lines accumulate into one group; the first rule
  // after them closes the header and starts the body.
  let acceptingAgents = false;

  const lines = input.split(/\r?\n/);

  if (input.charCodeAt(0) === 0xfeff) {
    issues.push({ severity: "warning", code: "bom", line: 1 });
  }

  lines.forEach((raw, index) => {
    const line = index + 1;
    const withoutComment = raw.replace(/#.*$/, "");
    const text = withoutComment.trim();
    if (!text) return;

    const colon = text.indexOf(":");
    if (colon === -1) {
      issues.push({ severity: "error", code: "missingColon", line, context: text });
      return;
    }

    const field = text.slice(0, colon).trim().toLowerCase();
    const value = text.slice(colon + 1).trim();

    if (!KNOWN_DIRECTIVES.has(field)) {
      issues.push({ severity: "warning", code: "unknownDirective", line, context: field });
      return;
    }

    switch (field) {
      case "user-agent": {
        if (!value) {
          issues.push({ severity: "error", code: "emptyUserAgent", line });
          return;
        }
        if (!current || !acceptingAgents) {
          current = { userAgents: [], rules: [], startLine: line };
          groups.push(current);
          acceptingAgents = true;
        }
        current.userAgents.push(value);
        return;
      }

      case "allow":
      case "disallow": {
        if (!current) {
          issues.push({ severity: "error", code: "ruleBeforeUserAgent", line, context: text });
          return;
        }
        acceptingAgents = false;

        // An empty Disallow means "allow everything" and is legal; an empty
        // Allow is meaningless but harmless.
        if (value && !value.startsWith("/") && !value.startsWith("*")) {
          issues.push({ severity: "warning", code: "pathNotAbsolute", line, context: value });
        }
        current.rules.push({ type: field, path: value, line });
        return;
      }

      case "sitemap": {
        if (!/^https?:\/\//i.test(value)) {
          issues.push({ severity: "error", code: "sitemapNotAbsolute", line, context: value });
        }
        sitemaps.push({ url: value, line });
        return;
      }

      case "crawl-delay": {
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0) {
          issues.push({ severity: "error", code: "crawlDelayInvalid", line, context: value });
        } else {
          if (current) current.crawlDelay = n;
          issues.push({ severity: "info", code: "crawlDelayIgnoredByGoogle", line });
        }
        return;
      }

      case "noindex": {
        issues.push({ severity: "warning", code: "noindexUnsupported", line });
        return;
      }

      case "host": {
        issues.push({ severity: "info", code: "hostNonStandard", line });
        return;
      }
    }
  });

  if (groups.length === 0 && sitemaps.length === 0) {
    issues.push({ severity: "warning", code: "empty", line: 1 });
  }
  if (!sitemaps.length) {
    issues.push({ severity: "info", code: "noSitemap", line: 1 });
  }

  // A group that blocks the whole site is worth surfacing loudly — it is the
  // single most common way a site accidentally deindexes itself. An Allow of
  // equal or greater specificity overrides it, so `Allow: /` alongside
  // `Disallow: /` is not actually a block and must not warn.
  for (const group of groups) {
    if (!group.userAgents.includes("*")) continue;

    const blocker = group.rules.find(
      (r) => r.type === "disallow" && r.path === "/",
    );
    if (!blocker) continue;

    // Only an Allow that actually matches "/" can override it, and it must be
    // at least as long to win the tie. `Allow: /public` leaves the root blocked.
    const overridden = group.rules.some(
      (r) =>
        r.type === "allow" &&
        r.path.length >= blocker.path.length &&
        patternToRegex(r.path).test("/"),
    );
    if (overridden) continue;

    issues.push({
      severity: "warning",
      code: "blocksEntireSite",
      line: blocker.line,
    });
  }

  return { groups, sitemaps, issues };
}

/** Translate a robots path pattern into a regular expression. */
function patternToRegex(pattern: string): RegExp {
  let source = "";
  for (const ch of pattern) {
    if (ch === "*") source += ".*";
    else if (ch === "$") source += "$";
    else source += ch.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp("^" + source);
}

/** The group that applies to a user agent: exact match first, then `*`. */
export function groupForAgent(
  doc: RobotsDocument,
  userAgent: string,
): RobotsGroup | null {
  const ua = userAgent.toLowerCase();
  let wildcard: RobotsGroup | null = null;
  let best: RobotsGroup | null = null;
  let bestLength = -1;

  for (const group of doc.groups) {
    for (const agent of group.userAgents) {
      const a = agent.toLowerCase();
      if (a === "*") {
        wildcard ??= group;
      } else if (ua === a || ua.startsWith(a)) {
        // Longest matching agent token wins, so "googlebot-news" beats "googlebot".
        if (a.length > bestLength) {
          best = group;
          bestLength = a.length;
        }
      }
    }
  }
  return best ?? wildcard;
}

export type MatchResult = {
  allowed: boolean;
  /** The rule that decided it, or null when nothing matched. */
  rule: RobotsRule | null;
  group: RobotsGroup | null;
};

export function isAllowed(
  doc: RobotsDocument,
  path: string,
  userAgent: string,
): MatchResult {
  const group = groupForAgent(doc, userAgent);
  if (!group) return { allowed: true, rule: null, group: null };

  let winner: RobotsRule | null = null;
  let winnerLength = -1;

  for (const rule of group.rules) {
    // An empty Disallow imposes no restriction.
    if (!rule.path) continue;
    if (!patternToRegex(rule.path).test(path)) continue;

    const length = rule.path.length;
    if (
      length > winnerLength ||
      // Equal specificity: Allow wins, per RFC 9309.
      (length === winnerLength && rule.type === "allow")
    ) {
      winner = rule;
      winnerLength = length;
    }
  }

  return {
    allowed: winner ? winner.type === "allow" : true,
    rule: winner,
    group,
  };
}
