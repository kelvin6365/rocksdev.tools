"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { Link } from "@/i18n/routing";
import { config } from "@/services/config";

interface ToolLayoutProps {
  children: React.ReactNode;
  translationKey: string; // e.g. "nav.tools.json.formatter"
  actions?: React.ReactNode;
  className?: string;
  showBackButton?: boolean;
  showGithubLink?: boolean;
}

export function ToolLayout({
  children,
  translationKey,
  actions,
  className,
  showBackButton = true,
  showGithubLink = true,
}: ToolLayoutProps) {
  const t = useTranslations();

  // Get parent tool path for back button
  const paths = translationKey.split(".");
  const parentTool = config.tools.find((t) => t.value === paths[2]);
  const backHref = parentTool?.href || `/tools/${paths.slice(0, -1).join("/")}`;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {showBackButton && (
            <Button variant="ghost" size="sm" className="-ml-3 mb-2" asChild>
              <Link href={backHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("nav.back")}
              </Link>
            </Button>
          )}
          <h1 className="text-3xl font-bold tracking-tight">
            {t(`${translationKey}.title`)}
          </h1>
          <p className="text-muted-foreground">
            {t(`${translationKey}.description`)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {actions}
          {showGithubLink && (
            <Button variant="outline" size="icon" asChild>
              <Link
                href={encodeURI(
                  `${config.github}/tree/main/app/[locale]/tools/${translationKey.replace(/\./g, "/")}`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">View on GitHub</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Card className="p-6">{children}</Card>
    </div>
  );
}
