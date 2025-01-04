"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.validator");

  return (
    <div className="mt-8 space-y-4">
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="flex flex-col md:flex-row h-auto md:w-fit">
          <TabsTrigger className="w-full md:w-auto" value="guide">
            {t("guide.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="features">
            {t("guide.features.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="tips">
            {t("guide.tips.title")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>{t("guide.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
  "isStudent": false,
  "hobbies": ["reading", "gaming"],
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
                <h3 className="font-medium">{t("guide.validation.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.validation.description")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>{t("guide.features.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">
                  {t("guide.features.list.title")}
                </h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {[
                    t("guide.features.list.real-time"),
                    t("guide.features.list.error-location"),
                    t("guide.features.list.clipboard"),
                    t("guide.features.list.file-upload"),
                    t("guide.features.list.sample-data"),
                  ].map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>{t("guide.tips.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.tips.list.title")}</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {[
                    t("guide.tips.list.check-quotes"),
                    t("guide.tips.list.common-errors"),
                    t("guide.tips.list.use-sample"),
                    t("guide.tips.list.error-messages"),
                    t("guide.tips.list.large-files"),
                  ].map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm">{t("guide.tips.note")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
