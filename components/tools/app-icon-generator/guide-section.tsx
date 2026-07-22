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

/** Pixel sizes and platform identifiers read the same in every locale. */
const IOS_SIZES = [
  { key: "app-store", size: "1024 × 1024", scale: "1x" },
  { key: "iphone-3x", size: "180 × 180", scale: "60pt @3x" },
  { key: "iphone-2x", size: "120 × 120", scale: "60pt @2x" },
  { key: "ipad-pro", size: "167 × 167", scale: "83.5pt @2x" },
  { key: "ipad-2x", size: "152 × 152", scale: "76pt @2x" },
  { key: "settings", size: "87 × 87", scale: "29pt @3x" },
  { key: "notification", size: "60 × 60", scale: "20pt @3x" },
];

const ANDROID_SIZES = [
  { key: "play-store", density: "Play Store listing", size: "512 × 512" },
  { key: "xxxhdpi", density: "mipmap-xxxhdpi", size: "192 × 192" },
  { key: "xxhdpi", density: "mipmap-xxhdpi", size: "144 × 144" },
  { key: "xhdpi", density: "mipmap-xhdpi", size: "96 × 96" },
  { key: "hdpi", density: "mipmap-hdpi", size: "72 × 72" },
  { key: "mdpi", density: "mipmap-mdpi", size: "48 × 48" },
];

export function GuideSection() {
  const t = useTranslations("dev.app-icon.guide");

  return (
    <Guide>
      <GuidePanel title={t("source.title")}>
        <p className="text-sm text-muted-foreground">
          {t("source.description")}
        </p>
        <div className="space-y-2">
          <h3 className="font-medium">{t("source.requirements.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {Object.entries(t.raw("source.requirements.list")).map(
              ([key, value]) => (
                <li key={key}>{value as string}</li>
              ),
            )}
          </ul>
        </div>
      </GuidePanel>

      <GuidePanel title={t("ios.title")}>
        <p className="text-sm text-muted-foreground">{t("ios.description")}</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("columns.usage")}</TableHead>
                <TableHead>{t("columns.size")}</TableHead>
                <TableHead>{t("columns.scale")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {IOS_SIZES.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>{t(`ios.rows.${row.key}`)}</TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.size}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.scale}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GuidePanel>

      <GuidePanel title={t("android.title")}>
        <p className="text-sm text-muted-foreground">
          {t("android.description")}
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("columns.density")}</TableHead>
                <TableHead>{t("columns.size")}</TableHead>
                <TableHead>{t("columns.usage")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ANDROID_SIZES.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.density}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.size}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t(`android.rows.${row.key}`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">{t("android.adaptive.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("android.adaptive.description")}
          </p>
        </div>
      </GuidePanel>

      <GuidePanel title={t("pitfalls.title")}>
        <p className="text-sm text-muted-foreground">
          {t("pitfalls.description")}
        </p>
        <div className="space-y-4">
          {["alpha", "rounded", "safe-area", "text", "upscaling"].map((key) => (
            <div key={key} className="space-y-1">
              <h3 className="font-medium">
                {t(`pitfalls.items.${key}.problem`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`pitfalls.items.${key}.fix`)}
              </p>
            </div>
          ))}
        </div>
      </GuidePanel>
    </Guide>
  );
}
