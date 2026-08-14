"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_NAV, RX_MAILTO } from "@/lib/amed/rx-content";

/* ------------------------------------------------------------------
   Shared design language for the Version B "Gravity" proposal:
   typography constants, palettes, Reveal entrances, glass surfaces,
   the wheel-lerp smooth scroll, and the fixed header / dark footer.
   ------------------------------------------------------------------ */

/** Design system: two typefaces only — Fraunces (serif) and Satoshi (sans).
 *  MONO keeps its name for the tracked-out label role, but it is Satoshi. */
export const MONO =
  'Satoshi, ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif';
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

/** Scroll indicator: a down arrow inside a thin ring, over a mono label. */
export function ScrollDial({ light = false }: { light?: boolean }) {
  const ink = light ? "rgba(255,255,255,0.88)" : "rgba(20,19,26,0.62)";
  const line = light ? "rgba(255,255,255,0.5)" : "rgba(20,19,26,0.25)";
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="relative flex items-center justify-center overflow-hidden rounded-full"
        style={{ width: 62, height: 62, border: `1px solid ${line}` }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ color: ink, animation: "scroll-dial 2.4s cubic-bezier(0.65,0,0.35,1) infinite" }}
        >
          <path
            d="M12 4v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* letter-spacing leaves a trailing gap after the last glyph, which
          throws the label off-centre under the ring — pull it back */}
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.24em",
          marginRight: "-0.24em",
          color: ink,
        }}
      >
        SCROLL
      </span>
      <style>{`@keyframes scroll-dial {
        0%   { transform: translateY(-9px); opacity: 0; }
        30%  { transform: translateY(0);    opacity: 1; }
        70%  { transform: translateY(0);    opacity: 1; }
        100% { transform: translateY(9px);  opacity: 0; }
      }`}</style>
    </div>
  );
}

/* ---------------- header ------------------------------------------ */

export function GravityHeader({
  visible = true,
  active,
  onMedia = false,
  largeLogo = false,
}: {
  visible?: boolean;
  active?: string;
  /** the bar opens over full-bleed media, so it reverses out until scrolled */
  onMedia?: boolean;
  /** the home hero carries a larger mark */
  largeLogo?: boolean;
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
            className={largeLogo ? "h-9 w-auto md:h-[2.625rem]" : "h-6 w-auto md:h-7"}
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
            // flat: one uniform hairline, no bevel or inset highlight
            background: reversed ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${reversed ? "rgba(255,255,255,0.45)" : "rgba(20,19,26,0.12)"}`,
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
