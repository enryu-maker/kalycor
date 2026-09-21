import { ServicesShowcase } from "@/components/interactive/services-showcase";

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-[#105080]/40 bg-[#071326] px-[var(--page-gutter)] py-28 md:py-40 text-white">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="reveal-on-scroll">
            <p className="eyebrow mb-5 text-[#38bdf8]">02 / What we do</p>
            <h2 className="display-font text-[clamp(3rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.075em] text-white">
              Our<br />
              <span className="serif-font font-normal italic text-[#66c8f5] drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]">services.</span>
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
