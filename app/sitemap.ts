import { MetadataRoute } from "next";
import { config } from "@/services/config";
import { BASE_URL, LOCALES, localeUrl } from "@/services/seo";

type RouteEntry = {
  route: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/**
 * Every indexable route, derived from `config.tools` so new tools are picked
 * up automatically once registered there.
 */
function getRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { route: "/", priority: 1.0, changeFrequency: "weekly" },
    { route: "/tools", priority: 0.9, changeFrequency: "weekly" },
  ];

  for (const tool of config.tools) {
    routes.push({
      route: tool.href,
      priority: 0.7,
      changeFrequency: "monthly",
    });

    for (const subTool of tool.subTools ?? []) {
      routes.push({
        route: subTool.href,
        priority: 0.8,
        changeFrequency: "monthly",
      });
    }
  }

  for (const route of [
    "/changelog",
    "/contact-us",
    "/terms",
    "/privacy-policy",
  ]) {
    routes.push({ route, priority: 0.3, changeFrequency: "yearly" });
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getRoutes().flatMap(({ route, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, route),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((loc) => [loc, localeUrl(loc, route)]),
          ),
          "x-default": `${BASE_URL}${route}`,
        },
      },
    })),
  );
}
