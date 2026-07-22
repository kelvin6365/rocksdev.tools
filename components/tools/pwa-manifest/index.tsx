"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Upload,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useTool } from "@/contexts/tool-context";
import {
  DEFAULT_MANIFEST,
  DISPLAY_MODES,
  ICON_SIZES,
  MASKABLE_SAFE_ZONE_RATIO,
  ORIENTATIONS,
  buildManifest,
  headSnippet,
  lintManifest,
  type ManifestInput,
} from "@/lib/pwa/manifest";

/** Draw the source image into a square canvas of the given size. */
function renderIcon(
  image: HTMLImageElement,
  size: number,
  maskable: boolean,
  background: string,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";

  if (maskable) {
    // A maskable icon must fill the canvas edge to edge, with the artwork
    // shrunk into the safe zone so the launcher can crop the margin away.
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, size, size);
    const inner = size * MASKABLE_SAFE_ZONE_RATIO;
    const offset = (size - inner) / 2;
    ctx.drawImage(image, offset, offset, inner, inner);
  } else {
    ctx.drawImage(image, 0, 0, size, size);
  }

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png"),
  );
}

export function PwaManifestGenerator() {
  const t = useTranslations("dev.pwa-manifest");
  const { incrementToolUsage } = useTool();

  const [input, setInput] = React.useState<ManifestInput>(DEFAULT_MANIFEST);
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const [previews, setPreviews] = React.useState<
    { size: number; url: string; maskable?: boolean }[]
  >([]);
  const [building, setBuilding] = React.useState(false);

  const set = <K extends keyof ManifestInput>(
    key: K,
    value: ManifestInput[K],
  ) => setInput((prev) => ({ ...prev, [key]: value }));

  const manifest = React.useMemo(() => buildManifest(input), [input]);
  const issues = React.useMemo(() => lintManifest(input), [input]);
  const manifestJson = React.useMemo(
    () => JSON.stringify(manifest, null, 2),
    [manifest],
  );

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // The decoded image is retained, so the object URL has done its job.
      URL.revokeObjectURL(url);
      setImage(img);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  // Previews are derived state: they must follow the background colour and the
  // maskable toggle, not just the upload, or the preview and the ZIP disagree.
  React.useEffect(() => {
    if (!image) return;
    let cancelled = false;
    setBuilding(true);

    (async () => {
      const next: { size: number; url: string; maskable?: boolean }[] = [];
      for (const size of [192, 512]) {
        const blob = await renderIcon(image, size, false, input.backgroundColor);
        next.push({ size, url: URL.createObjectURL(blob) });
      }
      if (input.includeMaskable) {
        const blob = await renderIcon(image, 512, true, input.backgroundColor);
        next.push({ size: 512, url: URL.createObjectURL(blob), maskable: true });
      }
      if (cancelled) {
        next.forEach((p) => URL.revokeObjectURL(p.url));
        return;
      }
      setPreviews((old) => {
        old.forEach((p) => URL.revokeObjectURL(p.url));
        return next;
      });
      setBuilding(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [image, input.backgroundColor, input.includeMaskable]);

  const downloadZip = async () => {
    if (!image) return;
    setBuilding(true);
    try {
      const zip = new JSZip();
      const folder = input.iconPath.replace(/^\/+|\/+$/g, "") || "icons";

      for (const size of ICON_SIZES) {
        const blob = await renderIcon(image, size, false, input.backgroundColor);
        zip.file(`${folder}/icon-${size}x${size}.png`, blob);
      }
      if (input.includeMaskable) {
        const blob = await renderIcon(image, 512, true, input.backgroundColor);
        zip.file(`${folder}/icon-maskable-512x512.png`, blob);
      }
      zip.file("manifest.webmanifest", manifestJson);

      const archive = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(archive);
      link.download = "pwa-manifest.zip";
      link.click();
      URL.revokeObjectURL(link.href);
      incrementToolUsage("pwa-manifest");
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Fieldset legend={t("form.identity")}>
          <Text
            id="name"
            label={t("form.name")}
            placeholder={t("form.namePlaceholder")}
            value={input.name}
            onChange={(v) => set("name", v)}
          />
          <Text
            id="shortName"
            label={t("form.shortName")}
            placeholder={t("form.shortNamePlaceholder")}
            hint={t("form.shortNameHint")}
            value={input.shortName}
            onChange={(v) => set("shortName", v)}
          />
          <div className="space-y-2">
            <Label htmlFor="description">{t("form.appDescription")}</Label>
            <Textarea
              id="description"
              value={input.description}
              placeholder={t("form.descriptionPlaceholder")}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
        </Fieldset>

        <Fieldset legend={t("form.behaviour")}>
          <Text
            id="startUrl"
            label={t("form.startUrl")}
            value={input.startUrl}
            onChange={(v) => set("startUrl", v)}
            mono
          />
          <Text
            id="scope"
            label={t("form.scope")}
            hint={t("form.scopeHint")}
            value={input.scope}
            onChange={(v) => set("scope", v)}
            mono
          />
          <Choice
            id="display"
            label={t("form.display")}
            value={input.display}
            options={DISPLAY_MODES}
            onChange={(v) => set("display", v as ManifestInput["display"])}
          />
          <Choice
            id="orientation"
            label={t("form.orientation")}
            value={input.orientation}
            options={ORIENTATIONS}
            onChange={(v) =>
              set("orientation", v as ManifestInput["orientation"])
            }
          />
        </Fieldset>

        <Fieldset legend={t("form.appearance")}>
          <Colour
            id="themeColor"
            label={t("form.themeColor")}
            value={input.themeColor}
            onChange={(v) => set("themeColor", v)}
          />
          <Colour
            id="backgroundColor"
            label={t("form.backgroundColor")}
            hint={t("form.backgroundHint")}
            value={input.backgroundColor}
            onChange={(v) => set("backgroundColor", v)}
          />
          <Text
            id="lang"
            label={t("form.lang")}
            value={input.lang}
            onChange={(v) => set("lang", v)}
            mono
          />
          <Choice
            id="dir"
            label={t("form.dir")}
            value={input.dir}
            options={["ltr", "rtl", "auto"] as const}
            onChange={(v) => set("dir", v as ManifestInput["dir"])}
          />
          <Text
            id="categories"
            label={t("form.categories")}
            placeholder={t("form.categoriesPlaceholder")}
            value={input.categories.join(", ")}
            onChange={(v) =>
              set(
                "categories",
                v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        </Fieldset>

        <Fieldset legend={t("form.icons")}>
          <Text
            id="iconPath"
            label={t("form.iconPath")}
            value={input.iconPath}
            onChange={(v) => set("iconPath", v)}
            mono
          />
          <label
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files[0]);
            }}
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{t("form.uploadIcon")}</span>
            <span className="text-xs text-muted-foreground">
              {t("form.uploadHint")}
            </span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          <div className="flex items-center gap-2">
            <Switch
              id="maskable"
              checked={input.includeMaskable}
              onCheckedChange={(v) => set("includeMaskable", v)}
            />
            <div>
              <Label htmlFor="maskable">{t("form.includeMaskable")}</Label>
              <p className="text-xs text-muted-foreground">
                {t("form.maskableHint")}
              </p>
            </div>
          </div>
        </Fieldset>
      </div>

      <div className="space-y-6">
        <Issues issues={issues} />

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("output.manifest")}</h2>
            <CopyButton text={manifestJson} />
          </div>
          <pre className="max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">
            {manifestJson}
          </pre>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("output.head")}</h2>
            <CopyButton text={headSnippet(input)} />
          </div>
          <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
            {headSnippet(input)}
          </pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("output.preview")}</h2>
          {!image ? (
            <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
              {t("output.noIcon")}
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-end gap-4">
                {previews.map((p, i) => (
                  <figure key={i} className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={`${p.size}×${p.size}${p.maskable ? " maskable" : ""}`}
                      className="h-20 w-20 rounded-lg border"
                    />
                    <figcaption className="mt-1 text-xs text-muted-foreground">
                      {p.size}×{p.size}
                      {p.maskable ? " · maskable" : ""}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <Button
                onClick={downloadZip}
                disabled={building}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                {building ? t("output.generating") : t("output.download")}
              </Button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Text({
  id,
  label,
  hint,
  value,
  placeholder,
  onChange,
  mono,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  mono?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={mono ? "font-mono text-sm" : undefined}
        spellCheck={false}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Choice({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Colour({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border bg-transparent"
          aria-label={label}
        />
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm"
          spellCheck={false}
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Issues({
  issues,
}: {
  issues: ReturnType<typeof lintManifest>;
}) {
  const t = useTranslations("dev.pwa-manifest.issues");

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      {issues.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          {t("none")}
        </p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {issue.severity === "error" ? (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              ) : (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              )}
              <span>{t(issue.code)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const t = useTranslations("dev.pwa-manifest.output");
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(t("copied"));
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? (
        <Check className="mr-2 h-4 w-4 text-emerald-600" />
      ) : (
        <Copy className="mr-2 h-4 w-4" />
      )}
      {t("copy")}
    </Button>
  );
}

export default PwaManifestGenerator;
