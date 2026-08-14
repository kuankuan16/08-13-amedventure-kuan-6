"use client";

import { asset } from "@/lib/amed/content";
import { B_TEAM } from "@/lib/amed/b-content";
import { RxTeamBlocks } from "@/components/amed/rx/sections";
import { PageShell, PageHero } from "../PageShell";

export function TeamB() {
  return (
    <PageShell palette="cyan" active="/b/team">
      <PageHero
        chip={B_TEAM.chip}
        title={B_TEAM.title}
        lead={B_TEAM.lead}
        palette="cyan"
        pageIndex="04"
        image={asset("/amed/images/page-team.jpg")}
        word="TEAM"
        imageAlt="The investment team talking together in morning light"
      />
      {/* /v2 team blocks: grouped roster with full profiles */}
      <RxTeamBlocks />
    </PageShell>
  );
}
