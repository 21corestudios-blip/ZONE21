import Image from "next/image";
import { homeData } from "@/data/home.data";

export default function EditorialManifesto() {
  const { tagline, paragraphs, image } = homeData.manifesto;

  return (
    <section className="relative w-full bg-[#F7F5F0] text-[#121110] py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">

        {/* Colonne Gauche : Sticky */}
        <div className="md:col-span-7 flex flex-col justify-center md:sticky md:top-40">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-[#121110]/40 mb-10 block">
            Le Manifeste
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide text-[#121110] max-w-2xl">
            {tagline}
          </h2>
        </div>

        {/* Colonne Droite : Photo & Textes */}
        <div className="md:col-span-5 flex flex-col gap-16 md:mt-32">
          
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#EAE8E3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-[2000ms] hover:scale-105 ease-[cubic-bezier(0.25,1,0.5,1)]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="flex flex-col gap-8 pr-4">
            {paragraphs.map((text, index) => (
              <p 
                key={index} 
                className="font-sans text-base md:text-lg leading-[2] text-[#121110]/70 font-light"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="w-12 h-[1px] bg-[#121110]/20 mt-8"></div>

        </div>
      </div>
    </section>
  );
}