import { parseRobots, isAllowed } from "../lib/robots/parse";
let fail = 0;
const ok = (l: string, got: any, want: any) => {
  if (got !== want) { fail++; console.log(`  FAIL ${l}: got ${got} want ${want}`); }
  else console.log(`  ok   ${l}`);
};

// Google's documented path-matching examples
console.log("path matching (Google spec examples)");
const mk = (rules: string) => parseRobots(`User-agent: *\n${rules}`);
const A = (doc: any, p: string) => isAllowed(doc, p, "Googlebot").allowed;

let d = mk("Disallow: /fish");
ok("/fish blocks /fish", A(d,"/fish"), false);
ok("/fish blocks /fish.html", A(d,"/fish.html"), false);
ok("/fish blocks /fish/salmon.html", A(d,"/fish/salmon.html"), false);
ok("/fish blocks /fishheads", A(d,"/fishheads"), false);
ok("/fish allows /Fish.asp (case sensitive)", A(d,"/Fish.asp"), true);
ok("/fish allows /catfish", A(d,"/catfish"), true);

d = mk("Disallow: /fish/");
ok("/fish/ blocks /fish/salmon.htm", A(d,"/fish/salmon.htm"), false);
ok("/fish/ allows /fish", A(d,"/fish"), true);
ok("/fish/ allows /fish.html", A(d,"/fish.html"), true);

d = mk("Disallow: /*.php");
ok("/*.php blocks /index.php", A(d,"/index.php"), false);
ok("/*.php blocks /folder/filename.php", A(d,"/folder/filename.php"), false);
ok("/*.php allows /", A(d,"/"), true);
ok("/*.php allows /windows.PHP", A(d,"/windows.PHP"), true);

d = mk("Disallow: /*.php$");
ok("$ blocks /filename.php", A(d,"/filename.php"), false);
ok("$ allows /filename.php?p=1", A(d,"/filename.php?p=1"), true);
ok("$ allows /filename.php5", A(d,"/filename.php5"), true);

console.log("precedence (longest wins, allow breaks ties)");
d = mk("Allow: /p\nDisallow: /");
ok("Allow:/p beats Disallow:/ for /page", A(d,"/page"), false === false ? true : false);
d = mk("Allow: /folder\nDisallow: /folder");
ok("tie -> allow", A(d,"/folder/page"), true);
d = mk("Disallow: /folder/\nAllow: /folder/public");
ok("longer allow wins", A(d,"/folder/public/x"), true);
ok("shorter disallow applies", A(d,"/folder/private"), false);

console.log("agent selection");
d = parseRobots("User-agent: *\nDisallow: /\n\nUser-agent: Googlebot\nAllow: /\nDisallow: /admin");
ok("googlebot uses its own group", isAllowed(d,"/x","Googlebot").allowed, true);
ok("googlebot /admin blocked", isAllowed(d,"/admin","Googlebot").allowed, false);
ok("other agent falls to *", isAllowed(d,"/x","Bingbot").allowed, false);

console.log("grouping + empty disallow");
d = parseRobots("User-agent: a\nUser-agent: b\nDisallow: /x");
ok("consecutive UA share one group", d.groups.length, 1);
ok("both agents recorded", d.groups[0].userAgents.length, 2);
d = mk("Disallow:");
ok("empty disallow allows all", A(d,"/anything"), true);

console.log("linting");
d = parseRobots("Disallow: /x");
ok("rule before user-agent -> error", d.issues.some(i=>i.code==="ruleBeforeUserAgent"), true);
d = parseRobots("User-agent: *\nDisallow /x");
ok("missing colon -> error", d.issues.some(i=>i.code==="missingColon"), true);
d = parseRobots("User-agent: *\nSitemap: /sitemap.xml");
ok("relative sitemap -> error", d.issues.some(i=>i.code==="sitemapNotAbsolute"), true);
d = parseRobots("User-agent: *\nDisallow: /");
ok("blocks entire site -> warning", d.issues.some(i=>i.code==="blocksEntireSite"), true);
d = parseRobots("User-agent: *\nDisalow: /x");
ok("typo -> unknownDirective", d.issues.some(i=>i.code==="unknownDirective"), true);
d = parseRobots("User-agent: *\nDisallow: /a # trailing comment\nSitemap: https://e.com/s.xml");
ok("comment stripped", d.groups[0].rules[0].path, "/a");
ok("sitemap parsed", d.sitemaps.length, 1);
ok("no blocksEntireSite false positive", d.issues.some(i=>i.code==="blocksEntireSite"), false);

console.log(fail ? `\n${fail} FAILURES` : "\nall pass");
process.exit(fail?1:0);
