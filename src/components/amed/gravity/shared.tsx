"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_NAV, RX_MAILTO, RX_CTA, RX_FOOTER } from "@/lib/amed/rx-content";

/* ------------------------------------------------------------------
   Shared design language for the Version B "Gravity" proposal:
   typography constants, palettes, Reveal entrances, glass surfaces,
   the wheel-lerp smooth scroll, and the fixed header / dark footer.
   ------------------------------------------------------------------ */

export const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
export const SERIF = "var(--font-fraunces), Georgia, serif";
/** 黑體 — the grotesque used for the hero wordmark. */
export const SANS = 'Satoshi, ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif';
export const ACCENT = "#0E7FA5";

export type PaletteKey = "cyan" | "royal" | "rose";

/** Buttons stay gradient-free (優雅摩登): solid ink on light, solid white on dark. */
export const INK = "#111213";

/** AMED brand blue, taken from the logo mark. */
export const BRAND_BLUE = "#00A8D0";

/** White ground across the whole proposal — the spheres carry all the colour.
 *  A barely-there neutral vignette keeps the 3D field from floating on a
 *  dead-flat field; it still reads as white. */
export const WHITE_BG =
  "radial-gradient(circle at center, #ffffff 0%, #ffffff 58%, #f6f7f8 100%)";

export const PALETTES: Record<
  PaletteKey,
  { ball: string; accent: string; chip: string; soft: string; bg: string }
> = {
  cyan: {
    ball: "#00A8D0",
    accent: "#0E7FA5",
    chip: "rgba(14,127,165,0.8)",
    soft: "#EAF7FB",
    bg: WHITE_BG,
  },
  royal: {
    ball: "#2F69FF",
    accent: "#2447C7",
    chip: "rgba(47,105,255,0.85)",
    soft: "#ECEFFF",
    bg: WHITE_BG,
  },
  rose: {
    ball: "#FFC5C2",
    accent: "#D13A56",
    chip: "rgba(209,58,86,0.85)",
    soft: "#FFF5F4",
    bg: WHITE_BG,
  },
};

/** The /v2 section system on a white ground (client: 改回白色背景). */
export const RX_WHITE = { "--rx-paper": "#ffffff" } as React.CSSProperties;

/** RX_NAV remapped onto the /b routes. Contact is omitted from the bar —
 *  the "Contact us" pill already carries it (client). */
export const B_NAV = RX_NAV.filter((item) => item.label !== "Contact").map((item) => ({
  label: item.label,
  href: item.href.replace("/v2", "/b"),
}));

/** Full route list, for the footer columns. */
export const B_NAV_ALL = RX_NAV.map((item) => ({
  label: item.label,
  href: item.href.replace("/v2", "/b"),
}));

/* ---------------- Reveal (IntersectionObserver, once, 45%) -------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(42px)",
        filter: seen ? "blur(0)" : "blur(8px)",
        transition: `opacity 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- glass surface ----------------------------------- */

export function Glass({
  children,
  className = "",
  innerClassName = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.4rem] p-px ${hover ? "transition-transform hover:-translate-y-0.5" : ""} ${className}`}
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
        boxShadow: "0 14px 40px -12px rgba(20,40,80,0.14)",
      }}
    >
      <div
        className={`h-full rounded-[1.35rem] ${innerClassName}`}
        style={{
          background: "rgba(255,255,255,0.32)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Mono chip label, e.g. "[ 02 — The Firm ]" */
export function ChipLabel({ text, color }: { text: string; color?: string }) {
  return (
    <p
      className="uppercase"
      style={{
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: "0.25em",
        color: color ?? BRAND_BLUE,
      }}
    >
      {text}
    </p>
  );
}

/* ---------------- smooth scroll (wheel lerp 0.09) ----------------- */

export function useSmoothScroll(onFrame?: (progress: number) => void) {
  useEffect(() => {
    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const onNativeScroll = () => {
      if (Math.abs(window.scrollY - current) > 2) {
        target = current = window.scrollY;
      }
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      current += (target - current) * 0.09;
      if (Math.abs(target - current) > 0.1) {
        window.scrollTo(0, current);
      }
      onFrame?.(window.scrollY / (window.innerHeight || 1));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
    };
  }, [onFrame]);
}

/* ---------------- header ------------------------------------------ */

export function GravityHeader({
  visible = true,
  active,
  onMedia = false,
}: {
  visible?: boolean;
  active?: string;
  /** the bar opens over full-bleed media, so it reverses out until scrolled */
  onMedia?: boolean;
}) {
  // Past the first fold the bar earns a ground so it never sits on live text,
  // and a hairline tracks reading progress.
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrolled(window.scrollY > 40);
      setProgress(Math.min(1, window.scrollY / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reversed = onMedia && !scrolled;

  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
      />
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-30 ${scrolled ? "" : "h-20 md:h-24"}`}
        style={{
          height: scrolled ? 72 : undefined,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-16px)",
          background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(20,19,26,0.07)" : "1px solid transparent",
          transition:
            "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, height 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease",
        }}
      >
        {/* reading progress — AMED brand blue */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{
            width: "100%",
            background: BRAND_BLUE,
            transform: `scaleX(${progress})`,
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        <div className="rx-frame flex h-full items-center justify-between px-6 md:px-10">
        <Link href="/b" className="pointer-events-auto">
          <Image
            src={asset(
              reversed ? "/amed/brand/amed-logo-dark.png" : "/amed/brand/amed-logo-light.png"
            )}
            alt="AMED Ventures"
            width={1999}
            height={452}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>
        <nav className="pointer-events-auto hidden items-center gap-10 md:flex">
          {B_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium"
              style={{ color: reversed ? "#ffffff" : undefined }}
            >
              {item.label}
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ transform: active === item.href ? "scaleX(1)" : "scaleX(0)" }}
              />
            </Link>
          ))}
        </nav>
        <a
          href={RX_MAILTO}
          className="group pointer-events-auto flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 md:pl-6"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.85)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.7), 0 8px 30px rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="text-[13px] font-medium md:text-sm"
            style={{ color: reversed ? "#ffffff" : undefined }}
          >
            Contact us
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-105"
            style={{
              background: reversed ? "#ffffff" : INK,
              color: reversed ? INK : "#ffffff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
        </div>
      </header>
    </>
  );
}

/* ---------------- footer ------------------------------------------ */

const MARQUEE_WORDS = [
  "Capital that reaches the bedside",
  "Beyond capital",
  "Lives that will be touched",
  "Evidence, execution, endurance",
];

export function GravityFooter() {
  return (
    <footer className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-neutral-950 text-white md:rounded-t-[4rem]">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #33c0e266 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 h-[32rem] w-[32rem] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #0e7fa544 0%, transparent 65%)" }}
      />

      {/* marquee */}
      <div className="overflow-hidden border-b border-white/10 py-5">
        <div
          className="inline-flex whitespace-nowrap"
          style={{ animation: "gravity-marquee 26s linear infinite" }}
        >
          {[0, 1].map((copy) => (
            <span key={copy} className="inline-flex items-center">
              {MARQUEE_WORDS.map((w) => (
                <span key={`${copy}-${w}`} className="inline-flex items-center">
                  <span
                    className="px-8"
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 300,
                      fontSize: "clamp(18px, 3.2vw, 34px)",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    {w}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#33c0e2" }} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="rx-frame px-6 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p
                className="uppercase"
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: BRAND_BLUE,
                }}
              >
                {RX_CTA.chip}
              </p>
              {/* no hard break: the column is narrow, so let the browser
                  balance the lines instead of tearing them */}
              <h2
                className="mt-6 max-w-[15ch] text-[2rem] leading-[1.08] sm:text-[2.4rem] md:text-[3rem] md:leading-[1.05]"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  color: "#ffffff",
                  textWrap: "balance",
                }}
              >
                {RX_CTA.title.join(" ")}
              </h2>
              <a
                href={RX_MAILTO}
                className="group mt-8 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 py-2 pl-7 pr-2 transition-colors hover:bg-white/10"
              >
                <span className="text-base font-medium md:text-lg">{RX_CTA.email}</span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:rotate-45"
                    aria-hidden
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:justify-items-end">
              {[
                { title: "Studio", links: B_NAV_ALL },
                {
                  title: "Offices",
                  links: [
                    { label: RX_CTA.offices[0], href: RX_MAILTO },
                    { label: RX_CTA.offices[1], href: RX_MAILTO },
                  ],
                },
              ].map((col, i) => (
                <Reveal key={col.title} delay={i * 0.08}>
                  <div className="lg:min-w-[11rem]">
                    <p
                      className="uppercase text-white/35"
                      style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.26em" }}
                    >
                      {col.title}
                    </p>
                    <ul
                      className={`mt-5 space-y-2.5 ${
                        col.links.length > 3 ? "grid grid-cols-2 gap-x-6 space-y-0 gap-y-2.5" : ""
                      }`}
                    >
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="text-[13.5px] text-white/70 transition-colors hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-7 md:mt-28 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image
              src={asset("/amed/brand/amed-logo-dark.png")}
              alt="AMED Ventures"
              width={1999}
              height={452}
              className="h-6 w-auto"
            />
            <span className="h-2 w-2 rounded-full" style={{ background: "#33c0e2" }} />
            <span className="text-white/40" style={{ fontFamily: MONO, fontSize: 11 }}>
              {RX_FOOTER.copyright} — {RX_FOOTER.tagline}
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes gravity-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </footer>
  );
}
