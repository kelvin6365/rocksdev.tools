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

const textTools = config.tools.find((tool) => tool.value === "text");

export default function TextPage() {
  const t = useTranslations("text");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {textTools?.subTools?.map((tool) => (
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
                    {t("free")} & {t("openSource")}
                  </span>
                  <span className="text-sm font-medium">{t("tryNow")} →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
