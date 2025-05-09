import { JsonMinifier } from "@/components/tools/json-minifier";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/json-minifier/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.minifier", locale });
};

export default function JsonMinifierPage() {
  return (
    <ToolLayout translationKey="json.minifier" guideSection={<GuideSection />}>
      <JsonMinifier />
    </ToolLayout>
  );
}
