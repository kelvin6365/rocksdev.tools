"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("text.text-formatter");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.basic.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.basic.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.basic.formats.title")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.basic.formats.uppercase")}</li>
                <li>{t("guide.basic.formats.lowercase")}</li>
                <li>{t("guide.basic.formats.capitalize")}</li>
                <li>{t("guide.basic.formats.sentence")}</li>
                <li>{t("guide.basic.formats.alternating")}</li>
                <li>{t("guide.basic.formats.trim")}</li>
                <li>{t("guide.basic.formats.remove_lines")}</li>
              </ul>
            </div>
          </div>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            <li>{t("guide.features.list.real_time")}</li>
            <li>{t("guide.features.list.multiple_formats")}</li>
            <li>{t("guide.features.list.file_support")}</li>
            <li>{t("guide.features.list.clipboard")}</li>
            <li>{t("guide.features.list.stats")}</li>
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.tips.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.tips.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            <li>{t("guide.tips.list.preview")}</li>
            <li>{t("guide.tips.list.large_files")}</li>
            <li>{t("guide.tips.list.apply_input")}</li>
            <li>{t("guide.tips.list.check_stats")}</li>
            <li>{t("guide.tips.list.backup")}</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm">{t("guide.tips.note")}</p>
        </div>
      </GuidePanel>
    </Guide>
  );
}
