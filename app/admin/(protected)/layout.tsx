import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">{children}</div>
    </div>
  );
}
