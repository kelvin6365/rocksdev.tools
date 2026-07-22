import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import MarkdownConverter from "@/components/tools/md2html";
import { GuideSection } from "@/components/tools/md2html/guide-section";
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
  return getMetadata({ path: "converters.md2html", locale });
};

export default function Md2HtmlPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="converters.md2html" locale={locale} />
      <ToolLayout
        translationKey="converters.md2html"
        guideSection={<GuideSection />}
      >
        <MarkdownConverter />
      </ToolLayout>
    </>
  );
}
