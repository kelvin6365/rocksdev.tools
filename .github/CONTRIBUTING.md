# Contributing to RocksDev Tools

Thank you for your interest in contributing to RocksDev Tools! This guide will help you get started with contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding New Tools](#adding-new-tools)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Translation Guide](#translation-guide)
- [Commit Guidelines](#commit-guidelines)

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/kelvin6365/rocksdev.tools.git
   cd rocksdev.tools
   ```
3. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher
- Git

### Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Run Prettier

## Project Structure

```
.
├── app/
│   └── [locale]/              # Internationalized routes
│       ├── layout.tsx         # Root layout with providers
│       ├── page.tsx          # Homepage
│       └── tools/            # Developer tools
│           └── json/         # JSON tools
│               └── formatter/ # JSON formatter tool
│               └── validator/ # JSON validator tool
│               └── diff/      # JSON diff tool
│               └── minifier/  # JSON minifier tool
│           └── converters/   # Conversion tools
│               └── base64/   # Base64 converter tool
│           └── dev/          # Developer tools
│               └── regex/   # Regex tester tool
├── components/
│   ├── tools/               # Tools components
│   │   ├── json-formatter # JSON formatter component
│   │   ├── json-validator # JSON validator component
│   │   ├── json-diff      # JSON diff component
│   │   ├── json-minifier  # JSON minifier component
│   │   └── base64         # Base64 converter component
│   │   └── regex          # Regex tester component
│   ├── layouts/
│   │   └── tool-layout   # Common tool layout
│   └── ui/                   # UI Components
│       ├── shadcn            # shadcn components
│
├── lang/                     # i18n translations
│   ├── en/
│   │   ├── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
│   ├── zh-CN/
│   │   └── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
│   ├── zh-HK/
│   │   └── common.json
│   │   └── json.json
│   │   └── converters.json
│   │   └── dev.json
├── providers/
│   └── toast-provider.tsx    # Toast notifications provider
│
├── types/
│   └── next-auth.d.ts       # NextAuth type definitions
│
├── middleware.ts             # Next.js middleware
├── tsconfig.json            # TypeScript configuration
└── .env.example             # Environment variables template
```

## Adding New Tools

1. Update the tool configuration in `services/config.tsx`:

   ```typescript
   export const config = {
     tools: [
       {
         label: "Your New Tool",
         value: "tool-value",
         href: "/tools/your-tool",
         description: "Tool description",
         category: "category", // json, seo, text, or dev
         subTools: [
           {
             label: "Subtool 1",
             value: "subtool-1",
             href: "/tools/your-tool/subtool-1",
             description: "Subtool description",
           },
         ],
       },
       // ... existing tools
     ],
   };
   ```

2. Create the tool component in `components/tools/`:

   ```typescript
   // components/tools/your-tool/YourTool.tsx
   export function YourTool() {
     // Implementation
   }
   ```

3. Create the tool page in `app/[locale]/tools/`:

   ```typescript
   // app/[locale]/tools/your-tool/page.tsx
   import { YourTool } from '@/components/tools/your-tool/YourTool'
   import { getMetadata } from '@/services/seo'
   export const metadata = getMetadata({ path: "your-tool", locale });

   export default function YourToolPage() {
     return (
       <ToolLayout translationKey="your-tool">
         <YourTool />
       </ToolLayout>
     )
   }
   ```

4. Add translations for your tool in all supported languages.

5. Add SEO metadata for your tool. `services/seo.tsx`

## Pull Request Guidelines

1. Create a new branch for your feature/fix
2. Follow the commit message guidelines
3. Update documentation as needed
4. Add tests if applicable
5. Ensure all tests pass and linting is clean
6. Submit PR against the `main` branch

### PR Checklist

- [ ] Code follows project style guide
- [ ] Documentation is updated
- [ ] Tests added/updated if applicable
- [ ] All checks pass (build, lint, types)
- [ ] Translations added for all languages
- [ ] SEO metadata is added

## Translation Guide

Supported languages:

- English (en)
- Chinese Simplified (zh-CN)
- Chinese Traditional (zh-HK)

To add translations:

1. Add your strings to all language files
2. Follow the existing structure
3. Use the same keys across all languages

## Commit Guidelines

Format: `type(scope): description`

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Testing
- `chore`: Maintenance

Example:

```
feat(json-tool): add copy to clipboard functionality
```

### Commit Message Rules

1. Use imperative mood ("add" not "added")
2. Don't end with a period
3. Keep first line under 72 characters
4. Reference issues in footer

Example commit:

```
feat(tools): add json formatter tool

- Implement basic formatting functionality
- Add copy to clipboard
- Add error handling

Fixes #123
```

## Need Help?

Feel free to reach out if you have any questions! You can:

1. Open an issue
2. Join our discussions
3. Contact the maintainers

Thank you for contributing to RocksDev Tools! 🚀

---

Maintained by Kelvin Kwong
