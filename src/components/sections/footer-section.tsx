import Link from "next/link";

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
    <footer className="bg-background px-[var(--page-gutter)] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24 flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link
              href="#top"
              className="mb-8 flex items-center gap-3 cursor-pointer"
            >
              <span className="grid size-9 place-items-center border border-primary text-primary">
                <span className="block size-2 bg-primary" />
              </span>
              <span className="display-font text-sm font-bold tracking-[0.2em]">
                NORTHSTAR<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building a future of possibilities across the world we share.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-sm md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5">Explore</p>
              <div className="space-y-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5">Services</p>
              <div className="space-y-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="line-link block text-left text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-5">Contact</p>
              <a className="line-link block text-muted-foreground" href="mailto:hello@northstar.group">
                hello@northstar.group
              </a>
              <a className="line-link mt-2 block text-muted-foreground" href="tel:+10000000000">
                +1 000 000 0000
              </a>
            </div>
          </div>
        </div>

        <div className="border-t section-rule pt-5 text-xs text-muted-foreground">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>© 2026 Northstar Group. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="line-link" href="#top">
                Privacy
              </Link>
              <Link className="line-link" href="#top">
                Terms
              </Link>
              <a className="line-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
