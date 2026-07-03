"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteEnquiry } from "@/lib/actions/enquiries";

type EnquiryRow = {
  id: string;
  name: string;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  createdAt: string;
  productNames: string[];
};

export function EnquiriesTable({ enquiries }: { enquiries: EnquiryRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    startTransition(async () => {
      await deleteEnquiry(id);
      toast.success("Enquiry deleted");
      router.refresh();
    });
  }

  const columns: ColumnDef<EnquiryRow>[] = [
    {
      accessorKey: "name",
      header: "From",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          {row.original.companyName && (
            <p className="text-xs text-muted-foreground">{row.original.companyName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {row.original.phone} {row.original.email ? `• ${row.original.email}` : ""}
          </p>
        </div>
      ),
    },
    {
      id: "products",
      header: "Products",
      cell: ({ row }) =>
        row.original.productNames.length > 0 ? (
          <div className="flex max-w-xs flex-col gap-1.5">
            {row.original.productNames.map((name) => (
              <Badge key={name} variant="secondary" className="h-auto whitespace-normal py-1 text-left font-normal leading-snug">
                {name}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">General enquiry</span>
        ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <p className="line-clamp-2 max-w-xs text-sm text-muted-foreground">{row.original.message}</p>
      ),
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("en-IN")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="size-4 text-destructive" />
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={enquiries}
      getRowId={(row) => row.id}
      searchPlaceholder="Search enquiries..."
      globalFilterFn={(row, query) =>
        [row.name, row.companyName || "", row.email || "", row.message || "", ...row.productNames]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      }
    />
  );
}
