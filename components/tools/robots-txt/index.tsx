"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTool } from "@/contexts/tool-context";
import { parseRobots, isAllowed, type RobotsIssue } from "@/lib/robots/parse";

const CRAWLERS = [
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "DuckDuckBot",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "*",
];

const EXAMPLE = `User-agent: *
Disallow: /admin/
Disallow: /*.json$
Allow: /admin/public

User-agent: Googlebot
Allow: /
Disallow: /private

Sitemap: https://example.com/sitemap.xml`;

export function RobotsTxtValidator() {
  const t = useTranslations("seo.robots-txt");
  const { incrementToolUsage } = useTool();

  const [content, setContent] = React.useState("");
  const [site, setSite] = React.useState("");
  const [fetching, setFetching] = React.useState(false);
  const [path, setPath] = React.useState("/");
  const [agent, setAgent] = React.useState("Googlebot");

  const doc = React.useMemo(
    () => (content.trim() ? parseRobots(content) : null),
    [content],
  );
  const match = React.useMemo(
    () => (doc ? isAllowed(doc, path || "/", agent) : null),
    [doc, path, agent],
  );

  const fetchRobots = async () => {
    if (!site.trim()) return;
    setFetching(true);
    try {
      const response = await fetch("/api/robots-txt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: site }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(t(`form.fetchErrors.${data.error ?? "fetchFailed"}`));
        return;
      }
      setContent(data.content);
      incrementToolUsage("robots-txt");
    } catch {
      toast.error(t("form.fetchErrors.fetchFailed"));
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-56 flex-1 space-y-2">
          <Label htmlFor="robots-site">{t("form.fetch")}</Label>
          <Input
            id="robots-site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void fetchRobots()}
            placeholder={t("form.fetchPlaceholder")}
            spellCheck={false}
          />
        </div>
        <Button onClick={fetchRobots} disabled={fetching || !site.trim()}>
          <Download className="mr-2 h-4 w-4" />
          {fetching ? t("form.fetching") : t("form.fetchButton")}
        </Button>
        <Button variant="outline" onClick={() => setContent(EXAMPLE)}>
          {t("form.loadExample")}
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="robots-content">{t("form.input")}</Label>
        <Textarea
          id="robots-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("form.placeholder")}
          className="min-h-56 font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {doc && (
        <>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">{t("tester.title")}</h2>
            <div className="flex flex-wrap items-end gap-2">
              <div className="min-w-56 flex-1 space-y-2">
                <Label htmlFor="robots-path">{t("tester.path")}</Label>
                <Input
                  id="robots-path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder={t("tester.pathPlaceholder")}
                  className="font-mono"
                  spellCheck={false}
                />
              </div>
              <div className="w-48 space-y-2">
                <Label htmlFor="robots-agent">{t("tester.userAgent")}</Label>
                <Select value={agent} onValueChange={setAgent}>
                  <SelectTrigger id="robots-agent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRAWLERS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {match && (
              <div
                className={cn(
                  "rounded-lg border p-4",
                  match.allowed
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-destructive/40 bg-destructive/5",
                )}
                role="status"
                aria-live="polite"
              >
                <p className="flex items-center gap-2 font-medium">
                  {match.allowed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  {match.allowed ? t("tester.allowed") : t("tester.blocked")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {match.rule
                    ? t("tester.matchedBy", {
                        line: match.rule.line,
                        rule: `${match.rule.type === "allow" ? "Allow" : "Disallow"}: ${match.rule.path}`,
                      })
                    : match.group
                      ? t("tester.noRule")
                      : t("tester.noGroup")}
                </p>
              </div>
            )}
          </section>

          <IssueList issues={doc.issues} />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">{t("parsed.title")}</h2>
            {doc.groups.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t("parsed.noGroups")}
              </p>
            )}
            <div className="space-y-3">
              {doc.groups.map((group, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <p className="text-sm">
                    <span className="text-muted-foreground">
                      {t("parsed.userAgents")}:{" "}
                    </span>
                    <span className="font-mono">
                      {group.userAgents.join(", ")}
                    </span>
                  </p>
                  <ul className="mt-2 space-y-0.5 font-mono text-xs">
                    {group.rules.map((rule, j) => (
                      <li key={j} className="text-muted-foreground">
                        {rule.type === "allow" ? "Allow" : "Disallow"}:{" "}
                        {rule.path || "(empty)"}
                      </li>
                    ))}
                  </ul>
                  {group.crawlDelay !== undefined && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t("parsed.crawlDelay")}: {group.crawlDelay}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {doc.sitemaps.length > 0 && (
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">
                  {t("parsed.sitemaps")}
                </p>
                <ul className="mt-1 space-y-0.5 break-all font-mono text-xs">
                  {doc.sitemaps.map((s, i) => (
                    <li key={i}>{s.url}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

const ICONS = {
  error: <XCircle className="h-4 w-4 shrink-0 text-destructive" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />,
  info: <Info className="h-4 w-4 shrink-0 text-muted-foreground" />,
};

function IssueList({ issues }: { issues: RobotsIssue[] }) {
  const t = useTranslations("seo.robots-txt.issues");

  // Errors first, then warnings, then notes — the order someone would fix them.
  const order = { error: 0, warning: 1, info: 2 } as const;
  const sorted = [...issues].sort(
    (a, b) => order[a.severity] - order[b.severity] || a.line - b.line,
  );

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      {sorted.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          {t("none")}
        </p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((issue, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {ICONS[issue.severity]}
              <span>
                <span className="text-muted-foreground">
                  {t("line", { line: issue.line })} ·{" "}
                </span>
                {t(issue.code)}
                {issue.context && (
                  <span className="ml-1 font-mono text-xs text-muted-foreground">
                    ({issue.context})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RobotsTxtValidator;
