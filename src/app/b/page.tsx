import type { Metadata } from "next";
import { GravityB } from "@/components/amed/gravity/GravityB";

export const metadata: Metadata = {
  title: "AMED Ventures — Proposal B · Gravity",
  description:
    "Capital that reaches the bedside. A scroll-driven gravity field proposal for AMED Ventures — early-stage MedTech venture capital across the US and Asia.",
};

export default function VersionBPage() {
  return <GravityB />;
}
