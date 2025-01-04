"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.diff");

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">{t("leftInput")}</h4>
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm">
                        <code>
                          {`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "city": "New York",
    "country": "USA"
  }
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">{t("rightInput")}</h4>
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm">
                        <code>
                          {`{
  "name": "John Doe",
  "age": 31,
  "phone": "+1234567890",
  "address": {
    "city": "Boston",
    "country": "USA"
  }
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.output.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.output.description")}
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
                    t("guide.features.list.visual-diff"),
                    t("guide.features.list.property-tracking"),
                    t("guide.features.list.export-options"),
                    t("guide.features.list.file-upload"),
                    t("guide.features.list.detailed-view"),
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
                    t("guide.tips.list.validate-first"),
                    t("guide.tips.list.organize-json"),
                    t("guide.tips.list.use-export"),
                    t("guide.tips.list.check-paths"),
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
