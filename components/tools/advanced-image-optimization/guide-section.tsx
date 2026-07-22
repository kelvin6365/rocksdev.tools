"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export default function GuideSection() {
  const t = useTranslations("converters.advanced-image-optimization.guide");

  return (
    <Guide>
      <GuidePanel title={t("usage.title")} description={t("usage.description")}>
        <ol className="list-decimal pl-5 space-y-2">
          <li>{t("usage.steps.upload")}</li>
          <li>{t("usage.steps.adjust-settings")}</li>
          <li>{t("usage.steps.optimize")}</li>
          <li>{t("usage.steps.download")}</li>
        </ol>
      </GuidePanel>
      <GuidePanel
        title={t("features.title")}
        description={t("features.description")}
      >
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("features.list.quality-control")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("features.list.format-conversion")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("features.list.batch-processing")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("features.list.size-comparison")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("features.list.dimension-control")}</span>
          </li>
        </ul>
      </GuidePanel>
      <GuidePanel title={t("tips.title")} description={t("tips.description")}>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("tips.list.quality-balance")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("tips.list.format-selection")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("tips.list.webp-benefits")}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{t("tips.list-batch-processing")}</span>
          </li>
        </ul>
      </GuidePanel>
    </Guide>
  );
}
