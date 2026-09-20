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
    <footer className="bg-[#050d1a] px-[var(--page-gutter)] py-16 md:py-24 text-white border-t border-[#105080]/40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24 flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link
              href="#top"
              className="mb-8 flex items-center gap-3.5 cursor-pointer group w-fit"
            >
              <div className="relative h-11 w-13 shrink-0 overflow-hidden rounded-md border border-[#105080]/60 bg-[#082453] shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-[#38bdf8] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                <Image
                  src={brandLogo}
                  alt="Kalycor Group Logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="52px"
                />
              </div>
              <span className="display-font text-sm font-bold tracking-[0.2em] text-white">
                KALYCOR<span className="text-[#66c8f5]">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#94a3b8]">
              Building a future of possibilities across the world we share.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-sm md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5 text-[#38bdf8]">Explore</p>
              <div className="space-y-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-[#94a3b8] hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5 text-[#38bdf8]">Services</p>
              <div className="space-y-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-[#94a3b8] hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5 text-[#38bdf8]">Contact</p>
              <a className="line-link block text-[#94a3b8] hover:text-white" href="mailto:hello@kalycor.group">
                hello@kalycor.group
              </a>
              <a className="line-link mt-2 block text-[#94a3b8] hover:text-white" href="tel:+10000000000">
                +1 000 000 0000
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#105080]/40 pt-5 text-xs text-[#64748b]">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>© 2026 Kalycor Group. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="line-link hover:text-white" href="#top">
                Privacy
              </Link>
              <Link className="line-link hover:text-white" href="#top">
                Terms
              </Link>
              <a className="line-link hover:text-white" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
