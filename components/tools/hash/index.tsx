"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, AlertTriangle, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTool } from "@/contexts/tool-context";
import {
  HASH_ALGORITHMS,
  BROKEN_ALGORITHMS,
  hashAll,
  compareChecksum,
  guessAlgorithm,
  type HashAlgorithm,
} from "@/lib/hash";

type Digests = Record<HashAlgorithm, string> | null;

export function HashGenerator() {
  const t = useTranslations("dev.hash");
  const { incrementToolUsage } = useTool();

  const [mode, setMode] = React.useState<"text" | "file">("text");
  const [text, setText] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [bytes, setBytes] = React.useState<Uint8Array | null>(null);
  const [digests, setDigests] = React.useState<Digests>(null);
  const [busy, setBusy] = React.useState(false);
  const [uppercase, setUppercase] = React.useState(false);
  const [expected, setExpected] = React.useState("");

  const source = React.useMemo<Uint8Array | null>(() => {
    if (mode === "file") return bytes;
    return text ? new TextEncoder().encode(text) : null;
  }, [mode, text, bytes]);

  // `incrementToolUsage` is rebuilt on every provider render, so it must not be
  // an effect dependency — this effect calls it, which re-renders the provider,
  // which would retrigger the effect and hash in a loop. The ref also keeps the
  // usage counter to one increment per visit rather than one per keystroke.
  const counted = React.useRef(false);
  const countUsage = React.useRef(incrementToolUsage);
  countUsage.current = incrementToolUsage;

  React.useEffect(() => {
    let cancelled = false;
    if (!source) {
      setDigests(null);
      return;
    }
    setBusy(true);
    hashAll(source).then((result) => {
      if (cancelled) return;
      setDigests(result);
      setBusy(false);
      if (!counted.current) {
        counted.current = true;
        countUsage.current("hash");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [source]);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setBytes(new Uint8Array(await file.arrayBuffer()));
  };

  const detected = expected.trim() ? guessAlgorithm(expected) : null;

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "text" | "file")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">{t("tabs.text")}</TabsTrigger>
          <TabsTrigger value="file">{t("tabs.file")}</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <div className="space-y-2">
            <Label htmlFor="hash-text">{t("form.input")}</Label>
            <Textarea
              id="hash-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("form.placeholder")}
              className="min-h-32 font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="file" className="mt-4">
          <label
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center transition-colors hover:bg-accent"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              void onFile(e.dataTransfer.files[0]);
            }}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {fileName || t("form.dropHint")}
            </span>
            <input
              type="file"
              className="sr-only"
              onChange={(e) => void onFile(e.target.files?.[0])}
            />
          </label>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="hash-uppercase"
            checked={uppercase}
            onCheckedChange={setUppercase}
          />
          <Label htmlFor="hash-uppercase">{t("form.uppercase")}</Label>
        </div>
        <div className="flex min-w-64 flex-1 items-center gap-2">
          <Label htmlFor="hash-expected" className="whitespace-nowrap">
            {t("form.compare")}
          </Label>
          <Input
            id="hash-expected"
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
            placeholder={t("form.comparePlaceholder")}
            className="font-mono text-xs"
            spellCheck={false}
          />
        </div>
      </div>

      {detected && (
        <p className="text-sm text-muted-foreground">
          {t("result.detected", { algorithm: detected })}
        </p>
      )}

      <div className="space-y-2">
        {!source && (
          <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
            {t("result.empty")}
          </p>
        )}
        {busy && (
          <p className="text-sm text-muted-foreground">{t("result.hashing")}</p>
        )}
        {digests &&
          HASH_ALGORITHMS.map((algorithm) => (
            <DigestRow
              key={algorithm}
              algorithm={algorithm}
              digest={
                uppercase
                  ? digests[algorithm].toUpperCase()
                  : digests[algorithm]
              }
              expected={expected}
            />
          ))}
      </div>
    </div>
  );
}

function DigestRow({
  algorithm,
  digest,
  expected,
}: {
  algorithm: HashAlgorithm;
  digest: string;
  expected: string;
}) {
  const t = useTranslations("dev.hash");
  const [copied, setCopied] = React.useState(false);

  // Only judge the row the pasted checksum could plausibly belong to, so four
  // of the five rows do not light up red for no reason.
  const relevant =
    expected.trim().length > 0 && guessAlgorithm(expected) === algorithm;
  const matches = relevant && compareChecksum(digest, expected);

  const copy = async () => {
    await navigator.clipboard.writeText(digest);
    setCopied(true);
    toast.success(t("result.copied"));
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        relevant &&
          (matches
            ? "border-emerald-500/40 bg-emerald-500/5"
            : "border-destructive/40 bg-destructive/5"),
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium">
          {algorithm}
          {BROKEN_ALGORITHMS.includes(algorithm) && (
            <AlertTriangle
              className="h-3.5 w-3.5 text-amber-500"
              aria-label={t("warning.broken", { algorithm })}
            />
          )}
        </span>
        <div className="flex items-center gap-2">
          {relevant && (
            <span
              className={cn(
                "text-xs font-medium",
                matches ? "text-emerald-600" : "text-destructive",
              )}
            >
              {matches ? t("result.match") : t("result.noMatch")}
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={copy} aria-label={t("result.copy")}>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
        {digest}
      </p>
    </div>
  );
}

export default HashGenerator;
