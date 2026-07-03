import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSettings } from "@/lib/actions/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const socialLinks = JSON.parse(settings.socialLinks || "{}");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: settings.companyName,
          url: baseUrl,
          ...(settings.logo ? { logo: `${baseUrl}${settings.logo}` } : {}),
          ...(settings.description ? { description: settings.description } : {}),
          ...(settings.email || settings.phone
            ? {
                contactPoint: {
                  "@type": "ContactPoint",
                  ...(settings.email ? { email: settings.email } : {}),
                  ...(settings.phone ? { telephone: settings.phone } : {}),
                  contactType: "sales",
                },
              }
            : {}),
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer
        companyName={settings.companyName}
        description={settings.description}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        socialLinks={socialLinks}
      />
    </>
  );
}
