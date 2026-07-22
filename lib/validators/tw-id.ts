/**
 * Taiwan National ID (中華民國身分證字號) validation.
 *
 * Format: one letter + 9 digits, e.g. A123456789.
 * The letter encodes the county/city of first household registration and maps
 * to a two-digit number. The final digit is a mod-10 checksum.
 */

/** Letter → two-digit code, in the order defined by the Ministry of the Interior. */
const LETTER_CODES: Record<string, number> = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18,
  K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27,
  U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
};

/** Region of first household registration, by leading letter. */
export const LETTER_REGIONS: Record<string, string> = {
  A: "臺北市", B: "臺中市", C: "基隆市", D: "臺南市", E: "高雄市",
  F: "新北市", G: "宜蘭縣", H: "桃園市", I: "嘉義市", J: "新竹縣",
  K: "苗栗縣", L: "臺中縣", M: "南投縣", N: "彰化縣", O: "新竹市",
  P: "雲林縣", Q: "嘉義縣", R: "臺南縣", S: "高雄縣", T: "屏東縣",
  U: "花蓮縣", V: "臺東縣", W: "金門縣", X: "澎湖縣", Y: "陽明山",
  Z: "連江縣",
};

export type TwIdGender = "male" | "female" | "unknown";

export type TwIdResult = {
  valid: boolean;
  /** Failure reason key, for translation. Absent when valid. */
  error?: "format" | "letter" | "checksum";
  region?: string;
  gender?: TwIdGender;
  /** True for the 2021+ unified numbers issued to foreign nationals. */
  isResident?: boolean;
};

/**
 * The second character is the gender digit. 1/2 are citizens; 8/9 are the
 * unified numbers issued to foreign residents since 2021 (新式外來人口統一證號).
 */
function readGender(digit: string): { gender: TwIdGender; isResident: boolean } {
  if (digit === "1" || digit === "8") {
    return { gender: "male", isResident: digit === "8" };
  }
  if (digit === "2" || digit === "9") {
    return { gender: "female", isResident: digit === "9" };
  }
  return { gender: "unknown", isResident: false };
}

export const TW_LETTERS = Object.keys(LETTER_CODES);

export type TwIdOptions = {
  /** Leading letter; a random one is chosen when omitted. */
  letter?: string;
  /** Citizen numbers use 1/2; resident numbers issued from 2021 use 8/9. */
  gender?: "male" | "female" | "any";
  resident?: boolean;
};

/**
 * Produce a checksum-valid Taiwan ID for use as test data.
 *
 * The number is fabricated: it satisfies the arithmetic and nothing else. It
 * is not registered to anyone and will not pass any real identity check.
 */
export function generateTwId(options: TwIdOptions = {}): string {
  const letter =
    options.letter && LETTER_CODES[options.letter.toUpperCase()] !== undefined
      ? options.letter.toUpperCase()
      : TW_LETTERS[Math.floor(Math.random() * TW_LETTERS.length)];

  const wantMale =
    options.gender === "male"
      ? true
      : options.gender === "female"
        ? false
        : Math.random() < 0.5;
  const genderDigit = options.resident
    ? wantMale
      ? "8"
      : "9"
    : wantMale
      ? "1"
      : "2";

  let body = genderDigit;
  for (let i = 0; i < 7; i++) body += Math.floor(Math.random() * 10);

  const code = LETTER_CODES[letter];
  let sum = Math.floor(code / 10) + (code % 10) * 9;
  for (let i = 0; i < 8; i++) sum += Number(body[i]) * (8 - i);

  return `${letter}${body}${(10 - (sum % 10)) % 10}`;
}

export function validateTwId(input: string): TwIdResult {
  const id = input.trim().toUpperCase();

  if (!/^[A-Z][0-9]{9}$/.test(id)) return { valid: false, error: "format" };

  const code = LETTER_CODES[id[0]];
  if (code === undefined) return { valid: false, error: "letter" };

  // n1 carries weight 1, n2 weight 9, then the body digits count down 8..1,
  // and the check digit carries weight 1.
  let sum = Math.floor(code / 10) + (code % 10) * 9;
  for (let i = 1; i <= 8; i++) sum += Number(id[i]) * (9 - i);
  sum += Number(id[9]);

  if (sum % 10 !== 0) return { valid: false, error: "checksum" };

  const { gender, isResident } = readGender(id[1]);
  return {
    valid: true,
    region: LETTER_REGIONS[id[0]],
    gender,
    isResident,
  };
}
