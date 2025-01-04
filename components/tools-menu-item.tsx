"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Tool } from "../types/tool";

export function ToolsMenuItem({ tool, label }: { tool: Tool; label: string }) {
  const pathname = usePathname();
  return (
    <Link
      key={tool.value}
      href={tool.href}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        pathname.startsWith(tool.href)
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  );
}
