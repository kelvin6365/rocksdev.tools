import { TextFormatter } from "@/components/tools/text-formatter";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { GuideSection } from "@/components/tools/text-formatter/guide-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "text.text-formatter", locale });
};

export default function TextFormatterPage() {
  return (
    <ToolLayout
      translationKey="text.text-formatter"
      guideSection={<GuideSection />}
    >
      <TextFormatter />
    </ToolLayout>
  );
}
