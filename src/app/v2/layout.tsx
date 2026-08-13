import { SmoothScroll } from "@/components/amed/motion";
import { RxNav, RxFooter } from "@/components/amed/rx/ui";

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
        <RxNav />
        <main className="flex-1">{children}</main>
        <RxFooter />
      </div>
    </SmoothScroll>
  );
}
