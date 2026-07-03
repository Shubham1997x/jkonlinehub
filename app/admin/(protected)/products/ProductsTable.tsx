"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ColumnDef, type RowSelectionState } from "@tanstack/react-table";
import { toast } from "sonner";
import { MoreHorizontal, PackageSearch, Pencil, Copy, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  bulkDeleteProducts,
  deleteProduct,
  duplicateProduct,
  toggleFeatured,
} from "@/lib/actions/products";
import type { SerializedProduct } from "@/lib/types";

export function ProductsTable({ products }: { products: SerializedProduct[] }) {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [, startTransition] = useTransition();

  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);

  function handleToggleFeatured(id: string, featured: boolean) {
    startTransition(async () => {
      await toggleFeatured(id, featured);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteProduct(id);
      toast.success("Product deleted");
      router.refresh();
    });
  }

  function handleDuplicate(id: string) {
    startTransition(async () => {
      await duplicateProduct(id);
      toast.success("Product duplicated");
      router.refresh();
    });
  }

  function handleBulkDelete() {
    if (!confirm(`Delete ${selectedIds.length} selected products?`)) return;
    startTransition(async () => {
      await bulkDeleteProducts(selectedIds);
      setRowSelection({});
      toast.success("Selected products deleted");
      router.refresh();
    });
  }

  const columns: ColumnDef<SerializedProduct>[] = [
    {
      id: "select",
      size: 48,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />
      ),
    },
    {
      accessorKey: "name",
      header: "Product",
      // no size = fills remaining space
      cell: ({ row }) => {
        const product = row.original;
        const image = product.images[0];
        const desc = product.shortDescription || product.description;
        return (
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="group flex items-center gap-3"
          >
            {/* Thumbnail */}
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="48px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <PackageSearch className="size-5 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Text block */}
            <div className="min-w-0">
              <p className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">
                {product.name}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {product.sku}
                </span>
                {product.price != null && (
                  <span className="text-xs font-medium text-foreground">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {desc && (
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/60">{desc}</p>
              )}
            </div>
          </Link>
        );
      },
    },
    {
      accessorFn: (p) => p.category?.name ?? "Uncategorized",
      id: "category",
      size: 160,
      header: "Category",
      cell: ({ getValue }) => (
        <Badge variant="secondary" className="whitespace-nowrap font-medium">
          {getValue<string>()}
        </Badge>
      ),
    },
    {
      accessorKey: "stock",
      size: 90,
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        const inStock = stock > 0;
        return (
          <div className="flex items-center gap-1.5">
            <span
              className={`size-1.5 shrink-0 rounded-full ${inStock ? "bg-emerald-500" : "bg-destructive"}`}
            />
            <span
              className={`text-sm font-medium ${inStock ? "text-emerald-600" : "text-destructive"}`}
            >
              {stock}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "featured",
      size: 100,
      header: "Featured",
      cell: ({ row }) => (
        <Switch
          checked={row.original.featured}
          onCheckedChange={(checked) => handleToggleFeatured(row.original.id, checked)}
        />
      ),
    },
    {
      id: "actions",
      size: 56,
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem render={<Link href={`/admin/products/${row.original.id}/edit`} />}>
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDuplicate(row.original.id)}>
              <Copy className="size-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      getRowId={(row) => row.id}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      searchPlaceholder="Search products..."
      globalFilterFn={(row, query) =>
        [row.name, row.sku, row.description ?? "", row.category?.name ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      }
      toolbar={
        selectedIds.length > 0 ? (
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="size-4" /> Delete {selectedIds.length} selected
          </Button>
        ) : undefined
      }
    />
  );
}
