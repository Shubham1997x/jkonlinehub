import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getSettings } from "@/lib/actions/settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle || `${settings.companyName} — Product Catalogue`;
  const description =
    settings.seoDescription ||
    settings.description ||
    "Trusted wholesale household products supplier — kitchen, cleaning, storage, kids, bottles, organizers and more.";

  return {
    title: { default: title, template: `%s | ${settings.companyName}` },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(settings.logo ? { images: [{ url: settings.logo }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
