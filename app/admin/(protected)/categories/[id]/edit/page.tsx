import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { updateCategory } from "@/lib/actions/categories";
import { CategoryForm } from "../../CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  const updateCategoryWithId = updateCategory.bind(null, id);

  return (
    <>
      <AdminHeader title="Edit Category" />
      <div className="flex-1 p-4 sm:p-6">
        <CategoryForm category={category} action={updateCategoryWithId} />
      </div>
    </>
  );
}
