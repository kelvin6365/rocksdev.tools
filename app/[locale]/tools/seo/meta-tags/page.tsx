import { MetaTagsGenerator } from "@/components/tools/meta-tags";
import { ToolLayout } from "../../../../../components/layouts/tool-layout";
import { getMetadata } from "../../../../../services/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "seo.meta-tags", locale });
};

export default function MetaTagPage() {
  return (
    <ToolLayout translationKey="seo.meta-tags">
      <MetaTagsGenerator />
    </ToolLayout>
  );
}
