"use client";

import { asset } from "@/lib/amed/content";
import { B_STORY } from "@/lib/amed/b-content";
import { RxStoryList } from "@/components/amed/rx/sections";
import { PageShell, PageHero } from "../PageShell";

export function StoryB() {
  return (
    <PageShell palette="royal" active="/b/story">
      <PageHero
        chip={B_STORY.chip}
        title={B_STORY.title}
        lead={B_STORY.lead}
        palette="royal"
        pageIndex="03"
        image={asset("/amed/images/hero-vc-03.jpg")}
        imageAlt="Investors and founders reviewing growth charts in a sunlit conference room"
      />
      {/* /v2 milestone list: filters, hairline rows, hover detail */}
      <RxStoryList showFilters showHeader={false} />
    </PageShell>
  );
}
