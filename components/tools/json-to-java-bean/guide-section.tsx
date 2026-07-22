"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

/** Type names are identical in every locale; only the notes column is translated. */
const TYPE_ROWS = [
  { key: "string", json: '"hello"', java: "String" },
  { key: "date", json: '"2024-01-01T00:00:00Z"', java: "LocalDateTime" },
  { key: "integer", json: "30", java: "Integer" },
  { key: "decimal", json: "95.5", java: "Double" },
  { key: "boolean", json: "true", java: "Boolean" },
  { key: "array", json: '["a", "b"]', java: "List<String>" },
  { key: "object", json: "{ ... }", java: "NestedClass" },
  { key: "null", json: "null", java: "Object" },
];

export function GuideSection() {
  const t = useTranslations("converters.json-to-java-bean.guide");

  return (
    <Guide>
      <GuidePanel title={t("basic.title")}>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("basic.description")}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("basic.steps.title")}</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>{t("basic.steps.input")}</li>
                <li>{t("basic.steps.configure")}</li>
                <li>{t("basic.steps.generate")}</li>
                <li>{t("basic.steps.copy")}</li>
              </ul>
            </div>
          </div>
        </div>
      </GuidePanel>

      <GuidePanel title={t("types.title")}>
        <p className="text-sm text-muted-foreground">
          {t("types.description")}
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("types.columns.json")}</TableHead>
                <TableHead>{t("types.columns.java")}</TableHead>
                <TableHead>{t("types.columns.notes")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TYPE_ROWS.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.json}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {row.java}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t(`types.rows.${row.key}`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GuidePanel>

      <GuidePanel title={t("nested.title")}>
        <p className="text-sm text-muted-foreground">
          {t("nested.description")}
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">{t("nested.input")}:</p>
          <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
            {`{
  "id": 41,
  "customer": { "name": "Ada", "email": "ada@example.com" },
  "items": [{ "sku": "A-1", "qty": 2 }]
}`}
          </pre>
          <p className="text-sm font-medium mt-4">{t("nested.output")}:</p>
          <pre className="bg-muted p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap">
            {`public class Order {
    private Integer id;
    private Customer customer;
    private List<Items> items;

    public static class Customer {
        private String name;
        private String email;
    }

    public static class Items {
        private String sku;
        private Integer qty;
    }
}`}
          </pre>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">{t("nested.rules.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {Object.entries(t.raw("nested.rules.list")).map(([key, value]) => (
              <li key={key}>{value as string}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>

      <GuidePanel title={t("features.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("features.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("features.list.lombok_support"),
              t("features.list.type_inference"),
              t("features.list.nested_objects"),
              t("features.list.formatting"),
              t("features.list.validation"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </GuidePanel>
      <GuidePanel title={t("tips.title")}>
        <div className="space-y-2">
          <h3 className="font-medium">{t("tips.list.title")}</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
            {[
              t("tips.list.validate_json"),
              t("tips.list.use_lombok"),
              t("tips.list.naming"),
              t("tips.list.package_naming"),
              t("tips.list.complex_types"),
            ].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm">{t("tips.note")}</p>
        </div>
      </GuidePanel>
    </Guide>
  );
}
