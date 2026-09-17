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
      <div className="reveal-on-scroll is-visible flex min-h-[25rem] flex-col justify-center border-t border-[#1d4ed8] pt-10">
        <span className="mb-6 grid size-12 place-items-center rounded-full bg-[#1d4ed8] text-white">
          <Check className="size-6" />
        </span>
        <h3 className="display-font text-4xl font-semibold tracking-[-.05em] text-[#08162b]">Enquiry received.</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-[#475569]">
          Thank you. Our team will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="line-link mt-10 w-fit text-xs uppercase tracking-[0.16em] text-[#1d4ed8] cursor-pointer"
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
      <label className="form-field block py-3 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Full name *</span>
        <input type="text" required aria-label="Full name" className="text-base text-[#08162b] placeholder:text-[#94a3b8]" />
      </label>
      <label className="form-field block py-3 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Company</span>
        <input type="text" aria-label="Company" className="text-base text-[#08162b] placeholder:text-[#94a3b8]" />
      </label>
      <label className="form-field block py-3 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Email *</span>
        <input type="email" required aria-label="Email" className="text-base text-[#08162b] placeholder:text-[#94a3b8]" />
      </label>
      <label className="form-field block py-3 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Phone</span>
        <input type="tel" aria-label="Phone" className="text-base text-[#08162b] placeholder:text-[#94a3b8]" />
      </label>
      <label className="form-field block py-3 sm:col-span-2 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Select service</span>
        <select aria-label="Select service" defaultValue="" className="cursor-pointer text-[#08162b]">
          <option value="" disabled className="bg-white text-[#08162b]">
            Select a service
          </option>
          {serviceOptions.map((service) => (
            <option key={service} value={service} className="bg-white text-[#08162b]">
              {service}
            </option>
          ))}
          <option value="General enquiry" className="bg-white text-[#08162b]">General enquiry</option>
        </select>
      </label>
      <label className="form-field block py-3 sm:col-span-2 border-b border-[#cbd5e1] focus-within:border-[#1d4ed8]">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#64748b]">Message</span>
        <textarea aria-label="Message" rows={3} className="resize-none text-[#08162b] placeholder:text-[#94a3b8]" placeholder="How can we help you?" />
      </label>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="group border border-[#1d4ed8] bg-[#1d4ed8] px-7 text-white shadow-md transition-all hover:bg-[#1e40af] hover:border-[#1e40af] cursor-pointer"
        >
          Send enquiry{" "}
          <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </form>
  );
}
