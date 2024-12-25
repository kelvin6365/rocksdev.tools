"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
      onClick={() =>
        sendGAEvent("event", "social_link_click", { social_link: href })
      }
    >
      {children}
    </a>
  );
}
