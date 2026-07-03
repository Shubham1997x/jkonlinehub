"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createEnquiry, type EnquiryState } from "@/lib/actions/enquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppUrl } from "./WhatsAppButton";

const initialState: EnquiryState = {};

export function EnquiryForm({
  productIds = [],
  productNames = [], // Fallback for backward compatibility
  productsData = [],
  whatsappPhone,
  companyName = "JK Online Hub",
}: {
  productIds?: string[];
  productNames?: string[];
  productsData?: { name: string; sku: string; quantity: number }[];
  whatsappPhone?: string;
  companyName?: string;
}) {
  const [state, formAction, pending] = useActionState(createEnquiry, initialState);

  useEffect(() => {
    if (state.success && !whatsappPhone) {
      toast.success("Quote request sent! We'll get back to you shortly.");
    }
  }, [state.success, whatsappPhone]);

  if (state.success && !whatsappPhone) {
    return (
      <div className="rounded-2xl bg-secondary/50 p-4 text-sm text-foreground">
        Thank you — your request has been received. Our team will reach out soon.
      </div>
    );
  }

  const handleSubmit = (formData: FormData) => {
    if (whatsappPhone) {
      // Build WhatsApp message
      const name = formData.get("name") as string;
      const cName = formData.get("companyName") as string;
      const phone = formData.get("phone") as string;
      const email = formData.get("email") as string;
      const msg = formData.get("message") as string;

      let text = `Hi ${companyName}, I'd like a quote.\n\n*My Details:*\nName: ${name}\nPhone: ${phone}`;
      if (cName) text += `\nCompany: ${cName}`;
      if (email) text += `\nEmail: ${email}`;
      if (msg) text += `\n\n*Message:*\n${msg}`;
      
      if (productsData.length > 0) {
        text += `\n\n*Products:*\n` + productsData.map((p) => `- ${p.name} (SKU: ${p.sku}) - Qty: ${p.quantity}`).join("\n");
      } else if (productNames.length > 0) {
        text += `\n\n*Products:*\n` + productNames.map((p) => `- ${p}`).join("\n");
      }

      window.open(buildWhatsAppUrl(whatsappPhone, text), "_blank");
    }
    
    // Continue to server action
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="w-full min-w-0 space-y-4">
      <input type="hidden" name="productIds" value={JSON.stringify(productIds)} />

      <div className="space-y-3">
        <div>
          <Input 
            id="name" 
            name="name" 
            placeholder="Your Name *" 
            required 
            className="bg-secondary/50"
          />
        </div>
        <div>
          <Input 
            id="companyName" 
            name="companyName" 
            placeholder="Company Name" 
            className="bg-secondary/50"
          />
        </div>
        <div>
          <Input 
            id="phone" 
            name="phone" 
            placeholder="Contact Mobile Phone *" 
            required 
            className="bg-secondary/50"
          />
        </div>
        <div>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email Address (optional)" 
            className="bg-secondary/50"
          />
        </div>
        <div>
          <Textarea 
            id="message" 
            name="message" 
            rows={3} 
            placeholder="Any specific requirements or quantities?" 
            className="bg-secondary/50"
          />
        </div>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full rounded-full bg-[#25D366] hover:bg-[#20bd5c] text-white">
        {pending ? "Processing..." : "Submit to WhatsApp"}
      </Button>
    </form>
  );
}
