"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.minifier");

  return (
    <Guide>
      <GuidePanel title={t("guide.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.input.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.input.description")}
          </p>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t("guide.input.before")}</h4>
            <div className="bg-muted rounded-md p-4">
              <pre className="text-sm whitespace-pre-wrap">
                <code>
                  {`{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "hobbies": [
    "reading",
    "gaming"
  ],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  }
}`}
                </code>
              </pre>
            </div>
            <h4 className="text-sm font-medium mt-4">
              {t("guide.input.after")}
            </h4>
            <div className="bg-muted rounded-md p-4">
              <pre className="text-sm break-all">
                <code className="whitespace-pre-wrap">
                  {`{"name":"John Doe","age":30,"isActive":true,"hobbies":["reading","gaming"],"address":{"street":"123 Main St","city":"New York","country":"USA"}}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.process.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("guide.process.description")}
          </p>
        </div>
      </GuidePanel>
      <GuidePanel title={t("guide.features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("guide.features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("guide.features.list.minification"),
              t("guide.features.list.validation"),
              t("guide.features.list.clipboard"),
              t("guide.features.list.file-handling"),
              t("guide.features.list.size-reduction"),
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
              t("guide.tips.list.backup"),
              t("guide.tips.list.check-size"),
              t("guide.tips.list.readability"),
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
