"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, ShieldAlert, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTool } from "@/contexts/tool-context";
import { validateHkid, generateHkid, type HkidResult } from "@/lib/validators/hkid";
import { validateTwId, generateTwId, type TwIdResult } from "@/lib/validators/tw-id";

type Region = "hk" | "tw";

export function IdValidator() {
  const t = useTranslations("dev.id-validator");

  return (
    <Tabs defaultValue="validate" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="validate">{t("mode.validate")}</TabsTrigger>
        <TabsTrigger value="generate">{t("mode.generate")}</TabsTrigger>
      </TabsList>

      <TabsContent value="validate">
        <ValidatePanel />
      </TabsContent>
      <TabsContent value="generate">
        <GeneratePanel />
      </TabsContent>
    </Tabs>
  );
}

function RegionTabs({
  region,
  onChange,
}: {
  region: Region;
  onChange: (r: Region) => void;
}) {
  const t = useTranslations("dev.id-validator");
  return (
    <Tabs value={region} onValueChange={(v) => onChange(v as Region)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hk">{t("tabs.hk")}</TabsTrigger>
        <TabsTrigger value="tw">{t("tabs.tw")}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ValidatePanel() {
  const t = useTranslations("dev.id-validator");
  const { incrementToolUsage } = useTool();
  const [region, setRegion] = React.useState<Region>("hk");
  const [value, setValue] = React.useState("");

  // Validation is cheap and synchronous, so it runs as the user types rather
  // than behind a button — the feedback is the point of the tool.
  const result = React.useMemo(() => {
    if (!value.trim()) return null;
    return region === "hk" ? validateHkid(value) : validateTwId(value);
  }, [region, value]);

  // `incrementToolUsage` is rebuilt on every provider render, so it is held in
  // a ref rather than passed as an effect dependency.
  const counted = React.useRef(false);
  const countUsage = React.useRef(incrementToolUsage);
  countUsage.current = incrementToolUsage;

  React.useEffect(() => {
    if (result?.valid && !counted.current) {
      counted.current = true;
      countUsage.current("id-validator");
    }
  }, [result]);

  return (
    <div className="space-y-4">
      <RegionTabs
        region={region}
        onChange={(r) => {
          setRegion(r);
          setValue("");
        }}
      />

      <div className="space-y-2">
        <Label htmlFor="id-input">{t("form.input")}</Label>
        <Input
          id="id-input"
          value={value}
          placeholder={t(region === "hk" ? "form.hkPlaceholder" : "form.twPlaceholder")}
          onChange={(e) => setValue(e.target.value)}
          className="font-mono text-lg"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {result && <Result region={region} result={result} />}

      <Disclaimer text={t("disclaimer")} />
    </div>
  );
}

function GeneratePanel() {
  const t = useTranslations("dev.id-validator");
  const tr = useTranslations("dev.id-validator.result");
  const { incrementToolUsage } = useTool();

  const [region, setRegion] = React.useState<Region>("hk");
  const [count, setCount] = React.useState(10);
  const [gender, setGender] = React.useState<"any" | "male" | "female">("any");
  const [resident, setResident] = React.useState(false);
  const [letters, setLetters] = React.useState<"any" | "1" | "2">("any");
  const [results, setResults] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    const n = Math.min(Math.max(count || 1, 1), 100);
    const out = Array.from({ length: n }, () =>
      region === "hk"
        ? generateHkid({
            letters: letters === "any" ? undefined : (Number(letters) as 1 | 2),
          })
        : generateTwId({ gender, resident }),
    );
    setResults(out);
    incrementToolUsage("id-validator");
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setCopied(true);
    toast.success(t("generate.copied"));
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <RegionTabs
        region={region}
        onChange={(r) => {
          setRegion(r);
          setResults([]);
        }}
      />

      <div className="flex flex-wrap items-end gap-4">
        <div className="w-28 space-y-2">
          <Label htmlFor="gen-count">{t("generate.count")}</Label>
          <Input
            id="gen-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        {region === "tw" ? (
          <>
            <div className="w-36 space-y-2">
              <Label htmlFor="gen-gender">{t("generate.gender")}</Label>
              <Select
                value={gender}
                onValueChange={(v) => setGender(v as typeof gender)}
              >
                <SelectTrigger id="gen-gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("generate.any")}</SelectItem>
                  <SelectItem value="male">{tr("male")}</SelectItem>
                  <SelectItem value="female">{tr("female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <Switch
                id="gen-resident"
                checked={resident}
                onCheckedChange={setResident}
              />
              <div>
                <Label htmlFor="gen-resident">{t("generate.resident")}</Label>
                <p className="text-xs text-muted-foreground">
                  {t("generate.residentHint")}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="w-40 space-y-2">
            <Label htmlFor="gen-letters">{t("generate.letters")}</Label>
            <Select
              value={letters}
              onValueChange={(v) => setLetters(v as typeof letters)}
            >
              <SelectTrigger id="gen-letters">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("generate.lettersAny")}</SelectItem>
                <SelectItem value="1">{t("generate.letters1")}</SelectItem>
                <SelectItem value="2">{t("generate.letters2")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button onClick={generate}>{t("generate.button")}</Button>
      </div>

      {results.length === 0 ? (
        <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
          {t("generate.empty")}
        </p>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={copyAll}>
              {copied ? (
                <Check className="mr-2 h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {t("generate.copyAll")}
            </Button>
          </div>
          <ul className="grid gap-1 rounded-md border p-3 font-mono text-sm sm:grid-cols-2 lg:grid-cols-3">
            {results.map((id, i) => (
              <li key={i}>{id}</li>
            ))}
          </ul>
        </div>
      )}

      <Disclaimer text={t("generate.disclaimer")} />
    </div>
  );
}

function Disclaimer({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
      {text}
    </p>
  );
}

function Result({
  region,
  result,
}: {
  region: Region;
  result: HkidResult | TwIdResult;
}) {
  const t = useTranslations("dev.id-validator.result");
  const hk = region === "hk" ? (result as HkidResult) : null;
  const tw = region === "tw" ? (result as TwIdResult) : null;

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        result.valid
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-destructive/40 bg-destructive/5",
      )}
      role="status"
      aria-live="polite"
    >
      <p className="flex items-center gap-2 font-medium">
        {result.valid ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <XCircle className="h-5 w-5 text-destructive" />
        )}
        {result.valid ? t("valid") : t("invalid")}
      </p>

      {!result.valid && result.error && (
        <p className="mt-2 text-sm text-muted-foreground">
          {t(`errors.${result.error}`)}
        </p>
      )}

      {hk && !hk.valid && hk.expectedCheck && (
        <p className="mt-1 font-mono text-sm text-muted-foreground">
          {t("expectedCheck", { check: hk.expectedCheck })}
        </p>
      )}

      {hk?.valid && hk.formatted && (
        <Detail label={t("formatted")} value={hk.formatted} mono />
      )}

      {tw?.valid && (
        <div className="mt-3 space-y-1">
          {tw.region && <Detail label={t("region")} value={tw.region} />}
          {tw.gender && <Detail label={t("gender")} value={t(tw.gender)} />}
          {tw.isResident && (
            <p className="text-sm text-muted-foreground">{t("resident")}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <p className="mt-2 text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <span className={mono ? "font-mono" : undefined}>{value}</span>
    </p>
  );
}

export default IdValidator;
