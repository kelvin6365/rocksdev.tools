import { Suspense } from "react";
import { getMetadata } from "@/services/seo";
import { fetchGitHubReleases } from "@/services/github";
import { ChangelogContent } from "../../../components/changelog-content";

export default async function ChangelogPage() {
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
