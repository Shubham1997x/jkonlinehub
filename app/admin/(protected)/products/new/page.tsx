import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { createProduct } from "@/lib/actions/products";
import { ProductForm } from "../ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <AdminHeader title="Add Product" />
      <div className="flex-1 p-4 sm:p-6">
        <ProductForm categories={categories} action={createProduct} />
      </div>
    </>
  );
}
