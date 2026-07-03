import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/types";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./ProductsTable";
import { BulkImportButton } from "./BulkImportButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminHeader title="Products" />
      <div className="flex-1 space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <BulkImportButton />
          <Button render={<Link href="/admin/products/new" />} nativeButton={false}>
            <Plus className="size-4" /> Add Product
          </Button>
        </div>
        <ProductsTable products={products.map(serializeProduct)} />
      </div>
    </>
  );
}
