"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("converters.base64");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.encode.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.encode.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.encode.steps.title")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.encode.steps.input")}</li>
                <li>{t("guide.encode.steps.select")}</li>
                <li>{t("guide.encode.steps.convert")}</li>
                <li>{t("guide.encode.steps.copy")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.decode.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.decode.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t("guide.decode.steps.title")}
              </h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("guide.decode.steps.input")}</li>
                <li>{t("guide.decode.steps.verify")}</li>
                <li>{t("guide.decode.steps.convert")}</li>
                <li>{t("guide.decode.steps.result")}</li>
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
              t("guide.features.list.bidirectional"),
              t("guide.features.list.file_support"),
              t("guide.features.list.batch_processing"),
              t("guide.features.list.validation"),
              t("guide.features.list.copy_paste"),
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
              t("guide.tips.list.verify_input"),
              t("guide.tips.list.check_padding"),
              t("guide.tips.list.file_size"),
              t("guide.tips.list.encoding"),
              t("guide.tips.list.special_chars"),
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
