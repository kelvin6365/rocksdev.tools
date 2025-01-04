"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { Github, Star, Zap, Shield, Code2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/button";
import ProductHuntFollow from "../../components/product-hunt-button";
import { Link } from "../../i18n/routing";

export default function HomePage() {
  const tNav = useTranslations("nav");
  const tHome = useTranslations("home");

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center space-y-6 bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)] pointer-events-none" />
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl text-center max-w-4xl">
          {tHome("rocksDevTools")}
        </h1>
        <div className="text-center justify-center flex flex-col items-center">
          <p className="max-w-[800px] text-xl text-gray-200 md:text-2xl mb-4">
            {tHome("freeFastReliable")}
          </p>
          <p className="max-w-[600px] text-base text-gray-200 md:text-lg">
            {tHome("ads")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            variant="secondary"
            size="lg"
            className="gap-2"
            onClick={() =>
              window.open(
                "https://github.com/kelvin6365/rocksdev.tools",
                "_blank",
              )
            }
          >
            <Github className="w-5 h-5" />
            {tHome("starOnGitHub")}
          </Button>
          <ProductHuntFollow />
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader>
            <Zap className="w-10 h-10 text-blue-500" />
            <CardTitle>{tHome("noTracking")}</CardTitle>
            <CardDescription className="text-base">
              {tHome("noTrackingDescription")}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader>
            <Code2 className="w-10 h-10 text-purple-500" />
            <CardTitle>{tHome("openSource")}</CardTitle>
            <CardDescription className="text-base">
              {tHome("openSourceDescription")}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
          <CardHeader>
            <Shield className="w-10 h-10 text-green-500" />
            <CardTitle>{tHome("freeForever")}</CardTitle>
            <CardDescription className="text-base">
              {tHome("freeForeverDescription")}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Tools Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            {tHome("professionalDeveloperTools")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {tHome("professionalDeveloperToolsDescription")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.tools.map((tool) => (
            <Card
              key={tool.value}
              className="group transition-all hover:shadow-xl"
            >
              <Link href={tool.href}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {tNav(`tools.${tool.value}.title`)}
                    </CardTitle>
                    <Sparkles className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardDescription className="text-base">
                    {tNav(`tools.${tool.value}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tool Features */}
                    <div className="grid grid-cols-2 gap-2">
                      {tool.subTools?.map((subTool) => (
                        <div
                          key={subTool.value}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-lg">{subTool.icon}</span>
                          <span>{tNav(`tools.${subTool.value}.title`)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tool Stats */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          {tHome("freeOpenSource")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {tool.subTools?.length || 0} {tHome("tools")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                        {tHome("tryNow")} →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            {tHome("whyChooseRocksDevTools")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {tHome("whyChooseRocksDevToolsDescription")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsModernUI")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsModernUIDescription")}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsPrivacyFirst")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsPrivacyFirstDescription")}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsRegularUpdates")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsRegularUpdatesDescription")}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsDeveloperFocused")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsDeveloperFocusedDescription")}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsMultiLanguageSupport")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsMultiLanguageSupportDescription")}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {tHome("whyChooseRocksDevToolsCommunityDriven")}
              </h3>
              <p className="text-muted-foreground">
                {tHome("whyChooseRocksDevToolsCommunityDrivenDescription")}
              </p>
            </div>
          </Card>
        </div>
      </section>
      <div className="h-12"></div>
    </div>
  );
}
