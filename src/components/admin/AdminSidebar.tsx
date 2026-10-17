"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href?: string;
  badge?: string;
  badgeGold?: boolean;
  ready?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export function AdminSidebar({
  sections,
  userName,
  roleLabel,
}: {
  sections: NavSection[];
  userName: string;
  roleLabel: string;
}) {
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="flex w-[236px] flex-none flex-col bg-komfy-sidebar text-komfy-onDark2">
      <div className="flex flex-col gap-1 border-b border-komfy-sidebarLine px-[22px] py-[18px] pt-[22px]">
        <span className="font-serif text-[17px] font-semibold tracking-[0.28em] text-komfy-surface">
          KOMFY
        </span>
        <span className="text-[10.5px] uppercase tracking-[0.18em] text-komfy-sidebarLabel">
          İdarə paneli
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {sections.map((section) => (
          <div key={section.label} className="flex flex-col">
            <span className="px-3 pb-2 pt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-komfy-sidebarLabel">
              {section.label}
            </span>
            {section.items.map((item) => {
              const active = isActive(item.href);
              const inner = (
                <>
                  <span>{item.label}</span>
                  {item.badge &&
                    (item.badgeGold ? (
                      <span className="rounded-[10px] bg-komfy-gold px-[7px] py-px font-mono text-[10px] font-semibold text-komfy-ink">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="font-mono text-[10.5px] text-komfy-sidebarMuted">
                        {item.badge}
                      </span>
                    ))}
                </>
              );

              if (item.href && item.ready !== false) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between rounded-[4px] px-3 py-2.5 text-[13px] transition-colors ${
                      active
                        ? "bg-white/10 font-medium text-komfy-surface"
                        : "text-komfy-sidebarMuted hover:bg-white/5 hover:text-komfy-onDark"
                    }`}
                  >
                    {inner}
                  </Link>
                );
              }

              return (
                <span
                  key={item.label}
                  title="Tezliklə"
                  className="flex cursor-default items-center justify-between rounded-[4px] px-3 py-2.5 text-[13px] text-komfy-sidebarMuted/70"
                >
                  {inner}
                </span>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-2.5 border-t border-komfy-sidebarLine px-[22px] py-[18px]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-komfy-onDark">{userName}</span>
          <span className="text-[11.5px] text-komfy-sidebarLabel">{roleLabel}</span>
        </div>
        <div className="flex items-center gap-3 text-[11.5px]">
          <Link
            href="/"
            target="_blank"
            className="text-komfy-sidebarMuted hover:text-komfy-onDark"
          >
            Sayta bax ↗
          </Link>
          <form action="/api/admin/auth/logout" method="post">
            <button type="submit" className="text-komfy-sidebarMuted hover:text-komfy-onDark">
              Çıxış
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
