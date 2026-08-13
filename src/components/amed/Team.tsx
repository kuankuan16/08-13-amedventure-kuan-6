"use client";

import { useRef, useState } from "react";
import { TEAM, type TeamMember } from "@/lib/amed/content";
import { Lines, FadeUp, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "./motion";

function Monogram({ name, tone }: { name: string; tone: "dark" | "light" }) {
  const initials = name
    .replace(/Dr\.\s|,.*$/g, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className="t-small flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-medium tracking-wide"
      style={{
        backgroundColor: tone === "dark" ? "var(--navy-900)" : "#dff2f8",
        color: tone === "dark" ? "var(--cyan-hot)" : "var(--navy-900)",
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  return (
    <li
      className="flex items-center gap-4 border-t py-5"
      style={{ borderColor: "rgba(7,16,34,0.1)" }}
    >
      <Monogram name={member.name} tone="light" />
      <div>
        <p className="t-title" style={{ letterSpacing: "-0.01em" }}>
          {member.name}
        </p>
        <p className="t-small" style={{ color: "var(--ink-60)" }}>
          {member.role}
        </p>
      </div>
    </li>
  );
}

/**
 * Team: leadership + advisors as clean rows, investment team as an
 * accordion with full bios (GSAP height reveal), monogram tiles until
 * professional photography arrives.
 */
export function Team() {
  const root = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(-1);
  const bioRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    bioRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === open ? "auto" : 0,
        autoAlpha: i === open ? 1 : 0,
        duration: 0.8,
        ease: "quint.out",
        overwrite: "auto",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  }, [open]);

  return (
    <section
      id="team"
      ref={root}
      style={{ backgroundColor: "var(--chalk)", color: "var(--ink)" }}
    >
      <div style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(6rem, 14vh, 11rem)" }}>
        <FadeUp>
          <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
            {TEAM.eyebrow}
          </p>
        </FadeUp>
        <Lines as="h2" className="t-display-l mt-8 max-w-[60rem]">
          {TEAM.title}
        </Lines>
        <FadeUp delay={0.15}>
          <p className="t-body-l mt-10 max-w-[44rem]" style={{ color: "var(--ink-60)" }}>
            {TEAM.intro}
          </p>
        </FadeUp>

        <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {/* leadership + advisors + operations */}
          <div>
            <FadeUp>
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                Leadership
              </p>
            </FadeUp>
            <ul className="mt-6">
              {TEAM.leadership.map((m) => (
                <MemberRow key={m.name} member={m} />
              ))}
            </ul>

            <FadeUp className="mt-12">
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                Venture Advisors
              </p>
            </FadeUp>
            <ul className="mt-6">
              {TEAM.advisors.map((m) => (
                <MemberRow key={m.name} member={m} />
              ))}
            </ul>

            <FadeUp className="mt-12">
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                Portfolio Strategy & Operations
              </p>
            </FadeUp>
            <ul className="mt-6">
              {TEAM.operations.map((m) => (
                <MemberRow key={m.name} member={m} />
              ))}
            </ul>
          </div>

          {/* investment team with bios */}
          <div>
            <FadeUp>
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                Investment Team
              </p>
            </FadeUp>
            <div className="mt-6">
              {TEAM.investment.map((m, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={m.name}
                    className="border-t"
                    style={{ borderColor: "rgba(7,16,34,0.1)" }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <Monogram name={m.name} tone="dark" />
                      <span className="flex-1">
                        <span className="t-title block" style={{ letterSpacing: "-0.01em" }}>
                          {m.name}
                        </span>
                        <span className="t-small block" style={{ color: "var(--ink-60)" }}>
                          {m.role}
                        </span>
                      </span>
                      <span
                        className="t-title inline-block transition-transform duration-500"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transitionTimingFunction: "var(--ease-quint)",
                          color: "var(--cyan)",
                        }}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      ref={(el) => {
                        bioRefs.current[i] = el;
                      }}
                      className="overflow-hidden"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <div className="flex flex-col gap-4 pb-7 pl-[3.75rem]">
                        {m.bio?.map((para, j) => (
                          <p key={j} className="t-body" style={{ color: "var(--ink-60)" }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="border-t" style={{ borderColor: "rgba(7,16,34,0.1)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
