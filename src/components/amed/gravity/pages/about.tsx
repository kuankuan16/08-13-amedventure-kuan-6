"use client";

import Image from "next/image";
import { RX_ABOUT, RX_FOCUS, RX_PHILOSOPHY, RX_PROCESS } from "@/lib/amed/rx-content";
import { MONO, SERIF, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero } from "../PageShell";

const pal = PALETTES.cyan;

export function AboutB() {
  return (
    <PageShell palette="cyan" active="/b/about">
      <PageHero
        chip={`01 — About · ${RX_ABOUT.chip}`}
        title={RX_ABOUT.title}
        lead={RX_ABOUT.body}
        palette="cyan"
      />

      {/* firm highlights */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {RX_ABOUT.highlights.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <Glass hover innerClassName="px-6 py-6">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: MONO, fontSize: 10 }}>0{i + 1}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
                </div>
                <p className="mt-4 text-lg font-semibold" style={{ fontFamily: SERIF }}>
                  {card.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-neutral-500">{card.desc}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* investment focus */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <Reveal>
          <p
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.25em", color: pal.chip }}
          >
            [ 02 — Investment Focus ]
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="mt-6 max-w-3xl text-4xl leading-[1.02] tracking-tight md:text-6xl"
            style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
          >
            {RX_FOCUS.title[0]}
            <br />
            {RX_FOCUS.title[1]}
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-xl text-base leading-[1.55] text-neutral-700 md:text-[17px]">
            {RX_FOCUS.intro}
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-3.5">
          {RX_FOCUS.rows.map((row, i) => (
            <Reveal key={row.index} delay={i * 0.06}>
              <Glass hover innerClassName="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-7">
                <span
                  className="shrink-0"
                  style={{ fontFamily: MONO, fontSize: 12, color: pal.accent }}
                >
                  {row.index}
                </span>
                <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-2xl md:block">
                  <Image
                    src={row.image}
                    alt={row.title}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-2xl md:text-[28px]"
                    style={{ fontFamily: SERIF, fontWeight: 500 }}
                  >
                    {row.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] text-neutral-600">
                    {row.detail}
                  </p>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <p
              className="uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
            >
              {RX_FOCUS.areasLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {RX_FOCUS.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full px-4 py-2 text-[13px] text-neutral-700"
                  style={{
                    border: "1px solid rgba(255,255,255,0.65)",
                    background: "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* philosophy */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <Reveal>
          <p
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.25em", color: pal.chip }}
          >
            [ 03 — {RX_PHILOSOPHY.chip} ]
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="mt-6 text-4xl leading-[1.02] tracking-tight md:text-6xl"
            style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
          >
            {RX_PHILOSOPHY.title[0]}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {RX_PHILOSOPHY.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.07}>
              <Glass hover innerClassName="flex h-full flex-col p-7 md:p-8">
                <span style={{ fontFamily: MONO, fontSize: 11, color: pal.accent }}>
                  {item.index}
                </span>
                <h3
                  className="mt-5 text-2xl leading-snug md:text-[26px]"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-neutral-600">{item.desc}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="px-6 pb-32 md:px-12 md:pb-44">
        <Reveal>
          <p
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.25em", color: pal.chip }}
          >
            [ 04 — {RX_PROCESS.chip} ]
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="mt-6 text-4xl leading-[1.02] tracking-tight md:text-6xl"
            style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
          >
            {RX_PROCESS.title[0]}
            <br />
            {RX_PROCESS.title[1]}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {RX_PROCESS.steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08}>
              <Glass innerClassName="p-7 md:p-8">
                <span
                  className="block text-5xl md:text-6xl"
                  style={{ fontFamily: SERIF, fontWeight: 300, color: pal.accent }}
                >
                  {step.index}
                </span>
                <h3
                  className="mt-6 text-2xl"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-neutral-600">{step.desc}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
