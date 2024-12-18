import { ToolLayout } from "@/components/layouts/tool-layout";
import AppIconGenerator from "@/components/tools/app-icon-generator";
import { getMetadata } from "@/services/seo";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "dev.app-icon", locale });
};

export default function AppIconGeneratorPage() {
  return (
    <ToolLayout translationKey="dev.app-icon">
      <AppIconGenerator />
    </ToolLayout>
  );
}
