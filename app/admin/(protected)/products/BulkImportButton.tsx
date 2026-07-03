"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bulkImportProducts } from "@/lib/actions/products";

const PLACEHOLDER = `[
  {
    "name": "Steel Water Bottle 1L",
    "categoryName": "Bottles",
    "price": 249,
    "stock": 50,
    "tags": ["steel", "bottle"]
  }
]`;

export function BulkImportButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImport() {
    setError(null);
    let rows;
    try {
      rows = JSON.parse(value);
      if (!Array.isArray(rows)) throw new Error("Expected a JSON array of products");
    } catch {
      setError("Invalid JSON. Please paste a JSON array of product objects.");
      return;
    }

    setPending(true);
    try {
      const result = await bulkImportProducts(rows);
      toast.success(`Imported ${result.imported} products (${result.skipped} skipped)`);
      setOpen(false);
      setValue("");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Upload className="size-4" /> Bulk Import
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Import Products</DialogTitle>
          <DialogDescription>
            Paste a JSON array of products. Duplicate SKUs are skipped automatically.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={10}
          className="font-mono text-xs"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <Button onClick={handleImport} disabled={pending || !value.trim()}>
            {pending ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
