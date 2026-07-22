"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.parser.guide");

  const personExample = {
    name: "John Doe",
    age: 30,
    isStudent: false,
    hobbies: ["reading", "gaming"],
    address: {
      city: "New York",
      country: "USA",
    },
  };

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("overview.description")}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("modes.parse.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("modes.parse.description")}
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">{t("modes.parse.raw")}:</p>
            <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
              {
                '{\\"name\\":\\"John Doe\\",\\"age\\":30,\\"isStudent\\":false,\\"hobbies\\":[\\"reading\\",\\"gaming\\"],\\"address\\":{\\"city\\":\\"New York\\",\\"country\\":\\"USA\\"}}'
              }
            </pre>

            <p className="text-sm font-medium mt-4">
              {t("modes.parse.formatted")}:
            </p>
            <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
              {JSON.stringify(personExample, null, 2)}
            </pre>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("modes.stringify.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("modes.stringify.description")}
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {t("modes.stringify.js-object")}:
            </p>
            <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
              {`const personData = {
  name: "John Doe",
  age: 30,
  isStudent: false,
  hobbies: ["reading", "gaming"],
  address: {
    city: "New York",
    country: "USA"
  }
};`}
            </pre>

            <p className="text-sm font-medium mt-4">
              {t("modes.stringify.converting")}:
            </p>
            <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
              {`// ${t("modes.stringify.minified")}
const rawJson = "{\\\"name\\\":\\\"John Doe\\\",\\\"age\\\":30,\\\"isStudent\\\":false,\\\"hobbies\\\":[\\\"reading\\\",\\\"gaming\\\"],\\\"address\\\":{\\\"city\\\":\\\"New York\\\",\\\"country\\\":\\\"USA\\\"}}";

// ${t("modes.stringify.pretty")}
const prettyJson = JSON.stringify(personData, null, 2);`}
            </pre>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">{t("options.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {Object.entries(t.raw("options.list")).map(([key, value]) => (
              <li key={key}>{value as string}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("features.title")}>
        <div className="space-y-2">
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {Object.entries(t.raw("features.list")).map(([key, value]) => (
              <li key={key}>{value as string}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("tips.title")}>
        <div className="space-y-2">
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {Object.entries(t.raw("tips.list")).map(([key, value]) => (
              <li key={key}>{value as string}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
    </Guide>
  );
}
