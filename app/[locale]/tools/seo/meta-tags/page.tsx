import { MetaTagsGenerator } from "@/components/tools/meta-tags";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/meta-tags/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "seo.meta-tags", locale });
};

export default function MetaTagPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="seo.meta-tags" locale={locale} />
      <ToolLayout
        translationKey="seo.meta-tags"
        guideSection={<GuideSection />}
      >
        <MetaTagsGenerator />
      </ToolLayout>
    </>
  );
}
