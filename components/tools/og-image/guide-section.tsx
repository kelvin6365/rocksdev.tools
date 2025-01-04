"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("seo.og-image");

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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.input.settings.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.input.settings.title")}</li>
                      <li>{t("guide.input.settings.description")}</li>
                      <li>{t("guide.input.settings.theme")}</li>
                      <li>{t("guide.input.settings.font")}</li>
                      <li>{t("guide.input.settings.layout")}</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.input.dimensions.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("guide.input.dimensions.description")}
                    </p>
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
                    t("guide.features.list.customization"),
                    t("guide.features.list.themes"),
                    t("guide.features.list.fonts"),
                    t("guide.features.list.layouts"),
                    t("guide.features.list.preview"),
                    t("guide.features.list.download"),
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
                    t("guide.tips.list.text-length"),
                    t("guide.tips.list.contrast"),
                    t("guide.tips.list.preview-test"),
                    t("guide.tips.list.dimensions"),
                    t("guide.tips.list.platforms"),
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
