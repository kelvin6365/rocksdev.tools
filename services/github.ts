export interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
}

export async function fetchGitHubReleases(): Promise<GitHubRelease[]> {
  const response = await fetch(
    "https://api.github.com/repos/kelvin6365/rocksdev.tools/releases",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub releases");
  }

  return response.json();
}

// Parse GitHub release body to get structured changelog data
export function parseReleaseBody(body: string): {
  type: "added" | "changed" | "fixed" | "removed";
  items: string[];
}[] {
  const sections = body.split(/#{2,3}\s+(Added|Changed|Fixed|Removed)/i);
  const changes: {
    type: "added" | "changed" | "fixed" | "removed";
    items: string[];
  }[] = [];

  for (let i = 1; i < sections.length; i += 2) {
    const type = sections[i].toLowerCase() as
      | "added"
      | "changed"
      | "fixed"
      | "removed";
    const content = sections[i + 1];
    const items = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.slice(1).trim())
      .filter(Boolean);

    if (items.length > 0) {
      changes.push({ type, items });
    }
  }

  return changes;
}
