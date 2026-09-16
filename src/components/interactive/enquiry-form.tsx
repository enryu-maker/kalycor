"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceOptions = [
  "Staffing",
  "Real Estate",
  "Agriculture",
  "Import / Export",
  "Security",
];

export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="reveal-on-scroll is-visible flex min-h-[25rem] flex-col justify-center border-t border-primary pt-10">
        <span className="mb-6 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" />
        </span>
        <h3 className="display-font text-4xl font-semibold tracking-[-.05em]">Enquiry received.</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
          Thank you. Our team will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="line-link mt-10 w-fit text-xs uppercase tracking-[0.16em] text-primary cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="reveal-on-scroll grid gap-x-8 gap-y-7 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label className="form-field block py-3">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Full name *</span>
        <input type="text" required aria-label="Full name" className="text-base placeholder:text-current" />
      </label>
      <label className="form-field block py-3">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Company</span>
        <input type="text" aria-label="Company" className="text-base placeholder:text-current" />
      </label>
      <label className="form-field block py-3">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Email *</span>
        <input type="email" required aria-label="Email" className="text-base placeholder:text-current" />
      </label>
      <label className="form-field block py-3">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Phone</span>
        <input type="tel" aria-label="Phone" className="text-base placeholder:text-current" />
      </label>
      <label className="form-field block py-3 sm:col-span-2">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Select service</span>
        <select aria-label="Select service" defaultValue="" className="cursor-pointer">
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
          <option value="General enquiry">General enquiry</option>
        </select>
      </label>
      <label className="form-field block py-3 sm:col-span-2">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Message</span>
        <textarea aria-label="Message" rows={3} className="resize-none" placeholder="How can we help you?" />
      </label>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="group border-primary bg-transparent px-7 text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          Send enquiry{" "}
          <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </form>
  );
}
