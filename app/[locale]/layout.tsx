import { Dock } from "@/components/dock";
import { NavBar } from "@/components/nav-bar";
import { SupportOverlay } from "@/components/support-overlay";
import { ToolProvider } from "@/contexts/tool-context";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/providers/toast-provider";
import { getMetadata, getStructuredData } from "@/services/seo";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import GoogleAdsense from "../../components/adsense";
import { Footer } from "../../components/footer";
import OpenPanel from "../../components/open-panel-component";
import ProductHuntBanner from "../../components/product-hunt-banner";
import { PromotionBanner } from "../../components/promotion-banner";
import { config } from "../../services/config";
import "./globals.css";

type Props = {
  params: Promise<{ locale: string }>;
};

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ locale });
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  // Opt into static rendering (next-intl).
  setRequestLocale(locale);

  const messages = await getMessages();
  const structuredData = getStructuredData(locale);

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        <GoogleAdsense pId={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ""} />
        <meta
          name="google-adsense-account"
          content={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        ></meta>
        {/* Canonical URL and language alternates are emitted per-page by
            `getMetadata` (services/seo.ts) via metadata.alternates. */}

        {/* Structured Data. Rendered as a plain <script> rather than
            next/script so it is present in the server HTML, where crawlers
            read it without having to execute JavaScript. */}
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "bg-background overflow-x-hidden flex flex-col min-h-screen",
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToolProvider>
            <NavBar />
            <ProductHuntBanner />
            <main className="container py-4 md:py-6 flex-1">{children}</main>
            <ToastProvider />
            <Analytics />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
            <SpeedInsights />
            <SupportOverlay />
            <Footer />
            <Dock />
            <PromotionBanner
              title={config.promos[0].text[locale].title}
              description={config.promos[0].text[locale].description}
              note={config.promos[0].text[locale].note}
              id={config.promos[0].id}
              position="bottom"
            />
          </ToolProvider>
        </NextIntlClientProvider>
        <OpenPanel />
      </body>
    </html>
  );
}
