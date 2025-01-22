"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
interface AdUnitProps {
  adSlot: string;
  adFormat?: string | null;
  style?: React.CSSProperties;
}

export default function AdUnit({
  adSlot,
  adFormat = "auto",
  style,
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
      className={cn("adsbygoogle mt-4")}
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
      style={{ display: "block", ...style }}
    ></ins>
  );
}
