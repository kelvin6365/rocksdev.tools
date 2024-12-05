import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const seoTools = config.tools.find((tool) => tool.value === "seo");

export default function SeoPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("seo.title")}</h1>
        <p className="text-muted-foreground">{t("seo.description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seoTools?.subTools?.map((tool) => (
          <Card key={tool.value} className="transition-all hover:shadow-lg">
            <Link href={tool.href}>
              <CardHeader>
                <CardTitle className="text-xl">
                  {t(`${tool.value}.title`)}
                </CardTitle>
                <CardDescription>
                  {t(`${tool.value}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("seo.free")} & {t("seo.openSource")}
                  </span>
                  <span className="text-sm font-medium">
                    {t("seo.tryNow")} →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
