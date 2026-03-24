import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

// Luxury serif font for display/headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Modern, clean sans-serif for body text
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono font for technical details
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
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
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
