"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTool } from "@/contexts/tool-context";
import { validateHkid, type HkidResult } from "@/lib/validators/hkid";
import { validateTwId, type TwIdResult } from "@/lib/validators/tw-id";

type Region = "hk" | "tw";

export function IdValidator() {
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

  const seen = React.useRef(false);
  React.useEffect(() => {
    if (result?.valid && !seen.current) {
      seen.current = true;
      incrementToolUsage("id-validator");
    }
  }, [result, incrementToolUsage]);

  return (
    <div className="space-y-4">
      <Tabs
        value={region}
        onValueChange={(v) => {
          setRegion(v as Region);
          setValue("");
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hk">{t("tabs.hk")}</TabsTrigger>
          <TabsTrigger value="tw">{t("tabs.tw")}</TabsTrigger>
        </TabsList>

        <TabsContent value="hk" className="mt-4 space-y-4">
          <Field
            label={t("form.input")}
            placeholder={t("form.hkPlaceholder")}
            value={value}
            onChange={setValue}
          />
        </TabsContent>

        <TabsContent value="tw" className="mt-4 space-y-4">
          <Field
            label={t("form.input")}
            placeholder={t("form.twPlaceholder")}
            value={value}
            onChange={setValue}
          />
        </TabsContent>
      </Tabs>

      {result && <Result region={region} result={result} />}

      <p className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        {t("disclaimer")}
      </p>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="id-input">{label}</Label>
      <Input
        id="id-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-lg"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
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
