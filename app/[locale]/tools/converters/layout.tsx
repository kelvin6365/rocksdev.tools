import { config } from "@/services/config";
import { useTranslations } from "next-intl";
import { ToolsMenuItem } from "@/components/tools-menu-item";
import { getMetadata } from "@/services/seo";

const convertersTools =
  config.tools.find((tool) => tool.value === "converters")?.subTools || [];

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ locale, path: "converters" });
};

export default function ConvertersLayout({
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
              {t("nav.tools.converters.title")}
            </h2>
            <div className="space-y-1">
              {convertersTools.map((tool) => (
                <ToolsMenuItem
                  key={tool.value}
                  tool={tool}
                  label={t(
                    `nav.tools.converters.${tool.value.split(".")[1]}.title`,
                  )}
                />
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
