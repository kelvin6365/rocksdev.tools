import { getMetadata } from "@/services/seo";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return getMetadata({ path: "not-found", locale });
};

/**
 * Catch-all for unmatched paths. Calling `notFound()` renders
 * app/[locale]/not-found.tsx with a real HTTP 404 status instead of
 * returning 200 with 404 content (a soft 404).
 */
export default function NotFoundCatchAll() {
  notFound();
}
