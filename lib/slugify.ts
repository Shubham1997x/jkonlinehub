export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSku(name: string): string {
  const prefix = slugify(name)
    .split("-")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `JKO-${prefix || "PRD"}-${suffix}`;
}
