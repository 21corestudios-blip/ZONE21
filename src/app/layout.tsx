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
  metadataBase: new URL("https://zone21.com"),
  title: {
    default: "ZONE 21 | L'Exigence pour Signature",
    template: "%s | ZONE 21",
  },
  description: "Une architecture créative dédiée à l'émergence des maisons de demain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${texteFont.variable} ${titreFont.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body 
        className="bg-[#121110] text-[#EAE8E3] min-h-screen flex flex-col selection:bg-[#C5B39B] selection:text-[#121110]"
        suppressHydrationWarning
      >
        {/* Lien d'évitement pour l'accessibilité */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#EAE8E3] focus:px-3 focus:py-2 focus:text-[#121110] font-medium rounded-md"
        >
          Aller au contenu principal
        </a>

        {/* Le conteneur principal sans Header ni Footer (ils sont gérés dans les Route Groups) */}
        <div id="main-content" className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}