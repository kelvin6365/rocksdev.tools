import { Button } from "@/components/ui/button";
import { getMetadata } from "@/services/seo";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return getMetadata({ path: "not-found", locale });
};

export default function NotFound() {
  const t = useTranslations();
  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <div className="text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100 animate-pulse">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t("not-found.title")}
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            {t("not-found.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="default"
              size="lg"
              className="min-w-[140px]"
              asChild
            >
              <Link href="/">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {t("not-found.return-home")}
                </span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="min-w-[140px]">
              {t("not-found.go-back")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
