"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Developer Tools Hub
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Free, fast, and reliable tools for developers. No ads, no tracking,
          just tools.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.tools.map((tool) => (
          <Card key={tool.value} className="transition-all hover:shadow-lg">
            <Link href={tool.href}>
              <CardHeader>
                <CardTitle className="text-xl">{tool.label}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Free & Open Source
                  </span>
                  <span className="text-sm font-medium">Try Now →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </section>

      {/* Features Section */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-medium">No Tracking</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We don&apos;t track or store any of your data. Everything runs in
            your browser.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-medium">Open Source</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All tools are open source and available on GitHub. Contributions
            welcome!
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-medium">Free Forever</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All tools are and will always be free to use. No premium features.
          </p>
        </div>
      </section>
    </div>
  );
}
