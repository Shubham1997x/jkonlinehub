"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ViewToggle({
  view,
  onChange,
}: {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border p-1">
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn("rounded-full", view === "grid" && "bg-secondary text-primary")}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <LayoutGrid className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn("rounded-full", view === "list" && "bg-secondary text-primary")}
        onClick={() => onChange("list")}
        aria-label="List view"
      >
        <List className="size-4" />
      </Button>
    </div>
  );
}
