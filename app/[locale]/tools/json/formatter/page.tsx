import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "@/services/seo";
import { JsonFormatter } from "@/components/tools/json-formatter";

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
    <ToolLayout translationKey="json.formatter">
      <JsonFormatter />
    </ToolLayout>
  );
}
