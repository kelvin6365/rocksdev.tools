import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { UrlConverter } from "@/components/tools/url";
import { GuideSection } from "@/components/tools/url/guide-section";
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
  return getMetadata({ path: "converters.url", locale });
};

export default function UrlPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="converters.url" locale={locale} />
      <ToolLayout
        translationKey="converters.url"
        guideSection={<GuideSection />}
      >
        <UrlConverter />
      </ToolLayout>
    </>
  );
}
