# Rocks Dev

A comprehensive collection of developer tools built with modern web technologies. This project aims to provide free, fast, and reliable tools for developers.

<a href="https://www.buymeacoffee.com/tszhim_tech" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

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
app/
├── (marketing)
│   ├── page.tsx                # Homepage with tool directory
│   ├── about/                  # About 2 Rocks Studio
│   ├── blog/                   # Technical blog/tutorials
│   └── pricing/                # Premium features/API pricing
│
├── (tools)
│   ├── json/                   # JSON Tools Group
│   │   ├── formatter/         # JSON Formatter
│   │   ├── validator/         # JSON Validator
│   │   ├── diff/             # JSON Diff
│   │   └── minifier/         # JSON Minifier
│   │
│   ├── seo/                    # SEO Tools Group
│   │   ├── meta-tags/        # Meta Tags Generator
│   │   ├── robots-txt/       # Robots.txt Generator
│   │   └── sitemap/          # Sitemap Generator
│   │
│   ├── converters/            # Conversion Tools
│   │   ├── base64/          # Base64 Encoder/Decoder
│   │   ├── markdown/        # Markdown to HTML
│   │   └── csv-json/        # CSV to JSON
│   │
│   ├── text/                  # Text Tools
│   │   ├── formatter/       # Text Formatter
│   │   ├── case/           # Case Converter
│   │   └── counter/        # Word Counter
│   │
│   └── dev/                   # Developer Tools
│       ├── regex/           # Regex Tester
│       ├── css/            # CSS Formatter/Minifier
│       └── html/           # HTML Formatter/Validator
│
├── api/                        # API Routes
│   ├── auth/                  # Authentication
│   └── v1/                    # API Endpoints
│
├── dashboard/                  # User Dashboard
│   ├── settings/              # User Settings
│   ├── history/              # Usage History
│   └── favorites/            # Favorite Tools
│
└── (auth)
    ├── login/
    ├── register/
    └── forgot-password/
```

## Development Phases

### Phase 1: Foundation Setup (2-3 weeks)

#### Technical Setup

- [x] Project initialization with Next.js 15
- [x] Core layout implementation
- [ ] Ad space integration
- [ ] Analytics setup
- [ ] Error tracking
- [ ] Performance monitoring

#### Core Features (MVP)

- [ ] Responsive layout
- [ ] Ad integration spaces
- [ ] Analytics setup
- [ ] Basic SEO structure
- [ ] Error tracking
- [ ] Performance monitoring

### Phase 2: Initial Tools (1-2 weeks per tool)

#### JSON Tools

- [ ] JSON Formatter
  - [ ] Format/Validate functionality
  - [ ] Copy/Download options
  - [ ] Share functionality
- [ ] JSON Validator
- [ ] JSON Diff
- [ ] JSON Minifier

#### Conversion Tools

- [ ] Base64 Encoder/Decoder
  - [ ] Text encoding/decoding
  - [ ] File encoding/decoding
  - [ ] Batch processing
- [ ] Markdown to HTML
- [ ] CSV to JSON

#### Developer Tools

- [ ] Regular Expression Tester
  - [ ] Live testing
  - [ ] Common patterns library
  - [ ] Match highlighting
- [ ] CSS Formatter/Minifier
- [ ] HTML Formatter/Validator

### Phase 3: Traffic Generation Tools (2-3 weeks)

#### SEO Tools Cluster

- [ ] Meta Tags Generator
- [ ] Robots.txt Generator
- [ ] XML Sitemap Generator
- [ ] SEO Analyzer

#### Text Processing Tools

- [ ] Text Formatter
- [ ] Case Converter
- [ ] Word Counter
- [ ] Markdown Editor

### Phase 4: Monetization & Growth (Ongoing)

#### Monetization

- [ ] Strategic ad placement
- [ ] Premium features (API access)
- [ ] Removal of ads subscription
- [ ] Bulk processing options

#### Marketing

- [ ] Technical blog posts
- [ ] Twitter/social presence
- [ ] DEV.to articles
- [ ] GitHub readme tools

#### User Experience

- [ ] Tool suggestions
- [ ] Recently used tools
- [ ] Save preferences
- [ ] Share configurations

## Installed Libraries

### Core Dependencies

- `next`: ^15.0.1
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `typescript`: ^5.x
- `next-auth`: ^4.24.7
- `next-intl`: ^3.23.5

### UI & Styling

- `@radix-ui/*`: UI primitives
- `tailwindcss`: ^3.4.14
- `class-variance-authority`: ^0.7.0
- `clsx`: ^2.1.1
- `tailwind-merge`: ^2.3.0
- `lucide-react`: ^0.372.0

### Form & Validation

- `zod`: ^3.23.3
- `react-hook-form`: ^7.51.3
- `@hookform/resolvers`: ^3.3.4

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
# Add other environment variables
```

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. Submit a merge request

## License

[MIT](https://choosealicense.com/licenses/mit/)
