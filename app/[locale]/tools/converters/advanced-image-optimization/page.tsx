import { getMetadata } from "@/services/seo";
import { ToolLayout } from "@/components/layouts/tool-layout";
import AdvancedImageOptimizer from "@/components/tools/advanced-image-optimization";
import GuideSection from "@/components/tools/advanced-image-optimization/guide-section";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({
    path: "converters.advanced-image-optimization",
    locale,
  });
}

export default function AdvancedImageOptimizationPage() {
  const t = useTranslations();

  return (
    <ToolLayout
      translationKey="converters.advanced-image-optimization"
      guideSection={<GuideSection />}
    >
      <AdvancedImageOptimizer />
    </ToolLayout>
  );
}
