import { createHash } from "node:crypto";
import { md5 } from "../lib/hash/md5";
import { hashText, compareChecksum, guessAlgorithm, HASH_ALGORITHMS } from "../lib/hash";

let fail = 0;
const eq = (label: string, got: string, want: string) => {
  if (got !== want) { fail++; console.log(`  FAIL ${label}\n    got  ${got}\n    want ${want}`); }
  else console.log(`  ok   ${label}`);
};

// RFC 1321 test suite
console.log("MD5 — RFC 1321 vectors");
const RFC: [string,string][] = [
  ["", "d41d8cd98f00b204e9800998ecf8427e"],
  ["a", "0cc175b9c0f1b6a831c399e269772661"],
  ["abc", "900150983cd24fb0d6963f7d28e17f72"],
  ["message digest", "f96b697d7cb7938d525a2f31aaf161d0"],
  ["abcdefghijklmnopqrstuvwxyz", "c3fcd3d76192e4007dfb496cca67e13b"],
  ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", "d174ab98d277d9f5a5611c2c9f419d9f"],
  ["12345678901234567890123456789012345678901234567890123456789012345678901234567890", "57edf4a22be3c955ac49da2e2107b67a"],
];
for (const [inp, want] of RFC) eq(`md5(${JSON.stringify(inp.slice(0,22))})`, md5(new TextEncoder().encode(inp)), want);

// block-boundary fuzz vs node
console.log("MD5 — length sweep 0..200 vs node crypto");
let sweep = 0;
for (let n = 0; n <= 200; n++) {
  const buf = Buffer.from(Array.from({length:n},(_,i)=>(i*37+n)&0xff));
  const mine = md5(new Uint8Array(buf));
  const node = createHash("md5").update(buf).digest("hex");
  if (mine !== node) { sweep++; if (sweep<4) console.log(`  FAIL len=${n}`); }
}
console.log(sweep ? `  FAIL ${sweep}/201 lengths` : "  ok   all 201 lengths match node");

// large input (multi-block + >2^32 guard sanity)
const big = Buffer.alloc(1_000_003, 7);
eq("md5(1,000,003 bytes)", md5(new Uint8Array(big)), createHash("md5").update(big).digest("hex"));

console.log("SHA family vs node");
(async () => {
  for (const a of HASH_ALGORITHMS) {
    if (a === "MD5") continue;
    const nodeName = a.toLowerCase().replace("-", "");
    eq(`${a}("hello world")`, await hashText("hello world", a), createHash(nodeName).update("hello world").digest("hex"));
  }
  console.log("helpers");
  eq("guess 64-hex", String(guessAlgorithm("a".repeat(64))), "SHA-256");
  eq("guess 32-hex", String(guessAlgorithm("a".repeat(32))), "MD5");
  eq("guess junk", String(guessAlgorithm("zz")), "null");
  eq("compare w/ filename suffix", String(compareChecksum("ABC123","abc123  ubuntu.iso")), "true");
  eq("compare mismatch", String(compareChecksum("abc","def")), "false");
  eq("compare empty expected", String(compareChecksum("abc","   ")), "false");
  console.log(fail ? `\n${fail} FAILURES` : "\nall pass");
  process.exit(fail ? 1 : 0);
})();
