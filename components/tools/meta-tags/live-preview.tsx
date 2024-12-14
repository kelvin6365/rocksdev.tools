import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetaTagsData } from "@/types/tool";
import { Chrome, Globe, Search, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface BrowserPreviewProps {
  data: MetaTagsData;
}

export function BrowserPreview({ data }: BrowserPreviewProps) {
  const t = useTranslations("seo.meta-tags");
  // Helper function to determine Twitter card dimensions
  const getTwitterCardDimensions = (cardType: string) => {
    switch (cardType) {
      case "summary_large_image":
        return { width: 500, height: 261 }; // 1.91:1 ratio
      case "summary":
        return { width: 120, height: 120 }; // Square
      default:
        return { width: 500, height: 261 };
    }
  };

  const twitterDimensions = getTwitterCardDimensions(data.twitterCard);

  return (
    <Card className="p-4">
      <Tabs defaultValue="search">
        <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3 h-auto">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            {t("search-result")}
          </TabsTrigger>
          <TabsTrigger value="browser" className="flex items-center gap-2">
            <Chrome className="h-4 w-4" />
            {t("browser-tab")}
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            {t("social-share")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <div className="space-y-2">
            <div className="text-blue-600 hover:underline text-xl cursor-pointer">
              {data.title || t("your-page-title")}
            </div>
            <div className="text-sm text-emerald-700">
              https://rocksdev.tools
              {data.canonicalUrl && `/${data.canonicalUrl}`}
            </div>
            <div className="text-sm text-gray-600">
              {data.description || t("your-page-description-placeholder")}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="browser" className="mt-4">
          <div className="border rounded-t-lg bg-gray-100 p-2 flex items-center gap-2">
            <Chrome className="h-4 w-4 text-gray-500" />
            <div className="text-sm truncate max-w-[300px]">
              {data.title || t("your-page-title")}
            </div>
          </div>
          <div className="border-x border-b rounded-b-lg p-4 text-center text-gray-500">
            {t("browser-content-area")}
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Facebook Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("facebook-preview")}
              </h3>
              <Card className="max-w-[500px] overflow-hidden">
                {data.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.ogImage}
                    alt="OG preview"
                    width={500}
                    height={262}
                    className="w-full aspect-[1.91/1] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[1.91/1] bg-muted flex items-center justify-center text-muted-foreground">
                    <p className="text-sm text-center px-4">
                      {t("no-image-provided")}
                      <br />
                      <span className="text-xs">
                        {t("recommended-image-dimensions-fb")}
                      </span>
                    </p>
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    https://rocksdev.tools
                  </div>
                  <h4 className="font-bold line-clamp-1">
                    {data.ogTitle || data.title || t("your-page-title")}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.ogDescription ||
                      data.description ||
                      t("your-page-description")}
                  </p>
                </div>
              </Card>
            </div>

            {/* Twitter Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("twitter-preview")} ({data.twitterCard})
                </h3>
                {data.twitterSite && (
                  <span className="text-sm text-muted-foreground">
                    {t("via")} {data.twitterSite}
                  </span>
                )}
              </div>
              <Card className="max-w-[500px] overflow-hidden">
                {data.twitterImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.twitterImage}
                    alt="Twitter preview"
                    width={twitterDimensions.width}
                    height={twitterDimensions.height}
                    className={`w-full ${
                      data.twitterCard === "summary"
                        ? "aspect-square"
                        : "aspect-[1.91/1]"
                    } object-cover`}
                  />
                ) : (
                  <div
                    className={`w-full ${
                      data.twitterCard === "summary"
                        ? "aspect-square"
                        : "aspect-[1.91/1]"
                    } bg-muted flex items-center justify-center text-muted-foreground`}
                  >
                    <p className="text-sm text-center px-4">
                      {t("no-image-provided")}
                      <br />
                      <span className="text-xs">
                        {data.twitterCard === "summary"
                          ? t("recommended-image-dimensions-twitter-144")
                          : t("recommended-image-dimensions-twitter-1200")}
                      </span>
                    </p>
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <h4 className="font-bold line-clamp-1">
                    {data.twitterTitle || data.title || t("your-page-title")}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.twitterDescription ||
                      data.description ||
                      t("your-page-description")}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    https://rocksdev.tools
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
