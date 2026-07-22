import { JsonMinifier } from "@/components/tools/json-minifier";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/json-minifier/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.minifier", locale });
};

export default function JsonMinifierPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="json.minifier" locale={locale} />
      <ToolLayout
        translationKey="json.minifier"
        guideSection={<GuideSection />}
      >
        <JsonMinifier />
      </ToolLayout>
    </>
  );
}
