"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  SERIF,
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
    <div className="rx-root" style={RX_WHITE}>
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
          style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
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
          <p className="mt-7 max-w-[34rem] text-base leading-[1.6] text-neutral-700 md:text-[17px]">
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
  secondary,
  word,
}: {
  chip: string;
  title: readonly string[];
  lead: string;
  palette?: PaletteKey;
  image: string;
  imageAlt: string;
  /** optional wide photo under the copy block */
  secondary?: string;
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
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                transform: shown ? "scale(1.04)" : "scale(1.18)",
                transition: "transform 2.1s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <div className="absolute inset-0" style={{ background: "#b4b7bb", mixBlendMode: "multiply" }} />
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
          <ScrollDial light />
        </div>
      </section>

      {/* 02 — the copy lands on white */}
      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p style={LABEL}>{chip}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className={`mt-7 tracking-tight text-[2.4rem] leading-[1.0] sm:text-5xl ${
                  title.length >= 3 ? "md:text-[62px]" : "md:text-[70px]"
                } md:leading-[0.98]`}
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
              >
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <Reveal delay={0.24}>
              <p className="max-w-[30rem] text-base leading-[1.65] md:text-[17px]">{lead}</p>
            </Reveal>
          </div>
        </div>
        {secondary ? (
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
