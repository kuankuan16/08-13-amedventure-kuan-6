import { SmoothScroll } from "@/components/amed/motion";
import { Header } from "@/components/amed/Header";
import { BottomBar } from "@/components/amed/BottomBar";
import { Hero } from "@/components/amed/Hero";
import { Thesis } from "@/components/amed/Thesis";
import { Firm } from "@/components/amed/Firm";
import { Practice } from "@/components/amed/Practice";
import { Team } from "@/components/amed/Team";
import { Portfolio } from "@/components/amed/Portfolio";
import { Approach } from "@/components/amed/Approach";
import { Close } from "@/components/amed/Close";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Thesis />
        <Firm />
        <Practice />
        <Team />
        <Portfolio />
        <Approach />
        <Close />
      </main>
      <BottomBar />
    </SmoothScroll>
  );
}
