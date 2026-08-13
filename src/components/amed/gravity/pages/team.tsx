"use client";

import Image from "next/image";
import { TEAM, type TeamMember } from "@/lib/amed/content";
import { MONO, SERIF, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero } from "../PageShell";

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
        <div className="px-2 pb-2 pt-4">
          <p className="text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            {member.name}
          </p>
          <p className="mt-1 text-[13px] text-neutral-500">{member.role}</p>
        </div>
      </Glass>
    </Reveal>
  );
}

function GroupLabel({ text }: { text: string }) {
  return (
    <Reveal>
      <p
        className="uppercase"
        style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.25em", color: pal.chip }}
      >
        [ {text} ]
      </p>
    </Reveal>
  );
}

export function TeamB() {
  return (
    <PageShell palette="cyan" active="/b/team" count={22}>
      <PageHero
        chip="05 — Team"
        title={[TEAM.title]}
        lead={TEAM.intro}
        palette="cyan"
      />

      {/* leadership */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <GroupLabel text="Leadership" />
        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.leadership.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </section>

      {/* investment team with bios */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <GroupLabel text="Investment Team" />
        <div className="mt-8 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {TEAM.investment.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i, 3) * 0.07}>
              <Glass hover innerClassName="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start gap-6">
                  <div className="w-28 shrink-0 md:w-32">
                    <Portrait member={m} sizes="128px" />
                  </div>
                  <div className="pt-1">
                    <p className="text-2xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                      {m.name}
                    </p>
                    <p className="mt-1.5 text-[13px] text-neutral-500">{m.role}</p>
                    <span
                      className="mt-4 block h-2 w-2 rounded-full"
                      style={{ background: pal.accent }}
                    />
                  </div>
                </div>
                {m.bio ? (
                  <div className="mt-6 space-y-3 text-[14px] leading-[1.65] text-neutral-600">
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
      <section className="px-6 pb-32 md:px-12 md:pb-44">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <GroupLabel text="Venture Advisors" />
            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {TEAM.advisors.map((m, i) => (
                <MemberCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
          <div>
            <GroupLabel text="Operations" />
            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
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
