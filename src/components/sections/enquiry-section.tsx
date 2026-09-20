import { EnquiryForm } from "@/components/interactive/enquiry-form";

export function EnquirySection() {
  return (
    <section id="enquiry" className="border-b border-[#d2e1f0] bg-[#f4f8fc] px-[var(--page-gutter)] py-28 md:py-40 text-[#071326]">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-28">
        <div className="reveal-on-scroll">
          <p className="eyebrow mb-6 text-[#105080] font-semibold">03 / Make an enquiry</p>
          <h2 className="display-font max-w-xl text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[.86] tracking-[-.075em] text-[#071326]">
            Let&apos;s build <span className="serif-font font-normal italic text-[#0284c7]">what&apos;s next.</span>
          </h2>
          <p className="mt-9 max-w-sm text-base leading-relaxed text-[#475569]">
            Tell us what you&apos;re looking to build, grow, move or protect.
          </p>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
