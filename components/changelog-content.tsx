"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { parseReleaseBody, type GitHubRelease } from "@/services/github";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ChangelogContentProps {
  releases: GitHubRelease[];
}

export function ChangelogContent({ releases }: ChangelogContentProps) {
  console.log(releases);
  const t = useTranslations();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "added":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "changed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "fixed":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "removed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("changelog.title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("changelog.description")}
        </p>
      </div>

      <div className="grid gap-8">
        {releases.map((release) => {
          const changes = parseReleaseBody(release.body);
          return (
            <Card key={release.tag_name} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{release.tag_name}</h2>
                  <time className="text-sm text-muted-foreground">
                    {new Date(release.published_at).toLocaleDateString()}
                  </time>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => window.open(release.html_url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("changelog.view-on-github")}
                </Button>
              </div>

              <div className="space-y-6">
                {changes.map((change, index) => (
                  <div key={index} className="space-y-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize px-3 py-1 text-xs font-medium",
                        getTypeColor(change.type),
                      )}
                    >
                      {change.type}
                    </Badge>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      {change.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
