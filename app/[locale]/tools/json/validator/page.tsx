import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JsonValidator } from "@/components/tools/json-validator";
import { GuideSection } from "@/components/tools/json-validator/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.validator", locale });
};

export default function JsonValidatorPage() {
  return (
    <ToolLayout translationKey="json.validator" guideSection={<GuideSection />}>
      <JsonValidator />
    </ToolLayout>
  );
}
