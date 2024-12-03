import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "../../../../../services/seo";
import { Base64Converter } from "../../../../../components/tools/base64";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "converters.base64", locale });
};

export default function Base64Page() {
  return (
    <ToolLayout translationKey="converters.base64">
      <Base64Converter />
    </ToolLayout>
  );
}
