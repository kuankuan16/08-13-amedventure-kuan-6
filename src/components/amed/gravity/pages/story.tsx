"use client";

import { useState } from "react";
import { RX_STORY } from "@/lib/amed/rx-content";
import { B_STORY } from "@/lib/amed/b-content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.royal;

export function StoryB() {
  const [filter, setFilter] = useState<string>("All");
  const milestones =
    filter === "All"
      ? RX_STORY.milestones
      : RX_STORY.milestones.filter((m) => m.tag === filter);

  return (
    <PageShell palette="royal" active="/b/story" count={22}>
      <PageHero
        chip={B_STORY.chip}
        title={B_STORY.title}
        lead={B_STORY.lead}
        palette="royal"
        pageIndex="03"
      />

      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="01"
          label="Milestones"
          title={["Progress, in the", "companies' own words."]}
          palette="royal"
        />

        {/* filters */}
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {RX_STORY.filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
                  style={
                    isActive
                      ? { background: INK, color: "#ffffff" }
                      : {
                          border: "1px solid rgba(255,255,255,0.65)",
                          background: "rgba(255,255,255,0.4)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          color: "#404040",
                        }
                  }
                >
                  {f}
                </button>
              );
            })}
            <span
              className="ml-auto self-center uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}
            >
              {String(milestones.length).padStart(2, "0")} milestones
            </span>
          </div>
        </Reveal>

        {/* milestones */}
        <div className="mt-8 flex flex-col gap-3.5">
          {milestones.map((m, i) => (
            <Reveal
              key={`${m.company}-${m.date}-${m.title.slice(0, 24)}`}
              delay={Math.min(i, 6) * 0.05}
            >
              <Glass hover innerClassName="p-7 md:p-8">
                <div
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 uppercase"
                  style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em" }}
                >
                  <span style={{ color: pal.accent }}>{m.date}</span>
                  <span
                    className="rounded-full px-2.5 py-1"
                    style={{ background: pal.soft, color: pal.accent }}
                  >
                    {m.tag}
                  </span>
                  <span className="text-neutral-500">{m.company}</span>
                  <span className="ml-auto hidden text-neutral-400 md:inline">{m.source}</span>
                </div>
                <h3
                  className="mt-5 max-w-4xl text-xl leading-[1.28] md:text-[26px]"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {m.title}
                </h3>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
