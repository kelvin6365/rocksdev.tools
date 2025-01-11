import JsonToJavaConverter from "@/components/tools/json-to-java-bean";
import { getMetadata } from "@/services/seo";
import { ToolLayout } from "../../../../../components/layouts/tool-layout";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ locale, path: "converters.json-to-java-bean" });
};

export default function JsonToJavaPage() {
  return (
    <ToolLayout translationKey="converters.json-to-java-bean">
      <JsonToJavaConverter />
    </ToolLayout>
  );
}
