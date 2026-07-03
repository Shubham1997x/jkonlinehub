"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { FolderTree, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteCategory } from "@/lib/actions/categories";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  _count: { products: number };
};

export function CategoriesTable({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this category? Products will become uncategorized.")) return;
    startTransition(async () => {
      await deleteCategory(id);
      toast.success("Category deleted");
      router.refresh();
    });
  }

  const columns: ColumnDef<CategoryRow>[] = [
    {
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
            {row.original.image ? (
              <Image src={row.original.image} alt={row.original.name} fill sizes="40px" className="object-cover" />
            ) : (
              <FolderTree className="m-2 size-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">/{row.original.slug}</p>
          </div>
        </div>
      ),
    },
    {
      id: "products",
      header: "Products",
      cell: ({ row }) => <Badge variant="secondary">{row.original._count.products}</Badge>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/categories/${row.original.id}/edit`} />} nativeButton={false}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={categories}
      getRowId={(row) => row.id}
      searchPlaceholder="Search categories..."
      globalFilterFn={(row, query) => row.name.toLowerCase().includes(query.toLowerCase())}
    />
  );
}
