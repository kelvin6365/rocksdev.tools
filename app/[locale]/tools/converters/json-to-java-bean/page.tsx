import JsonToJavaConverter from "@/components/tools/json-to-java-bean";
import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { GuideSection } from "@/components/tools/json-to-java-bean/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";
type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ locale, path: "converters.json-to-java-bean" });
};

export default function JsonToJavaPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="converters.json-to-java-bean" locale={locale} />
      <ToolLayout
        translationKey="converters.json-to-java-bean"
        guideSection={<GuideSection />}
      >
        <JsonToJavaConverter />
      </ToolLayout>
    </>
  );
}
