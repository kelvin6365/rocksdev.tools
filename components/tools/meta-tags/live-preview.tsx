import { MetaTagsData } from "@/types/tool";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Globe, Search, Share2 } from "lucide-react";
import Image from "next/image";

interface BrowserPreviewProps {
  data: MetaTagsData;
}

export function BrowserPreview({ data }: BrowserPreviewProps) {
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
            Search Result
          </TabsTrigger>
          <TabsTrigger value="browser" className="flex items-center gap-2">
            <Chrome className="h-4 w-4" />
            Browser Tab
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Social Share
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <div className="space-y-2">
            <div className="text-blue-600 hover:underline text-xl cursor-pointer">
              {data.title || "Your Page Title"}
            </div>
            <div className="text-sm text-emerald-700">
              {window.location.origin}
              {data.canonicalUrl && `/${data.canonicalUrl}`}
            </div>
            <div className="text-sm text-gray-600">
              {data.description ||
                "Your meta description will appear here. Make it compelling to increase click-through rates."}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="browser" className="mt-4">
          <div className="border rounded-t-lg bg-gray-100 p-2 flex items-center gap-2">
            <Chrome className="h-4 w-4 text-gray-500" />
            <div className="text-sm truncate max-w-[300px]">
              {data.title || "Your Page Title"}
            </div>
          </div>
          <div className="border-x border-b rounded-b-lg p-4 text-center text-gray-500">
            Browser Content Area
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Facebook Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Facebook Preview
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
                      No image provided
                      <br />
                      <span className="text-xs">
                        Recommended: 1200×630 pixels
                      </span>
                    </p>
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {window.location.origin}
                  </div>
                  <h4 className="font-bold line-clamp-1">
                    {data.ogTitle || data.title || "Your Page Title"}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.ogDescription ||
                      data.description ||
                      "Your page description"}
                  </p>
                </div>
              </Card>
            </div>

            {/* Twitter Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Twitter Preview ({data.twitterCard})
                </h3>
                {data.twitterSite && (
                  <span className="text-sm text-muted-foreground">
                    via {data.twitterSite}
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
                      No image provided
                      <br />
                      <span className="text-xs">
                        {data.twitterCard === "summary"
                          ? "Recommended: 144×144 pixels"
                          : "Recommended: 1200×628 pixels"}
                      </span>
                    </p>
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <h4 className="font-bold line-clamp-1">
                    {data.twitterTitle || data.title || "Your Page Title"}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.twitterDescription ||
                      data.description ||
                      "Your page description"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {window.location.origin}
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
