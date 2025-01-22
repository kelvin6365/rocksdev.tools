import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { LinkButton } from "../../../components/link-button";
import { config } from "../../../services/config";
import { getMetadata } from "../../../services/seo";
import AdUnit from "../../../components/ad-units";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "contact-us", locale });
};

export default function ContactUsPage() {
  const t = useTranslations("contact-us");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <div className="prose dark:prose-invert max-w-none space-y-8">
        {/* Introduction */}
        <p className="text-lg">{t("introduction")}</p>

        {/* Social Media */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("social.title")}</h2>
          <p>{t("social.description")}</p>
          <div className="flex flex-wrap gap-4">
            {config.socialLinks.map((link) => (
              <LinkButton key={link.name} href={link.url}>
                {link.icon}
                {t(`social-links.${link.name}`)}
              </LinkButton>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("github.title")}</h2>
          <p>{t("github.description")}</p>
          <div>
            <LinkButton href="https://github.com/kelvin6365/rocksdev.tools">
              <Github className="h-4 w-4" />
              {t("github.repository")}
            </LinkButton>
          </div>
        </section>

        {/* Feedback */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("feedback.title")}</h2>
          <p>{t("feedback.description")}</p>
          <div>
            <LinkButton href="https://github.com/kelvin6365/rocksdev.tools/issues">
              <Github className="h-4 w-4" />
              {t("github.submit-issue")}
            </LinkButton>
          </div>
        </section>
      </div>
      <AdUnit adSlot="2962196569" />
    </div>
  );
}
