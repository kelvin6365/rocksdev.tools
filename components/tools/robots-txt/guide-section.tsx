"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

/** Straight from Google's own robots.txt specification. */
const PATTERNS = [
  {
    pattern: "/fish",
    matches: "/fish, /fish.html, /fish/salmon.html, /fishheads",
    no: "/Fish.asp, /catfish",
  },
  {
    pattern: "/fish/",
    matches: "/fish/, /fish/salmon.htm, /fish/?id=1",
    no: "/fish, /fish.html",
  },
  {
    pattern: "/*.php",
    matches: "/index.php, /folder/any.php",
    no: "/ , /windows.PHP",
  },
  {
    pattern: "/*.php$",
    matches: "/filename.php, /folder/filename.php",
    no: "/filename.php?p=1, /filename.php5",
  },
];

const MISTAKES = [
  "blockAll",
  "groupInheritance",
  "noindex",
  "blockedAssets",
  "relativeSitemap",
] as const;

export function GuideSection() {
  const t = useTranslations("seo.robots-txt.guide");

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <p className="text-sm text-muted-foreground">
          {t("overview.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("matching.title")}>
        <p className="text-sm text-muted-foreground">
          {t("matching.description")}
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("matching.pattern")}</TableHead>
                <TableHead>{t("matching.matches")}</TableHead>
                <TableHead>{t("matching.doesNotMatch")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PATTERNS.map((row) => (
                <TableRow key={row.pattern}>
                  <TableCell className="whitespace-nowrap font-mono">
                    {row.pattern}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.matches}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.no}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GuidePanel>

      <GuidePanel title={t("precedence.title")}>
        <p className="text-sm text-muted-foreground">
          {t("precedence.description")}
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
          {`User-agent: *
Disallow: /folder/
Allow: /folder/public`}
        </pre>
        <p className="text-sm text-muted-foreground">
          {t("precedence.example")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("groups.title")}>
        <p className="text-sm text-muted-foreground">
          {t("groups.description")}
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
          {`User-agent: *
Disallow: /private

User-agent: Googlebot
Disallow: /admin`}
        </pre>
      </GuidePanel>

      <GuidePanel title={t("mistakes.title")}>
        <div className="space-y-4">
          {MISTAKES.map((key) => (
            <div key={key} className="space-y-1">
              <h3 className="font-medium">{t(`mistakes.items.${key}.problem`)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`mistakes.items.${key}.fix`)}
              </p>
            </div>
          ))}
        </div>
      </GuidePanel>
    </Guide>
  );
}

export default GuideSection;
