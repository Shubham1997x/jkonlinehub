import { AdminHeader } from "@/components/admin/AdminHeader";
import { createCategory } from "@/lib/actions/categories";
import { CategoryForm } from "../CategoryForm";

export default function NewCategoryPage() {
  return (
    <>
      <AdminHeader title="Add Category" />
      <div className="flex-1 p-4 sm:p-6">
        <CategoryForm action={createCategory} />
      </div>
    </>
  );
}
