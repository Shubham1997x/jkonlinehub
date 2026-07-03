"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex w-64 shrink-0 flex-col border-r border-border bg-card", className)}>
      <div className="border-b border-border p-4">
        <Logo companyName="JK Admin" />
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted",
                active && "bg-secondary text-primary"
              )}
            >
              <link.icon className="size-4.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logout} className="border-t border-border p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted"
        >
          <LogOut className="size-4.5" />
          Logout
        </button>
      </form>
    </aside>
  );
}
