"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminHeader({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false}>
          View Site
        </Button>
        <form action={logout} className="hidden sm:block">
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="size-4" /> Logout
          </Button>
        </form>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0 sm:max-w-64">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Menu</SheetTitle>
          </SheetHeader>
          <AdminSidebar className="border-none" />
        </SheetContent>
      </Sheet>
    </header>
  );
}
