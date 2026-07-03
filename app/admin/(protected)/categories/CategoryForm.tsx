"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type FormAction = (
  prevState: { error?: string; success?: boolean },
  formData: FormData
) => Promise<{ error?: string; success?: boolean }>;

export function CategoryForm({
  category,
  action,
}: {
  category?: Category;
  action: FormAction;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  const [preview, setPreview] = useState<string | null>(category?.image ?? null);

  useEffect(() => {
    if (state.success) {
      toast.success(category ? "Category updated" : "Category created");
      router.push("/admin/categories");
    }
  }, [state.success, category, router]);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={category?.name} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug (optional)</Label>
        <Input id="slug" name="slug" defaultValue={category?.slug} placeholder="auto-generated from name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} defaultValue={category?.description ?? ""} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="image">Image</Label>
        {preview && (
          <div className="relative mb-2 size-24 overflow-hidden rounded-xl border border-border">
            <Image src={preview} alt="" fill sizes="96px" className="object-cover" />
          </div>
        )}
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
