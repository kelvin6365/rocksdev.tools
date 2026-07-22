/**
 * MD5, implemented per RFC 1321.
 *
 * Web Crypto covers SHA-1 and the SHA-2 family but deliberately omits MD5, and
 * "md5 checksum" is still what most file-verification pages publish — so the
 * digest has to be computed here. MD5 is not collision resistant; it is offered
 * for checksum comparison only, never for hashing secrets.
 */

const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

/** K[i] = floor(2^32 × abs(sin(i + 1))) */
const K = new Uint32Array(
  Array.from({ length: 64 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32),
  ),
);

function rotl(x: number, c: number): number {
  return (x << c) | (x >>> (32 - c));
}

export function md5(bytes: Uint8Array): string {
  // The trailing length is 64 bits, split into two 32-bit words. Plain number
  // arithmetic is exact here — a byte length stays well inside 2^53 — and
  // avoids BigInt literals, which need an ES2020 target.
  const bitLen = bytes.length * 8;
  const bitLenLow = bitLen >>> 0; // ToUint32 takes this modulo 2^32
  const bitLenHigh = Math.floor(bitLen / 4294967296) >>> 0;

  // Append 0x80, pad with zeros to 56 mod 64, then the little-endian bit length.
  const padded = new Uint8Array(((bytes.length + 8) >> 6) * 64 + 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;

  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, bitLenLow, true);
  view.setUint32(padded.length - 4, bitLenHigh, true);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  for (let off = 0; off < padded.length; off += 64) {
    const M = new Uint32Array(16);
    for (let i = 0; i < 16; i++) M[i] = view.getUint32(off + i * 4, true);

    let A = a0, B = b0, C = c0, D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;

      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }

      F = (F + A + K[i] + M[g]) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, S[i])) | 0;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  // Output is little-endian, unlike the SHA family.
  const out = new Uint8Array(16);
  const ov = new DataView(out.buffer);
  ov.setUint32(0, a0 >>> 0, true);
  ov.setUint32(4, b0 >>> 0, true);
  ov.setUint32(8, c0 >>> 0, true);
  ov.setUint32(12, d0 >>> 0, true);

  return Array.from(out, (b) => b.toString(16).padStart(2, "0")).join("");
}
