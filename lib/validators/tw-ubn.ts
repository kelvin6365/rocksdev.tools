/**
 * Taiwan Unified Business Number (統一編號) validation.
 *
 * Eight digits with a weighted checksum. The Ministry of Finance changed the
 * rule on 2023-04-01: the sum is now taken modulo 5 rather than modulo 10, so
 * every number valid under the old rule remains valid, and a further block of
 * numbers became issuable. Both eras are accepted here; `legacyOnly` flags a
 * number that only passes under the pre-2023 rule.
 */

const WEIGHTS = [1, 2, 1, 2, 1, 2, 4, 1];

export type TwUbnResult = {
  valid: boolean;
  error?: "format" | "checksum";
  /** True when the 7th digit is 7 and the +1 tolerance was what made it pass. */
  usedSevenRule?: boolean;
  /** True when the number passes mod-5 but not the stricter pre-2023 mod-10. */
  legacyOnly?: boolean;
};

/** Sum of the digits of n — 7 × 2 = 14 contributes 5, not 14. */
function digitSum(n: number): number {
  return Math.floor(n / 10) + (n % 10);
}

export function validateTwUbn(input: string): TwUbnResult {
  const ubn = input.trim();

  if (!/^[0-9]{8}$/.test(ubn)) return { valid: false, error: "format" };

  let sum = 0;
  for (let i = 0; i < 8; i++) sum += digitSum(Number(ubn[i]) * WEIGHTS[i]);

  // A 7 in the seventh position may carry either 0 or 1 into the checksum,
  // because 7 × 4 = 28 and the rule allows both interpretations.
  const isSeven = ubn[6] === "7";
  const passes = (s: number) => s % 5 === 0;

  if (passes(sum)) {
    return { valid: true, legacyOnly: sum % 10 !== 0 };
  }
  if (isSeven && passes(sum + 1)) {
    return {
      valid: true,
      usedSevenRule: true,
      legacyOnly: (sum + 1) % 10 !== 0,
    };
  }

  return { valid: false, error: "checksum" };
}
