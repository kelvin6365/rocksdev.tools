import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { IdValidator } from "@/components/tools/id-validator";
import { GuideSection } from "@/components/tools/id-validator/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "dev.id-validator", locale });
}

export default function IdValidatorPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.id-validator" locale={locale} />
      <ToolLayout translationKey="dev.id-validator" guideSection={<GuideSection />}>
        <IdValidator />
      </ToolLayout>
    </>
  );
}
