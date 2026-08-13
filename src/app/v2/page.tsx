import type { Metadata } from "next";
import {
  RxHero,
  RxLogoBand,
  RxGlance,
  RxFocusCards,
  RxPhilosophy,
  RxPortfolioGrid,
  RxStoryList,
  RxTeamStrip,
} from "@/components/amed/rx/sections";
import { RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "AMED Ventures — Capital that reaches the bedside",
  description:
    "We back the medical technologies that change what a clinician can actually do — on an ordinary Tuesday morning, in a real hospital.",
};

export default function V2Home() {
  return (
    <>
      <RxHero />
      <RxLogoBand />
      <RxGlance cta={{ label: "More about AMED", href: "/v2/about" }} />
      <RxFocusCards />
      <RxPhilosophy />
      <RxPortfolioGrid featured />
      <RxStoryList limit={3} />
      <RxTeamStrip />
      <RxCta />
    </>
  );
}
