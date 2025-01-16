"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("json.parser.guide");

  const menuExample = {
    title: "Menu of Soups and Salads",
    images: [
      {
        mood: "Informative and appetizing",
        text: "Mulligatawny Soup, Tomato Soup, Prawns Soup, Mushroom Soup, Chicken Soup, Green Salad, Chicken Chat, Samosa Chat, Cucumber Raita, Kuchumber Salad, Aloo Chat. Prices ranging from $42 to $62.",
        colors: ["Yellow", "Green", "Orange", "White", "Brown"],
        objects: ["Soups", "Salads", "Price tags", "Text descriptions"],
        setting: "Restaurant menu context",
        activities: [],
        description:
          "This image displays a menu offering a variety of soups and salads, categorized neatly with prices indicated for each item. The soups include Mulligatawny, Tomato, Prawns, Chicken, and Mushroom soups. The salads and snacks section presents options like Green Salad, Chicken Chat, Samosa Chat, Cucumber Raita, Kuchumber Salad, and Aloo Chat. Each item is listed with a brief description and its price, making it easy for customers to make selections.",
        mainSubject: "Food menu featuring soups and salads",
        peopleCount: 0,
        potentialUses: [
          "Restaurant menu design",
          "Food promotion",
          "Culinary inspiration",
        ],
        uniqueFeatures: [
          "Visual layout facilitating menu selection",
          "Multilingual text (in English and Chinese)",
        ],
        qualityAssessment: "High",
      },
    ],
    category: "Food",
    overallTheme: "Diverse food options focusing on soups and salads",
    confidenceScore: 0.95,
    decisionRelevance:
      "This image is relevant for restaurant patrons looking to explore food options, helping them make informed dining choices based on preferences and budget.",
  };

  return (
    <div className="mt-8 space-y-4">
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="flex flex-col md:flex-row h-auto md:w-fit">
          <TabsTrigger className="w-full md:w-auto" value="guide">
            {t("overview.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="features">
            {t("features.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="tips">
            {t("tips.title")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>{t("overview.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t("overview.description")}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("modes.parse.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("modes.parse.description")}
                </p>
                <pre className="bg-muted p-2 rounded-md text-sm overflow-auto">
                  {JSON.stringify(menuExample)}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("modes.stringify.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("modes.stringify.description")}
                </p>
                <pre className="bg-muted p-2 rounded-md text-sm overflow-auto">
                  {`const menuData = ${JSON.stringify(menuExample, null, 2)};
// Convert to JSON string
const jsonString = JSON.stringify(menuData);`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("options.title")}</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {Object.values(t("options.list")).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>{t("features.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {Object.values(t("features.list")).map((item, index) => (
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
              <CardTitle>{t("tips.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {Object.values(t("tips.list")).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
