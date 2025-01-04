import { ToolLayout } from "@/components/layouts/tool-layout";
import { JsonDiff } from "@/components/tools/json-diff";
import { getMetadata } from "../../../../../services/seo";
import { GuideSection } from "@/components/tools/json-diff/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "json.diff", locale });
};

export default function JsonDiffPage() {
  return (
    <ToolLayout translationKey="json.diff" guideSection={<GuideSection />}>
      <JsonDiff />
    </ToolLayout>
  );
}
