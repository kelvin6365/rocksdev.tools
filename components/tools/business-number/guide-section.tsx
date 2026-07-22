"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

const USES = ["invoicing", "forms", "legacy", "data"] as const;

export function GuideSection() {
  const t = useTranslations("dev.business-number.guide");

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <p className="text-sm text-muted-foreground">
          {t("overview.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("algorithm.title")}>
        <p className="text-sm text-muted-foreground">
          {t("algorithm.description")}
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
          {`1  2  1  2  1  2  4  1   ← weights
2  2  0  9  9  1  3  1   ← 22099131
2  4  0  9  9  2  3  1   ← digit sums
= 30, and 30 mod 5 = 0`}
        </pre>
        <p className="text-sm text-muted-foreground">{t("algorithm.seven")}</p>
      </GuidePanel>

      <GuidePanel title={t("change.title")}>
        <p className="text-sm text-muted-foreground">
          {t("change.description")}
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
