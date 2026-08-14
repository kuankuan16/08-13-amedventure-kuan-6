"use client";

import Image from "next/image";
import { TEAM, type TeamMember } from "@/lib/amed/content";
import { B_TEAM } from "@/lib/amed/b-content";
import { MONO, SERIF, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.cyan;

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => !w.endsWith(".") && !w.endsWith(","))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Portrait({ member, sizes }: { member: TeamMember; sizes: string }) {
  if (member.photo) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
        <Image src={member.photo} alt={member.name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className="flex aspect-[4/5] items-center justify-center rounded-[1.1rem]"
      style={{ background: pal.soft }}
    >
      <span
        className="text-5xl"
        style={{ fontFamily: SERIF, fontWeight: 400, color: pal.accent }}
      >
        {initials(member.name)}
      </span>
    </div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <Reveal delay={Math.min(index, 5) * 0.06}>
      <Glass hover innerClassName="p-4">
        <Portrait member={member} sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="px-2 pb-2 pt-5">
          <p className="text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            {member.name}
          </p>
          <p className="mt-1.5 text-[13px] text-neutral-500">{member.role}</p>
        </div>
      </Glass>
    </Reveal>
  );
}

export function TeamB() {
  return (
    <PageShell palette="cyan" active="/b/team" count={22}>
      <PageHero
        chip={B_TEAM.chip}
        title={B_TEAM.title}
        lead={B_TEAM.lead}
        palette="cyan"
        pageIndex="04"
      />

      {/* managing partners */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="01"
          label={B_TEAM.groups.leadership}
          title={["The partners", "behind the capital."]}
          palette="cyan"
        />
        <div className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.leadership.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </section>

      {/* investment team with bios */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="02"
          label={B_TEAM.groups.investment}
          title={["Engineers, operators", "and analysts."]}
          palette="cyan"
        />
        <div className="mt-14 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {TEAM.investment.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i, 3) * 0.07}>
              <Glass hover innerClassName="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="w-28 shrink-0 md:w-32">
                    <Portrait member={m} sizes="128px" />
                  </div>
                  <div className="pt-1">
                    <p className="text-2xl md:text-[28px]" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                      {m.name}
                    </p>
                    <p className="mt-2 text-[13px] text-neutral-500">{m.role}</p>
                    <span
                      className="mt-5 block h-2 w-2 rounded-full"
                      style={{ background: pal.accent }}
                    />
                  </div>
                </div>
                {m.bio ? (
                  <div className="mt-7 space-y-3.5 text-[14px] leading-[1.7] text-neutral-600">
                    {m.bio.map((para) => (
                      <p key={para.slice(0, 32)}>{para}</p>
                    ))}
                  </div>
                ) : null}
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* advisors + operations */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="03"
          label="Advisors & operations"
          title={["The wider bench."]}
          palette="cyan"
        />
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal>
              <p
                className="uppercase text-neutral-400"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
              >
                {B_TEAM.groups.advisors}
              </p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {TEAM.advisors.map((m, i) => (
                <MemberCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <p
                className="uppercase text-neutral-400"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
              >
                {B_TEAM.groups.operations}
              </p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {TEAM.operations.map((m, i) => (
                <MemberCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
