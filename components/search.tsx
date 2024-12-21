import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ArrowRight, Clock } from "lucide-react";
import { useSearch } from "../providers/search-provider";

export function SearchButton() {
  const { setOpen } = useSearch();
  const t = useTranslations("nav");

  return (
    <Button
      variant="outline"
      className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      onClick={() => setOpen(true)}
    >
      <span className="hidden lg:inline-flex">{t("searchTools")}</span>
      <span className="inline-flex lg:hidden">{t("search")}</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}

export function SearchCommandDialog() {
  const {
    open,
    setOpen,
    query,
    setQuery,
    results,
    recentTools,
    handleToolSelect,
  } = useSearch();
  const t = useTranslations("nav");

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={t("typeToSearch")}
        value={query}
        onValueChange={(value) => setQuery(value)}
      />
      <CommandList>
        <CommandEmpty>{t("noResults")}</CommandEmpty>
        {!query && recentTools.length > 0 && (
          <CommandGroup
            heading={
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {t("recentlyUsed")}
              </div>
            }
          >
            {recentTools.map((tool) => (
              <CommandItem
                key={tool.id}
                value={tool.id}
                onSelect={() => handleToolSelect(tool)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {tool.icon && <span className="mr-2">{tool.icon}</span>}
                  <div>
                    <div className="font-medium">
                      {t(`tools.${tool.id}.title`)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t(`tools.${tool.id}.description`)}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {query && results.length > 0 && (
          <CommandGroup heading={t("searchResults")}>
            {results.map((result) => (
              <CommandItem
                key={result.item.id}
                value={result.item.id}
                onSelect={() => handleToolSelect(result.item)}
                className="cursor-pointer"
              >
                {result.item.icon && (
                  <span className="mr-2">{result.item.icon}</span>
                )}
                <div>
                  <div className="font-medium">
                    {t(`tools.${result.item.id}.title`)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(`tools.${result.item.id}.description`)}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
