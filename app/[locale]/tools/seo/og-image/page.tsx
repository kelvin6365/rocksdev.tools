import { OGImageGenerator } from "@/components/tools/og-image";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/og-image/guide-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "seo.og-image", locale });
};

export default function OGImagePage() {
  return (
    <ToolLayout translationKey="seo.og-image" guideSection={<GuideSection />}>
      <OGImageGenerator />
    </ToolLayout>
  );
}
