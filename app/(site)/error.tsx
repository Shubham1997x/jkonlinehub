"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        We hit an unexpected error loading this page. Please try again.
      </p>
      <Button onClick={reset} className="rounded-full">
        <RefreshCcw className="size-4" /> Try again
      </Button>
    </div>
  );
}
