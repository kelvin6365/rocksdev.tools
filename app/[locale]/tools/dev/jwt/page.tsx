import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JwtTool } from "@/components/tools/jwt";
import { GuideSection } from "@/components/tools/jwt/guide-section";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "dev.jwt", locale });
};

export default function JwtToolPage() {
  return (
    <ToolLayout translationKey="dev.jwt" guideSection={<GuideSection />}>
      <JwtTool />
    </ToolLayout>
  );
}
