import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JsonValidator } from "@/components/tools/json-validator";
import { GuideSection } from "@/components/tools/json-validator/guide-section";
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
  return getMetadata({ path: "json.validator", locale });
};

export default function JsonValidatorPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="json.validator" locale={locale} />
      <ToolLayout
        translationKey="json.validator"
        guideSection={<GuideSection />}
      >
        <JsonValidator />
      </ToolLayout>
    </>
  );
}
