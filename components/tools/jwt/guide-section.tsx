"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("dev.jwt");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
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
                <li>{t("guide.decode.steps.paste")}</li>
                <li>{t("guide.decode.steps.click")}</li>
                <li>{t("guide.decode.steps.view")}</li>
                <li>{t("guide.decode.steps.copy")}</li>
              </ul>
            </div>
          </div>
        </div>

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
                <li>{t("guide.encode.steps.fill")}</li>
                <li>{t("guide.encode.steps.select")}</li>
                <li>{t("guide.encode.steps.generate")}</li>
                <li>{t("guide.encode.steps.download")}</li>
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
              t("guide.features.list.decode"),
              t("guide.features.list.encode"),
              t("guide.features.list.algorithm"),
              t("guide.features.list.validation"),
              t("guide.features.list.copy"),
              t("guide.features.list.download"),
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
              t("guide.tips.list.verify"),
              t("guide.tips.list.secrets"),
              t("guide.tips.list.algorithms"),
              t("guide.tips.list.expiration"),
              t("guide.tips.list.validation"),
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
