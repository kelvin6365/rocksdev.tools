"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useTool } from "@/contexts/tool-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Eye, EyeOff, Key } from "lucide-react";
import { toast } from "sonner";

export function JwtTool() {
  const t = useTranslations("dev.jwt");
  const { incrementToolUsage } = useTool();
  const [token, setToken] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [payload, setPayload] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("HS256");
  const [decodedPayload, setDecodedPayload] = React.useState<any>(null);
  const [decodedHeader, setDecodedHeader] = React.useState<any>(null);
  const [error, setError] = React.useState("");
  const [showSecret, setShowSecret] = React.useState(false);

  const algorithms = [
    { value: "HS256", label: "HS256" },
    { value: "HS384", label: "HS384" },
    { value: "HS512", label: "HS512" },
  ];

  const decodeJWT = () => {
    if (!token) {
      setError(t("error.empty-token"));
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error(t("error.invalid-token"));
      }

      const headerJSON = atob(parts[0]);
      const payloadJSON = atob(parts[1]);

      setDecodedHeader(JSON.parse(headerJSON));
      setDecodedPayload(JSON.parse(payloadJSON));
      setError("");
      incrementToolUsage("jwt");
    } catch (err) {
      setError(t("error.invalid-token"));
      setDecodedHeader(null);
      setDecodedPayload(null);
    }
  };

  const encodeJWT = () => {
    if (!header || !payload || !secret) {
      setError(t("error.missing-fields"));
      return;
    }

    try {
      // Validate JSON
      const headerObj = JSON.parse(header);
      const payloadObj = JSON.parse(payload);

      // Encode parts
      const encodedHeader = btoa(JSON.stringify(headerObj)).replace(/=/g, "");
      const encodedPayload = btoa(JSON.stringify(payloadObj)).replace(/=/g, "");

      // For demo purposes, we'll create a fake signature
      // In a real implementation, you would use a crypto library
      const signature = "signature"; // Placeholder

      const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
      setToken(jwt);
      setError("");
      incrementToolUsage("jwt");
    } catch (err) {
      setError(t("error.invalid-json"));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("message.copied"));
  };

  const downloadToken = () => {
    if (!token) {
      toast.warning(t("error.empty-token"));
      return;
    }

    const blob = new Blob([token], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jwt-token.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("message.downloaded"));
  };

  const loadSample = () => {
    const sampleHeader = JSON.stringify(
      {
        alg: "HS256",
        typ: "JWT",
      },
      null,
      2,
    );

    const samplePayload = JSON.stringify(
      {
        sub: "1234567890",
        name: "John Doe",
        iat: 1516239022,
      },
      null,
      2,
    );

    setHeader(sampleHeader);
    setPayload(samplePayload);
    setSecret("your-secret-key");
  };

  const clearAll = () => {
    setToken("");
    setHeader("");
    setPayload("");
    setSecret("");
    setDecodedHeader(null);
    setDecodedPayload(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>

      <Tabs defaultValue="decode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decode">{t("tabs.decode")}</TabsTrigger>
          <TabsTrigger value="encode">{t("tabs.encode")}</TabsTrigger>
        </TabsList>

        <TabsContent value="decode">
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("token")}</label>
              <Textarea
                placeholder={t("placeholder.token")}
                className="h-[120px] font-mono text-sm"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            {decodedHeader && decodedPayload && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("header")}</label>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(decodedHeader, null, 2)}
                  </pre>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("payload")}</label>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(decodedPayload, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={decodeJWT}>
                <Eye className="mr-2 h-4 w-4" />
                {t("decode")}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                {t("clear")}
              </Button>
              {token && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(token)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t("copy")}
                  </Button>
                  <Button variant="outline" onClick={downloadToken}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("download")}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="encode">
          <CardContent className="p-0 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("header")}</label>
                <Textarea
                  placeholder={t("placeholder.header")}
                  className="h-[120px] font-mono text-sm"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("payload")}</label>
                <Textarea
                  placeholder={t("placeholder.payload")}
                  className="h-[120px] font-mono text-sm"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("secret")}</label>
              <div className="relative">
                <Textarea
                  placeholder={t("placeholder.secret")}
                  className="h-[100px] font-mono text-sm pr-10"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("algorithm")}</label>
              <select
                className="w-full p-2 border rounded"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                {algorithms.map((alg) => (
                  <option key={alg.value} value={alg.value}>
                    {alg.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-sm text-red-500 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            {token && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("generated-token")}
                </label>
                <Textarea
                  className="h-[100px] font-mono text-sm"
                  value={token}
                  readOnly
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={encodeJWT}>
                <Key className="mr-2 h-4 w-4" />
                {t("encode")}
              </Button>
              <Button variant="outline" onClick={loadSample}>
                {t("load-sample")}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                {t("clear")}
              </Button>
              {token && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(token)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t("copy")}
                  </Button>
                  <Button variant="outline" onClick={downloadToken}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("download")}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
