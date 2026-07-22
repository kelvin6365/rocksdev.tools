import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { GuideSection } from "@/components/tools/json-formatter/guide-section";
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
  return getMetadata({ path: "json.formatter", locale });
};

export default function JsonFormatterPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="json.formatter" locale={locale} />
      <ToolLayout
        translationKey="json.formatter"
        guideSection={<GuideSection />}
      >
        <JsonFormatter />
      </ToolLayout>
    </>
  );
}
