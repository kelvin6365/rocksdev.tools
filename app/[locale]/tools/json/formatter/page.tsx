import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { GuideSection } from "@/components/tools/json-formatter/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.formatter", locale });
};

export default function JsonFormatterPage() {
  return (
    <ToolLayout translationKey="json.formatter" guideSection={<GuideSection />}>
      <JsonFormatter />
    </ToolLayout>
  );
}
