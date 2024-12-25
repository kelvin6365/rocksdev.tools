import AdUnit from "./ad-units";
import { Link } from "../i18n/routing";
import { useTranslations } from "next-intl";
export function Footer() {
  const t = useTranslations();
  return (
    <footer className="container py-6 flex flex-col gap-4">
      <div className="mx-auto">
        <AdUnit
          adSlot="2962196569"
          adFormat={null}
          style={{ width: "728px", height: "90px" }}
        />
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex items-center gap-4">
          <li>© 2024 RocksDev.Tools</li>
          <li>|</li>
          <li>
            <Link href="/privacy-policy" className="underline text-blue-500">
              {t("privacy-policy.title")}
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href="/contact-us" className="underline text-blue-500">
              {t("contact-us.title")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
