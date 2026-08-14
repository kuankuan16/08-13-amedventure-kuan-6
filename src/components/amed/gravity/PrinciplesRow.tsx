"use client";

import { useEffect, useRef } from "react";
import { B_ABOUT } from "@/lib/amed/b-content";
import { SERIF, LABEL } from "./shared";

/* ------------------------------------------------------------------
   The four convictions: they enter as a descending staircase and pull
   level into a single row as the section scrolls through.
   ------------------------------------------------------------------ */

const STAGGER = 132; // px of drop per card at the start

export function PrinciplesRow() {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = root.current;
      if (!el) return;
      if (reduced || !wide.matches) {
        cards.current.forEach((c) => c && (c.style.transform = "none"));
        return;
      }
      const r = el.getBoundingClientRect();
      // 0 when the block first appears, 1 once it has risen through the fold
      const k = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.92 - r.top) / (window.innerHeight * 0.62))
      );
      cards.current.forEach((c, i) => {
        if (!c) return;
        c.style.transform = `translateY(${((1 - k) * i * STAGGER).toFixed(1)}px)`;
        c.style.opacity = String(Math.min(1, 0.25 + k * 1.6));
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="rx-frame px-6 pb-16 md:px-10 md:pb-24">
      <div ref={root} className="border-t border-black/10 pt-14">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {B_ABOUT.principles.map((item, i) => (
            <div
              key={item.index}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="flex h-[17rem] flex-col justify-between rounded-[1.4rem] p-7 md:h-[19rem] md:p-8"
              style={{ background: "#f4f4f5", willChange: "transform" }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-[1.3rem] leading-[1.15] md:text-[1.45rem]"
                  style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
                >
                  {item.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <span className="shrink-0" style={LABEL}>
                  {item.index}
                </span>
              </div>
              <p className="text-[14.5px] leading-[1.6] text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
