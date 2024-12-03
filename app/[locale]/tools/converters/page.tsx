import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/services/config";
import { Link } from "@/i18n/routing";

const convertersTools = config.tools.find(
  (tool) => tool.value === "converters",
);

export default function ConvertersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Converters</h1>
        <p className="text-muted-foreground">{convertersTools?.description}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {convertersTools?.subTools?.map((tool) => (
          <Card key={tool.value} className="transition-all hover:shadow-lg">
            <Link href={tool.href}>
              <CardHeader>
                <CardTitle className="text-xl">{tool.label}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Free & Open Source
                  </span>
                  <span className="text-sm font-medium">Try Now →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
