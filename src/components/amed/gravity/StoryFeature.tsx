"use client";

import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_STORY } from "@/lib/amed/rx-content";
import { B_STORY } from "@/lib/amed/b-content";
import { SERIF, LABEL, BRAND_BLUE, Reveal } from "./shared";

/* ------------------------------------------------------------------
   Featured milestones — one lead story beside two stacked secondaries.
   ------------------------------------------------------------------ */

const THUMBS = [
  "/amed/images/grid-02.jpg",
  "/amed/images/grid-01.jpg",
  "/amed/images/grid-03.jpg",
];

const PANEL = "#f4f4f5";

function Tag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-1.5" style={{ background: BRAND_BLUE }} />
      <span style={LABEL}>{label}</span>
    </span>
  );
}

function Meta({ date, source }: { date: string; source: string }) {
  return (
    <p className="text-[13.5px] text-neutral-500">
      {date} <span className="px-1.5">·</span> {source}
    </p>
  );
}

export function StoryFeature() {
  const [lead, ...rest] = RX_STORY.milestones.slice(0, 3);

  return (
    <section className="rx-frame px-6 py-20 md:px-10 md:py-24">
      {/* header */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-6">
          <h2
            className="text-[2rem] leading-none tracking-tight md:text-[2.6rem]"
            style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
          >
            Latest milestones
          </h2>
          <span className="h-8 w-px bg-black/12" />
          <Tag label={B_STORY.chip} />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-6 border-t border-black/10" />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3.5 lg:grid-cols-12">
        {/* lead story */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <a
            href={lead.url ?? "/b/story"}
            target={lead.url ? "_blank" : undefined}
            rel={lead.url ? "noreferrer" : undefined}
            className="group flex h-full flex-col rounded-[1.4rem] p-7 transition-colors md:p-9"
            style={{ background: PANEL }}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <Tag label={lead.tag} />
                <h3
                  className="mt-6 text-[1.6rem] leading-[1.2] md:text-[2rem]"
                  style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
                >
                  {lead.title}
                </h3>
                <div className="mt-6">
                  <Meta date={lead.date} source={lead.source} />
                </div>
              </div>
              <div className="relative h-[15rem] w-full overflow-hidden rounded-2xl md:h-[19rem] md:w-[19rem]">
                <Image
                  src={asset(THUMBS[0])}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 19rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="flex border-t border-black/10 pt-5">
                <span
                  className="inline-flex items-center gap-4 rounded-full py-2 pl-7 pr-2 transition-colors duration-300 group-hover:bg-[#111213]"
                  style={{ border: "1px solid rgba(20,19,26,0.16)" }}
                >
                  <span className="text-[15px] font-medium transition-colors duration-300 group-hover:text-white">
                    Read the story
                  </span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#111213]"
                    style={{ background: "#111213", color: "#fff" }}
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
                </span>
              </div>
            </div>
          </a>
        </Reveal>

        {/* secondaries */}
        <div className="flex flex-col gap-3.5 lg:col-span-5">
          {rest.map((m, i) => (
            <Reveal key={m.title} delay={0.16 + i * 0.08} className="flex-1">
              <a
                href={m.url ?? "/b/story"}
                target={m.url ? "_blank" : undefined}
                rel={m.url ? "noreferrer" : undefined}
                className="group flex h-full flex-col rounded-[1.4rem] p-7 md:p-8"
                style={{ background: PANEL }}
              >
                <Tag label={m.tag} />
                <h3
                  className="mt-5 text-[1.25rem] leading-[1.25] md:text-[1.45rem]"
                  style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
                >
                  {m.title}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-6 pt-7">
                  <Meta date={m.date} source={m.source} />
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={asset(THUMBS[(i + 1) % THUMBS.length])}
                      alt=""
                      fill
                      sizes="8rem"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
