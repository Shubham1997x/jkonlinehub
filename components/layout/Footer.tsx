import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/shared/SocialIcon";

type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
};

export function Footer({
  companyName,
  description,
  email,
  phone,
  address,
  socialLinks,
}: {
  companyName?: string;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  socialLinks?: SocialLinks;
}) {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-3">
          <Logo companyName={companyName} />
          <p className="max-w-xs text-sm text-muted-foreground">
            {description ??
              "Trusted wholesale household products supplier — kitchen, cleaning, storage, and more."}
          </p>
          <div className="flex gap-3 pt-1">
            {socialLinks?.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <SocialIcon platform="facebook" className="size-5" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <SocialIcon platform="instagram" className="size-5" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <SocialIcon platform="twitter" className="size-5" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <SocialIcon platform="linkedin" className="size-5" />
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Get in Touch</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {address && (
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" /> {address}
              </span>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="size-4 shrink-0" /> {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-primary">
                <Phone className="size-4 shrink-0" /> {phone}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {companyName ?? "JK Online Hub"}. All rights reserved.
      </div>
    </footer>
  );
}
