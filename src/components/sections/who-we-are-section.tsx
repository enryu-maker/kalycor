import Image from "next/image";
import globalImage from "@/assets/hero-global.jpg";
import { Users, Coins, Sparkles, HeartHandshake } from "lucide-react";

export function WhoWeAreSection() {
  const pillars = [
    {
      title: "People",
      description: "Empowering talent and teams to drive organizations forward.",
      icon: Users,
    },
    {
      title: "Capital",
      description: "Directing strategic investment into sustainable, high-value opportunities.",
      icon: Coins,
    },
    {
      title: "Expertise",
      description: "Applying deep sector knowledge to solve complex operational challenges.",
      icon: Sparkles,
    },
    {
      title: "Care",
      description: "Delivering lasting positive impact for the communities and markets we serve.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="who-we-are"
      className="relative border-b border-[#d2e1f0] bg-[#f4f8fc] px-[var(--page-gutter)] py-28 md:py-40 text-[#071326] overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* ==========================================================================
            TOP EDITORIAL ROW: EYEBROW + MAIN HEADLINE & NARRATIVE
            ========================================================================== */}
        <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr] lg:gap-16">
          <div className="reveal-on-scroll">
            <p className="eyebrow flex items-center gap-2 font-semibold text-[#0866C6]">
              <span className="inline-block size-1.5 rounded-full bg-[#0866C6]" />
              01 / Who we are
            </p>
          </div>

          <div className="reveal-on-scroll space-y-8">
            <h2 className="display-font max-w-5xl text-[clamp(2.4rem,5.5vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#071326]">
              We are a global group with a simple belief:{" "}
              <span className="serif-font font-normal italic text-[#0866C6]">
                possibility
              </span>{" "}
              is something you build.
            </h2>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-[#334155]">
              Kalycor brings together people, capital, expertise and care to create lasting value across the places and industries that shape everyday life.
            </p>
          </div>
        </div>

        {/* ==========================================================================
            MIDDLE ROW: HERO ARCHITECTURAL VISUAL WITH BRAND FRAME
            ========================================================================== */}
        <div className="reveal-on-scroll mt-16 md:mt-24">
          <div className="group relative aspect-[16/9] max-h-[540px] w-full overflow-hidden rounded-sm border border-[#d2e1f0] bg-[#071A2D] shadow-[0_20px_45px_rgba(7,26,45,0.12)]">
            <Image
              src={globalImage}
              alt="Kalycor Global Perspective — Building the Future"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1600px) 100vw, 1600px"
              priority={false}
            />

            {/* Gradient Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02050B]/85 via-[#071A2D]/25 to-transparent" />

            {/* Floating Glass Label */}
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 md:bottom-10 md:left-10 md:right-10">
              <div>
                <span className="eyebrow mb-2 block text-[#20BCE5]">Global Perspective</span>
                <p className="display-font text-xl font-semibold tracking-tight text-white md:text-3xl">
                  Creating lasting value across places and industries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================================
            BOTTOM ROW: CORE PILLARS (PEOPLE, CAPITAL, EXPERTISE, CARE)
            ========================================================================== */}
        <div className="reveal-on-scroll mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-sm border border-[#d2e1f0] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#0866C6]/40 hover:shadow-[0_12px_30px_rgba(8,102,198,0.10)]"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-sm border border-[#0866C6]/20 bg-[#0866C6]/10 text-[#0866C6] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="display-font mb-2 text-lg font-semibold tracking-tight text-[#071326] group-hover:text-[#0866C6] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#64748b]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
