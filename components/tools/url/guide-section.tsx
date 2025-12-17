"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("converters.url");

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
                <h3 className="font-medium">{t("guide.encode.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.encode.description")}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.encode.steps.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.encode.steps.input")}</li>
                      <li>{t("guide.encode.steps.convert")}</li>
                      <li>{t("guide.encode.steps.copy")}</li>
                      <li>{t("guide.encode.steps.use")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.decode.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.decode.description")}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {t("guide.decode.steps.title")}
                    </h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>{t("guide.decode.steps.input")}</li>
                      <li>{t("guide.decode.steps.convert")}</li>
                      <li>{t("guide.decode.steps.view")}</li>
                      <li>{t("guide.decode.steps.use")}</li>
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
                    t("guide.features.list.encoding"),
                    t("guide.features.list.decoding"),
                    t("guide.features.list.validation"),
                    t("guide.features.list.copy"),
                    t("guide.features.list.download"),
                    t("guide.features.list.sample"),
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
                    t("guide.tips.list.encoding"),
                    t("guide.tips.list.characters"),
                    t("guide.tips.list.validation"),
                    t("guide.tips.list.testing"),
                    t("guide.tips.list.security"),
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
