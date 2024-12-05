import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { X, ChevronRight, Github, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { config } from "@/services/config";
import { usePathname, Link } from "../i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tTools = useTranslations();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 top-0 h-screen w-screen z-[9999]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="h-screen w-screen bg-background/80 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed inset-y-0 left-0 w-screen h-screen",
              "bg-background border-r z-[9999]",
              "flex flex-col",
            )}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">{t("categories")}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {config.tools.map((category) => (
                <div key={category.value} className="px-2 py-1">
                  {/* Category */}
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md",
                      "text-sm font-medium transition-colors",
                      pathname.includes(category.href)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span>{t(`tools.${category.value}.title`)}</span>
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
                          onClick={onClose}
                          className={cn(
                            "block px-2 py-1.5 rounded-md text-sm",
                            "transition-colors",
                            pathname === tool.href
                              ? "bg-accent/50 text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/30",
                          )}
                        >
                          {tTools(`${tool.value}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Language</span>
                <LanguageSwitcher />
              </div>
              <Link
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-2 text-sm font-medium rounded-md hover:bg-accent/50"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </div>
                <Star className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
