import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JwtTool } from "@/components/tools/jwt";
import { GuideSection } from "@/components/tools/jwt/guide-section";
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
  return getMetadata({ path: "dev.jwt", locale });
};

export default function JwtToolPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.jwt" locale={locale} />
      <ToolLayout translationKey="dev.jwt" guideSection={<GuideSection />}>
        <JwtTool />
      </ToolLayout>
    </>
  );
}
