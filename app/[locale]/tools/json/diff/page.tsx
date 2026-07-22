import { ToolLayout } from "@/components/layouts/tool-layout";
import { JsonDiff } from "@/components/tools/json-diff";
import { getMetadata } from "../../../../../services/seo";
import { GuideSection } from "@/components/tools/json-diff/guide-section";
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
  return getMetadata({ path: "json.diff", locale });
};

export default function JsonDiffPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="json.diff" locale={locale} />
      <ToolLayout translationKey="json.diff" guideSection={<GuideSection />}>
        <JsonDiff />
      </ToolLayout>
    </>
  );
}
