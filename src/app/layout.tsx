import type { Metadata } from "next";
import { Inter_Tight, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Surya Prakash Garige — Aeronautical Engineer & Digital Creator",
  description:
    "Aeronautical engineering student crafting cinematic web experiences, AI-powered tools, and aerospace-grade digital products.",
  keywords: [
    "Aeronautical Engineering",
    "Portfolio",
    "Web Developer",
    "AI Engineer",
    "Full Stack Developer",
    "Surya Prakash Garige",
    "Next.js",
    "Three.js",
  ],
  openGraph: {
    title: "Surya Prakash Garige — Aeronautical Engineer & Digital Creator",
    description:
      "Crafting cinematic web experiences, AI-powered tools, and aerospace-grade digital products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Prakash Garige — Aeronautical Engineer & Digital Creator",
    description:
      "Crafting cinematic web experiences, AI-powered tools, and aerospace-grade digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${syne.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
