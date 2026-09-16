import { EnquiryForm } from "@/components/interactive/enquiry-form";

export function EnquirySection() {
  return (
    <section id="enquiry" className="border-b section-rule bg-background px-[var(--page-gutter)] py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-28">
        <div className="reveal-on-scroll">
          <p className="eyebrow mb-6">03 / Make an enquiry</p>
          <h2 className="display-font max-w-xl text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[.86] tracking-[-.075em]">
            Let&apos;s build <span className="serif-font font-normal italic text-primary">what&apos;s next.</span>
          </h2>
          <p className="mt-9 max-w-sm text-base leading-relaxed text-muted-foreground">
            Tell us what you&apos;re looking to build, grow, move or protect.
          </p>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
