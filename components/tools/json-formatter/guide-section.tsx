"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.formatter");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.input.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.input.description")}
          </p>
          <div className="bg-muted rounded-md p-4">
            <pre className="text-sm">
              <code>
                {`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  }
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.output.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.output.description")}
          </p>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.features.list.syntax-highlighting"),
              t("guide.features.list.error-detection"),
              t("guide.features.list.copy-to-clipboard"),
              t("guide.features.list.download-json"),
              t("guide.features.list.file-upload"),
              t("guide.features.list.instant-validation"),
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
              t("guide.tips.list.validate-first"),
              t("guide.tips.list.use-file-upload"),
              t("guide.tips.list.check-errors"),
              t("guide.tips.list.download-backup"),
              t("guide.tips.list.large-files"),
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
