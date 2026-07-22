import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { HashGenerator } from "@/components/tools/hash";
import { GuideSection } from "@/components/tools/hash/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "dev.hash", locale });
}

export default function HashPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.hash" locale={locale} />
      <ToolLayout translationKey="dev.hash" guideSection={<GuideSection />}>
        <HashGenerator />
      </ToolLayout>
    </>
  );
}
