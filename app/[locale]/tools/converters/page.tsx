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
import { Badge } from "@/components/ui/badge";
import AdUnit from "../../../../components/ad-units";
const convertersTools = config.tools.find(
  (tool) => tool.value === "converters",
);

export default function ConvertersPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("converters.title")}
        </h1>
        <p className="text-muted-foreground">{t("converters.description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {convertersTools?.subTools?.map((tool) => (
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
              <CardContent className="flex flex-col gap-2">
                {tool.tags && (
                  <div className="flex items-center justify-between">
                    {tool.tags.map((tag) => (
                      <Badge key={tag}>{t(`tags.${tag}`)}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("converters.free")} & {t("converters.openSource")}
                  </span>
                  <span className="text-sm font-medium">
                    {t("converters.tryNow")} →
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
