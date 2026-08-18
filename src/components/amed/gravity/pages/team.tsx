"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, TEAM, type TeamMember } from "@/lib/amed/content";
import { B_TEAM } from "@/lib/amed/b-content";
import {
  SERIF,
  LABEL,
  BRAND_BLUE,
  BODY_TEXT,
  CARD_TITLE,
  CONTROL_TEXT,
  ROLE_TEXT,
  Reveal,
  PillActionButton,
} from "../shared";
import { PageShell, PageHero } from "../PageShell";

/* ------------------------------------------------------------------
   Team — horizontal editorial profiles: a large portrait on the left,
   name and role on the right, with the biography action held low in
   the card. The two-up desktop rhythm follows the approved reference.
   ------------------------------------------------------------------ */

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => !w.endsWith(".") && !w.endsWith(","))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

/** Optical rather than mathematical normalization: every face reads at a
 * comparable scale despite the portraits having different original crops. */
const PORTRAIT_CROP: Record<string, { scale: number; position: string }> = {
  "Michael Wang": { scale: 1.06, position: "50% 43%" },
  "William Tai": { scale: 1.2, position: "50% 42%" },
  "Joe Liu": { scale: 1.05, position: "50% 43%" },
  "Michelle Tsai": { scale: 1, position: "50% 43%" },
  "Jeremy Tseng, CFA": { scale: 1.05, position: "50% 42%" },
  "Bin Chou, Ph.D.": { scale: 1.17, position: "50% 41%" },
  "Jonathan Feng": { scale: 1.14, position: "50% 42%" },
  "Dr. TJ Liu": { scale: 1.04, position: "50% 43%" },
  "Fred Shen": { scale: 1.08, position: "50% 42%" },
  "Hank Huang": { scale: 1.08, position: "50% 42%" },
};

function Portrait({ member }: { member: TeamMember }) {
  if (member.photo) {
    const crop = PORTRAIT_CROP[member.name] ?? { scale: 1, position: "50% 44%" };
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) calc(100vw - 4rem), (max-width: 1280px) 46vw, 24vw"
          className="object-cover"
          style={{
            objectPosition: crop.position,
            transform: `scale(${crop.scale})`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-square w-full items-center justify-center bg-neutral-100">
      <span className="text-5xl" style={{ fontFamily: SERIF, fontWeight: 400, color: BRAND_BLUE }}>
        {initials(member.name)}
      </span>
    </div>
  );
}

function EmailButton({ member }: { member: TeamMember }) {
  const subject = encodeURIComponent(`Message for ${member.name} via the AMED Ventures website`);
  return (
    <a
      href={`mailto:info@amedventures.com?subject=${subject}`}
      className="group/email inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#111213] transition-colors duration-300 hover:bg-[#111213] hover:text-white"
      style={{ ...CONTROL_TEXT, border: "1px solid rgba(20,19,26,0.2)" }}
      aria-label={`Email AMED Ventures about ${member.name}`}
      title={`Email AMED Ventures about ${member.name}`}
    >
      <span className="flex items-center justify-center transition-transform duration-300 group-hover/email:scale-105">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="m5 7 7 6 7-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [open, setOpen] = useState(false);
  const hasBio = Boolean(member.bio?.length);
  const bioId = `team-bio-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <Reveal delay={Math.min(index, 3) * 0.06} className="h-full">
      <article className="h-full bg-white p-4 text-[#121619] sm:p-5">
        <div className="grid items-stretch gap-0 sm:grid-cols-[1.04fr_0.96fr]">
          <Portrait member={member} />
          <div className="flex min-h-[15rem] flex-col px-1 pb-1 pt-6 sm:min-h-0 sm:px-6 sm:py-1 lg:px-7">
            <p style={ROLE_TEXT}>
              {member.role}
            </p>
            <h3
              className="mt-5 text-[1.75rem] leading-[1.02] tracking-[-0.035em] md:text-[2rem]"
              style={CARD_TITLE}
            >
              {member.name}
            </h3>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
              {hasBio ? (
                <PillActionButton
                  label={open ? "Close" : "Read More"}
                  onClick={() => setOpen((v) => !v)}
                  expanded={open}
                  controls={bioId}
                  direction={open ? "up" : "down"}
                />
              ) : null}
              <EmailButton member={member} />
            </div>
          </div>
        </div>
        {hasBio ? (
          <div
            id={bioId}
            className="grid overflow-hidden"
            aria-hidden={!open}
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
              transition:
                "grid-template-rows 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="mt-5 space-y-4 border-t border-black/10 px-1 pb-10 pt-5 sm:px-2 sm:pb-12"
                style={BODY_TEXT}
              >
                {member.bio?.map((para) => (
                  <p key={para.slice(0, 30)}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}

function Group({
  label,
  members,
  anchor,
}: {
  label: string;
  members: readonly TeamMember[];
  anchor: string;
}) {
  return (
    <section id={anchor} className="rx-frame scroll-mt-20 px-6 pb-20 md:px-10 md:pb-24">
      <Reveal>
        <p style={LABEL}>{label}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-4 border-t border-black/15" />
      </Reveal>
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
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
        image={asset("/amed/images/team-hero-backlit-right-pair.png")}
        imageClassName="object-center"
        mobileImage={asset("/amed/images/team-hero-backlit-right-pair-mobile.png")}
        mobileImageClassName="object-center"
        word="TEAM"
        imageAlt="Two investment and operating partners walking together through warm ivory backlight"
      />

      <div className="pt-20 md:pt-24" style={{ background: "#f4f4f5" }}>
        <Group label={B_TEAM.groups.leadership} members={TEAM.leadership} anchor="team-roster" />
        <Group label={B_TEAM.groups.investment} members={TEAM.investment} anchor="team-investment" />
        <Group label={B_TEAM.groups.advisors} members={TEAM.advisors} anchor="team-advisors" />
        <Group label={B_TEAM.groups.operations} members={TEAM.operations} anchor="team-operations" />
      </div>
    </PageShell>
  );
}
