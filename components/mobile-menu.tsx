"use client";

import { cn } from "@/lib/utils";
import { config } from "@/services/config";
import { ChevronRight, Github, Star, Twitter, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Link, usePathname } from "../i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { SearchButton } from "./search";
import { Button } from "./ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm h-[100dvh]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed left-0 top-0 bottom-0 w-full max-w-xs",
              "bg-background border-r",
              "flex flex-col h-[100dvh]",
            )}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">{t("nav.categories")}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              {/* Search Button */}
              <div className="p-4 border-b">
                <SearchButton />
              </div>
              <div className="py-2">
                {config.tools.map((category) => (
                  <div key={category.value} className="px-2 py-1">
                    {/* Category */}
                    <Link
                      href={category.href}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md",
                        "text-sm font-medium transition-colors",
                        pathname.includes(category.href)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span>{t(`nav.tools.${category.value}.title`)}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>

                    {/* Subtools */}
                    {category.subTools && (
                      <div className="ml-9 mt-1 space-y-1">
                        {category.subTools.map((tool) => (
                          <Link
                            key={tool.value}
                            href={tool.href}
                            className={cn(
                              "block px-2 py-1.5 rounded-md text-sm",
                              "transition-colors",
                              pathname === tool.href
                                ? "bg-accent/50 text-accent-foreground"
                                : "text-muted-foreground hover:bg-accent/30",
                            )}
                          >
                            {t(`${tool.value}.title`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 pb-safe space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("nav.language")}</span>
                <LanguageSwitcher />
              </div>
              <div className="flex gap-2">
                <Link
                  href="https://twitter.com/tszhim_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between flex-1 p-2 text-sm font-medium rounded-md hover:bg-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    <span>Follow on Twitter</span>
                  </div>
                </Link>
                <Link
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between flex-1 p-2 text-sm font-medium rounded-md hover:bg-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>Star on GitHub</span>
                  </div>
                  <Star className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
