"use client";

import { cn } from "@/lib/utils";
import { config } from "@/services/config";
import { usePathname, Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const convertersTools =
  config.tools.find((tool) => tool.value === "converters")?.subTools || [];

export default function ConvertersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
                <Link
                  key={tool.value}
                  href={tool.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === tool.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {t(`nav.tools.converters.${tool.value.split(".")[1]}.title`)}
                </Link>
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
