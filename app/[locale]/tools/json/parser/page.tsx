import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import JsonParser from "@/components/tools/json-parser";
import { GuideSection } from "@/components/tools/json-parser/guide-section";
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
  return getMetadata({ path: "json.parser", locale });
};

export default function JsonParserPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="json.parser" locale={locale} />
      <ToolLayout translationKey="json.parser" guideSection={<GuideSection />}>
        <JsonParser />
      </ToolLayout>
    </>
  );
}
