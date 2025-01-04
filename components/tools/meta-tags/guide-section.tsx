"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("seo.meta-tags");

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
                <h3 className="font-medium">{t("guide.basic.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.basic.description")}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.basic.settings.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.basic.settings.title_tag")}</li>
                      <li>{t("guide.basic.settings.meta_description")}</li>
                      <li>{t("guide.basic.settings.keywords")}</li>
                      <li>{t("guide.basic.settings.canonical_url")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.social.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.social.description")}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.social.settings.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.social.settings.og_title")}</li>
                      <li>{t("guide.social.settings.og_description")}</li>
                      <li>{t("guide.social.settings.og_image")}</li>
                      <li>{t("guide.social.settings.twitter_card")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.advanced.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.advanced.description")}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.advanced.settings.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.advanced.settings.robots")}</li>
                      <li>{t("guide.advanced.settings.viewport")}</li>
                      <li>{t("guide.advanced.settings.additional_tags")}</li>
                    </ul>
                  </div>
                </div>
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
                    t("guide.features.list.live_preview"),
                    t("guide.features.list.social_preview"),
                    t("guide.features.list.character_count"),
                    t("guide.features.list.code_generation"),
                    t("guide.features.list.copy_paste"),
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
                    t("guide.tips.list.unique_titles"),
                    t("guide.tips.list.descriptive_meta"),
                    t("guide.tips.list.relevant_keywords"),
                    t("guide.tips.list.image_optimization"),
                    t("guide.tips.list.preview_testing"),
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
