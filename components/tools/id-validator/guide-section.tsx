"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

const USES = ["forms", "migration", "testing", "debugging"] as const;

export function GuideSection() {
  const t = useTranslations("dev.id-validator.guide");

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <p className="text-sm text-muted-foreground">
          {t("overview.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("hkid.title")}>
        <p className="text-sm text-muted-foreground">{t("hkid.description")}</p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
          {t("hkid.example")}
        </pre>
      </GuidePanel>

      <GuidePanel title={t("twid.title")}>
        <p className="text-sm text-muted-foreground">{t("twid.description")}</p>
        <p className="text-sm text-muted-foreground">{t("twid.gender")}</p>
      </GuidePanel>

      <GuidePanel title={t("generating.title")}>
        <p className="text-sm text-muted-foreground">
          {t("generating.description")}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("generating.caution")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("uses.title")}>
        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          {USES.map((key) => (
            <li key={key}>{t(`uses.items.${key}`)}</li>
          ))}
        </ul>
      </GuidePanel>
    </Guide>
  );
}

export default GuideSection;
