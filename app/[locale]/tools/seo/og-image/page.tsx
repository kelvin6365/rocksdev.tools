import { OGImageGenerator } from "@/components/tools/og-image";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/og-image/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "seo.og-image", locale });
};

export default function OGImagePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="seo.og-image" locale={locale} />
      <ToolLayout translationKey="seo.og-image" guideSection={<GuideSection />}>
        <OGImageGenerator />
      </ToolLayout>
    </>
  );
}
