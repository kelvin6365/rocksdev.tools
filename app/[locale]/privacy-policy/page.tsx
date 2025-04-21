import { useTranslations } from "next-intl";
import { getMetadata } from "../../../services/seo";
import AdUnit from "../../../components/ad-units";

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return getMetadata({ path: "privacy-policy", locale });
};

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy-policy");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        {t("last-updated")}
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        {/* Introduction */}
        <p className="text-lg">{t("introduction")}</p>

        {/* No Data Collection */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">
            {t("no-data-collection.title")}
          </h2>
          <p>{t("no-data-collection.description")}</p>
        </section>

        {/* Cookies */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">{t("cookies.title")}</h2>
          <p>{t("cookies.description")}</p>
        </section>

        {/* Third Party Services */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">{t("third-party.title")}</h2>
          <p>{t("third-party.description")}</p>
        </section>

        {/* Changes to Policy */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">{t("changes.title")}</h2>
          <p>{t("changes.description")}</p>
        </section>
      </div>
      <AdUnit adSlot="1315419818" />
    </div>
  );
}
