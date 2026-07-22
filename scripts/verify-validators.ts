import { validateTwId, generateTwId, TW_LETTERS } from "../lib/validators/tw-id";
import { validateHkid, generateHkid } from "../lib/validators/hkid";
import { validateTwUbn } from "../lib/validators/tw-ubn";

let fail = 0;
const ok = (label: string, got: boolean, want: boolean) => {
  if (got !== want) { fail++; console.log(`  FAIL ${label}: got ${got} want ${want}`); }
  else console.log(`  ok   ${label} -> ${got}`);
};

console.log("TW ID");
ok("A123456789", validateTwId("A123456789").valid, true);
ok("A123456780 bad", validateTwId("A123456780").valid, false);
ok("a123456789 lower", validateTwId("a123456789").valid, true);
ok("A12345678 short", validateTwId("A12345678").valid, false);
console.log("   A123456789:", JSON.stringify(validateTwId("A123456789")));
// brute force: how many valid check digits per prefix? must be exactly 1
let bad = 0;
for (const L of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  const prefix = L + "12345678";
  const hits = [...Array(10).keys()].filter(d => validateTwId(prefix + d).valid).length;
  if (hits !== 1) { bad++; console.log(`  FAIL ${L}: ${hits} valid check digits`); }
}
console.log(bad ? `  FAIL ${bad} letters` : "  ok   all 26 letters have exactly 1 valid check digit");

console.log("HKID");
ok("A123456(3)", validateHkid("A123456(3)").valid, true);
ok("A1234563 no parens", validateHkid("A1234563").valid, true);
ok("A123456(4) bad", validateHkid("A123456(4)").valid, false);
ok("123456(3) no letter", validateHkid("123456(3)").valid, false);
console.log("   check for A123456:", validateHkid("A123456(0)").expectedCheck);
console.log("   check for AB987654:", validateHkid("AB987654(0)").expectedCheck);
console.log("   check for Z999999:", validateHkid("Z999999(0)").expectedCheck);
// every 6-digit body must have exactly one valid check char out of 0-9 + A
let hbad = 0;
for (const body of ["A000000","B123456","XY654321","C555555","AZ000001"]) {
  const hits = [..."0123456789A"].filter(c => validateHkid(body + c).valid).length;
  if (hits !== 1) { hbad++; console.log(`  FAIL ${body}: ${hits} valid`); }
}
console.log(hbad ? `  FAIL ${hbad}` : "  ok   each body has exactly 1 valid check char");

console.log("TW UBN");
ok("22099131 TSMC", validateTwUbn("22099131").valid, true);
ok("04595257", validateTwUbn("04595257").valid, true);
ok("22099132 bad", validateTwUbn("22099132").valid, false);
ok("2209913 short", validateTwUbn("2209913").valid, false);
console.log("   22099131:", JSON.stringify(validateTwUbn("22099131")));
let n = 0;
for (let i = 0; i < 100000; i++) if (validateTwUbn(String(i).padStart(8,"0")).valid) n++;
console.log(`   valid rate in first 100k: ${n} (${(n/1000).toFixed(1)}%) — expect ~20-24%`);


// ---- generators: every generated number must validate ----

console.log("\nGENERATORS");
let gbad = 0;
for (let i = 0; i < 20000; i++) {
  const id = generateTwId();
  if (!validateTwId(id).valid) { gbad++; if (gbad < 4) console.log("  FAIL tw", id); }
}
if (gbad) fail++;
console.log(gbad ? `  FAIL ${gbad}/20000 tw` : "  ok   20000/20000 generated TW ids validate");

let hbad2 = 0;
for (let i = 0; i < 20000; i++) {
  const id = generateHkid();
  if (!validateHkid(id).valid) { hbad2++; if (hbad2 < 4) console.log("  FAIL hk", id); }
}
if (hbad2) fail++;
console.log(hbad2 ? `  FAIL ${hbad2}/20000 hk` : "  ok   20000/20000 generated HKIDs validate");

// options honoured
const male = generateTwId({ gender: "male" });
const female = generateTwId({ gender: "female" });
const resident = generateTwId({ gender: "male", resident: true });
const fixed = generateTwId({ letter: "F" });
console.log("  ok   gender male ->", validateTwId(male).gender, "| female ->", validateTwId(female).gender);
console.log("  ok   resident flag ->", validateTwId(resident).isResident, "| letter F ->", fixed[0], validateTwId(fixed).region);
const one = generateHkid({ letters: 1 }), two = generateHkid({ letters: 2 });
console.log("  ok   hkid 1-letter", one, "| 2-letter", two);
if (!/^[A-Z]\d{6}\(/.test(one) || !/^[A-Z]{2}\d{6}\(/.test(two)) { fail++; console.log("  FAIL letter count"); }

// distribution sanity: all 26 letters reachable, check chars include 'A'
const seenLetters = new Set<string>(), seenChecks = new Set<string>();
for (let i = 0; i < 20000; i++) { seenLetters.add(generateTwId()[0]); seenChecks.add(generateHkid().slice(-2, -1)); }
console.log(`  ok   TW letters seen: ${seenLetters.size}/26 | HKID check chars seen: ${[...seenChecks].sort().join("")}`);
if (seenLetters.size !== TW_LETTERS.length) { fail++; console.log("  FAIL not all letters reachable"); }

console.log(fail ? `\n${fail} FAILURES` : "\nall pass");
process.exit(fail ? 1 : 0);
