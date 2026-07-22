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

/**
 * Platform dimensions are literals rather than translation keys — pixel values
 * and aspect ratios read the same in every locale. Only the notes column is
 * translated.
 */
const SIZE_ROWS = [
  {
    key: "og",
    platform: "Open Graph (Facebook, LinkedIn, Slack)",
    size: "1200 × 630",
    ratio: "1.91:1",
  },
  {
    key: "x-large",
    platform: "X — summary_large_image",
    size: "1200 × 628",
    ratio: "1.91:1",
  },
  {
    key: "x-summary",
    platform: "X — summary",
    size: "1200 × 1200",
    ratio: "1:1",
  },
  {
    key: "pinterest",
    platform: "Pinterest",
    size: "1000 × 1500",
    ratio: "2:3",
  },
  { key: "whatsapp", platform: "WhatsApp", size: "400 × 400", ratio: "1:1" },
];

export function GuideSection() {
  const t = useTranslations("seo.og-image");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.input.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.input.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.input.settings.heading")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.input.settings.title")}</li>
                <li>{t("guide.input.settings.description")}</li>
                <li>{t("guide.input.settings.theme")}</li>
                <li>{t("guide.input.settings.font")}</li>
                <li>{t("guide.input.settings.layout")}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.input.dimensions.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("guide.input.dimensions.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.output.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.output.description")}
          </p>
        </div>
      </GuidePanel>

      <GuidePanel title={t("guide.sizes.title")}>
        <p className="text-sm text-muted-foreground">
          {t("guide.sizes.intro")}
        </p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("guide.sizes.columns.platform")}</TableHead>
                <TableHead>{t("guide.sizes.columns.size")}</TableHead>
                <TableHead>{t("guide.sizes.columns.ratio")}</TableHead>
                <TableHead>{t("guide.sizes.columns.notes")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SIZE_ROWS.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-medium">{row.platform}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.size}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.ratio}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t(`guide.sizes.rows.${row.key}`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.sizes.limits.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            <li>{t("guide.sizes.limits.file-size")}</li>
            <li>{t("guide.sizes.limits.formats")}</li>
            <li>{t("guide.sizes.limits.text-safe-area")}</li>
            <li>{t("guide.sizes.limits.retina")}</li>
          </ul>
        </div>
      </GuidePanel>

      <GuidePanel title={t("guide.features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.features.list.customization"),
              t("guide.features.list.themes"),
              t("guide.features.list.fonts"),
              t("guide.features.list.layouts"),
              t("guide.features.list.preview"),
              t("guide.features.list.download"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>

      <GuidePanel title={t("guide.troubleshooting.title")}>
        <p className="text-sm text-muted-foreground">
          {t("guide.troubleshooting.intro")}
        </p>
        <div className="space-y-4">
          {[
            "cache",
            "absolute-url",
            "blocked",
            "missing-dimensions",
            "format",
          ].map((key) => (
            <div key={key} className="space-y-1">
              <h3 className="font-medium">
                {t(`guide.troubleshooting.items.${key}.problem`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`guide.troubleshooting.items.${key}.fix`)}
              </p>
            </div>
          ))}
        </div>
      </GuidePanel>

      <GuidePanel title={t("guide.tips.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.tips.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.tips.list.text-length"),
              t("guide.tips.list.contrast"),
              t("guide.tips.list.preview-test"),
              t("guide.tips.list.dimensions"),
              t("guide.tips.list.platforms"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm">{t("guide.tips.note")}</p>
        </div>
      </GuidePanel>
    </Guide>
  );
}
