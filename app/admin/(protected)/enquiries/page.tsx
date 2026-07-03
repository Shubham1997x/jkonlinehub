import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EnquiriesTable } from "./EnquiriesTable";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  function safeParseProductIds(json: string): string[] {
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  const productIds = [...new Set(enquiries.flatMap((e) => safeParseProductIds(e.productIds)))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true },
  });
  const productsById = new Map(products.map((p) => [p.id, p.name]));

  return (
    <>
      <AdminHeader title="Enquiries" />
      <div className="flex-1 p-4 sm:p-6">
        <EnquiriesTable
          enquiries={enquiries.map((e) => ({
            ...e,
            createdAt: e.createdAt.toISOString(),
            productNames: safeParseProductIds(e.productIds)
              .map((id) => productsById.get(id))
              .filter((name): name is string => Boolean(name)),
          }))}
        />
      </div>
    </>
  );
}
