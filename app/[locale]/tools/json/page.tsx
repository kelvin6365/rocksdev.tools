import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { config } from "@/services/config";
import { useTranslations } from "next-intl";
import AdUnit from "../../../../components/ad-units";

const jsonTools = config.tools.find((tool) => tool.value === "json");

export default function JsonToolsPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("json.title")}</h1>
        <p className="text-muted-foreground">{t("json.description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jsonTools?.subTools?.map((tool) => (
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
                    {t("json.free")} & {t("json.openSource")}
                  </span>
                  <span className="text-sm font-medium">
                    {t("json.tryNow")} →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      <AdUnit adSlot="4396194595" />
    </div>
  );
}
