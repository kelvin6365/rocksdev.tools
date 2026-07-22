"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("converters.json-to-java-bean.guide");

  return (
    <Guide>
      <GuidePanel title={t("basic.title")}>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("basic.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("basic.steps.title")}</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("basic.steps.input")}</li>
                <li>{t("basic.steps.configure")}</li>
                <li>{t("basic.steps.generate")}</li>
                <li>{t("basic.steps.copy")}</li>
              </ul>
            </div>
          </div>
        </div>
      </GuidePanel>
      <GuidePanel title={t("features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("features.list.lombok_support"),
              t("features.list.type_inference"),
              t("features.list.nested_objects"),
              t("features.list.formatting"),
              t("features.list.validation"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("tips.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("tips.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("tips.list.validate_json"),
              t("tips.list.use_lombok"),
              t("tips.list.naming"),
              t("tips.list.package_naming"),
              t("tips.list.complex_types"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm">{t("tips.note")}</p>
        </div>
      </GuidePanel>
    </Guide>
  );
}
