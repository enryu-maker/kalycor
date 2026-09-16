import { ServicesShowcase } from "@/components/interactive/services-showcase";

export function ServicesSection() {
  return (
    <section id="services" className="border-b section-rule bg-secondary px-[var(--page-gutter)] py-28 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="reveal-on-scroll">
            <p className="eyebrow mb-5">02 / What we do</p>
            <h2 className="display-font text-[clamp(3rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.075em]">
              Our<br />
              <span className="serif-font font-normal italic text-primary">services.</span>
            </h2>
          </div>
          <p className="reveal-on-scroll max-w-sm text-base leading-relaxed text-muted-foreground">
            Building opportunities across industries, markets and communities.
          </p>
        </div>

        <ServicesShowcase />
      </div>
    </section>
  );
}
