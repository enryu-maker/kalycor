import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="site-shell flex min-h-screen flex-col items-center justify-center px-[var(--page-gutter)] text-center">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-6">404 / Page Not Found</p>
        <h1 className="display-font text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-foreground">
          Possibility awaits <span className="serif-font block font-normal italic text-primary">elsewhere.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-primary bg-transparent px-7 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span>Return to Overview</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
