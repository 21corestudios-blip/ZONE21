"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { homeData } from "@/data/home.data";

export default function EditorialManifesto() {
  const { tagline, paragraphs, image } = homeData.manifesto;

  return (
    <section className="w-full bg-[#121110] text-[#EAE8E3] py-32 md:py-40 lg:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        
        {/* COLONNE GAUCHE : TEXTE */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-14 order-1"
        >
          <div className="flex flex-col gap-8 max-w-[42rem]">
            <span className="font-sans text-[0.62rem] uppercase tracking-[0.45em] text-white/38">
              Le Manifeste
            </span>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[4.25rem] leading-[1.02] tracking-[-0.02em] text-white max-w-[12ch] text-balance">
              {tagline}
            </h2>
          </div>

          <div className="flex flex-col gap-8 max-w-[30rem]">
            {paragraphs.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 1.4,
                  delay: 0.2 + index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans text-[0.98rem] md:text-[1.05rem] leading-[1.95] tracking-[0.01em] text-white/68 font-light"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px bg-white/20 origin-left"
          />
        </motion.div>

        {/* COLONNE DROITE : IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden bg-[#2A2826] order-2 min-h-[480px] lg:min-h-0"
        >
          <div className="relative h-full w-full lg:absolute lg:inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[1800ms]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}