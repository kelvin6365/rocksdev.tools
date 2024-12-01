"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { config } from "@/services/config";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "../i18n/routing";

export function ToolBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const t = useTranslations();

  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const tool = config.tools.find((t) => t.value === path);
    const subTool = tool?.subTools?.find((st) => st.value === paths[index + 1]);

    // Get translation key from tool or subTool value
    let translationKey;
    if (subTool) {
      translationKey = subTool.value; // e.g. nav.json.formatter
    } else if (tool) {
      translationKey = tool.value; // e.g. nav.json
    } else {
      translationKey = path;
    }

    const label = t(
      `nav.${
        index === 0
          ? translationKey
          : paths
              .slice(0, index)
              .map((p) => p)
              .join(".") +
            "." +
            translationKey
      }.title`
    );
    const isLast = index === paths.length - 1;

    return {
      href,
      label,
      isLast,
      isRoot: index === 0,
    };
  });

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("nav.home")}</span>
                </Link>
              </BreadcrumbLink>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </BreadcrumbItem>
            {breadcrumbs.map((crumb) => (
              <BreadcrumbItem key={crumb.href}>
                {crumb.isLast ? (
                  <BreadcrumbPage className="max-w-[200px] truncate font-medium">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild className="max-w-[200px] truncate">
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
