import Image from "next/image";
import heroImage from "@/assets/hero-global.jpg";
import { ConnectForm } from "@/components/interactive/connect-form";

export function ConnectSection() {
  return (
    <section
      id="connect"
      className="grain relative overflow-hidden bg-primary px-[var(--page-gutter)] py-28 text-primary-foreground md:py-44"
    >
      <div className="absolute inset-0 opacity-25">
        <Image
          src={heroImage}
          alt=""
          fill
          loading="lazy"
          className="size-full object-cover mix-blend-multiply"
          sizes="100vw"
        />
      </div>
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-24 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="reveal-on-scroll">
            <p className="mb-6 text-xs uppercase tracking-[0.18em] text-primary-foreground/70">04 / Connect with us</p>
            <h2 className="display-font max-w-4xl text-[clamp(3.3rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.075em]">
              Connect<br />
              <span className="serif-font font-normal italic">with us.</span>
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-primary-foreground/75">
            Every possibility begins with a conversation.
          </p>
        </div>

        <ConnectForm />

        <p className="footer-word pointer-events-none absolute -bottom-14 right-0 hidden text-[clamp(6rem,19vw,20rem)] font-bold leading-none tracking-[-.09em] md:block select-none opacity-20">
          POSSIBILITIES
        </p>
      </div>
    </section>
  );
}
