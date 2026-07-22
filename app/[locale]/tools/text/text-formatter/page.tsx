import { TextFormatter } from "@/components/tools/text-formatter";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/text-formatter/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "text.text-formatter", locale });
};

export default function TextFormatterPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="text.text-formatter" locale={locale} />
      <ToolLayout
        translationKey="text.text-formatter"
        guideSection={<GuideSection />}
      >
        <TextFormatter />
      </ToolLayout>
    </>
  );
}
