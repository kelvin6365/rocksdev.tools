import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CharacterCount } from "./character-count";
import { FormProps } from "@/types/tool";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function BasicSeoForm({ data, onChange }: FormProps) {
  const t = useTranslations("seo.meta-tags.basic");
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...data, [field]: e.target.value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="title">{t("title-tag")}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("title-tag-description")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground ml-2 text-sm">
            {t("recommended-characters", { min: 50, max: 60 })}
          </span>
        </div>
        <Input
          id="title"
          value={data.title}
          onChange={handleChange("title")}
          placeholder={t("title-tag-placeholder")}
          maxLength={60}
          aria-describedby="title-count"
        />
        <CharacterCount
          id="title-count"
          current={data.title.length}
          min={50}
          max={60}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="description">{t("meta-description")}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("meta-description-description")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground ml-2 text-sm">
            {t("recommended-characters", { min: 150, max: 160 })}
          </span>
        </div>
        <Textarea
          id="description"
          value={data.description}
          onChange={handleChange("description")}
          placeholder={t("meta-description-placeholder")}
          maxLength={160}
          aria-describedby="description-count"
        />
        <CharacterCount
          id="description-count"
          current={data.description.length}
          min={150}
          max={160}
        />
      </div>
    </div>
  );
}
