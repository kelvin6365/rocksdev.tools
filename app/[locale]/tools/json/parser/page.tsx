import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import JsonParser from "@/components/tools/json-parser";
import { GuideSection } from "@/components/tools/json-parser/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.parser", locale });
};

export default function JsonParserPage() {
  return (
    <ToolLayout translationKey="json.parser" guideSection={<GuideSection />}>
      <JsonParser />
    </ToolLayout>
  );
}
