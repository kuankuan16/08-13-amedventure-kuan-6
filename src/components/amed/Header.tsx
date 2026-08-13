"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { NAV, CONTACT_MAILTO, asset } from "@/lib/amed/content";
import { Roll, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "./motion";

export function Header() {
  const ref = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight * 2.85,
      end: () => ScrollTrigger.maxScroll(window) + window.innerHeight,
      onToggle: (self) => setScrolled(self.isActive),
    });
    // slide the header in after the intro overlay lifts
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "quint.out", delay: 2.1 }
      );
    }
    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,backdrop-filter] duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(7,16,34,0.08)" : "none",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ paddingInline: "var(--pad)", height: "var(--header-h)" }}
      >
        <a href="#top" aria-label="AMED Ventures — back to top" className="block">
          <Image
            src={asset(scrolled ? "/amed/brand/amed-logo-light.png" : "/amed/brand/amed-logo-dark.png")}
            alt="AMED Ventures"
            width={1999}
            height={452}
            priority
            className="h-6 w-auto md:h-7"
          />
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          style={{ color: scrolled ? "var(--ink)" : "var(--chalk)" }}
        >
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="t-small font-medium">
              <Roll>{item.label}</Roll>
            </a>
          ))}
        </nav>

        <a
          href={CONTACT_MAILTO}
          className="t-small hidden rounded-full border px-5 py-2 font-medium transition-colors duration-500 md:block"
          style={{
            color: scrolled ? "var(--ink)" : "var(--chalk)",
            borderColor: scrolled ? "rgba(7,16,34,0.25)" : "rgba(255,255,255,0.35)",
          }}
        >
          <Roll>Get in touch</Roll>
        </a>

        {/* mobile: plain anchor list is fine at this scale */}
        <a
          href={CONTACT_MAILTO}
          className="t-small rounded-full border px-4 py-1.5 font-medium md:hidden"
          style={{
            color: scrolled ? "var(--ink)" : "var(--chalk)",
            borderColor: scrolled ? "rgba(7,16,34,0.25)" : "rgba(255,255,255,0.35)",
          }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
