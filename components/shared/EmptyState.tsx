import type { LucideIcon } from "lucide-react";
import { PackageX } from "lucide-react";

export function EmptyState({
  icon: Icon = PackageX,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-accent">
        <Icon className="size-7" />
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}
