import { useTranslations } from "next-intl";

export default function ProductHuntBanner() {
  const t = useTranslations();
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-2 text-white text-center">
      <a
        href="https://www.producthunt.com/posts/rocksdev-tools"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:underline"
      >
        {t("home.productHunt")}
      </a>
    </div>
  );
}
