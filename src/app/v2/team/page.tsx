import type { Metadata } from "next";
import { RxTeamBlocks } from "@/components/amed/rx/sections";
import { RxPageHeader, RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "Team — AMED Ventures",
  description:
    "Decades of building, investing and operating — from large public companies to early-stage startups.",
};

export default function TeamPage() {
  return (
    <>
      <RxPageHeader
        chip="Investment & operating team"
        title={["Decades of building,", "investing and operating."]}
      />
      <RxTeamBlocks />
      <RxCta />
    </>
  );
}
