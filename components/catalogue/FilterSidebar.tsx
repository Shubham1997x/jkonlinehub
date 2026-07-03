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

export function FilterSidebar({
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

  return (
    <aside className="h-fit space-y-6 rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(pathname)}
          className="text-muted-foreground"
        >
          <RotateCcw className="size-3.5" /> Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category || "all"} onValueChange={(v) => setParam("category", v === "all" ? null : v)}>
          <SelectTrigger className="w-full">
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
      </div>

      {subCategories.length > 0 && (
        <div className="space-y-2">
          <Label>Sub-category</Label>
          <Select
            value={subCategory || "all"}
            onValueChange={(v) => setParam("subCategory", v === "all" ? null : v)}
          >
            <SelectTrigger className="w-full">
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
        </div>
      )}

      <div className="space-y-2">
        <Label>Availability</Label>
        <Select
          value={availability || "all"}
          onValueChange={(v) => setParam("availability", v === "all" ? null : v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="featured-switch">Featured only</Label>
        <Switch
          id="featured-switch"
          checked={featured}
          onCheckedChange={(checked) => setParam("featured", checked ? "true" : null)}
        />
      </div>
    </aside>
  );
}
