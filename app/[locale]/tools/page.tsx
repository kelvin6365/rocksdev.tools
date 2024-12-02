import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import Link from "next/link";
import AdUnit from "../../../components/ad-units";

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
        <p className="text-muted-foreground">
          Select a tool category to get started.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.tools.map((tool) => (
          <Card key={tool.value} className="transition-all hover:shadow-lg">
            <Link href={tool.href}>
              <CardHeader>
                <CardTitle className="text-xl">{tool.label}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {tool.subTools?.length || 0} tools
                  </span>
                  <span className="text-sm font-medium">Browse →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
        {/* Tools Box Banner */}
        <AdUnit adSlot="4396194595" adFormat="auto" />
      </div>
    </div>
  );
}
