import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { UrlConverter } from "@/components/tools/url";
import { GuideSection } from "@/components/tools/url/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "converters.url", locale });
};

export default function UrlPage() {
  return (
    <ToolLayout translationKey="converters.url" guideSection={<GuideSection />}>
      <UrlConverter />
    </ToolLayout>
  );
}
