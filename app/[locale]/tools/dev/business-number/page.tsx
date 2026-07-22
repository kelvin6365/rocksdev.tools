import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { BusinessNumberValidator } from "@/components/tools/business-number";
import { GuideSection } from "@/components/tools/business-number/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "dev.business-number", locale });
}

export default function BusinessNumberPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.business-number" locale={locale} />
      <ToolLayout translationKey="dev.business-number" guideSection={<GuideSection />}>
        <BusinessNumberValidator />
      </ToolLayout>
    </>
  );
}
