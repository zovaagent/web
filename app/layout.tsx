import type { Metadata } from "next";
import { Geist_Mono, Manrope, Michroma } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConceptBanner } from "@/components/dashboard/shell/concept-banner";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-azonix",
});

export const metadata: Metadata = {
  title: "ZOVA – Infrastructure for Autonomous AI",
  description:
    "ZOVA is the intelligence infrastructure that transforms blockchain data into context, memory, and understanding for autonomous AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        manrope.variable,
        geistMono.variable,
        michroma.variable
      )}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{ paddingTop: "var(--concept-banner-h, 0px)" }}
      >
        <ConceptBanner />
        {children}
      </body>
    </html>
  );
}
