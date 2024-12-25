// components/sections/guide-section.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export function GuideSection() {
  const t = useTranslations("dev.ai-sql");

  return (
    <div className="mt-8 space-y-4">
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="flex flex-col md:flex-row h-auto md:w-fit">
          <TabsTrigger className="w-full md:w-auto" value="guide">
            {t("guide.title")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="privacy">
            {t("privacy.title")}
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
                <div className="bg-muted rounded-md p-4">
                  <pre className="text-sm">
                    <code>
                      {`class User {\n  id: number;\n  name: string;\n  email: string;\n}`}
                    </code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.features.title")}</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {[
                    t("guide.features.automatic-language-detection"),
                    t(
                      "guide.features.support-for-multiple-programming-languages",
                    ),
                    t("guide.features.sql-schema-generation"),
                    t("guide.features.copy-generated-sql-with-one-click"),
                    t(
                      "guide.features.chat-history-saved-locally-in-your-browser",
                    ),
                  ].map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("guide.storage.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("guide.storage.description")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>{t("privacy.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">
                  {t("privacy.data_storage.title")}
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {[
                    t(
                      "privacy.data_storage.all-chat-histories-are-stored-locally-in-your-browser",
                    ),
                    t("privacy.data_storage.no-data-is-stored-on-our-servers"),
                    t(
                      "privacy.data_storage.clearing-your-browser-data-will-remove-all-conversations",
                    ),
                  ]
                    .map((item: string) => `• ${item}`)
                    .join("\n")}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("privacy.data_usage.title")}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {[
                    t(
                      "privacy.data_usage.your-code-is-only-used-to-generate-sql-schemas",
                    ),
                    t(
                      "privacy.data_usage.we-do-not-store-share-or-analyze-your-code",
                    ),
                    t(
                      "privacy.data_usage.conversations-remain-private-to-your-browser",
                    ),
                  ]
                    .map((item: string) => `• ${item}`)
                    .join("\n")}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">
                  {t("privacy.storage_management.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("privacy.storage_management.description")}
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {[
                    t(
                      "privacy.storage_management.clearing-your-browser-data-will-remove-all-conversations",
                    ),
                    t(
                      "privacy.storage_management.using-browser-developer-tools-to-inspect-stored-data",
                    ),
                    t(
                      "privacy.storage_management.manually-deleting-individual-conversations-in-the-app",
                    ),
                  ].map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm">{t("privacy.disclaimer")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
