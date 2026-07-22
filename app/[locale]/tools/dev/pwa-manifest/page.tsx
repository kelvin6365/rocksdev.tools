import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { PwaManifestGenerator } from "@/components/tools/pwa-manifest";
import { GuideSection } from "@/components/tools/pwa-manifest/guide-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ToolStructuredData } from "@/components/tool-structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "dev.pwa-manifest", locale });
}

export default function PwaManifestPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <ToolStructuredData path="dev.pwa-manifest" locale={locale} />
      <ToolLayout translationKey="dev.pwa-manifest" guideSection={<GuideSection />}>
        <PwaManifestGenerator />
      </ToolLayout>
    </>
  );
}
