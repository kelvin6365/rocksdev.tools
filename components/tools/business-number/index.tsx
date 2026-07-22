"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTool } from "@/contexts/tool-context";
import { validateTwUbn } from "@/lib/validators/tw-ubn";

export function BusinessNumberValidator() {
  const t = useTranslations("dev.business-number");
  const { incrementToolUsage } = useTool();
  const [value, setValue] = React.useState("");

  const result = React.useMemo(
    () => (value.trim() ? validateTwUbn(value) : null),
    [value],
  );

  const seen = React.useRef(false);
  React.useEffect(() => {
    if (result?.valid && !seen.current) {
      seen.current = true;
      incrementToolUsage("business-number");
    }
  }, [result, incrementToolUsage]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ubn-input">{t("form.input")}</Label>
        <Input
          id="ubn-input"
          value={value}
          placeholder={t("form.placeholder")}
          onChange={(e) =>
            // Only digits are meaningful, and stripping as you type stops a
            // pasted number with spaces from reading as a format error.
            setValue(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))
          }
          className="font-mono text-lg tracking-widest"
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {result && (
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
            {result.valid ? t("result.valid") : t("result.invalid")}
          </p>

          {!result.valid && result.error && (
            <p className="mt-2 text-sm text-muted-foreground">
              {t(`result.errors.${result.error}`)}
            </p>
          )}

          {result.usedSevenRule && (
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {t("result.sevenRule")}
            </p>
          )}

          {result.legacyOnly && (
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {t("result.legacyOnly")}
            </p>
          )}
        </div>
      )}

      <p className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        {t("disclaimer")}
      </p>
    </div>
  );
}

export default BusinessNumberValidator;
