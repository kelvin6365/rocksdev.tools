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

export function AdvancedOptionsForm({ data, onChange }: FormProps) {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      onChange({ ...data, [field]: value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="canonicalUrl">Canonical URL</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Specifies the preferred version of a page when similar content
                  exists at multiple URLs. Helps prevent duplicate content
                  issues.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="canonicalUrl"
          value={data.canonicalUrl}
          onChange={handleChange("canonicalUrl")}
          placeholder="Enter canonical URL"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="robots">Robots Directives</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Controls how search engines crawl and index your page.
                  &quot;Index, Follow&quot; allows both indexing and following
                  links.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={data.robots}
          onValueChange={(value) => handleChange("robots")(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select robots directives" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="index,follow">Index, Follow</SelectItem>
            <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
            <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
            <SelectItem value="noindex,nofollow">
              No Index, No Follow
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="keywords">Meta Keywords</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  While less important for SEO today, some search engines still
                  use keywords. Separate multiple keywords with commas.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="keywords"
          value={data.keywords}
          onChange={handleChange("keywords")}
          placeholder="Enter keywords (comma-separated)"
        />
      </div>
    </div>
  );
}
