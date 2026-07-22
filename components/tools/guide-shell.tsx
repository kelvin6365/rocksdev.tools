import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Shared scaffold for tool guide sections.
 *
 * These were previously built with Radix `Tabs`, which unmounts inactive
 * panels — only the first panel ever reached the server HTML, so two thirds of
 * every guide was invisible to crawlers. Rendering the panels as stacked
 * sections puts all of the content in the document.
 *
 * The heading is a real `<h2>` rather than `CardTitle`, which renders a `<div>`
 * and therefore contributed no document outline.
 */
export function Guide({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 space-y-4">{children}</div>;
}

export function GuidePanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold leading-none tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </section>
  );
}
