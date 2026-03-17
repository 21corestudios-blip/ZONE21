import Image from "next/image";
import { homeData } from "@/data/home.data";

export default function Hero() {
  const { imageDesktop, imageMobile, title } = homeData.hero;

  return (
    // AJOUT : min-h-screen h-screen garantit que la section ne peut physiquement pas disparaître
    <section className="relative w-full min-h-screen h-[100dvh] overflow-hidden bg-[#121110]">
      
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={imageDesktop.src}
          alt={imageDesktop.alt}
          fill
          priority
          className="object-cover object-center animate-image-reveal"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src={imageMobile.src}
          alt={imageMobile.alt}
          fill
          priority
          className="object-cover object-top animate-image-reveal" 
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none"></div>

      <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
        <h1 
          className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up" 
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          {title}
        </h1>
      </div>

    </section>
  );
}