import { ToolLayout } from "@/components/layouts/tool-layout";
import AppIconGenerator from "@/components/tools/app-icon-generator";
import { GuideSection } from "@/components/tools/app-icon-generator/guide-section";
import { getMetadata } from "@/services/seo";
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
  return getMetadata({ path: "dev.app-icon", locale });
};

export default function AppIconGeneratorPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.app-icon" locale={locale} />
      <ToolLayout translationKey="dev.app-icon" guideSection={<GuideSection />}>
        <AppIconGenerator />
      </ToolLayout>
    </>
  );
}
