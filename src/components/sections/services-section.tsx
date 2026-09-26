import { ServicesShowcase } from "@/components/interactive/services-showcase";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full max-w-full overflow-clip scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 border-b border-[#0866C6]/20 bg-gradient-to-b from-[#030813] via-[#071A2D]/70 to-[#030813] px-[var(--page-gutter)] py-14 sm:py-20 lg:py-36 text-white"
    >
      {/* Background ambient diffused blue depth inspired by the logo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-[8%] top-[15%] h-[600px] w-[700px] rounded-full bg-[#0866C6]/15 blur-[160px] transition-transform duration-1000 ease-out" />
        <div className="absolute left-[5%] bottom-[10%] h-[550px] w-[650px] rounded-full bg-[#20BCE5]/10 blur-[150px] transition-transform duration-1000 ease-out" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[950px] rounded-full bg-[#071A2D]/40 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] w-full min-w-0">
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col justify-between gap-6 md:gap-8 md:flex-row md:items-end">
          <div className="reveal-on-scroll">
            <p className="eyebrow mb-3 sm:mb-5 text-[#20BCE5]">02 / What we do</p>
            <h2 id="services-heading" className="display-font text-[clamp(2.5rem,7vw,8rem)] font-semibold leading-[.88] tracking-[-.06em] md:tracking-[-.075em] text-white">
              Our<br />
              <span className="serif-font font-normal italic text-[#52CFEE] drop-shadow-[0_0_25px_rgba(32,188,229,0.3)]">services.</span>
            </h2>
          </div>
          <p className="reveal-on-scroll max-w-sm text-sm sm:text-base leading-relaxed text-[#94a3b8]">
            Building opportunities across industries, markets and communities.
          </p>
        </div>

        <ServicesShowcase />
      </div>
    </section>
  );
}
