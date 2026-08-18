"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_NAV } from "@/lib/amed/rx-content";

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

/* ---------------- label system ------------------------------------
   Two roles only:
   • LABEL — section/category labels: Satoshi, 11px, 0.22em, brand blue
   • META  — dates, counts, locations: Satoshi, 11px, 0.08em, muted
   ------------------------------------------------------------------ */

export const LABEL: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: BRAND_BLUE,
};

export const META: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.08em",
  color: "#71717a",
};

/** Shared text roles for Proposal B. Sizes that intentionally respond across
 * breakpoints stay in classes; these objects lock family, weight and rhythm. */
export const CARD_TITLE: React.CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 500,
  letterSpacing: "-0.03em",
};

export const BODY_TEXT: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 17,
  lineHeight: 1.65,
  color: "#52525b",
};

export const HERO_LEAD: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 20,
  lineHeight: 1.55,
  color: "#52525b",
};

export const SUPPORTING_TEXT: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 13.5,
  lineHeight: 1.55,
  color: "#71717a",
};

export const ROLE_TEXT: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.45,
  letterSpacing: "0.035em",
  color: "#71717a",
};

export const CONTROL_TEXT: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
};

export const FIELD_LABEL: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#71717a",
};

export const STORY_TAG: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#5f6267",
};

/** Section/category label. */
export function ChipLabel({ text, color }: { text: string; color?: string }) {
  return (
    <p style={{ ...LABEL, color: color ?? BRAND_BLUE }}>{text}</p>
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
export function ScrollDial({ light = false, targetId }: { light?: boolean; targetId?: string }) {
  const ink = light ? "rgba(255,255,255,0.88)" : "rgba(20,19,26,0.62)";
  const line = light ? "rgba(255,255,255,0.5)" : "rgba(20,19,26,0.25)";
  const toNextScreen = () => {
    // the wheel-lerp scroller owns window scroll, so hand it a target and let
    // it ease there rather than fighting it with smooth-behaviour
    const targetElement = targetId ? document.getElementById(targetId) : null;
    const target = targetElement
      ? Math.round(window.scrollY + targetElement.getBoundingClientRect().top)
      : Math.round(window.innerHeight);
    const start = window.scrollY;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - k, 3);
      window.scrollTo(0, start + (target - start) * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  return (
    <button
      type="button"
      onClick={toNextScreen}
      aria-label="Scroll to the next section"
      className="pointer-events-auto flex cursor-pointer flex-col items-center gap-3 outline-none"
    >
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
    </button>
  );
}

/* ---------------- button ------------------------------------------
   One shape for every call to action: a hairline pill with the label
   left and a filled arrow disc right. Hover fills the pill and inverts
   the disc.
   ------------------------------------------------------------------ */

export function PillButton({
  href,
  label,
  external = false,
  tone = "light",
  className = "",
}: {
  href: string;
  label: string;
  external?: boolean;
  /** "dark" = sitting on a dark ground */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group/pill inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 transition-colors duration-300 md:pl-6 ${className}`}
      style={{
        border: `1px solid ${dark ? "rgba(255,255,255,0.28)" : "rgba(20,19,26,0.16)"}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = dark ? "#ffffff" : INK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span
        className="transition-colors duration-300"
        style={{ ...CONTROL_TEXT, color: dark ? "#ffffff" : INK }}
      >
        <span className="group-hover/pill:hidden">{label}</span>
        <span className="hidden group-hover/pill:inline" style={{ color: dark ? INK : "#ffffff" }}>
          {label}
        </span>
      </span>
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:translate-x-0.5"
        style={{ background: dark ? "#ffffff" : INK, color: dark ? INK : "#ffffff" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  );
}

/** Button counterpart to PillButton for in-page actions such as disclosures. */
export function PillActionButton({
  label,
  onClick,
  type = "button",
  direction = "right",
  expanded,
  controls,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  direction?: "right" | "down" | "up";
  expanded?: boolean;
  controls?: string;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={controls}
      className={`group/action inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 transition-colors duration-300 md:pl-6 ${className}`}
      style={{ border: "1px solid rgba(20,19,26,0.16)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = INK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span className="transition-colors duration-300" style={{ ...CONTROL_TEXT, color: INK }}>
        <span className="group-hover/action:hidden">{label}</span>
        <span className="hidden text-white group-hover/action:inline">{label}</span>
      </span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-300 ${
          direction === "right"
            ? "group-hover/action:translate-x-0.5"
            : direction === "down"
              ? "group-hover/action:translate-y-0.5"
              : "group-hover/action:-translate-y-0.5"
        }`}
        style={{ background: INK }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d={
              direction === "right"
                ? "M9 6l6 6-6 6"
                : direction === "down"
                  ? "M6 9l6 6 6-6"
                  : "M6 15l6-6 6 6"
            }
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const grounded = scrolled || menuOpen;
  const reversed = onMedia && !grounded;

  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
      />
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 ${grounded ? "" : "h-20 md:h-24"}`}
        style={{
          height: grounded ? 72 : undefined,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-16px)",
          background: grounded ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: grounded ? "blur(18px)" : "none",
          WebkitBackdropFilter: grounded ? "blur(18px)" : "none",
          borderBottom: grounded ? "1px solid rgba(20,19,26,0.07)" : "1px solid transparent",
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
            opacity: scrolled && !menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        <div className="rx-frame flex h-full items-center justify-between px-6 md:px-10">
        <Link href="/b" className="pointer-events-auto" onClick={() => setMenuOpen(false)}>
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
        <Link
          href="/b/contact"
          className="group pointer-events-auto hidden items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 transition-colors duration-300 md:flex md:pl-6"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = reversed ? "#ffffff" : INK;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = reversed
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.55)";
          }}
          style={{
            // flat: one uniform hairline, no bevel or inset highlight
            background: reversed ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${reversed ? "rgba(255,255,255,0.45)" : "rgba(20,19,26,0.12)"}`,
          }}
        >
          <span style={CONTROL_TEXT}>
            <span
              className="group-hover:hidden"
              style={{ color: reversed ? "#ffffff" : INK }}
            >
              Contact us
            </span>
            <span
              className="hidden group-hover:inline"
              style={{ color: reversed ? INK : "#ffffff" }}
            >
              Contact us
            </span>
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
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
        </Link>
        <button
          type="button"
          className="pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          style={{
            color: reversed ? "#ffffff" : INK,
            background: reversed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.62)",
            border: `1px solid ${reversed ? "rgba(255,255,255,0.46)" : "rgba(20,19,26,0.14)"}`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="amed-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className="absolute h-px w-[18px] bg-current transition-transform duration-300"
            style={{ transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)" }}
          />
          <span
            className="absolute h-px w-[18px] bg-current transition-transform duration-300"
            style={{ transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)" }}
          />
        </button>
        </div>
      </header>
      {menuOpen ? (
        <div
          id="amed-mobile-navigation"
          className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-8 pt-28 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center">
            {[...B_NAV, { label: "Contact", href: "/b/contact" }].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/12 py-4 text-[2rem] leading-none tracking-[-0.035em]"
                style={{
                  fontFamily: SERIF,
                  color: active === item.href ? BRAND_BLUE : INK,
                }}
              >
                <span>{item.label}</span>
                <span className="text-base" style={{ fontFamily: SANS }} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
          <p style={{ ...META, color: "#71717a" }}>AMED VENTURES · MEDTECH INVESTING</p>
        </div>
      ) : null}
    </>
  );
}

/* ---------------- footer ------------------------------------------ */
