import type { Metadata } from "next";
// On importe l'outil de Next.js conçu spécialement pour vos fichiers locaux
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// 1. VOTRE POLICE POUR LES TEXTES (Remplace Jost)
const texteFont = localFont({
  src: "./fonts/texte.woff2",
  variable: "--font-texte",
  display: "swap",
});

// 2. VOTRE POLICE POUR LES TITRES (Remplace Playfair)
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
    // On injecte vos deux nouvelles polices dans la racine du site
    <html lang="fr" className={`${texteFont.variable} ${titreFont.variable} antialiased`}>
      <body className="bg-[#121110] text-[#EAE8E3] min-h-screen flex flex-col selection:bg-[#C5B39B] selection:text-[#121110]">
        
        {/* LE TOIT DU SITE */}
        <Header />

        {/* LE CORPS DU SITE */}
        <main className="flex-grow">
          {children}
        </main>

        {/* LES FONDATIONS DU SITE */}
        <Footer />

      </body>
    </html>
  );
}