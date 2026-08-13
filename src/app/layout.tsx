import type { Metadata } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AMED Ventures — MedTech Venture Capital",
  description:
    "Founded in the San Francisco Bay Area and Taipei, AMED Ventures is a venture and growth capital investment firm dedicated to the MedTech sector — turning bold ideas into impact that changes how people live, heal, and thrive.",
  openGraph: {
    title: "AMED Ventures",
    description:
      "A venture and growth capital investment firm dedicated to the MedTech sector, founded in the San Francisco Bay Area and Taipei.",
    images: ["/amed/images/hero-stage.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${fraunces.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-instrument), ui-sans-serif, sans-serif" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
