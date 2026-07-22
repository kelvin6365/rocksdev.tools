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

export type HkidOptions = {
  /** Number of leading letters. Both forms are in circulation. */
  letters?: 1 | 2;
};

/** The check character that makes a given body valid. */
function checkCharFor(letters: string, digits: string): string {
  const values =
    letters.length === 1
      ? [NO_LETTER, letterValue(letters)]
      : [letterValue(letters[0]), letterValue(letters[1])];

  let sum = values[0] * 9 + values[1] * 8;
  for (let i = 0; i < 6; i++) sum += Number(digits[i]) * (7 - i);

  const remainder = (11 - (sum % 11)) % 11;
  return remainder === 10 ? "A" : String(remainder);
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Produce a checksum-valid HKID for use as test data.
 *
 * The number is fabricated: it satisfies the arithmetic and nothing else. It
 * is not issued to anyone and will not pass any real identity check.
 */
export function generateHkid(options: HkidOptions = {}): string {
  const count = options.letters ?? (Math.random() < 0.8 ? 1 : 2);
  let letters = "";
  for (let i = 0; i < count; i++) {
    letters += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }

  let digits = "";
  for (let i = 0; i < 6; i++) digits += Math.floor(Math.random() * 10);

  return `${letters}${digits}(${checkCharFor(letters, digits)})`;
}

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

  const expected = checkCharFor(letters, digits);

  if (check !== expected) {
    return { valid: false, error: "checksum", expectedCheck: expected };
  }

  return { valid: true, formatted: `${letters}${digits}(${check})` };
}
