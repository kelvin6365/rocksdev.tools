"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BasicSeoForm } from "./basic-seo-form";
import { SocialMediaForm } from "./social-media-form";
import { AdvancedOptionsForm } from "./advanced-options-form";
import { Preview } from "./code-preview";
import { BrowserPreview } from "./live-preview";
import { MetaTagsData } from "@/types/tool";
const defaultMetaData: MetaTagsData = {
  title: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  viewport: "width=device-width, initial-scale=1",
  robots: "index,follow",
  ogTitle: "",
  ogDescription: "",
  ogType: "website",
  ogImage: "",
  ogUrl: "",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterSite: "",
  twitterImage: "",
};

export function MetaTagsGenerator() {
  const [metaData, setMetaData] = useState<MetaTagsData>(defaultMetaData);

  return (
    <div className="space-y-6">
      <BrowserPreview data={metaData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto">
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <Card className="mt-4 p-4">
              <TabsContent value="basic">
                <BasicSeoForm data={metaData} onChange={setMetaData} />
              </TabsContent>
              <TabsContent value="social">
                <SocialMediaForm data={metaData} onChange={setMetaData} />
              </TabsContent>
              <TabsContent value="advanced">
                <AdvancedOptionsForm data={metaData} onChange={setMetaData} />
              </TabsContent>
            </Card>
          </Tabs>
        </div>
        <Preview data={metaData} />
      </div>
    </div>
  );
}
