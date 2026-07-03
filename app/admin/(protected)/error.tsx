"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred in the admin panel. Please try again.
      </p>
      <Button onClick={reset} className="rounded-full">
        <RefreshCcw className="size-4" /> Try again
      </Button>
    </div>
  );
}
