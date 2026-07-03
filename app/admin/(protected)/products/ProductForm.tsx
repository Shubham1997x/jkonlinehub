"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageDropzone } from "@/components/admin/ImageDropzone";
import { ImageReorder } from "@/components/admin/ImageReorder";
import type { SerializedProduct } from "@/lib/types";

type Category = { id: string; name: string };

type FormAction = (
  prevState: { error?: string; success?: boolean },
  formData: FormData
) => Promise<{ error?: string; success?: boolean }>;

export function ProductForm({
  categories,
  product,
  action,
}: {
  categories: Category[];
  product?: SerializedProduct;
  action: FormAction;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  const [existingImages, setExistingImages] = useState<string[]>(product?.images ?? []);
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);

  useEffect(() => {
    if (state.success) {
      toast.success(product ? "Product updated" : "Product created");
      router.push("/admin/products");
    }
  }, [state.success, product, router]);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="featured" value={featured ? "true" : "false"} />
      <input type="hidden" name="existingImages" value={JSON.stringify(existingImages)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" defaultValue={product?.name} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sku">SKU (leave blank to auto-generate)</Label>
          <Input id="sku" name="sku" defaultValue={product?.sku} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select value={categoryId || "none"} onValueChange={(v) => setCategoryId(v === "none" ? "" : v ?? "")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Uncategorized</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subCategory">Sub-category</Label>
          <Input id="subCategory" name="subCategory" defaultValue={product?.subCategory ?? ""} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input id="shortDescription" name="shortDescription" defaultValue={product?.shortDescription ?? ""} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={product?.description ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" defaultValue={product?.stock ?? 0} required />
        </div>
        <div className="flex items-center justify-between pt-6">
          <Label htmlFor="featured-switch">Featured</Label>
          <Switch id="featured-switch" checked={featured} onCheckedChange={setFeatured} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="material">Material</Label>
          <Input id="material" name="material" defaultValue={product?.material ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dimensions">Dimensions</Label>
          <Input id="dimensions" name="dimensions" defaultValue={product?.dimensions ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" name="weight" type="number" step="0.01" defaultValue={product?.weight ?? ""} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" name="tags" defaultValue={product?.tags.join(", ") ?? ""} />
      </div>

      <div className="space-y-3">
        <Label>Images</Label>
        {existingImages.length > 0 && (
          <ImageReorder images={existingImages} onChange={setExistingImages} />
        )}
        <ImageDropzone name="images" />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
