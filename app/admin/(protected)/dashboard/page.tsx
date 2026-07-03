import Link from "next/link";
import { Package, FolderTree, Star, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function DashboardPage() {
  const [totalProducts, totalCategories, featuredCount, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { category: true },
    }),
  ]);

  const cards = [
    { label: "Total Products", value: totalProducts, icon: Package },
    { label: "Categories", value: totalCategories, icon: FolderTree },
    { label: "Featured Products", value: featuredCount, icon: Star },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="flex-1 space-y-8 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <card.icon className="size-5 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Recent Products</h2>
          </div>
          <div className="divide-y divide-border">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center justify-between py-3 hover:text-primary"
              >
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category?.name ?? "Uncategorized"} · SKU: {product.sku}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(product.createdAt).toLocaleDateString("en-IN")}
                </span>
              </Link>
            ))}
            {recentProducts.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">No products yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
