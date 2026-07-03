import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if (await isAuthenticated()) {
    redirect("/admin/dashboard");
  }

  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage JK Online Hub
          </p>
        </div>
        <LoginForm redirectTo={from} />
      </div>
    </div>
  );
}
