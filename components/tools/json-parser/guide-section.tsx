"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="mt-8 space-y-4">
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="flex flex-col md:flex-row h-auto md:w-fit">
          <TabsTrigger className="w-full md:w-auto" value="guide">
            {t("overview.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="features">
            {t("features.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="tips">
            {t("tips.title")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>{t("overview.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>{t("features.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {Object.entries(t.raw("features.list")).map(
                    ([key, value]) => (
                      <li key={key}>{value as string}</li>
                    ),
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>{t("tips.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {Object.entries(t.raw("tips.list")).map(([key, value]) => (
                    <li key={key}>{value as string}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
