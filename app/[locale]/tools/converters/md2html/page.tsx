import { ToolLayout } from "@/components/layouts/tool-layout";
import { getMetadata } from "../../../../../services/seo";
import MarkdownConverter from "../../../../../components/tools/md2html/index.tsx";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "converters.md2html", locale });
};

export default function Md2HtmlPage() {
  return (
    <ToolLayout translationKey="converters.md2html">
      <MarkdownConverter />
    </ToolLayout>
  );
}
