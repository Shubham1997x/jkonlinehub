"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { uploadMedia, deleteMedia, type MediaItem } from "@/lib/actions/media";

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));
    await uploadMedia(formData);
    setUploading(false);
    toast.success("Media uploaded");
    router.refresh();
  }

  function handleDelete(path: string) {
    if (!confirm("Delete this file?")) return;
    startTransition(async () => {
      await deleteMedia(path);
      toast.success("File deleted");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
          <UploadCloud className="size-4" /> {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No media yet" description="Upload images to use across products and categories." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.path} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
              <Image src={item.path} alt={item.filename} fill sizes="200px" className="object-cover" />
              <button
                type="button"
                disabled={pending}
                onClick={() => handleDelete(item.path)}
                className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
