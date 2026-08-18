"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  SANS,
  RX_WHITE,
  type PaletteKey,
  GravityHeader,
  B_NAV_ALL,
  useSmoothScroll,
  Reveal,
  ChipLabel,
  ScrollDial,
  LABEL,
  BRAND_BLUE,
  BODY_TEXT,
  CARD_TITLE,
  HERO_LEAD,
} from "./shared";
import { RxCta, RxFooter } from "@/components/amed/rx/ui";

/**
 * Page scaffold for /b section pages. The sphere field is exclusive to the
 * home opening (client: 其他頁面不用再出現泡泡) — section pages run on the
 * /v2 system (rx-root) over a white ground, with the B header and footer.
 */
export function PageShell({
  active,
  children,
}: {
  /** kept so pages can keep declaring their accent family */
  palette?: PaletteKey;
  active: string;
  count?: number;
  children: ReactNode;
}) {
  useSmoothScroll();
  return (
    <div className="rx-root overflow-x-clip" style={RX_WHITE}>
      <GravityHeader active={active} onMedia />
      <main className="relative z-10">{children}</main>
      <RxCta />
      <RxFooter nav={B_NAV_ALL} />
    </div>
  );
}

/** Animated scroll cue, identical to the home hero. */
export function ScrollCue() {
  return <ScrollDial />;
}

/**
 * Section opening used on every /b page: mono index label, serif heading and
 * an optional lead — the same rhythm the home page uses between scenes.
 */
export function SectionHead({
  index,
  label,
  title,
  lead,
  palette,
}: {
  index: string;
  label: string;
  title: readonly string[];
  lead?: string;
  palette?: PaletteKey;
}) {
  return (
    <div>
      <Reveal>
        <ChipLabel text={`${index} — ${label}`} color={BRAND_BLUE} />
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="mt-6 max-w-[54rem] text-[2.4rem] leading-[1.02] tracking-tight sm:text-5xl md:text-[64px] md:leading-[0.98]"
          style={{ ...CARD_TITLE, color: "#0a0a0a" }}
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.18}>
          <p className="mt-7 max-w-[34rem]" style={BODY_TEXT}>
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Category word split into per-letter masks — each letter rises into an
 *  overflow-clipped box, staggered (the Jores /about grammar). */
function MaskedWord({ text, shown }: { text: string; shown: boolean }) {
  return (
    <span aria-label={text} className="inline-flex">
      {[...text].map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block"
          style={{ overflow: "clip", verticalAlign: "bottom" }}
        >
          <span
            className="inline-block"
            style={{
              transform: shown ? "translateY(0)" : "translateY(105%)",
              transition: `transform 0.95s cubic-bezier(0.16,1,0.3,1) ${0.28 + i * 0.045}s`,
            }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Page opening (Jores /about grammar): a photo panel slides up from far
 * below, the section's category word grows in over it, and the copy arrives
 * on white below the fold.
 */
export function PageHero({
  chip,
  title,
  lead,
  palette,
  image,
  imageAlt,
  imageClassName,
  mobileImage,
  mobileImageClassName,
  secondary,
  secondaryVideo,
  word,
}: {
  chip: string;
  title: readonly string[];
  lead: string;
  palette?: PaletteKey;
  image: string;
  imageAlt: string;
  /** Per-page crop direction, especially for portrait mobile viewports. */
  imageClassName?: string;
  /** Optional dedicated portrait asset for compact screens. */
  mobileImage?: string;
  mobileImageClassName?: string;
  /** optional wide photo under the copy block */
  secondary?: string;
  /** optional looping clip that replaces the wide photo */
  secondaryVideo?: string;
  /** the big category word, e.g. ABOUT */
  word: string;
}) {
  const [shown, setShown] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 90);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!shown || window.scrollY > 8) return;

    let cancelled = false;
    let raf = 0;
    const wordFinishMs =
      (0.28 + Math.max(0, word.length - 1) * 0.045 + 0.95) * 1000;

    const stop = () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };

    const timer = window.setTimeout(() => {
      const targetElement = document.getElementById("page-hero-content");
      if (!targetElement || cancelled) return;

      const start = window.scrollY;
      const target = Math.round(
        window.scrollY + targetElement.getBoundingClientRect().top,
      );
      const startedAt = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const k = Math.min(1, (now - startedAt) / 900);
        const eased = 1 - Math.pow(1 - k, 3);
        window.scrollTo(0, start + (target - start) * eased);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, wordFinishMs + 1000);

    const interactionEvents: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ];
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, stop, { passive: true, once: true }),
    );

    return () => {
      stop();
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, stop),
      );
    };
  }, [shown, word]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const k = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      if (mediaRef.current) {
        mediaRef.current.style.padding = `${(k * 3.5).toFixed(2)}vh ${(k * 4).toFixed(2)}vw`;
      }
      if (mediaInnerRef.current) {
        mediaInnerRef.current.style.borderRadius = `${(k * 26).toFixed(1)}px`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* 01 — full-bleed frame; it rises in, the category word unmasks over
          it, and it contracts on scroll exactly as the home hero does */}
      <section ref={sectionRef} className="relative h-[100svh] overflow-hidden">
        <div
          ref={mediaRef}
          className="absolute inset-0"
          style={{
            padding: 0,
            transform: shown ? "translateY(0)" : "translateY(54vh)",
            transition: "transform 1.15s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div ref={mediaInnerRef} className="relative h-full w-full overflow-hidden">
            {mobileImage ? (
              <>
                <Image
                  src={mobileImage}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 1px"
                  className={`object-cover md:hidden ${mobileImageClassName ?? "object-center"}`}
                  style={{
                    transform: shown ? "scale(1.04)" : "scale(1.18)",
                    transition: "transform 2.1s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 100vw, 1px"
                  className={`hidden object-cover md:block ${imageClassName ?? "object-center"}`}
                  style={{
                    transform: shown ? "scale(1.04)" : "scale(1.18)",
                    transition: "transform 2.1s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </>
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className={`object-cover ${imageClassName ?? "object-[50%_12%] md:object-center"}`}
                style={{
                  transform: shown ? "scale(1.04)" : "scale(1.18)",
                  transition: "transform 2.1s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(30,36,40,0.54) 0%, rgba(35,41,45,0.42) 48%, rgba(26,32,36,0.5) 100%)",
              }}
            />
          </div>
        </div>

        {/* category word */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1
            className="relative z-10 whitespace-nowrap text-center"
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(3rem, 15vw, 15rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            <MaskedWord text={word} shown={shown} />
          </h1>
        </div>

        {/* baseline */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-8 md:pb-10">
          <ScrollDial light targetId="page-hero-content" />
        </div>
      </section>

      {/* 02 — the copy lands on white */}
      <section id="page-hero-content" className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p style={LABEL}>{chip}</p>
        </Reveal>
        <div className="mt-7 grid items-start gap-9 md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] md:gap-16 lg:gap-24">
          <Reveal delay={0.12}>
            <h2
              className={`tracking-tight text-[2.4rem] leading-[1.0] sm:text-5xl ${
                title.length >= 3 ? "md:text-[62px]" : "md:text-[70px]"
              } md:leading-[0.98]`}
              style={{ ...CARD_TITLE, color: "#0a0a0a" }}
            >
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="max-w-[32rem] md:pt-1" style={HERO_LEAD}>
              {lead}
            </p>
          </Reveal>
        </div>
        {secondaryVideo ? (
          <div className="mt-16 overflow-hidden rounded-[1.4rem] md:mt-20">
            <video
              className="block w-full"
              style={{ aspectRatio: "1180 / 470", objectFit: "cover" }}
              src={secondaryVideo}
              poster={secondary}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ) : secondary ? (
          <MaskedPhoto
            className="mt-16 md:mt-20"
            ratio="1180 / 470"
            src={secondary}
            alt={imageAlt}
          />
        ) : null}
      </section>
    </>
  );
}

/** Notched photo with the vertical mask reveal used across the site. */
export function MaskedPhoto({
  src,
  alt,
  ratio = "631 / 590",
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      <div
        className="relative w-full overflow-hidden rounded-[1.4rem]"
        style={{
          aspectRatio: ratio,
          clipPath: shown ? undefined : "inset(100% 0% 0% 0%)",
          transition: "clip-path 1.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover"
          style={{
            transform: shown ? "scale(1.05)" : "scale(1.24)",
            transition: "transform 1.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}
