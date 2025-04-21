import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { getMetadata } from "@/services/seo";
import AdUnit from "../../../components/ad-units";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-lg text-muted-foreground">{t("introduction")}</p>
        <p className="text-sm text-muted-foreground">{t("last-updated")}</p>
      </div>

      <div className="grid gap-6">
        {/* Acceptance of Terms */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("acceptance.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("acceptance.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("acceptance.points.access")}</li>
            <li>{t("acceptance.points.binding")}</li>
            <li>{t("acceptance.points.changes")}</li>
          </ul>
        </Card>

        {/* Use of Services */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("use-of-services.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("use-of-services.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("use-of-services.points.lawful")}</li>
            <li>{t("use-of-services.points.prohibited")}</li>
            <li>{t("use-of-services.points.security")}</li>
          </ul>
        </Card>

        {/* Intellectual Property */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("intellectual-property.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("intellectual-property.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("intellectual-property.points.ownership")}</li>
            <li>{t("intellectual-property.points.license")}</li>
            <li>{t("intellectual-property.points.restrictions")}</li>
          </ul>
        </Card>

        {/* User Content */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("user-content.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("user-content.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("user-content.points.responsibility")}</li>
            <li>{t("user-content.points.rights")}</li>
            <li>{t("user-content.points.removal")}</li>
          </ul>
        </Card>

        {/* Disclaimer */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("disclaimer.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("disclaimer.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("disclaimer.points.as-is")}</li>
            <li>{t("disclaimer.points.availability")}</li>
            <li>{t("disclaimer.points.accuracy")}</li>
          </ul>
        </Card>

        {/* Limitation of Liability */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("limitation-of-liability.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("limitation-of-liability.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("limitation-of-liability.points.direct")}</li>
            <li>{t("limitation-of-liability.points.indirect")}</li>
            <li>{t("limitation-of-liability.points.exclusions")}</li>
          </ul>
        </Card>

        {/* Changes to Terms */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("changes.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("changes.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("changes.points.modifications")}</li>
            <li>{t("changes.points.notice")}</li>
            <li>{t("changes.points.continued-use")}</li>
          </ul>
        </Card>

        {/* Governing Law */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("governing-law.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("governing-law.description")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t("governing-law.points.jurisdiction")}</li>
            <li>{t("governing-law.points.disputes")}</li>
            <li>{t("governing-law.points.severability")}</li>
          </ul>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground">{t("contact.description")}</p>
        </Card>
      </div>
      <AdUnit adSlot="1315419818" />
    </div>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata({ path: "terms", locale });
}
