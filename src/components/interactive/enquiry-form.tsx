"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const SERVICES = [
  "Staffing",
  "Real Estate",
  "Agriculture",
  "Import / Export",
  "Security",
];

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="reveal-on-scroll is-visible flex min-h-[25rem] flex-col justify-center border-t border-[#0866C6]/30 pt-10">
        <span className="mb-6 grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#0866C6] to-[#20BCE5] text-white shadow-md shadow-[#0866C6]/25">
          <Check className="size-6" />
        </span>
        <h3 className="display-font text-4xl font-semibold tracking-[-.05em] text-[#071326]">
          Enquiry received.
        </h3>
        <p className="mt-4 max-w-sm leading-relaxed text-[#475569]">
          Thank you. Our team will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="line-link mt-10 w-fit text-xs uppercase tracking-[0.16em] text-[#0866C6] hover:text-[#20BCE5] font-semibold cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="reveal-on-scroll grid gap-x-8 gap-y-7 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="form-field block py-3.5 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Full name *
        </span>
        <input
          type="text"
          name="name"
          required
          aria-label="Full name"
          className="text-base text-[#071326] placeholder:text-[#94a3b8] focus:outline-none"
        />
      </label>

      <label className="form-field block py-3.5 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Company
        </span>
        <input
          type="text"
          name="company"
          aria-label="Company"
          className="text-base text-[#071326] placeholder:text-[#94a3b8] focus:outline-none"
        />
      </label>

      <label className="form-field block py-3.5 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Email *
        </span>
        <input
          type="email"
          name="email"
          required
          aria-label="Email"
          className="text-base text-[#071326] placeholder:text-[#94a3b8] focus:outline-none"
        />
      </label>

      <label className="form-field block py-3.5 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Phone
        </span>
        <input
          type="tel"
          name="phone"
          aria-label="Phone"
          className="text-base text-[#071326] placeholder:text-[#94a3b8] focus:outline-none"
        />
      </label>

      <label className="form-field block py-3.5 sm:col-span-2 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Select service
        </span>
        <select
          name="service"
          aria-label="Select service"
          defaultValue=""
          className="cursor-pointer text-[#071326] focus:outline-none"
        >
          <option value="" disabled className="bg-white text-[#071326]">
            Select a service
          </option>
          {SERVICES.map((item) => (
            <option key={item} value={item} className="bg-white text-[#071326]">
              {item}
            </option>
          ))}
          <option value="General enquiry" className="bg-white text-[#071326]">
            General enquiry
          </option>
        </select>
      </label>

      <label className="form-field block py-3.5 sm:col-span-2 border-b border-[#cbd5e1] focus-within:border-[#0866C6] transition-colors">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-[#64748b] font-medium">
          Message
        </span>
        <textarea
          name="message"
          aria-label="Message"
          rows={3}
          className="resize-none text-[#071326] placeholder:text-[#94a3b8] focus:outline-none"
          placeholder="How can we help you?"
        />
      </label>

      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          className="group inline-flex items-center justify-center rounded-sm border border-[#20BCE5]/40 bg-gradient-to-r from-[#0866C6] via-[#1178DE] to-[#20BCE5] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_20px_rgba(8,102,198,0.25)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(32,188,229,0.45)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <span>Send enquiry</span>
          <ArrowUpRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </form>
  );
}
