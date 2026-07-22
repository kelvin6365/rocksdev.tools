/**
 * Web App Manifest construction and linting.
 *
 * Sizes follow what Chrome, Android and iOS actually consume: 192 and 512 are
 * the two Chrome requires for installability, 180 is the iOS home-screen icon,
 * and the rest cover legacy Android densities.
 */

export const ICON_SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512] as const;

/** The two Chrome checks for before it will offer installation. */
export const REQUIRED_SIZES = [192, 512] as const;

/**
 * Maskable icons are re-cropped by the launcher to whatever shape the device
 * uses, so artwork must sit inside a centred circle of 80% diameter — the
 * remainder is padding the OS may cut away.
 */
export const MASKABLE_SAFE_ZONE_RATIO = 0.8;

export const DISPLAY_MODES = [
  "standalone",
  "fullscreen",
  "minimal-ui",
  "browser",
] as const;

export const ORIENTATIONS = [
  "any",
  "natural",
  "portrait",
  "landscape",
  "portrait-primary",
  "landscape-primary",
] as const;

export type ManifestInput = {
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  scope: string;
  display: (typeof DISPLAY_MODES)[number];
  orientation: (typeof ORIENTATIONS)[number];
  themeColor: string;
  backgroundColor: string;
  lang: string;
  dir: "ltr" | "rtl" | "auto";
  categories: string[];
  iconPath: string;
  includeMaskable: boolean;
};

export const DEFAULT_MANIFEST: ManifestInput = {
  name: "",
  shortName: "",
  description: "",
  startUrl: "/",
  scope: "/",
  display: "standalone",
  orientation: "any",
  themeColor: "#000000",
  backgroundColor: "#ffffff",
  lang: "en",
  dir: "ltr",
  categories: [],
  iconPath: "/icons",
  includeMaskable: true,
};

export type ManifestIcon = {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
};

export function buildIcons(
  input: Pick<ManifestInput, "iconPath" | "includeMaskable">,
  sizes: readonly number[] = ICON_SIZES,
): ManifestIcon[] {
  const base = input.iconPath.replace(/\/+$/, "");
  const icons: ManifestIcon[] = sizes.map((size) => ({
    src: `${base}/icon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png",
    purpose: "any",
  }));

  if (input.includeMaskable) {
    icons.push({
      src: `${base}/icon-maskable-512x512.png`,
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    });
  }
  return icons;
}

export function buildManifest(input: ManifestInput): Record<string, unknown> {
  // Keys are emitted in the order the spec presents them, and empty optional
  // fields are dropped rather than serialised as "".
  const manifest: Record<string, unknown> = {
    name: input.name,
    short_name: input.shortName,
  };

  if (input.description) manifest.description = input.description;

  manifest.start_url = input.startUrl;
  manifest.scope = input.scope;
  manifest.display = input.display;
  if (input.orientation !== "any") manifest.orientation = input.orientation;
  manifest.theme_color = input.themeColor;
  manifest.background_color = input.backgroundColor;
  manifest.lang = input.lang;
  if (input.dir !== "ltr") manifest.dir = input.dir;
  if (input.categories.length) manifest.categories = input.categories;
  manifest.icons = buildIcons(input);

  return manifest;
}

export type ManifestIssue = {
  severity: "error" | "warning";
  /** Translation key suffix. */
  code: string;
  field?: string;
};

export function lintManifest(input: ManifestInput): ManifestIssue[] {
  const issues: ManifestIssue[] = [];

  if (!input.name.trim()) {
    issues.push({ severity: "error", code: "nameRequired", field: "name" });
  }
  if (!input.shortName.trim()) {
    issues.push({ severity: "error", code: "shortNameRequired", field: "shortName" });
  } else if (input.shortName.length > 12) {
    // Android truncates the launcher label past roughly 12 characters.
    issues.push({ severity: "warning", code: "shortNameTooLong", field: "shortName" });
  }
  if (!input.startUrl.startsWith("/")) {
    issues.push({ severity: "warning", code: "startUrlRelative", field: "startUrl" });
  }
  if (!input.startUrl.startsWith(input.scope)) {
    issues.push({ severity: "error", code: "startUrlOutsideScope", field: "startUrl" });
  }
  if (input.display === "browser") {
    issues.push({ severity: "warning", code: "displayBrowserNotInstallable", field: "display" });
  }
  for (const [field, value] of [
    ["themeColor", input.themeColor],
    ["backgroundColor", input.backgroundColor],
  ] as const) {
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) {
      issues.push({ severity: "warning", code: "colorInvalid", field });
    }
  }
  if (!input.includeMaskable) {
    issues.push({ severity: "warning", code: "noMaskableIcon", field: "icons" });
  }

  return issues;
}

/** The tag that has to go in <head> for any of this to take effect. */
export function headSnippet(input: ManifestInput): string {
  const base = input.iconPath.replace(/\/+$/, "");
  return [
    `<link rel="manifest" href="/manifest.webmanifest" />`,
    `<meta name="theme-color" content="${input.themeColor}" />`,
    `<link rel="apple-touch-icon" href="${base}/icon-180x180.png" />`,
  ].join("\n");
}
