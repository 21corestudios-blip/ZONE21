import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espace Compte',
  description: 'Espace client Zone 21.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-image-preview': 'none',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}