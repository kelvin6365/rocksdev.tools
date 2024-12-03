"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          {t("rocksDevTools")}
        </h1>
        <p className="max-w-[600px] text-lg text-gray-200 md:text-xl">
          {t("freeFastReliable")}
        </p>
        {/* Github start */}
        <iframe
          src="https://ghbtns.com/github-btn.html?user=kelvin6365&repo=rocksdev.tools&type=star&count=true&size=large"
          width="170"
          height="30"
          title="GitHub"
          className="mx-auto"
        ></iframe>
      </section>

      {/* Tools Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.tools.map((tool) => (
          <Card
            key={tool.value}
            className="transition-all hover:shadow-xl hover:scale-105"
          >
            <Link href={tool.href}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {tool.label}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("freeOpenSource")}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {t("tryNow")} →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </section>

      {/* Features Section */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="mb-2 text-lg font-medium">No Tracking</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We don&apos;t track or store any of your data. Everything runs in
            your browser.
          </p>
        </div>
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="mb-2 text-lg font-medium">Open Source</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All tools are open source and available on GitHub. Contributions
            welcome!
          </p>
        </div>
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="mb-2 text-lg font-medium">Free Forever</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All tools are and will always be free to use. No premium features.
          </p>
        </div>
      </section>
    </div>
  );
}
