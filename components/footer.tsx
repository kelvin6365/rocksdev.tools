"use client";

import { config } from "@/services/config";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../i18n/routing";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("footer.about.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.about.description")}
            </p>
            <div className="flex gap-4">
              {config.socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </Button>
              ))}
            </div>
            <a
              href="https://www.buymeacoffee.com/tszhim_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 inline-block"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={217}
                height={60}
              />
            </a>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("footer.tools.title")}</h3>
            <ul className="space-y-2 text-sm">
              {config.tools.map((tool) => (
                <li key={tool.value}>
                  <Link
                    href={tool.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.tools.${tool.value}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {t("footer.resources.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              {/* <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.resources.blog")}
                </Link>
              </li> */}
              <li>
                <Link
                  href="https://github.com/kelvin6365/rocksdev.tools"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.resources.github")}
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.resources.changelog")}
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.resources.roadmap")}
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("footer.legal.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("privacy-policy.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("contact-us.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.newsletter.description")}
            </p>
            <Link
              href="https://app.daily.dev/squads/rocksdev_tools"
              target="_blank"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("footer.newsletter.join")}
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} RocksDev.Tools. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {t("footer.madeWith")}
            </span>
            <span className="text-red-500">❤</span>
            <span className="text-sm text-muted-foreground">
              {t("footer.by")}
            </span>
            <Link
              href="https://github.com/kelvin6365"
              target="_blank"
              className="text-sm font-medium hover:underline"
            >
              Kelvin Kwong
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
