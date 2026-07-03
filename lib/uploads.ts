import "server-only";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function safeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,5}$/.test(ext) ? ext : "";
}

export async function saveUpload(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${crypto.randomUUID()}${safeExt(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export async function saveUploads(files: File[]): Promise<string[]> {
  return Promise.all(files.filter((f) => f.size > 0).map(saveUpload));
}

export async function deleteUpload(publicPath: string): Promise<void> {
  if (!publicPath.startsWith("/uploads/")) return;
  const filename = path.basename(publicPath);
  try {
    await unlink(path.join(UPLOAD_DIR, filename));
  } catch {
    // ignore if already gone
  }
}
