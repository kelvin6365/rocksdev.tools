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

export function BasicSeoForm({ data, onChange }: FormProps) {
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...data, [field]: e.target.value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title Tag</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  The title tag is crucial for SEO. It appears in search results
                  and browser tabs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground ml-2 text-sm">
            (Recommended: 50-60 characters)
          </span>
        </div>
        <Input
          id="title"
          value={data.title}
          onChange={handleChange("title")}
          placeholder="Enter your page title"
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
          <Label htmlFor="description">Meta Description</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  A brief summary of your page content. This appears in search
                  results below the title.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground ml-2 text-sm">
            (Recommended: 150-160 characters)
          </span>
        </div>
        <Textarea
          id="description"
          value={data.description}
          onChange={handleChange("description")}
          placeholder="Enter your meta description"
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

      {/* Add other basic SEO fields */}
    </div>
  );
}
