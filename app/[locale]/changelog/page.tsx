import { Suspense } from "react";
import { getMetadata } from "@/services/seo";
import { fetchGitHubReleases } from "@/services/github";
import { ChangelogContent } from "../../../components/changelog-content";
import { setRequestLocale } from "next-intl/server";

/**
 * Regenerate hourly. Static rendering would otherwise pin this page to the
 * releases that existed at build time, so a new GitHub release would not show
 * up until the next deploy.
 */
export const revalidate = 3600;

export default async function ChangelogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const releases = await fetchGitHubReleases();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangelogContent releases={releases} />
    </Suspense>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "changelog", locale });
}
