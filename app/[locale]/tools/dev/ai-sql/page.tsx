import { AiSqlBot } from "@/components/tools/ai-sql";
import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "dev.ai-sql", locale });
};

export default function AiSqlPage() {
  return (
    <ToolLayout translationKey="dev.ai-sql" childrenClassName="p-0 md:p-0">
      <AiSqlBot />
    </ToolLayout>
  );
}
