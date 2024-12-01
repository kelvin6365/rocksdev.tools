import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/providers/toast-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Tools Hub",
  description: "A comprehensive collection of developer tools",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          <main className="container py-6">{children}</main>
          <ToastProvider />
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
