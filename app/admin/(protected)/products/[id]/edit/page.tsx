import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/types";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { updateProduct } from "@/lib/actions/products";
import { ProductForm } from "../../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <>
      <AdminHeader title="Edit Product" />
      <div className="flex-1 p-4 sm:p-6">
        <ProductForm
          categories={categories}
          product={serializeProduct(product)}
          action={updateProductWithId}
        />
      </div>
    </>
  );
}
