import { ToolBreadcrumb } from "@/components/breadcrumb";
import { ToolsMenuItem } from "@/components/tools-menu-item";
import { config } from "@/services/config";
import { getMetadata } from "@/services/seo";
import { useTranslations } from "next-intl";
import * as React from "react";
import AdUnit from "@/components/ad-units";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({
    locale,
    path: "tools",
    config: {
      title:
        "Developer Tools Collection - JSON, SEO, Code Tools | RocksDev Tools",
      description:
        "Browse our complete collection of developer tools including JSON processors, SEO optimizers, code converters, and text utilities. All tools are free and run in your browser.",
      keywords: [
        "developer tools",
        "json tools",
        "seo tools",
        "code conversion tools",
        "text processing tools",
        "free developer utilities",
      ],
    },
  });
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <>
      <ToolBreadcrumb />
      <div className="container flex gap-6 py-4 md:py-8 px-0">
        {/* Sidebar */}
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="sticky top-24 space-y-2">
            <div className="py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {t("nav.categories")}
              </h2>
              <div className="space-y-1">
                {config.tools.map((tool) => (
                  <ToolsMenuItem
                    key={tool.value}
                    tool={tool}
                    label={t(`nav.tools.${tool.value}.title`)}
                  />
                ))}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">{children}</main>
      </div>
    </>
  );
}
