import { getTranslations } from "next-intl/server";
import { BASE_URL, getRoutePath, getToolStructuredData } from "@/services/seo";

type Props = {
  /** Dotted tool key, e.g. "json.formatter". */
  path: string;
  locale: string;
};

function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Builds Home > Tools > Category > Tool from the dotted key. Labels come from
 * the `nav.tools.*` namespace, which is translated for every locale.
 */
async function getBreadcrumbData(path: string, locale: string) {
  const t = await getTranslations({ locale });
  const [category, tool] = path.split(".");

  const trail = [
    { name: t("nav.home"), route: "/" },
    { name: t("nav.tools.title"), route: "/tools" },
    { name: t(`nav.tools.${category}.title`), route: `/tools/${category}` },
  ];

  if (tool) {
    const route = getRoutePath(path);
    if (route) {
      trail.push({ name: t(`nav.tools.${category}.${tool}.title`), route });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}/${locale}${crumb.route === "/" ? "" : crumb.route}`,
    })),
  };
}

/**
 * Emits per-tool WebApplication + BreadcrumbList JSON-LD.
 *
 * Server-only on purpose: services/seo.ts is large and must never reach the
 * client bundle.
 */
export async function ToolStructuredData({ path, locale }: Props) {
  const toolData = getToolStructuredData(path, locale);
  const breadcrumbData = await getBreadcrumbData(path, locale);

  return (
    <>
      {toolData && <JsonLd id={`ld-tool-${path}`} data={toolData} />}
      <JsonLd id={`ld-breadcrumb-${path}`} data={breadcrumbData} />
    </>
  );
}
