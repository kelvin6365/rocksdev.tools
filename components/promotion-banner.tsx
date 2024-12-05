"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { sendGAEvent } from "@next/third-parties/google";

interface PromotionBannerProps {
  id: string;
  title: string;
  description: string;
  note?: string;
  position?: "top" | "bottom";
  className?: string;
}

export function PromotionBanner({
  title,
  description,
  note,
  id,
  position = "bottom",
  className,
}: PromotionBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hiddenCookie = Cookies.get(`promo-${id}`);
    setIsHidden(hiddenCookie === "hidden");
  }, [id]);

  if (!isVisible || isHidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: position === "top" ? -20 : 20 }}
      className={cn(
        "fixed inset-x-0 z-50",
        position === "top" ? "top-4" : "bottom-24",
        "max-w-md w-full mx-auto p-4 rounded-lg",
        "bg-primary text-primary-foreground shadow-lg",
        "border border-primary/20",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
          {note && <p className="text-xs mt-2 opacity-75">{note}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 hover:bg-primary-foreground/10"
          onClick={() => {
            Cookies.set(`promo-${id}`, "hidden", { expires: 30 }); // Expires in 30 days
            setIsVisible(false);
            sendGAEvent("event", "promo_banner_dismissed", {
              promo_id: id,
              title,
              description,
            });
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
