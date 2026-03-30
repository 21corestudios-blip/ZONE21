import type { Metadata } from 'next';
import Image from 'next/image';

import ContactForm from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez Zone 21 pour une collaboration, une demande sur mesure ou toute question liée à l'écosystème de la maison.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | ZONE 21',
    description:
      "Contactez Zone 21 pour une collaboration, une demande sur mesure ou toute question liée à l'écosystème de la maison.",
    url: '/contact',
    siteName: 'ZONE 21',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <section className="relative h-[50dvh] w-full overflow-hidden bg-[#121110] md:h-[60dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/contact.jpg"
            alt="Bureau Zone 21"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_20%] opacity-90"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/20 to-[#121110]/90 mix-blend-multiply" />

        <div className="absolute bottom-10 left-0 z-30 flex w-full justify-center px-6 md:bottom-16">
          <h1 className="animate-fade-in-up whitespace-nowrap font-serif text-3xl font-light tracking-wide text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Échanger.
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
          <section className="flex flex-col gap-16" aria-labelledby="contact-info-title">
            <div className="flex flex-col gap-6">
              <h2
                id="contact-info-title"
                className="font-serif text-3xl leading-tight text-[#121110] md:text-4xl"
              >
                Entrer dans <br />
                la Zone.
              </h2>

              <p className="max-w-md font-sans text-base font-light leading-relaxed text-[#121110]/70">
                Pour une collaboration, une demande de création sur mesure ou toute question
                concernant nos univers, Zone 21 vous invite à prendre contact. Chaque demande est
                considérée avec exigence, discrétion et attention, dans le prolongement naturel de
                notre manière de concevoir les choses.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#121110]/40">
                  Siège / Studio
                </span>

                <address className="not-italic font-sans text-sm leading-relaxed text-[#121110] md:text-base">
                  ZONE 21
                  <br />
                  Avenue de l&apos;Exigence
                  <br />
                  75008 Paris, France
                </address>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#121110]/40">
                  Contact Direct
                </span>

                <a
                  href="mailto:contact@zone21.com"
                  className="font-sans text-sm text-[#121110] transition-colors duration-300 hover:text-[#121110]/60 md:text-base"
                >
                  contact@zone21.com
                </a>

                <a
                  href="tel:+33100000000"
                  className="font-sans text-sm text-[#121110] transition-colors duration-300 hover:text-[#121110]/60 md:text-base"
                >
                  +33 (0)1 00 00 00 00
                </a>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="sr-only">
              Formulaire de contact
            </h2>

            <ContactForm />
          </section>
        </div>
      </section>
    </main>
  );
}