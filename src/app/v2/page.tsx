import type { Metadata } from "next";
import { RxSite } from "@/components/amed/RxSite";

export const metadata: Metadata = {
  title: "AMED Ventures — Capital that reaches the bedside",
  description:
    "We back the medical technologies that change what a clinician can actually do — on an ordinary Tuesday morning, in a real hospital.",
};

export default function V2Page() {
  return <RxSite />;
}
