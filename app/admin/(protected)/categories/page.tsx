import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { CategoriesTable } from "./CategoriesTable";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <AdminHeader title="Categories" />
      <div className="flex-1 space-y-4 p-4 sm:p-6">
        <div className="flex justify-end">
          <Button render={<Link href="/admin/categories/new" />} nativeButton={false}>
            <Plus className="size-4" /> Add Category
          </Button>
        </div>
        <CategoriesTable categories={categories} />
      </div>
    </>
  );
}
