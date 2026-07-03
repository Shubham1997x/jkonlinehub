/**
 * One-time scraper: seeds ~25 real products from https://www.jkonlinehub.com
 * into the local database via Prisma. Safe to re-run — skips SKUs already in the DB.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import * as cheerio from "cheerio";
import { prisma } from "@/lib/prisma";
import { slugify, generateSku } from "@/lib/slugify";

const SITE = "https://www.jkonlinehub.com";
const TARGET_COUNT = 25;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; JKOnlineHubCatalogueBot/1.0)" };

type ScrapedProduct = {
  name: string;
  sku: string;
  description: string | null;
  price: number | null;
  categoryName: string | null;
  images: string[];
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getProductUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, { headers: HEADERS });
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return locs.filter(
    (url) => url.includes("/products/") && !url.includes("youtube")
  );
}

function extractJsonLd(html: string): Record<string, unknown>[] {
  const $ = cheerio.load(html);
  const blocks: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      blocks.push(JSON.parse($(el).contents().text()));
    } catch {
      // ignore malformed blocks
    }
  });
  return blocks;
}

async function scrapeProduct(url: string): Promise<ScrapedProduct | null> {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const html = await res.text();
  const blocks = extractJsonLd(html);

  const product = blocks.find((b) => b["@type"] === "Product") as
    | {
        name?: string;
        sku?: string;
        description?: string;
        image?: string[];
        offers?: { price?: number };
      }
    | undefined;
  if (!product?.name) return null;

  const breadcrumb = blocks.find((b) => b["@type"] === "BreadcrumbList") as
    | { itemListElement?: { position: number; name: string }[] }
    | undefined;
  const categoryName = breadcrumb?.itemListElement?.find((item) => item.position === 2)?.name ?? null;

  return {
    name: product.name,
    sku: product.sku || generateSku(product.name),
    description: product.description ?? null,
    price: product.offers?.price ?? null,
    categoryName,
    images: product.image ?? [],
  };
}

async function downloadImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const ext = path.extname(new URL(url).pathname).split("?")[0] || ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const buffer = Buffer.from(await res.arrayBuffer());
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    return `/uploads/${filename}`;
  } catch {
    return null;
  }
}

async function ensureUniqueSlug(base: string): Promise<string> {
  const baseSlug = slugify(base) || "product";
  let slug = baseSlug;
  let counter = 2;
  while (await prisma.product.findFirst({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

async function main() {
  console.log("Fetching sitemap...");
  const urls = await getProductUrls();
  console.log(`Found ${urls.length} product URLs, targeting ${TARGET_COUNT} imports.`);

  let imported = 0;
  let skipped = 0;

  for (const url of urls) {
    if (imported >= TARGET_COUNT) break;

    const scraped = await scrapeProduct(url);
    await sleep(300);

    if (!scraped) {
      console.log(`  ✗ Failed to parse ${url}`);
      skipped++;
      continue;
    }

    const existing = await prisma.product.findUnique({ where: { sku: scraped.sku } });
    if (existing) {
      console.log(`  – Skipping duplicate SKU ${scraped.sku} (${scraped.name})`);
      skipped++;
      continue;
    }

    let categoryId: string | null = null;
    if (scraped.categoryName) {
      const categorySlug = slugify(scraped.categoryName);
      const category = await prisma.category.upsert({
        where: { slug: categorySlug },
        update: {},
        create: { name: scraped.categoryName, slug: categorySlug },
      });
      categoryId = category.id;
    }

    const images: string[] = [];
    for (const imgUrl of scraped.images.slice(0, 3)) {
      const localPath = await downloadImage(imgUrl);
      if (localPath) images.push(localPath);
    }

    const slug = await ensureUniqueSlug(scraped.name);

    await prisma.product.create({
      data: {
        name: scraped.name,
        slug,
        sku: scraped.sku,
        description: scraped.description,
        shortDescription: scraped.description?.slice(0, 140) ?? null,
        categoryId,
        images: JSON.stringify(images),
        tags: JSON.stringify([]),
        price: scraped.price,
        stock: Math.floor(Math.random() * 70) + 10,
        featured: imported < 8,
      },
    });

    console.log(`  ✓ Imported ${scraped.name} (${scraped.sku})`);
    imported++;
  }

  console.log(`\nDone. Imported ${imported} products, skipped ${skipped}.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
