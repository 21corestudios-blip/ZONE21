import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const texteFont = localFont({
  src: "./fonts/texte.woff2",
  variable: "--font-texte",
  display: "swap",
});

const titreFont = localFont({
  src: "./fonts/titre.woff2",
  variable: "--font-titre",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZONE 21 | L'Exigence pour Signature",
  description: "Une architecture créative dédiée à l'émergence des maisons de demain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. On ajoute le bouclier sur la balise html
    <html lang="fr" className={`${texteFont.variable} ${titreFont.variable} antialiased`} suppressHydrationWarning>
      {/* 2. On ajoute le bouclier sur la balise body */}
      <body 
        className="bg-[#121110] text-[#EAE8E3] min-h-screen flex flex-col selection:bg-[#C5B39B] selection:text-[#121110]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}