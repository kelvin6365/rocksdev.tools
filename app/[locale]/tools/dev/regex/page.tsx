import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { RegexTester } from "@/components/tools/regex";
import { GuideSection } from "@/components/tools/regex/guide-section";
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
  return getMetadata({ path: "dev.regex", locale });
};

export default function RegexTesterPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.regex" locale={locale} />
      <ToolLayout translationKey="dev.regex" guideSection={<GuideSection />}>
        <RegexTester />
      </ToolLayout>
    </>
  );
}
