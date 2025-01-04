"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("dev.regex");

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
                      {t("guide.basic.patterns.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.basic.patterns.simple")}</li>
                      <li>{t("guide.basic.patterns.email")}</li>
                      <li>{t("guide.basic.patterns.phone")}</li>
                      <li>{t("guide.basic.patterns.date")}</li>
                      <li>{t("guide.basic.patterns.url")}</li>
                      <li>{t("guide.basic.patterns.password")}</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.basic.flags.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.basic.flags.global")}</li>
                      <li>{t("guide.basic.flags.multiline")}</li>
                      <li>{t("guide.basic.flags.case")}</li>
                      <li>{t("guide.basic.flags.unicode")}</li>
                      <li>{t("guide.basic.flags.sticky")}</li>
                      <li>{t("guide.basic.flags.dotAll")}</li>
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
                  <li>{t("guide.features.list.real_time")}</li>
                  <li>{t("guide.features.list.pattern_explanation")}</li>
                  <li>{t("guide.features.list.common_patterns")}</li>
                  <li>{t("guide.features.list.match_highlighting")}</li>
                  <li>{t("guide.features.list.match_details")}</li>
                  <li>{t("guide.features.list.flags")}</li>
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
                  <li>{t("guide.tips.list.start_simple")}</li>
                  <li>{t("guide.tips.list.test_cases")}</li>
                  <li>{t("guide.tips.list.use_flags")}</li>
                  <li>{t("guide.tips.list.escape_chars")}</li>
                  <li>{t("guide.tips.list.groups")}</li>
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
