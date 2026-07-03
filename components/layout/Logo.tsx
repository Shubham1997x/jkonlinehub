import Link from "next/link";
import Image from "next/image";

export function Logo({ companyName = "JK Online Hub" }: { companyName?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.jpg"
        alt={companyName}
        width={44}
        height={44}
        className="rounded-sm object-contain"
        priority
      />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        {companyName}
      </span>
    </Link>
  );
}
