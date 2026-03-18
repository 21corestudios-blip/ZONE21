"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO "CONTACT" (Fidèle à notre charte : image sombre, titre en bas) */}
      <section className="relative w-full h-[50dvh] md:h-[60dvh] overflow-hidden bg-[#121110]">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/contact.jpg"
            alt="Bureau Zone 21"
            fill
            priority
            className="object-cover object-[center_20%] opacity-90"
            sizes="100vw"
            quality={100}
          />
        </div>

        {/* Le voile dégradé pour le texte */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/20 to-[#121110]/90 mix-blend-multiply pointer-events-none"></div>

        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up">
            Échanger.
          </h1>
        </div>

      </section>

      {/* 2. LE CONTENU (Informations à gauche, Formulaire à droite) */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Colonne Gauche : Les Coordonnées */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl md:text-4xl text-[#121110] leading-tight">
                Entrer dans <br />la Zone.
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#121110]/70 font-light max-w-md">
                Pour une collaboration, une demande de création sur mesure ou toute question concernant nos univers, Zone 21 vous invite à prendre contact. Chaque demande est considérée avec exigence, discrétion et attention, dans le prolongement naturel de notre manière de concevoir les choses.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {/* Siège Social */}
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[#121110]/40 uppercase">Siège / Studio</span>
                <address className="font-sans text-sm md:text-base text-[#121110] not-italic leading-relaxed">
                  ZONE 21<br />
                  Avenue de l'Exigence<br />
                  75008 Paris, France
                </address>
              </div>

              {/* Contact Direct */}
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[#121110]/40 uppercase">Contact Direct</span>
                <a href="mailto:contact@zone21.com" className="font-sans text-sm md:text-base text-[#121110] hover:text-[#121110]/60 transition-colors duration-300">
                  contact@zone21.com
                </a>
                <a href="tel:+33100000000" className="font-sans text-sm md:text-base text-[#121110] hover:text-[#121110]/60 transition-colors duration-300">
                  +33 (0)1 00 00 00 00
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Le Formulaire Épuré */}
          <div className="flex flex-col justify-center">
            <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Champ Prénom/Nom */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    className="block w-full bg-transparent border-b border-[#121110]/20 py-3 font-sans text-sm text-[#121110] focus:outline-none focus:border-[#121110] transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[#121110]/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[0.55rem] peer-focus:text-[#121110] peer-valid:-top-4 peer-valid:text-[0.55rem]"
                  >
                    Nom complet
                  </label>
                </div>

                {/* Champ Email */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder=" " 
                    className="block w-full bg-transparent border-b border-[#121110]/20 py-3 font-sans text-sm text-[#121110] focus:outline-none focus:border-[#121110] transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[#121110]/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[0.55rem] peer-focus:text-[#121110] peer-valid:-top-4 peer-valid:text-[0.55rem]"
                  >
                    Adresse email
                  </label>
                </div>
              </div>

              {/* Champ Sujet */}
              <div className="relative group">
                <input 
                  type="text" 
                  id="subject" 
                  placeholder=" " 
                  className="block w-full bg-transparent border-b border-[#121110]/20 py-3 font-sans text-sm text-[#121110] focus:outline-none focus:border-[#121110] transition-colors peer"
                  required
                />
                <label 
                  htmlFor="subject" 
                  className="absolute left-0 top-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[#121110]/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[0.55rem] peer-focus:text-[#121110] peer-valid:-top-4 peer-valid:text-[0.55rem]"
                >
                  Sujet de votre demande
                </label>
              </div>

              {/* Champ Message */}
              <div className="relative group">
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder=" " 
                  className="block w-full bg-transparent border-b border-[#121110]/20 py-3 font-sans text-sm text-[#121110] focus:outline-none focus:border-[#121110] transition-colors resize-none peer"
                  required
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[#121110]/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[0.55rem] peer-focus:text-[#121110] peer-valid:-top-4 peer-valid:text-[0.55rem]"
                >
                  Votre message
                </label>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#121110] text-[#EAE8E3] overflow-hidden transition-all duration-500 hover:bg-[#2A2826]"
                >
                  <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase relative z-10">
                    Envoyer le message
                  </span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}