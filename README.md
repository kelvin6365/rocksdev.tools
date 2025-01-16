# RocksDev Tools

[![RocksDev Banner](https://www.rocksdev.tools/api/og?title=RocksDev%20Tools)](https://rocksdev.tools)

A comprehensive collection of developer tools built with modern web technologies. This project aims to provide free, fast, and reliable tools for developers.

[![RocksDev Tools](./public/images/screencapture-rocksdev-tools.png)](https://rocksdev.tools)

<a href="https://www.buymeacoffee.com/tszhim_tech" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

<a href="https://www.producthunt.com/posts/rocksdev-tools?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rocksdev&#0045;tools" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=682248&theme=light" alt="RocksDev&#0032;Tools - A&#0032;comprehensive&#0032;collection&#0032;of&#0032;developer&#0032;tools | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## Project Blueprint

This project is built with modern web technologies and best practices:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Form Validation**: Zod
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **State Management**: React Hook Form
- **HTTP Client**: Axios
- **Analytics**: Vercel Analytics
- **Ads Integration**: Google AdSense
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky
- **CI/CD**: GitLab CI
- **Containerization**: Docker

## Project Structure

```
.
├── app/
│   └── [locale]/              # Internationalized routes
│       ├── privacy-policy/    # Privacy policy page
│       ├── contact-us/        # Contact us page
│       ├── layout.tsx         # Root layout with providers
│       ├── page.tsx          # Homepage
│       └── tools/            # Developer tools
│           └── json/         # JSON tools
│               ├── formatter/ # JSON formatter tool
│               ├── validator/ # JSON validator tool
│               ├── diff/      # JSON diff tool
│               └── minifier/  # JSON minifier tool
│           └── converters/   # Conversion tools
│               └── base64/   # Base64 converter tool
│               └── json-to-java-bean/ # JSON to Java Bean converter tool
│               └── md2html/ # Markdown to HTML converter tool
│           └── dev/          # Developer tools
│               ├── regex/   # Regex tester tool
│               ├── app-icon-generator/ # App icon generator tool
│               └── ai-sql-generator/ # AI SQL generator tool
│           └── seo/          # SEO tools
│               ├── og-image/ # OG image generator tool
│               └── meta-tags/ # Meta tags generator tool
│           └── text/         # Text tools
│               └── text-formatter/ # Text formatter tool
│
├── components/
│   ├── tools/
│   │   ├── json-formatter # JSON formatter component
│   │   ├── json-validator # JSON validator component
│   │   ├── json-diff      # JSON diff component
│   │   ├── json-minifier  # JSON minifier component
│   │   ├── base64         # Base64 converter component
│   │   ├── regex          # Regex tester component
│   │   ├── og-image       # OG image generator component
│   │   ├── meta-tags      # Meta tags generator component
│   │   ├── text-formatter # Text formatter component
│   │   ├── app-icon-generator # App icon generator component
│   │   ├── ai-sql-generator # AI SQL generator component
│   │   ├── json-to-java-bean # JSON to Java Bean converter component
│   │   └── md2html # Markdown to HTML converter component
│   ├── layouts/
│   │   └── tool-layout   # Common tool layout
│   └── ui/                   # UI Components
│       ├── shadcn         # shadcn components
│
├── lang/                     # i18n translations
│   ├── en/
│   │   ├── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
│   │   └── seo.json
│   │   └── changelog.json
│   │   └── terms.json
│   ├── zh-CN/
│   │   └── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
│   │   └── seo.json
│   │   └── changelog.json
│   │   └── terms.json
│   ├── zh-HK/
│   │   └── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
│   │   └── seo.json
│   │   └── changelog.json
│   │   └── terms.json
├── providers/
│   └── toast-provider.tsx    # Toast notifications provider
│   └── search-provider.tsx    # Search provider
│
├── types/
│   └── next-auth.d.ts       # NextAuth type definitions
│   └── tool.d.ts           # Tool type definitions
│
├── middleware.ts             # Next.js middleware
├── tsconfig.json            # TypeScript configuration
└── .env.example             # Environment variables template
```

## Development Phases

### Phase 1: Foundation Setup (2-3 weeks)

#### Technical Setup

- [x] Project initialization with Next.js 15
- [x] Core layout implementation
- [x] Ad space integration
- [x] Analytics setup
- [x] Error tracking
- [x] Performance monitoring

#### Core Features (MVP)

- [x] Responsive layout
- [x] Ad integration spaces
- [x] Analytics setup
- [ ] Basic SEO structure
- [x] Error tracking
- [x] Performance monitoring

### Phase 2: Initial Tools (1-2 weeks per tool)

#### JSON Tools

- [x] JSON Formatter
  - [x] Format/Validate functionality
  - [x] Copy/Download options
- [x] JSON Validator
  - [x] Format/Validate functionality
  - [x] Copy/Download options
- [x] JSON Diff
  - [x] Compare functionality
  - [x] Export result as JSON/CSV
  - [x] <u>Fix the table display issue</u>
- [x] JSON Minifier
  - [x] Minify functionality
  - [x] Copy/Download options
- **JSON Parser & Stringify**: Convert between JSON strings and JavaScript objects with support for:
  - Parse JSON strings into formatted objects
  - Stringify JavaScript objects with custom indentation
  - Unicode character escaping
  - Validation and error handling

#### Conversion Tools

- [x] Base64 Encoder/Decoder
  - [x] Text encoding/decoding
  - [x] File encoding/decoding
  - [x] URL-safe encoding
- [x] Markdown to HTML
- [x] JSON to Java Bean
- [ ] CSV to JSON
- [ ] QR Code Generator

#### Developer Tools

- [x] Regular Expression Tester
  - [x] Live testing
  - [x] Common patterns library
  - [x] Match highlighting
- [ ] CSS Formatter/Minifier
- [ ] HTML Formatter/Validator
- [ ] Tailwind Config Generator
- [x] App Icon Generator
- [x] AI SQL Generator

### Phase 3: Traffic Generation Tools (2-3 weeks)

#### SEO Tools Cluster

- [x] Meta Tags Generator
- [ ] Robots.txt Generator
- [ ] XML Sitemap Generator
- [ ] SEO Analyzer
- [x] OG Image Generator (Open Graph Image)
  - [x] Support batch generation
  - [x] Support crop / resize
- [ ] Social Media Image Size Generator

#### Text Processing Tools

- [x] Text Formatter
- [ ] Case Converter
- [ ] Word Counter
- [ ] Markdown Editor
- [ ] Random Data Generator

### Phase 4: Monetization & Growth (Ongoing)

#### Monetization

- [ ] Strategic ad placement

#### Marketing

- [ ] Technical blog posts
- [ ] Twitter/social presence
- [ ] DEV.to articles
- [ ] GitHub readme tools

#### User Experience

- [ ] Tool suggestions
- [x] Recently used tools
- [x] Save preferences (dock)
  - [x] Dock drop out remove tool bug (Not able to remove tool from dock)
- [ ] Share configurations
- [x] Mobile menu
- [x] Search tool

## Installed Libraries

### Core Dependencies

- `next`: ^15.0.3
- `react`: 19.0.0-rc.1
- `react-dom`: 19.0.0-rc.1
- `typescript`: ^5.x
- `next-auth`: ^4.24.7
- `next-intl`: ^3.23.5

### UI & Styling

- `@radix-ui/*`: UI primitives
- `tailwindcss`: ^3.4.14
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^2.3.0
- `lucide-react`: ^0.372.0

### Form & Validation

- `zod`: ^3.23.8
- `react-hook-form`: ^7.53.2
- `@hookform/resolvers`: ^3.9.1

### Development Tools

- `prettier`: ^3.2.5
- `eslint`: ^8.x
- `husky`: ^9.0.11
- `typescript`: ^5.x

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Docker Build

```bash
# Build Docker image
docker build -t dev-tools-hub .

# Run Docker container
docker run -p 3000:3000 dev-tools-hub
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_ADSENSE_ID=your_adsense_id
NEXT_PUBLIC_BASE_URL=your_base_url
OPENROUTER_API_KEY=your_openrouter_api_key
# Add other environment variables
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=kelvin6365/rocksdev.tools&type=Date)](https://star-history.com/#kelvin6365/rocksdev.tools&Date)

## License

[MIT](https://choosealicense.com/licenses/mit/)
