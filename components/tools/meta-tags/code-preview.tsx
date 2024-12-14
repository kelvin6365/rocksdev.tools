import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { MetaTagsData } from "@/types/tool";
interface PreviewProps {
  data: MetaTagsData;
}

export function Preview({ data }: PreviewProps) {
  const { toast } = useToast();

  const generateMetaTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="description" content="${data.description}">
${data.keywords ? `<meta name="keywords" content="${data.keywords}">` : ""}
${data.canonicalUrl ? `<link rel="canonical" href="${data.canonicalUrl}">` : ""}
<meta name="robots" content="${data.robots}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${data.ogType}">
<meta property="og:title" content="${data.ogTitle || data.title}">
<meta property="og:description" content="${data.ogDescription || data.description}">
${data.ogImage ? `<meta property="og:image" content="${data.ogImage}">` : ""}
${data.ogUrl ? `<meta property="og:url" content="${data.ogUrl}">` : ""}

<!-- Twitter -->
<meta name="twitter:card" content="${data.twitterCard}">
<meta name="twitter:title" content="${data.twitterTitle || data.title}">
<meta name="twitter:description" content="${
      data.twitterDescription || data.description
    }">
${
  data.twitterImage
    ? `<meta name="twitter:image" content="${data.twitterImage}">`
    : ""
}
${
  data.twitterSite
    ? `<meta name="twitter:site" content="${data.twitterSite}">`
    : ""
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    toast({
      title: "Copied to clipboard",
      description: "Meta tags have been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <Card className="p-4">
        <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
          {generateMetaTags()}
        </pre>
      </Card>
    </div>
  );
}
