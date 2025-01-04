import { config } from "@/services/config";
import { getMetadata } from "@/services/seo";
import { useTranslations } from "next-intl";
import { ToolsMenuItem } from "../../../../components/tools-menu-item";

const jsonTools =
  config.tools.find((tool) => tool.value === "json")?.subTools || [];

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ locale, path: "json" });
};

export default function JsonToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="flex gap-4 p-0 py-4 md:p-4">
      {/* Sidebar */}
      <aside className="hidden w-48 shrink-0 md:block">
        <nav className="sticky top-24 space-y-2">
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {t("nav.tools.json.title")}
            </h2>
            <div className="space-y-1">
              {jsonTools.map((tool) => (
                <ToolsMenuItem
                  key={tool.value}
                  tool={tool}
                  label={t(`nav.tools.json.${tool.value.split(".")[1]}.title`)}
                />
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-6">{children}</main>
    </div>
  );
}
