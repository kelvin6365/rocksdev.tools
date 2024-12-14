import { FormProps } from "@/types/tool";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function SocialMediaForm({ data, onChange }: FormProps) {
  const t = useTranslations("seo.meta-tags.social");
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      onChange({ ...data, [field]: value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{t("title-facebook")}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right" className="w-[450px] p-0">
                <div className="p-2">
                  <p className="mb-2 text-sm">{t("tooltips.sample-fb")}</p>
                  <Image
                    src="/images/og-tag-demo.png"
                    alt="Open Graph preview example"
                    width={400}
                    height={210}
                    className="rounded-md mx-auto"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t("tooltips.reference")}:{" "}
                    <a
                      href="https://developers.facebook.com/docs/sharing/webmasters/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {t("tooltips.reference-link-fb")}
                    </a>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogTitle">{t("og-title")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tooltips.og-title-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogTitle"
            value={data.ogTitle}
            onChange={handleChange("ogTitle")}
            placeholder={t("og-title-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogDescription">{t("og-description")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tooltips.og-description-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogDescription"
            value={data.ogDescription}
            onChange={handleChange("ogDescription")}
            placeholder={t("og-description-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogType">{t("og-type")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tooltips.og-type-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={data.ogType}
            onValueChange={(value) => handleChange("ogType")(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("og-type-placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">{t("og-type-website")}</SelectItem>
              <SelectItem value="article">{t("og-type-article")}</SelectItem>
              <SelectItem value="product">{t("og-type-product")}</SelectItem>
              <SelectItem value="profile">{t("og-type-profile")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogImage">{t("og-image")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <div className="space-y-2">
                    <p>{t("tooltips.og-image-description")}</p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>{t("tooltips.recommended-image-dimensions")}</li>
                      <li>{t("tooltips.minimum-image-dimensions")}</li>
                      <li>{t("tooltips.max-file-size")}</li>
                      <li>{t("tooltips.supported-formats")}</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogImage"
            value={data.ogImage}
            onChange={handleChange("ogImage")}
            placeholder={t("og-image-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogUrl">{t("og-url")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tooltips.og-url-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogUrl"
            value={data.ogUrl}
            onChange={handleChange("ogUrl")}
            placeholder={t("og-url-placeholder")}
          />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{t("twitter-card")}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right" className="w-[450px] p-0">
                <div className="p-2 space-y-2">
                  <p className="mb-2 text-sm">
                    {t("tooltips.twitter-card-description")}
                  </p>
                  <Image
                    src="/images/og-tag-x-demo.png"
                    alt="Twitter Card preview example"
                    width={400}
                    height={210}
                    className="rounded-md mx-auto"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t("tooltips.reference")}:{" "}
                    <a
                      href="https://developer.x.com/en/docs/x-for-websites/cards/overview/markup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {t("tooltips.reference-link-x")}
                    </a>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="twitterCard">{t("card-type")}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tooltips.card-type-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={data.twitterCard}
            onValueChange={(value) => handleChange("twitterCard")(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("card-type-placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">{t("card-type-summary")}</SelectItem>
              <SelectItem value="summary_large_image">
                {t("card-type-summary-large-image")}
              </SelectItem>
              <SelectItem value="app">{t("card-type-app")}</SelectItem>
              <SelectItem value="player">{t("card-type-player")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterTitle">{t("twitter-title")}</Label>
          <Input
            id="twitterTitle"
            value={data.twitterTitle}
            onChange={handleChange("twitterTitle")}
            placeholder={t("twitter-title-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterImage">{t("twitter-image")}</Label>
          <Input
            id="twitterImage"
            value={data.twitterImage}
            onChange={handleChange("twitterImage")}
            placeholder={t("twitter-image-placeholder")}
          />
        </div>
      </div>
    </div>
  );
}
