"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { config } from "@/services/config";
import { usePathname, Link } from "@/i18n/routing";
import { ToolBreadcrumb } from "@/components/breadcrumb";
import { useTranslations } from "next-intl";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <>
      <ToolBreadcrumb />
      <div className="container flex min-h-screen gap-8 py-8">
        {/* Sidebar */}
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="sticky top-24 space-y-2">
            <div className="py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {t("nav.categories")}
              </h2>
              <div className="space-y-1">
                {config.tools.map((tool) => (
                  <Link
                    key={tool.value}
                    href={tool.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(tool.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {t(`nav.tools.${tool.value}.title`)}
                  </Link>
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
