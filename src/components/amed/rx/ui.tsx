"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/amed/content";
import { RX_NAV, RX_MAILTO, RX_CTA, RX_FOOTER } from "@/lib/amed/rx-content";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "../motion";

/* ------------------------------------------------------------------
   Small shared pieces
   ------------------------------------------------------------------ */

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Sparkle() {
  return (
    <span aria-hidden style={{ color: "var(--rx-accent)", fontSize: "1.1rem" }}>
      ✦
    </span>
  );
}

export function MailBadge() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{ background: "var(--rx-blue-soft)", color: "var(--rx-ink)" }}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Number that counts up when it enters the viewport. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          n: value,
          duration: 1.6,
          ease: "quint.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}${suffix}`;
          },
        }),
    });
    return () => trigger.kill();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/** Slide-in-from-left heading, ritovex style. */
export function SlideIn({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, x: -60 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(el, { autoAlpha: 1, x: 0, duration: 1, ease: "quint.out" }),
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Nav (route-aware)
   ------------------------------------------------------------------ */

export function RxNav() {
  const pathname = usePathname();
  return (
    <header
      className="sticky top-0 z-[100]"
      style={{
        background: "rgba(250,248,243,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px dashed var(--rx-line)",
      }}
    >
      <div className="rx-frame flex items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/v2" className="shrink-0">
          <Image
            src={asset("/amed/brand/amed-logo-light.png")}
            alt="AMED Ventures"
            width={1999}
            height={452}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>
        <nav
          className="hidden items-center gap-7 md:flex"
          style={{ color: "var(--rx-ink)", fontWeight: 500 }}
        >
          {RX_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="u-sweep"
                style={{
                  backgroundSize: active ? "100% 1px" : undefined,
                  color: active ? "var(--rx-ink)" : undefined,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <MailBadge />
          <div style={{ lineHeight: 1.25 }}>
            <p className="rx-label">Write any time</p>
            <a
              href={RX_MAILTO}
              className="u-sweep text-sm font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              info@amedventures.com
            </a>
          </div>
        </div>
        <a href={RX_MAILTO} className="rx-btn !py-2.5 !px-4 text-sm lg:hidden">
          Pitch us
        </a>
      </div>
      {/* mobile nav row */}
      <nav
        className="flex items-center gap-5 overflow-x-auto px-6 pb-3 md:hidden"
        style={{ color: "var(--rx-ink)", fontWeight: 500 }}
      >
        {RX_NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------
   Page header for subpages
   ------------------------------------------------------------------ */

export function RxPageHeader({
  chip,
  title,
  lead,
}: {
  chip: string;
  title: readonly string[];
  lead?: string;
}) {
  return (
    <div className="rx-frame px-6 pb-4 pt-14 md:px-10 md:pt-20">
      <span className="rx-chip">{chip}</span>
      <SlideIn as="h1" className="rx-h1 mt-6 max-w-[54rem]">
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </SlideIn>
      {lead ? <p className="rx-lead mt-6 max-w-[34rem]">{lead}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------
   CTA banner + footer
   ------------------------------------------------------------------ */

export function RxCta() {
  return (
    <section style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}>
      <div
        className="rx-frame flex flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-24"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        <div>
          <span
            className="rx-chip"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
          >
            {RX_CTA.chip}
          </span>
          <SlideIn className="rx-h1 mt-6">
            <span style={{ color: "#fff" }}>
              {RX_CTA.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </SlideIn>
          <p className="mt-6 max-w-[30rem]">{RX_CTA.body}</p>
        </div>
        <div className="flex flex-col gap-5">
          <a href={RX_MAILTO} className="rx-btn rx-btn--light">
            {RX_CTA.cta}
          </a>
          <div>
            <p className="rx-label">Email</p>
            <a href={RX_MAILTO} className="u-sweep font-bold" style={{ color: "#fff" }}>
              {RX_CTA.email}
            </a>
          </div>
          <div>
            <p className="rx-label">Offices</p>
            {RX_CTA.offices.map((o) => (
              <p key={o} className="font-bold" style={{ color: "#fff" }}>
                {o}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RxFooter() {
  return (
    <footer style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}>
      <div
        className="rx-frame grid gap-10 px-6 py-14 md:grid-cols-[auto_1fr_auto] md:px-10"
        style={{ borderColor: "var(--rx-dark-line)", borderTop: "1px solid var(--rx-dark-line)" }}
      >
        <div className="max-w-[20rem]">
          <Image
            src={asset("/amed/brand/amed-logo-dark.png")}
            alt="AMED Ventures"
            width={1999}
            height={452}
            className="h-7 w-auto"
          />
          <p className="mt-4 text-sm">{RX_FOOTER.tagline}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-bold" style={{ color: "#fff" }}>
              Taiwan
            </p>
            <p className="text-sm">{RX_FOOTER.addressTW}</p>
          </div>
          <div>
            <p className="mb-3 font-bold" style={{ color: "#fff" }}>
              United States
            </p>
            <p className="text-sm">{RX_FOOTER.addressUS}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:text-right">
          <nav className="flex flex-wrap gap-5 md:justify-end">
            {RX_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="u-sweep text-sm"
                style={{ color: "#fff" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm">{RX_FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
