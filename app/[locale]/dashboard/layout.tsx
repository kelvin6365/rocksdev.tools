import { config } from "@/services/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardNav = [
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
  {
    label: "History",
    href: "/dashboard/history",
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container flex min-h-screen gap-8 py-8">
      <aside className="hidden w-64 shrink-0 md:block">
        <nav className="sticky top-24 space-y-2">
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              {dashboardNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
