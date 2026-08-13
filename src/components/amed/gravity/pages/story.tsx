"use client";

import { useState } from "react";
import { RX_STORY } from "@/lib/amed/rx-content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero } from "../PageShell";

const pal = PALETTES.royal;

export function StoryB() {
  const [filter, setFilter] = useState<string>("All");
  const milestones =
    filter === "All"
      ? RX_STORY.milestones
      : RX_STORY.milestones.filter((m) => m.tag === filter);

  return (
    <PageShell palette="royal" active="/b/story" count={22}>
      <PageHero chip={`04 — ${RX_STORY.chip}`} title={RX_STORY.title} palette="royal" />

      <section className="px-6 pb-32 md:px-12 md:pb-44">
        {/* filters */}
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
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
          </div>
        </Reveal>

        {/* milestones */}
        <div className="mt-10 flex flex-col gap-3.5">
          {milestones.map((m, i) => (
            <Reveal key={`${m.company}-${m.date}-${m.title.slice(0, 24)}`} delay={Math.min(i, 6) * 0.05}>
              <Glass hover innerClassName="p-6 md:p-7">
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
                  className="mt-4 max-w-4xl text-xl leading-[1.3] md:text-[24px]"
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
