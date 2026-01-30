"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export default function GuideSection() {
  const t = useTranslations("converters.advanced-image-optimization.guide");

  return (
    <Tabs defaultValue="usage" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="usage">{t("tabs.usage")}</TabsTrigger>
        <TabsTrigger value="features">{t("tabs.features")}</TabsTrigger>
        <TabsTrigger value="tips">{t("tabs.tips")}</TabsTrigger>
      </TabsList>
      <TabsContent value="usage" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("usage.title")}</CardTitle>
            <CardDescription>{t("usage.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>{t("usage.steps.upload")}</li>
              <li>{t("usage.steps.adjust-settings")}</li>
              <li>{t("usage.steps.optimize")}</li>
              <li>{t("usage.steps.download")}</li>
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="features" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("features.title")}</CardTitle>
            <CardDescription>{t("features.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("features.list.quality-control")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("features.list.format-conversion")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("features.list.batch-processing")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("features.list.size-comparison")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("features.list.dimension-control")}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tips" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("tips.title")}</CardTitle>
            <CardDescription>{t("tips.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("tips.list.quality-balance")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("tips.list.format-selection")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("tips.list.webp-benefits")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("tips.list-batch-processing")}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
