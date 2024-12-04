import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { RegexTester } from "@/components/tools/regex";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "dev.regex", locale });
};

export default function RegexTesterPage() {
  return (
    <ToolLayout translationKey="dev.regex">
      <RegexTester />
    </ToolLayout>
  );
}
