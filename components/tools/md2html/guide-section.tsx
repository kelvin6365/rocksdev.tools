"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("converters.md2html");

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
                {t("guide.basic.steps.title")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.basic.steps.input")}</li>
                <li>{t("guide.basic.steps.convert")}</li>
                <li>{t("guide.basic.steps.preview")}</li>
                <li>{t("guide.basic.steps.copy")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.syntax.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.syntax.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.syntax.elements.title")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.syntax.elements.headings")}</li>
                <li>{t("guide.syntax.elements.emphasis")}</li>
                <li>{t("guide.syntax.elements.lists")}</li>
                <li>{t("guide.syntax.elements.links")}</li>
                <li>{t("guide.syntax.elements.code")}</li>
              </ul>
            </div>
          </div>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.features.list.live_preview"),
              t("guide.features.list.syntax_highlighting"),
              t("guide.features.list.github_flavored"),
              t("guide.features.list.copy_html"),
              t("guide.features.list.sample_markdown"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.tips.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.tips.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.tips.list.preview_first"),
              t("guide.tips.list.syntax_check"),
              t("guide.tips.list.use_sample"),
              t("guide.tips.list.styling"),
              t("guide.tips.list.extensions"),
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
