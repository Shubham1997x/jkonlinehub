"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/lib/actions/settings";

type Settings = {
  companyName: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  whatsapp?: string;
};

const initialState: { error?: string; success?: boolean } = {};

export function SettingsForm({
  settings,
  socialLinks,
}: {
  settings: Settings;
  socialLinks: SocialLinks;
}) {
  const [state, formAction, pending] = useActionState(updateSettings, initialState);
  const [preview, setPreview] = useState<string | null>(settings.logo);

  useEffect(() => {
    if (state.success) toast.success("Settings saved");
  }, [state.success]);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Company Info</h2>
        <div className="space-y-1.5">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" defaultValue={settings.companyName} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={settings.description ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="logo">Company Logo</Label>
          {preview && (
            <div className="relative mb-2 size-20 overflow-hidden rounded-xl border border-border">
              <Image src={preview} alt="" fill sizes="80px" className="object-cover" />
            </div>
          )}
          <Input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={settings.email ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={settings.phone ?? ""} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" rows={2} defaultValue={settings.address ?? ""} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Social Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" name="facebook" defaultValue={socialLinks.facebook ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" name="instagram" defaultValue={socialLinks.instagram ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" name="twitter" defaultValue={socialLinks.twitter ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" name="linkedin" defaultValue={socialLinks.linkedin ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" defaultValue={socialLinks.whatsapp ?? ""} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">SEO</h2>
        <div className="space-y-1.5">
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input id="seoTitle" name="seoTitle" defaultValue={settings.seoTitle ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Textarea id="seoDescription" name="seoDescription" rows={2} defaultValue={settings.seoDescription ?? ""} />
        </div>
      </section>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
