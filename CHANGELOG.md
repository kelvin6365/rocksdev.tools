# Changelog

All notable changes to this project are documented here.

The site's [changelog page](https://www.rocksdev.tools/en/changelog) is rendered
from GitHub Releases, so each entry below should have a matching release whose
body uses the same `## Added` / `## Changed` / `## Fixed` / `## Removed`
headings — that is the format `parseReleaseBody` in `services/github.ts` parses.

## [1.0.9] - 2026-07-22

### Added
- PWA Manifest Generator — build a manifest and the full icon set from one image
- Hash Generator — MD5, SHA-1, SHA-256, SHA-384 and SHA-512 for text or files
- ID Number Validator — Hong Kong HKID and Taiwan National ID checksums
- Business Number Validator — Taiwan unified business numbers, including the 2023 rule change
- robots.txt Validator — lint the file and test whether a URL is blocked for a given crawler
- Test suites for the hash, robots.txt and ID checksum logic

### Changed
- Traditional Chinese pages now use Hong Kong wording instead of mainland wording
- Traditional Chinese titles for the JSON Parser, JSON Minifier, Regex Tester and Text Formatter are now in Chinese
- Local tooling caches are no longer picked up by commits

### Fixed
- Traditional Chinese pages said 在線 where Hong Kong says 線上, across 162 strings

## [v1.0.8] - Unreleased

An SEO release. A Google Search Console export covering 2026-04-20 to
2026-07-19 showed impressions rising 45% while clicks fell roughly 90%, with
average position stuck near 50. The causes were mechanical rather than
editorial, and this release addresses them.

### Fixed

- Every page declared a canonical URL pointing at the homepage, on the non-www
  host, so the whole site told Google its pages were duplicates. Canonicals are
  now per-page and self-referencing.
- `hreflang` tags pointed all three locales at their homepages on every page.
  They are now per-page and include `x-default`.
- `og:url` concatenated a dotted config key onto the hostname, producing URLs
  such as `https://www.rocksdev.toolsjson.parser`.
- Unknown URLs returned HTTP 200 with 404 content. They now return a real 404.
- Two of the three guide panels on every tool page were never rendered into the
  HTML, because Radix `Tabs` unmounts inactive panels. All guide content is now
  in the document.
- Tool pages had no content headings; the guide panel titles used `CardTitle`,
  which renders a `<div>`. They are now `<h2>`.
- `/tools/converters/md2html` had no SEO entry and shipped the homepage's title
  and description verbatim in all three locales.
- Structured data was injected with `next/script`, so it never appeared in the
  server HTML. It is now a plain `<script>`.
- Removed a fabricated `aggregateRating` (4.8 from 1,250 ratings) that appeared
  sitewide with no underlying reviews, and a `softwareHelp` link to a
  non-existent `/help` page.
- A Simplified Chinese tool title had leaked into the Traditional Chinese
  navigation.
- The pre-commit hook used `git add .`, which swept untracked directories into
  every commit.

### Added

- `sitemap.xml` and `robots.txt`, both generated from the tool config — 84 URLs
  with locale alternates. Neither existed before.
- Per-tool `WebApplication` and `BreadcrumbList` structured data.
- A related-tools section on every tool page. Previously every link on a tool
  page was navigation chrome, with nothing contextual connecting the tools.
- A guide section for the App Icon Generator, which had none.
- Substantially expanded guides for the four pages that already rank:
  OG Image Generator (social image size reference and troubleshooting),
  JSON Parser (unstringifying escaped JSON and common escaping problems),
  JSON to Java Bean (type mapping table and nested class rules), and
  App Icon Generator (iOS and Android size tables and common mistakes).
  All in English, Simplified Chinese and Traditional Chinese.

### Changed

- Pages are now statically rendered and CDN-cacheable. Every page previously
  served `cache-control: no-store`; the build now prerenders 92 pages across
  all three locales.
- Rewrote page titles and descriptions to fit search result limits. Titles were
  29–80 characters and are now 36–50; descriptions were 37–307 and are now
  134–150.
- Retargeted the JSON Parser page at unstringifying escaped JSON, where the
  site ranks around position 7, rather than the "json parser" head term, where
  it sits near position 50 behind entrenched competitors.

## [v1.0.7] - 2026-01-30

### Added

- Advanced Image Optimization [New Tool]

## [v1.0.6] - 2025-12-17

### Added

- JWT Decoder/Encoder [New Tool]
- URL Encoder/Decoder [New Tool]

## [v1.0.5] - 2025-01-16

### Fixed

- JSON stringify & parse (Bug & Enhancement)

## [v1.0.4] - 2025-01-16

### Added

- JSON stringify & parse [New Tool]

## [v1.0.3] - 2025-01-16

### Fixed

- JSON to Java bean (Bug & Enhancement)

## [v1.0.2] - 2025-01-11

### Added

- JSON to Java Bean Converter [New Tool]

## [v1.0.1] - 2025-01-04

### Added

- Apply Guide Section for all tools

## [v1.0.0] - 2025-01-04

### Added

- Term Page
- Change log Page

### Changed

- Main page and footer UI/UX style
- Disable Dock when mobile view
