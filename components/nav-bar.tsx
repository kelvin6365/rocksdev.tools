"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { config } from "@/services/config";
import { Code2, Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useTranslations } from "next-intl";
const routes = config.tools;

export function NavBar() {
  const pathname = usePathname();
  const t = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Rocks Dev</span>
          </Link>
          <Button
            variant="ghost"
            className="mr-6 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
        <div
          className={cn(
            "fixed inset-0 top-14 z-50 w-full md:static md:block",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="container h-full py-4 md:py-0">
            <div className="relative flex h-full flex-col gap-6 md:flex-row md:items-center md:gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {t(`nav.tools.${route.value}.title`)}
                </Link>
              ))}
              <div className="flex items-center gap-4 md:ml-auto">
                <LanguageSwitcher />
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href={config.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
