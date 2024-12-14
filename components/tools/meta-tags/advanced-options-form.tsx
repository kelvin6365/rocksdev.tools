import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProps } from "@/types/tool";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function AdvancedOptionsForm({ data, onChange }: FormProps) {
  const t = useTranslations("seo.meta-tags.advanced");
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      onChange({ ...data, [field]: value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="canonicalUrl">{t("canonical-url")}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tooltips.canonical-url-description")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="canonicalUrl"
          value={data.canonicalUrl}
          onChange={handleChange("canonicalUrl")}
          placeholder={t("canonical-url-placeholder")}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="robots">{t("robots")}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tooltips.robots-description")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={data.robots}
          onValueChange={(value) => handleChange("robots")(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("robots-placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="index,follow">
              {t("robots-index-follow")}
            </SelectItem>
            <SelectItem value="noindex,follow">
              {t("robots-noindex-follow")}
            </SelectItem>
            <SelectItem value="index,nofollow">
              {t("robots-index-nofollow")}
            </SelectItem>
            <SelectItem value="noindex,nofollow">
              {t("robots-noindex-nofollow")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="keywords">{t("keywords")}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tooltips.keywords-description")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="keywords"
          value={data.keywords}
          onChange={handleChange("keywords")}
          placeholder={t("keywords-placeholder")}
        />
      </div>
    </div>
  );
}
