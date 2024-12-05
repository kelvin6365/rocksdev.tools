import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../lang/${locale}/common.json`)).default,
      ...(await import(`../lang/${locale}/json.json`)).default,
      ...(await import(`../lang/${locale}/converters.json`)).default,
      ...(await import(`../lang/${locale}/dev.json`)).default,
      ...(await import(`../lang/${locale}/seo.json`)).default,
      ...(await import(`../lang/${locale}/text.json`)).default,
    },
  };
});
