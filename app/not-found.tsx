import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
        <PackageSearch className="size-8" />
      </span>
      <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button render={<Link href="/" />} nativeButton={false} className="rounded-full">
        Back to Home
      </Button>
    </div>
  );
}
