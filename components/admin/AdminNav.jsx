"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/posts", label: "Mission Log" },
  { href: "/admin/dashboard/skills", label: "Toolbox" },
  { href: "/admin/dashboard/activity", label: "Activity" },
  { href: "/admin/dashboard/struggle", label: "Struggle Note" },
  { href: "/admin/dashboard/reading", label: "Reading List" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <nav className="md:w-56 border-b md:border-b-0 md:border-r border-rule px-4 py-6 md:py-8 flex md:flex-col gap-1 overflow-x-auto">
      <div className="px-2 pb-4 hidden md:block">
        <p className="font-display text-cream text-sm">Notebook Admin</p>
      </div>
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap px-3 py-2 rounded text-sm transition-colors ${
              active ? "bg-glow text-ink font-medium" : "text-mute hover:text-cream hover:bg-paper2"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="whitespace-nowrap px-3 py-2 rounded text-sm text-warm hover:bg-paper2 text-left mt-2 md:mt-auto"
      >
        Log out
      </button>
    </nav>
  );
}
