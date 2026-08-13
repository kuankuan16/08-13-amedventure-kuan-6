import type { Metadata } from "next";
import { TeamB } from "@/components/amed/gravity/pages/team";

export const metadata: Metadata = {
  title: "Team — AMED Ventures · Proposal B",
  description:
    "The people behind the capital — decades of combined experience across investment, business development and operational management.",
};

export default function TeamBPage() {
  return <TeamB />;
}
