"use client";

import { useState } from "react";
import Image from "next/image";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageReorder({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  function handleDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...images];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
    setDragIndex(null);
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {images.map((src, i) => (
        <div
          key={src}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(i)}
          className={cn(
            "group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-border",
            dragIndex === i && "opacity-50"
          )}
        >
          <Image src={src} alt="" fill sizes="120px" className="object-cover" />
          <div className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-background/90 text-foreground">
            <GripVertical className="size-3.5" />
          </div>
          <button
            type="button"
            onClick={() => onChange(images.filter((_, idx) => idx !== i))}
            className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
          >
            <X className="size-3.5" />
          </button>
          {i === 0 && (
            <span className="absolute bottom-1 left-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
              Main
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
