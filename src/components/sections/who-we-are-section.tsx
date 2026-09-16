export function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="border-b section-rule bg-background px-[var(--page-gutter)] py-28 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[.75fr_1.4fr] md:gap-24">
        <p className="eyebrow reveal-on-scroll">01 / Who we are</p>
        <div className="reveal-on-scroll">
          <p className="display-font max-w-4xl text-[clamp(2.2rem,5vw,5.4rem)] font-medium leading-[.98] tracking-[-.055em]">
            We are a global group with a simple belief:{" "}
            <span className="serif-font text-primary italic font-normal">possibility</span> is something you build.
          </p>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:ml-auto">
            Northstar brings together people, capital, expertise and care to create lasting value across the places and
            industries that shape everyday life.
          </p>
        </div>
      </div>
    </section>
  );
}
