"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import ProductHuntFollow from "../../components/product-hunt-button";

export default function HomePage() {
  const tNav = useTranslations("nav");
  const tHome = useTranslations("home");
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          {tHome("rocksDevTools")}
        </h1>
        <div>
          <p className="max-w-[600px] text-lg text-gray-200 md:text-xl">
            {tHome("freeFastReliable")}
          </p>
          <p className="max-w-[600px] text-sm font-thin text-gray-200 md:text-xl">
            {tHome("ads")}
          </p>
        </div>
        {/* Github start */}
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
          {tHome("starOnGitHub")}
        </Button>
        <ProductHuntFollow />
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
                  {tNav(`tools.${tool.value}.title`)}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {tNav(`tools.${tool.value}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      {tHome("freeOpenSource")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tool.subTools?.length || 0} {tHome("tools")}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {tHome("tryNow")} →
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
          <h3 className="mb-2 text-lg font-medium">{tHome("noTracking")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tHome("noTrackingDescription")}
          </p>
        </div>
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="mb-2 text-lg font-medium">{tHome("openSource")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tHome("openSourceDescription")}
          </p>
        </div>
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="mb-2 text-lg font-medium">{tHome("freeForever")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tHome("freeForeverDescription")}
          </p>
        </div>
      </section>
    </div>
  );
}
