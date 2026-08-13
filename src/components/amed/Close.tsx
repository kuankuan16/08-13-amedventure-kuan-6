"use client";

import { useRef } from "react";
import Image from "next/image";
import { CLOSE, CONTACT_MAILTO, NAV, asset } from "@/lib/amed/content";
import { Lines, FadeUp, Roll, gsap, useIsomorphicLayoutEffect } from "./motion";

/**
 * Close: bright full-bleed clouds, the closing statement, contact CTA,
 * and the footer. The background drifts subtly with scroll.
 */
export function Close() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-close-bg]",
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 0,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative overflow-hidden">
      <div data-close-bg className="absolute inset-0">
        <Image
          src={CLOSE.image}
          alt="Morning clouds above San Francisco Bay"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(247,249,252,0.92) 0%, rgba(247,249,252,0.35) 35%, rgba(247,249,252,0.55) 100%)",
          }}
        />
      </div>

      <div
        className="relative flex min-h-[110vh] flex-col justify-between"
        style={{ paddingInline: "var(--pad)", paddingTop: "clamp(7rem, 18vh, 13rem)" }}
      >
        <div>
          <Lines as="h2" className="t-display-xl" style={{ color: "var(--ink)" }}>
            {CLOSE.display.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </Lines>
          <FadeUp delay={0.3} className="mt-12">
            <a
              href={CONTACT_MAILTO}
              className="t-title inline-flex items-center gap-4 rounded-full px-9 py-4 transition-transform duration-500 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--navy-950)",
                color: "var(--chalk)",
                transitionTimingFunction: "var(--ease-quint)",
              }}
            >
              <Roll>{CLOSE.cta}</Roll>
              <span aria-hidden style={{ color: "var(--cyan-hot)" }}>
                →
              </span>
            </a>
          </FadeUp>
          <FadeUp delay={0.4} className="mt-8">
            <p className="t-body" style={{ color: "var(--ink-60)" }}>
              {CLOSE.location}
            </p>
          </FadeUp>
        </div>

        {/* footer */}
        <footer className="mt-24 pb-20 md:pb-24" style={{ color: "var(--ink)" }}>
          <div
            className="flex flex-col gap-8 border-t pt-10 md:flex-row md:items-end md:justify-between"
            style={{ borderColor: "rgba(7,16,34,0.2)" }}
          >
            <Image
              src={asset("/amed/brand/amed-logo-light.png")}
              alt="AMED Ventures"
              width={1999}
              height={452}
              className="h-8 w-auto"
            />
            <nav className="flex flex-wrap gap-6">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="t-small u-sweep">
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="t-small" style={{ color: "var(--ink-60)" }}>
              {CLOSE.footer}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
