import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
interface CharacterCountProps {
  current: number;
  min: number;
  max: number;
  id: string;
}

export function CharacterCount({ current, min, max, id }: CharacterCountProps) {
  const t = useTranslations("seo.meta-tags");
  const percentage = (current / max) * 100;
  const isOptimal = current >= min && current <= max;

  return (
    <div className="space-y-1" id={id}>
      <Progress value={percentage} className="h-2" />
      <p
        className={`text-sm ${isOptimal ? "text-green-600" : "text-yellow-600"}`}
      >
        {current} / {max} {t("characters")}{" "}
        {isOptimal ? `(${t("optimal")})` : ""}
      </p>
    </div>
  );
}
