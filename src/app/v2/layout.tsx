import { SmoothScroll } from "@/components/amed/motion";
import { RxNav, RxFooter } from "@/components/amed/rx/ui";
import "./rx.css";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {/* Satoshi for UI/body via Fontshare; headings use Fraunces (人文味) */}
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
      />
      <div className="rx-root flex min-h-screen flex-col">
        {/* Photo mask: rounded rect with notched top-right / bottom-left corners
            (geometry measured from the reference shape, 631x590, r=20, notch 64) */}
        <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
          <defs>
            <clipPath id="rx-photo-clip" clipPathUnits="objectBoundingBox">
              <path d="M .0317 0 L .4683 0 A .0317 .0339 0 0 1 .5 .0339 L .5 .0746 A .0317 .0339 0 0 0 .5317 .1085 L .9683 .1085 A .0317 .0339 0 0 1 1 .1424 L 1 .9661 A .0317 .0339 0 0 1 .9683 1 L .5317 1 A .0317 .0339 0 0 1 .5 .9661 L .5 .9254 A .0317 .0339 0 0 0 .4683 .8915 L .0317 .8915 A .0317 .0339 0 0 1 0 .8576 L 0 .0339 A .0317 .0339 0 0 1 .0317 0 Z" />
            </clipPath>
          </defs>
        </svg>
        <RxNav />
        <main className="flex-1">{children}</main>
        <RxFooter />
      </div>
    </SmoothScroll>
  );
}
