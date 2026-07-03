"use server";

import { revalidatePath } from "next/cache";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";
import { saveUploads, deleteUpload } from "@/lib/uploads";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export type MediaItem = {
  path: string;
  filename: string;
  size: number;
  createdAt: string;
};

export async function listMedia(): Promise<MediaItem[]> {
  await requireAdmin();
  let filenames: string[] = [];
  try {
    filenames = await readdir(UPLOAD_DIR);
  } catch {
    return [];
  }

  const items = await Promise.all(
    filenames
      .filter((f) => f !== ".gitkeep")
      .map(async (filename) => {
        const stats = await stat(path.join(UPLOAD_DIR, filename));
        return {
          path: `/uploads/${filename}`,
          filename,
          size: stats.size,
          createdAt: stats.birthtime.toISOString(),
        };
      })
  );

  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function uploadMedia(formData: FormData) {
  await requireAdmin();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);
  await saveUploads(files);
  revalidatePath("/admin/media");
}

export async function deleteMedia(publicPath: string) {
  await requireAdmin();
  await deleteUpload(publicPath);
  revalidatePath("/admin/media");
}
