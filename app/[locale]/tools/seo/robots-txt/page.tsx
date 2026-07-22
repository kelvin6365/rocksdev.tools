import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { RobotsTxtValidator } from "@/components/tools/robots-txt";
import { GuideSection } from "@/components/tools/robots-txt/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "seo.robots-txt", locale });
}

export default function RobotsTxtPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="seo.robots-txt" locale={locale} />
      <ToolLayout translationKey="seo.robots-txt" guideSection={<GuideSection />}>
        <RobotsTxtValidator />
      </ToolLayout>
    </>
  );
}
