import { md5 } from "./md5";

export const HASH_ALGORITHMS = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
] as const;

export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

/** Algorithms that must not be relied on for integrity or signatures. */
export const BROKEN_ALGORITHMS: HashAlgorithm[] = ["MD5", "SHA-1"];

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

/**
 * Everything runs through `crypto.subtle` except MD5, which the Web Crypto spec
 * intentionally excludes.
 */
export async function hashBytes(
  bytes: Uint8Array,
  algorithm: HashAlgorithm,
): Promise<string> {
  if (algorithm === "MD5") return md5(bytes);

  // `digest` accepts a BufferSource, so the view is passed straight through —
  // slicing the underlying buffer would copy the whole file once per algorithm.
  const digest = await crypto.subtle.digest(algorithm, bytes);
  return toHex(digest);
}

export async function hashText(
  text: string,
  algorithm: HashAlgorithm,
): Promise<string> {
  return hashBytes(new TextEncoder().encode(text), algorithm);
}

export async function hashAll(
  bytes: Uint8Array,
): Promise<Record<HashAlgorithm, string>> {
  const entries = await Promise.all(
    HASH_ALGORITHMS.map(
      async (a) => [a, await hashBytes(bytes, a)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<HashAlgorithm, string>;
}

/**
 * Checksum comparison. Case- and whitespace-insensitive, because published
 * checksums arrive in both cases and often with a trailing filename
 * (`<hash>  <filename>`, the sha256sum output format).
 */
export function compareChecksum(actual: string, expected: string): boolean {
  const normalise = (s: string) => s.trim().toLowerCase().split(/\s+/)[0] ?? "";
  const e = normalise(expected);
  return e.length > 0 && normalise(actual) === e;
}

/** Which algorithm produces a digest of this hex length, if any. */
export function guessAlgorithm(hex: string): HashAlgorithm | null {
  const len = hex.trim().split(/\s+/)[0]?.length ?? 0;
  const byLength: Record<number, HashAlgorithm> = {
    32: "MD5",
    40: "SHA-1",
    64: "SHA-256",
    96: "SHA-384",
    128: "SHA-512",
  };
  return byLength[len] ?? null;
}

export { md5 };
