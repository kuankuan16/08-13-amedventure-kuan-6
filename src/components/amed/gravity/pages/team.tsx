"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, TEAM, type TeamMember } from "@/lib/amed/content";
import { B_TEAM } from "@/lib/amed/b-content";
import { SERIF, LABEL, META, BRAND_BLUE, Reveal } from "../shared";
import { PageShell, PageHero } from "../PageShell";

/* ------------------------------------------------------------------
   Team — the roster laid out the way Valo's company page does it:
   a ruled group label, then a four-up grid of square-shouldered
   portraits with the name and role beneath.
   ------------------------------------------------------------------ */

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => !w.endsWith(".") && !w.endsWith(","))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Portrait({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[3/4] w-full items-center justify-center bg-neutral-100">
      <span className="text-5xl" style={{ fontFamily: SERIF, fontWeight: 400, color: BRAND_BLUE }}>
        {initials(member.name)}
      </span>
    </div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [open, setOpen] = useState(false);
  const hasBio = Boolean(member.bio?.length);
  return (
    <Reveal delay={Math.min(index, 4) * 0.06}>
      <div className="group">
        <Portrait member={member} />
        <p className="mt-5 text-[15px] font-bold" style={{ color: "#0a0a0a" }}>
          {member.name}
        </p>
        <p className="mt-1 text-[14.5px] text-neutral-600">{member.role}</p>
        {hasBio ? (
          <>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mt-5 flex w-full items-center gap-2.5 border-t border-black/12 pt-3.5 text-left"
              style={{ ...META, color: "#3f3f46" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                style={{
                  transform: open ? "rotate(-90deg)" : "none",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <path
                  d="M5 12h14m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {open ? "Close" : "Read bio"}
            </button>
            <div
              className="overflow-hidden"
              style={{
                maxHeight: open ? 900 : 0,
                opacity: open ? 1 : 0,
                transition:
                  "max-height 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="space-y-3 pt-4 text-[13.5px] leading-[1.65] text-neutral-600">
                {member.bio?.map((para) => (
                  <p key={para.slice(0, 30)}>{para}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-5 border-t border-black/12" />
        )}
      </div>
    </Reveal>
  );
}

function Group({ label, members }: { label: string; members: readonly TeamMember[] }) {
  return (
    <section className="rx-frame px-6 pb-16 md:px-10 md:pb-20">
      <Reveal>
        <p style={LABEL}>{label}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-4 border-t border-black/15" />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
        {members.map((m, i) => (
          <MemberCard key={m.name} member={m} index={i} />
        ))}
      </div>
    </section>
  );
}

export function TeamB() {
  return (
    <PageShell palette="cyan" active="/b/team">
      <PageHero
        chip={B_TEAM.chip}
        title={B_TEAM.title}
        lead={B_TEAM.lead}
        palette="cyan"
        image={asset("/amed/images/page-team.jpg")}
        word="TEAM"
        imageAlt="The investment team talking together in morning light"
      />

      <div className="pt-4 md:pt-8">
        <Group label={B_TEAM.groups.leadership} members={TEAM.leadership} />
        <Group label={B_TEAM.groups.investment} members={TEAM.investment} />
        <Group label={B_TEAM.groups.advisors} members={TEAM.advisors} />
        <Group label={B_TEAM.groups.operations} members={TEAM.operations} />
      </div>
    </PageShell>
  );
}
