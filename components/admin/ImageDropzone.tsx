"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageDropzone({
  name,
  onFilesChange,
}: {
  name: string;
  onFilesChange?: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const previews = files.map((f) => URL.createObjectURL(f));

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    const next = [...files, ...Array.from(newFiles)];
    setFiles(next);
    onFilesChange?.(next);
    syncInput(next);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
    syncInput(next);
  }

  function syncInput(next: File[]) {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/60",
          dragOver && "border-primary bg-secondary/40"
        )}
      >
        <UploadCloud className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag and drop images here, or click to browse
        </p>
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {previews.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
