"use client";

import { asset } from "@/lib/amed/content";
import { B_ABOUT } from "@/lib/amed/b-content";
import { RxFocusRows } from "@/components/amed/rx/sections";
import { SERIF, LABEL, Reveal } from "../shared";
import { PageShell, PageHero, MaskedPhoto } from "../PageShell";
import { PrinciplesRow } from "../PrinciplesRow";

export function AboutB() {
  return (
    <PageShell palette="cyan" active="/b/about">
      <PageHero
        chip={B_ABOUT.chip}
        title={B_ABOUT.statement}
        lead={`${B_ABOUT.lead} ${B_ABOUT.leadRest}`}
        palette="cyan"
        image={asset("/amed/images/page-about.jpg")}
        secondary={asset("/amed/images/hero-b-02.jpg")}
        secondaryVideo={asset("/amed/video/about-studio.mp4")}
        word="ABOUT"
        imageAlt="Two partners in conversation beside a bright studio window"
      />

      <PrinciplesRow />

      {/* investment focus — /v2 numbered rows with the hover image panel */}
      <RxFocusRows tone="sky" />

    </PageShell>
  );
}
