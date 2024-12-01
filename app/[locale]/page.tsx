"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  ArrowRight,
  Code,
  FileText,
  Layout,
  Search,
  Star,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
const toolCategories = [
  {
    title: "JSON Tools",
    icon: <Code className="w-6 h-6" />,
    tools: [
      {
        name: "JSON Formatter",
        url: "/json/formatter",
        description: "Format and validate JSON with advanced tools",
      },
      {
        name: "JSON Validator",
        url: "/json/validator",
        description: "Validate JSON structure and schema",
      },
    ],
  },
  {
    title: "SEO Tools",
    icon: <Zap className="w-6 h-6" />,
    tools: [
      {
        name: "Meta Tags Generator",
        url: "/seo/meta-tags",
        description: "Generate meta tags for better SEO",
      },
      {
        name: "Robots.txt Generator",
        url: "/seo/robots",
        description: "Create robots.txt file easily",
      },
    ],
  },
  {
    title: "Developer Tools",
    icon: <Layout className="w-6 h-6" />,
    tools: [
      {
        name: "HTML Formatter",
        url: "/dev/html",
        description: "Format and beautify HTML code",
      },
      {
        name: "CSS Minifier",
        url: "/dev/css",
        description: "Minify CSS for better performance",
      },
    ],
  },
];

export default function Home() {
  const t = useTranslations("Test");
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Developer Tools by
              <span className="text-blue-600"> 2 Rocks Studio</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Free online tools for developers. Format, validate, and transform
              your code easily.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search tools..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
          <div className="flex items-center text-blue-600 hover:text-blue-500 cursor-pointer">
            <span className="mr-2">View all tools</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  {category.icon}
                </div>
                <h3 className="ml-4 text-xl font-medium text-gray-900">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {category.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.url}
                      className="block hover:bg-gray-50 -m-3 p-3 rounded-md"
                    >
                      <div className="flex items-start">
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            {tool.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Lightning Fast
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Process your code instantly with our optimized tools
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Free to Use
              </h3>
              <p className="mt-2 text-base text-gray-500">
                All tools are free with no registration required
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Privacy First
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Your code never leaves your browser
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
