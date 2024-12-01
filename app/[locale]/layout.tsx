import { NavBar } from "@/components/nav-bar";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/providers/toast-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import GoogleAdsense from "../../components/adsense";
import { Footer } from "../../components/footer";
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
      <head>
        <GoogleAdsense pId={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ""} />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background flex flex-col"
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col flex-1">
            <NavBar />
            <main className="container py-6">{children}</main>
            <ToastProvider />
            <Analytics />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
            <SpeedInsights />
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
