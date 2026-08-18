"use client";

import Link from "next/link";
import { RX_STORY, type RxMilestone } from "@/lib/amed/rx-content";
import { B_STORY } from "@/lib/amed/b-content";
import {
  CARD_TITLE,
  CONTROL_TEXT,
  LABEL,
  Reveal,
  STORY_TAG,
  SUPPORTING_TEXT,
} from "./shared";

/* ------------------------------------------------------------------
   Featured milestones — the asymmetric home layout with the same
   image-free category rail and 50%-opacity hover language as /b/story.
   ------------------------------------------------------------------ */

const STORY_ACCENTS: Record<RxMilestone["tag"], string> = {
  Financing: "#e4d9f3",
  Clinical: "#b9e4aa",
  Regulatory: "#c9d7ef",
  Commercial: "#e7ddc1",
};

function Tag({ label }: { label: string }) {
  return (
    <span
      className="w-fit rounded-[4px] px-3 py-2"
      style={{ ...STORY_TAG, border: "1px solid rgba(20,19,26,0.45)" }}
    >
      {label}
    </span>
  );
}

function Meta({ date, source }: { date: string; source: string }) {
  return (
    <p style={SUPPORTING_TEXT}>
      {date} <span className="px-1.5">·</span> {source}
    </p>
  );
}

function ArrowDisc() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111213] text-white transition-transform duration-300 group-hover:translate-x-0.5">
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
  );
}

function StoryPanel({ item, lead = false }: { item: RxMilestone; lead?: boolean }) {
  const accent = STORY_ACCENTS[item.tag];
  const href = item.url ?? "/b/story";
  const external = Boolean(item.url);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group relative flex h-full overflow-hidden rounded-[1.4rem] bg-[#f4f4f5] ${
        lead ? "min-h-[31rem] p-7 pl-10 md:p-9 md:pl-12" : "min-h-[15.5rem] p-7 pl-10 md:p-8 md:pl-11"
      }`}
    >
      <span
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        style={{ background: accent, opacity: 0.5 }}
        aria-hidden
      />
      <span className="absolute inset-y-0 left-0 z-10 w-3 md:w-4" style={{ background: accent }} aria-hidden />

      <div className="relative z-10 flex w-full flex-col">
        <Tag label={item.tag} />
        <h3
          className={lead ? "mt-7 max-w-[42rem] text-[1.7rem] leading-[1.12] md:text-[2.35rem]" : "mt-6 text-[1.3rem] leading-[1.2] md:text-[1.55rem]"}
          style={{ ...CARD_TITLE, color: "#263227" }}
        >
          {item.title}
        </h3>
        <div className="mt-auto pt-8">
          <Meta date={item.date} source={item.source} />
        </div>
      </div>
    </a>
  );
}

export function StoryFeature() {
  const featuredTags = ["Financing", "Commercial", "Regulatory"] as const;
  const [lead, ...rest] = featuredTags.map(
    (tag) => RX_STORY.milestones.find((item) => item.tag === tag)!
  );

  return (
    <section className="rx-frame px-6 py-20 md:px-10 md:py-24">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <h2
              className="text-[2rem] leading-none tracking-tight md:text-[2.6rem]"
              style={{ ...CARD_TITLE, color: "#0a0a0a" }}
            >
              Latest milestones
            </h2>
            <span className="h-8 w-px bg-black/12" />
            <span style={LABEL}>{B_STORY.chip}</span>
          </div>
          <Link
            href="/b/story"
            className="group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 transition-colors duration-300 hover:bg-[#111213] md:pl-6"
            style={{ border: "1px solid rgba(20,19,26,0.16)" }}
          >
            <span className="transition-colors duration-300 group-hover:text-white" style={CONTROL_TEXT}>
              Read More Story
            </span>
            <ArrowDisc />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-6 border-t border-black/10" />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3.5 lg:grid-cols-12">
        <Reveal delay={0.1} className="lg:col-span-7">
          <StoryPanel item={lead} lead />
        </Reveal>
        <div className="flex flex-col gap-3.5 lg:col-span-5">
          {rest.map((item, index) => (
            <Reveal key={item.title} delay={0.16 + index * 0.08} className="flex-1">
              <StoryPanel item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
