"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function JsonValidator() {
  const t = useTranslations("json.validator");
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validateJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"), {});
      return;
    }

    setIsLoading(true);
    try {
      JSON.parse(input);
      setIsValid(true);
      setErrorMessage("");
      toast.success(t("valid"), {});
    } catch (error) {
      setIsValid(false);
      setErrorMessage((error as Error).message);
      toast.error(t("error.invalid"), {});
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = () => {
    if (input.trim()) {
      validateJson();
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder={t("input")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        className="min-h-[200px] font-mono"
      />

      <div className="flex justify-end">
        <Button onClick={validateJson} disabled={isLoading}>
          {t("validate")}
        </Button>
      </div>

      {isValid !== null && (
        <div
          className={`p-4 rounded-md ${isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {isValid ? (
            <p>{t("valid")}</p>
          ) : (
            <div>
              <p>{t("invalid")}</p>
              <p className="text-sm mt-2">{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
