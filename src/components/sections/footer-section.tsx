import Link from "next/link";
import Image from "next/image";
import brandLogo from "@/assets/logo.png";

const exploreLinks = [
  { name: "Who We Are", href: "#who-we-are" },
  { name: "Services", href: "#services" },
  { name: "Enquiry", href: "#enquiry" },
];

const serviceLinks = [
  { name: "Staffing", href: "#services" },
  { name: "Real Estate", href: "#services" },
  { name: "Agriculture", href: "#services" },
  { name: "Import / Export", href: "#services" },
  { name: "Security", href: "#services" },
];

export function FooterSection() {
  return (
    <footer className="footer-glass relative overflow-hidden px-[var(--page-gutter)] py-16 md:py-24 text-white">
      {/* Protective Base Barrier Layer matching Header */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0D1B2E]/95 via-[#0A1D31]/90 to-[#081421]/95"
        aria-hidden="true"
      />

      {/* Specular Top Rim Reflection (White subtle highlight) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      {/* Specular Top Rim Reflection (Cyan brand glow) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#20BCE5]/35 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle Ambient Glass Surface Sheen */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"
        aria-hidden="true"
      />

      {/* Subtle Brand Ambient Radial Glow (Cyan & Royal Lighting) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,102,198,0.22),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(32,188,229,0.12),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="mb-24 flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link
              href="#top"
              className="group mb-8 flex w-fit items-center gap-3.5 sm:gap-4 text-left cursor-pointer transition-transform focus:outline-none"
            >
              <div className="relative h-11 w-12 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 sm:h-13 sm:w-14 md:h-14 md:w-15">
                <Image
                  src={brandLogo}
                  alt="Kalycor Group Logo"
                  fill
                  className="relative z-10 object-contain drop-shadow-[0_2px_14px_rgba(32,188,229,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_4px_22px_rgba(32,188,229,0.6)]"
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="display-font text-base sm:text-lg md:text-xl font-bold tracking-[0.20em] text-white transition-colors duration-300 group-hover:text-white">
                  KALYCOR<span className="text-[#20BCE5]">.</span>
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#94A3B8]">
              Building a future of possibilities across the world we share.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-sm md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5 text-[#20BCE5]">Explore</p>
              <div className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-[#94A3B8] transition-colors duration-300 hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5 text-[#20BCE5]">Services</p>
              <div className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-[#94A3B8] transition-colors duration-300 hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5 text-[#20BCE5]">Contact</p>
              <a className="line-link block text-[#94A3B8] transition-colors duration-300 hover:text-white" href="mailto:hello@kalycor.group">
                hello@kalycor.group
              </a>
              <a className="line-link mt-2.5 block text-[#94A3B8] transition-colors duration-300 hover:text-white" href="tel:+10000000000">
                +1 000 000 0000
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#20BCE5]/15 pt-6 text-xs text-[#94A3B8]">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>© 2026 Kalycor Group. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="line-link hover:text-white transition-colors duration-300" href="#top">
                Privacy
              </Link>
              <Link className="line-link hover:text-white transition-colors duration-300" href="#top">
                Terms
              </Link>
              <a className="line-link hover:text-white transition-colors duration-300" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
