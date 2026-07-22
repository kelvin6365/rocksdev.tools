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

/** Sizes are literal rather than translated — they are the reference data. */
const SIZES = [
  { size: "192×192", usedBy: "Chrome, Android — required", note: "Install prompt" },
  { size: "512×512", usedBy: "Chrome, Android — required", note: "Splash screen" },
  { size: "180×180", usedBy: "iOS", note: "apple-touch-icon" },
  { size: "384×384", usedBy: "Android xxhdpi", note: "" },
  { size: "152×152", usedBy: "iPad", note: "" },
  { size: "144×144", usedBy: "Android xhdpi", note: "" },
  { size: "128×128", usedBy: "Chrome Web Store", note: "" },
  { size: "96×96", usedBy: "Android mdpi", note: "" },
  { size: "72×72", usedBy: "Android ldpi", note: "Legacy" },
];

const REQUIRED_KEYS = [
  "manifest",
  "name",
  "icons",
  "display",
  "start",
  "https",
] as const;

const PROBLEM_KEYS = [
  "noPrompt",
  "whiteBox",
  "opensInBrowser",
  "wrongSplash",
] as const;

export function GuideSection() {
  const t = useTranslations("dev.pwa-manifest.guide");

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <p className="text-sm text-muted-foreground">
          {t("overview.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("required.title")}>
        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          {REQUIRED_KEYS.map((key) => (
            <li key={key}>{t(`required.items.${key}`)}</li>
          ))}
        </ul>
      </GuidePanel>

      <GuidePanel title={t("sizes.title")}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("sizes.size")}</TableHead>
                <TableHead>{t("sizes.usedBy")}</TableHead>
                <TableHead>{t("sizes.note")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SIZES.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-mono">{row.size}</TableCell>
                  <TableCell>{row.usedBy}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GuidePanel>

      <GuidePanel title={t("maskable.title")}>
        <p className="text-sm text-muted-foreground">
          {t("maskable.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("troubleshooting.title")}>
        <div className="space-y-4">
          {PROBLEM_KEYS.map((key) => (
            <div key={key} className="space-y-1">
              <h3 className="font-medium">
                {t(`troubleshooting.items.${key}.problem`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`troubleshooting.items.${key}.fix`)}
              </p>
            </div>
          ))}
        </div>
      </GuidePanel>
    </Guide>
  );
}

export default GuideSection;
