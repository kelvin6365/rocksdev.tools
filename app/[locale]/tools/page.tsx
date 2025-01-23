import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AdUnit from "../../../components/ad-units";
export default function ToolsPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("tools.title")}
        </h1>
        <p className="text-muted-foreground">{t("tools.description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.tools.map((tool) => (
          <Card key={tool.value} className="transition-all hover:shadow-lg">
            <Link href={tool.href}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t(`nav.tools.${tool.value}.title`)}
                  </CardTitle>
                  <Sparkles className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardDescription className="text-base">
                  {t(`nav.tools.${tool.value}.description`)}
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
                        <span>{t(`nav.tools.${subTool.value}.title`)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tool Stats */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        {t("home.freeOpenSource")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {tool.subTools?.length || 0} {t("home.tools")}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      {t("home.tryNow")} →
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
