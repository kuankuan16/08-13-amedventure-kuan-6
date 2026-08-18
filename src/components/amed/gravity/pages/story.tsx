"use client";

import { useMemo, useRef, useState } from "react";
import { asset } from "@/lib/amed/content";
import { RX_STORY, type RxMilestone } from "@/lib/amed/rx-content";
import { B_STORY } from "@/lib/amed/b-content";
import {
  BRAND_BLUE,
  INK,
  LABEL,
  META,
  Reveal,
  CARD_TITLE,
  CONTROL_TEXT,
  STORY_TAG,
  SUPPORTING_TEXT,
} from "../shared";
import { PageShell, PageHero } from "../PageShell";

const PAGE_SIZE = 9;

const STORY_TONES: Record<RxMilestone["tag"], { surface: string; accent: string }> = {
  Financing: { surface: "#ffffff", accent: "#e4d9f3" },
  Clinical: { surface: "#ffffff", accent: "#b9e4aa" },
  Regulatory: { surface: "#ffffff", accent: "#c9d7ef" },
  Commercial: { surface: "#ffffff", accent: "#e7ddc1" },
};

function StoryCard({ item, index }: { item: RxMilestone; index: number }) {
  const tone = STORY_TONES[item.tag];
  return (
    <Reveal delay={(index % 3) * 0.06} className="h-full">
      <article
        className="group relative flex min-h-[28rem] h-full overflow-hidden p-7 pl-9 text-[#121619] md:min-h-[31rem] md:p-8 md:pl-10"
        style={{ background: tone.surface }}
      >
        <span
          className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"
          style={{ background: tone.accent, opacity: 0.5 }}
          aria-hidden
        />
        <span
          className="absolute inset-y-0 left-0 z-10 w-3 md:w-4"
          style={{ background: tone.accent }}
          aria-hidden
        />
        <div className="relative z-10 flex w-full flex-col">
          <span
            className="w-fit rounded-[4px] px-3 py-2"
            style={{
              ...STORY_TAG,
              border: "1px solid rgba(20,19,26,0.45)",
            }}
          >
            {item.tag}
          </span>
          <div className="mt-auto pt-20">
            {item.date ? (
              <time
                dateTime={item.date}
                className="font-semibold"
                style={{ ...META, color: "#6c7075" }}
              >
                {item.date}
              </time>
            ) : null}
            <h3
              className="mt-4 text-[1.75rem] leading-[1.02] tracking-[-0.035em] md:text-[2rem]"
              style={{ ...CARD_TITLE, color: "#263227" }}
            >
              {item.title}
            </h3>
            <p className="mt-5 line-clamp-2" style={{ ...SUPPORTING_TEXT, color: "#777a7f" }}>
              {item.company} · {item.source}
            </p>
          </div>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex w-fit items-center gap-3"
              style={{ ...CONTROL_TEXT, color: "#666a6e" }}
            >
              <span className="border-b border-current pb-0.5">Read More</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

function ArrowIcon({ previous = false }: { previous?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={previous ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StoryArchive() {
  const [filter, setFilter] = useState<(typeof RX_STORY.filters)[number]>("All");
  const [page, setPage] = useState(1);
  const archiveRef = useRef<HTMLElement>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? [...RX_STORY.milestones]
        : RX_STORY.milestones.filter((item) => item.tag === filter),
    [filter]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const first = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const last = Math.min(page * PAGE_SIZE, filtered.length);

  const selectPage = (next: number) => {
    const safePage = Math.max(1, Math.min(pageCount, next));
    if (safePage === page) return;
    setPage(safePage);
    window.setTimeout(() => archiveRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  return (
    <section
      ref={archiveRef}
      id="story-archive"
      className="scroll-mt-20 py-20 md:py-28"
      style={{ background: "#f4f4f5" }}
    >
      <div className="rx-frame px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-black/15 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p style={LABEL}>Latest milestones</p>
              <h2
                className="mt-4 text-[2.4rem] leading-none tracking-[-0.035em] md:text-[3.8rem]"
                style={{ ...CARD_TITLE, color: INK }}
              >
                Portfolio stories
              </h2>
            </div>
            <p style={{ ...META, color: "#686b70" }}>
              {String(first).padStart(2, "0")}–{String(last).padStart(2, "0")} of{" "}
              {String(filtered.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter stories by category">
            {RX_STORY.filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(item);
                    setPage(1);
                  }}
                  className="rounded-full px-5 py-3 transition-colors duration-300"
                  style={{
                    ...CONTROL_TEXT,
                    border: `1px solid ${active ? INK : "rgba(20,19,26,0.14)"}`,
                    background: active ? INK : "transparent",
                    color: active ? "#ffffff" : INK,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <StoryCard key={`${item.company}-${item.date}-${item.title}`} item={item} index={index} />
          ))}
        </div>

        <Reveal>
          <nav
            className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-black/15 pt-7"
            aria-label="Story pagination"
          >
            <button
              type="button"
              onClick={() => selectPage(page - 1)}
              disabled={page === 1}
              className="inline-flex items-center gap-3 rounded-full px-5 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              style={{ ...CONTROL_TEXT, border: "1px solid rgba(20,19,26,0.16)", color: INK }}
              aria-label="Previous story page"
            >
              <ArrowIcon previous />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => {
                const active = pageNumber === page;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => selectPage(pageNumber)}
                    aria-current={active ? "page" : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                    style={{
                      ...CONTROL_TEXT,
                      fontWeight: 600,
                      background: active ? BRAND_BLUE : "transparent",
                      border: `1px solid ${active ? BRAND_BLUE : "rgba(20,19,26,0.16)"}`,
                      color: active ? "#ffffff" : INK,
                    }}
                    aria-label={`Story page ${pageNumber}`}
                  >
                    {String(pageNumber).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => selectPage(page + 1)}
              disabled={page === pageCount}
              className="inline-flex items-center gap-3 rounded-full px-5 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              style={{ ...CONTROL_TEXT, border: "1px solid rgba(20,19,26,0.16)", color: INK }}
              aria-label="Next story page"
            >
              Next
              <ArrowIcon />
            </button>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

export function StoryB() {
  return (
    <PageShell palette="royal" active="/b/story">
      <PageHero
        chip={B_STORY.chip}
        title={B_STORY.title}
        lead={B_STORY.lead}
        palette="royal"
        image={asset("/amed/images/story-hero-backlit-lavender.png")}
        imageClassName="object-[18%_center] md:object-center"
        word="STORY"
        imageAlt="A founder and venture partner arranging clinical and commercial milestone cards in lavender backlight"
      />
      <StoryArchive />
    </PageShell>
  );
}
