import { ServicesShowcase } from "@/components/interactive/services-showcase";

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-[#1e385c]/60 bg-[#09182f] px-[var(--page-gutter)] py-20 md:py-28 text-white">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div className="reveal-on-scroll">
            <p className="eyebrow mb-5 text-[#38bdf8]">02 / What we do</p>
            <h2 className="display-font text-[clamp(3rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.075em] text-white">
              Our<br />
              <span className="serif-font font-normal italic text-[#3b82f6]">services.</span>
            </h2>
          </div>
          <p className="reveal-on-scroll max-w-sm text-base leading-relaxed text-[#94a3b8]">
            Building opportunities across industries, markets and communities.
          </p>
        </div>

        <ServicesShowcase />
      </div>
    </section>
  );
}
