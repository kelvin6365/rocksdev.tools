/**
 * Hong Kong Identity Card (香港身份證) number validation.
 *
 * Format: one or two leading letters, six digits, and a check character in
 * parentheses — e.g. A123456(3) or AB987654(A). The check character is a
 * mod-11 checksum and may be a digit or the letter A (representing 10).
 */

/** Letters are valued A=10 … Z=35; a missing first letter counts as 36. */
function letterValue(ch: string): number {
  return ch.charCodeAt(0) - 55; // 'A' (65) → 10
}

const NO_LETTER = 36;

export type HkidResult = {
  valid: boolean;
  error?: "format" | "checksum";
  /** Input rewritten in the canonical AB123456(C) form. */
  formatted?: string;
  /** The check character the input should have carried. */
  expectedCheck?: string;
};

export function validateHkid(input: string): HkidResult {
  // Accept the number with or without parentheses and surrounding whitespace.
  const id = input.trim().toUpperCase().replace(/[\s()]/g, "");

  if (!/^[A-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)) {
    return { valid: false, error: "format" };
  }

  const body = id.slice(0, -1);
  const check = id.slice(-1);
  const letters = body.match(/^[A-Z]{1,2}/)![0];
  const digits = body.slice(letters.length);

  // Weights run 9 down to 2 across the eight body characters. A single-letter
  // number is left-padded with the sentinel 36 so both forms share one path.
  const values =
    letters.length === 1
      ? [NO_LETTER, letterValue(letters)]
      : [letterValue(letters[0]), letterValue(letters[1])];

  let sum = values[0] * 9 + values[1] * 8;
  for (let i = 0; i < 6; i++) sum += Number(digits[i]) * (7 - i);

  const remainder = (11 - (sum % 11)) % 11;
  const expected = remainder === 10 ? "A" : String(remainder);

  if (check !== expected) {
    return { valid: false, error: "checksum", expectedCheck: expected };
  }

  return { valid: true, formatted: `${letters}${digits}(${check})` };
}
