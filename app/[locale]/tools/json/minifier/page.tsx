import { JsonMinifier } from "@/components/tools/json-minifier";
import { ToolLayout } from "../../../../../components/layouts/tool-layout";

export default function JsonMinifierPage() {
  return (
    <ToolLayout translationKey="json.minifier">
      <JsonMinifier />
    </ToolLayout>
  );
}
