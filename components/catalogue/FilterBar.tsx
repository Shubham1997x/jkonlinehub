"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Category = { id: string; name: string; slug: string };

export function FilterBar({
  categories,
  subCategories,
}: {
  categories: Category[];
  subCategories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const category = searchParams.get("category") ?? "";
  const subCategory = searchParams.get("subCategory") ?? "";
  const availability = searchParams.get("availability") ?? "";
  const featured = searchParams.get("featured") === "true";

  const hasAnyFilter = category || subCategory || availability || featured;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category */}
      <Select
        value={category || "all"}
        onValueChange={(v) => setParam("category", v === "all" ? null : v)}
      >
        <SelectTrigger className="h-9 w-auto min-w-[140px] rounded-full text-sm">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.slug}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sub-category — only show when relevant */}
      {subCategories.length > 0 && (
        <Select
          value={subCategory || "all"}
          onValueChange={(v) => setParam("subCategory", v === "all" ? null : v)}
        >
          <SelectTrigger className="h-9 w-auto min-w-[150px] rounded-full text-sm">
            <SelectValue placeholder="All sub-categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sub-categories</SelectItem>
            {subCategories.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Availability */}
      <Select
        value={availability || "all"}
        onValueChange={(v) => setParam("availability", v === "all" ? null : v)}
      >
        <SelectTrigger className="h-9 w-auto min-w-[120px] rounded-full text-sm">
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="in-stock">In Stock</SelectItem>
          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      {/* Featured toggle */}
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
        <Switch
          id="featured-bar-switch"
          checked={featured}
          onCheckedChange={(checked) => setParam("featured", checked ? "true" : null)}
          className="scale-90"
        />
        <Label htmlFor="featured-bar-switch" className="cursor-pointer text-sm">
          Featured
        </Label>
      </div>

      {/* Reset — only show when a filter is active */}
      {hasAnyFilter && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 rounded-full text-muted-foreground"
          onClick={() => router.push(pathname)}
        >
          <RotateCcw className="size-3.5" /> Reset
        </Button>
      )}
    </div>
  );
}
