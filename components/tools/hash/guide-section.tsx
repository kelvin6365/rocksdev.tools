"use client";

import { Guide, GuidePanel } from "@/components/tools/guide-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

const ALGORITHMS = [
  {
    algorithm: "MD5",
    length: "128 bits / 32 hex",
    status: "Broken since 2004",
    use: "Checking a download against a published checksum",
  },
  {
    algorithm: "SHA-1",
    length: "160 bits / 40 hex",
    status: "Broken since 2017",
    use: "Legacy Git object IDs only",
  },
  {
    algorithm: "SHA-256",
    length: "256 bits / 64 hex",
    status: "Secure",
    use: "The default choice for integrity and signatures",
  },
  {
    algorithm: "SHA-384",
    length: "384 bits / 96 hex",
    status: "Secure",
    use: "TLS certificates, subresource integrity",
  },
  {
    algorithm: "SHA-512",
    length: "512 bits / 128 hex",
    status: "Secure",
    use: "Faster than SHA-256 on 64-bit hardware",
  },
];

const STEPS = ["download", "hash", "compare", "confirm"] as const;

export function GuideSection() {
  const t = useTranslations("dev.hash.guide");

  return (
    <Guide>
      <GuidePanel title={t("overview.title")}>
        <p className="text-sm text-muted-foreground">
          {t("overview.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("algorithms.title")}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("algorithms.algorithm")}</TableHead>
                <TableHead>{t("algorithms.length")}</TableHead>
                <TableHead>{t("algorithms.status")}</TableHead>
                <TableHead>{t("algorithms.use")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALGORITHMS.map((row) => (
                <TableRow key={row.algorithm}>
                  <TableCell className="font-mono">{row.algorithm}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.length}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.use}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GuidePanel>

      <GuidePanel title={t("verify.title")}>
        <p className="text-sm text-muted-foreground">
          {t("verify.description")}
        </p>
        <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
          {STEPS.map((key) => (
            <li key={key}>{t(`verify.steps.${key}`)}</li>
          ))}
        </ol>
      </GuidePanel>

      <GuidePanel title={t("passwords.title")}>
        <p className="text-sm text-muted-foreground">
          {t("passwords.description")}
        </p>
      </GuidePanel>

      <GuidePanel title={t("privacy.title")}>
        <p className="text-sm text-muted-foreground">
          {t("privacy.description")}
        </p>
      </GuidePanel>
    </Guide>
  );
}

export default GuideSection;
