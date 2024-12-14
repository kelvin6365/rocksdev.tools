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

export function SocialMediaForm({ data, onChange }: FormProps) {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      onChange({ ...data, [field]: value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Open Graph (Facebook)</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right" className="w-[450px] p-0">
                <div className="p-2">
                  <p className="mb-2 text-sm">
                    A sample result of how your content appears when shared on
                    Facebook:
                  </p>
                  <Image
                    src="/images/og-tag-demo.png"
                    alt="Open Graph preview example"
                    width={400}
                    height={210}
                    className="rounded-md mx-auto"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Reference:{" "}
                    <a
                      href="https://developers.facebook.com/docs/sharing/webmasters/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Facebook Sharing Guide
                    </a>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogTitle">OG Title</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    The title of your article without any branding such as your
                    site name. Keep it brief and engaging.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogTitle"
            value={data.ogTitle}
            onChange={handleChange("ogTitle")}
            placeholder="Enter Open Graph title"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogDescription">OG Description</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    A brief description of the content, usually between 2 and 4
                    sentences. This will be displayed below the title.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogDescription"
            value={data.ogDescription}
            onChange={handleChange("ogDescription")}
            placeholder="Enter Open Graph description"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogType">OG Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    The type of your content. This impacts how your content
                    shows up in Facebook Feed. Default is &quot;website&quot;.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={data.ogType}
            onValueChange={(value) => handleChange("ogType")(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="profile">Profile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <div className="space-y-2">
                    <p>The URL for your page&apos;s preview image.</p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Recommended size: 1200×630 pixels</li>
                      <li>Minimum size: 600×315 pixels</li>
                      <li>Aspect ratio: 1.91:1</li>
                      <li>Max file size: 8MB</li>
                      <li>Supported formats: JPG, PNG, GIF</li>
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
            placeholder="Enter image URL (https://...)"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ogUrl">OG URL</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    The canonical URL for your page. This should be the
                    undecorated URL without session variables or parameters.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="ogUrl"
            value={data.ogUrl}
            onChange={handleChange("ogUrl")}
            placeholder="Enter canonical URL"
          />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Twitter Card</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right" className="w-[450px] p-0">
                <div className="p-2 space-y-2">
                  <p className="mb-2 text-sm">
                    A sample result of how your content appears when shared on X
                    (Twitter):
                  </p>
                  <Image
                    src="/images/og-tag-x-demo.png"
                    alt="Twitter Card preview example"
                    width={400}
                    height={210}
                    className="rounded-md mx-auto"
                  />
                  <p className="text-sm text-muted-foreground">
                    Reference:{" "}
                    <a
                      href="https://developer.x.com/en/docs/x-for-websites/cards/overview/markup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Cards Markup Tag Reference
                    </a>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="twitterCard">Card Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Determines how your content appears when shared on Twitter.
                    Summary cards include a small image, while Summary Large
                    Image cards feature a prominent image.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={data.twitterCard}
            onValueChange={(value) => handleChange("twitterCard")(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="summary_large_image">
                Summary Large Image
              </SelectItem>
              <SelectItem value="app">App</SelectItem>
              <SelectItem value="player">Player</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterTitle">Twitter Title</Label>
          <Input
            id="twitterTitle"
            value={data.twitterTitle}
            onChange={handleChange("twitterTitle")}
            placeholder="Enter Twitter title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterImage">Twitter Image URL</Label>
          <Input
            id="twitterImage"
            value={data.twitterImage}
            onChange={handleChange("twitterImage")}
            placeholder="Enter image URL"
          />
        </div>
      </div>
    </div>
  );
}
