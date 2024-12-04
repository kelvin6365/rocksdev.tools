"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToolUsage } from "@/contexts/tool-usage-context";
import { Github, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
const RANDOM_CHANCE = 0.2;

export function SupportOverlay() {
  const t = useTranslations("supportOverlay");
  const [isOpen, setIsOpen] = useState(false);
  const { toolUsageCount } = useToolUsage();

  useEffect(() => {
    const checkAndShowOverlay = () => {
      //check if first 5 shown
      const first5Shown = localStorage.getItem("first5SupportOverlayShown");
      const lastShownTime = parseInt(
        localStorage.getItem("lastSupportOverlay") || "0",
      );
      const currentTime = Date.now();

      // Show for first time at 5 uses
      if (toolUsageCount === 5 && !first5Shown) {
        setIsOpen(true);
        localStorage.setItem("lastSupportOverlay", currentTime.toString());
        //mark as shown
        localStorage.setItem("first5SupportOverlayShown", "true");
        return;
      }

      // After 5 uses, implement random showing with time restriction
      if (toolUsageCount > 5) {
        const timePassedSinceLastShow = currentTime - lastShownTime;

        // Only show if more than a week has passed
        if (timePassedSinceLastShow >= WEEK_IN_MS) {
          // Random chance to show
          if (Math.random() < RANDOM_CHANCE) {
            setIsOpen(true);
            localStorage.setItem("lastSupportOverlay", currentTime.toString());
          }
        }
      }
    };

    // Check when component mounts and when tool usage changes
    checkAndShowOverlay();
  }, [toolUsageCount]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex flex-col items-center gap-4">
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
            <span>{t("title")}</span>
          </DialogTitle>
          <div className="text-center space-y-2 pt-4 text-sm text-muted-foreground">
            <p className="text-base">{t("description")}</p>
            <p className="text-sm text-muted-foreground">{t("description2")}</p>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium">{t("description3")}</p>
            <a
              href="https://www.buymeacoffee.com/tszhim_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 inline-block"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={217}
                height={60}
              />
            </a>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-full bg-border" />
            <p className="text-sm font-medium">{t("description4")}</p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                window.open(
                  "https://github.com/kelvin6365/rocksdev.tools",
                  "_blank",
                )
              }
            >
              <Github className="w-4 h-4" />
              {t("startOnGitHub")}
            </Button>
            <p className="text-xs text-muted-foreground">
              {t("yourStarHelps")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
