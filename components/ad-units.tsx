"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  className?: string;
}

export default function AdUnit({
  adSlot,
  adFormat = "auto",
  className,
}: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={cn("adsbygoogle", className)}
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    ></ins>
  );
}
