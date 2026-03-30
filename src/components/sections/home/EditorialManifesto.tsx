'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { homeData } from '@/data/home.data';

export default function EditorialManifesto() {
  const { tagline, paragraphs, image } = homeData.manifesto;

  return (
    <section className="w-full overflow-hidden bg-[#121110] px-6 py-32 text-[#EAE8E3] md:px-12 md:py-40 lg:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-16 md:gap-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex flex-col justify-between gap-14"
        >
          <div className="flex max-w-[42rem] flex-col gap-8">
            <span className="font-sans text-[0.62rem] uppercase tracking-[0.45em] text-white/38">
              Le Manifeste
            </span>

            <h2 className="max-w-[12ch] text-balance font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-white md:text-5xl lg:text-[4.25rem]">
              {tagline}
            </h2>
          </div>

          <div className="flex max-w-[30rem] flex-col gap-8">
            {paragraphs.map((text, index) => (
              <motion.p
                key={`${index}-${text.slice(0, 24)}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 1.4,
                  delay: 0.2 + index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans text-[0.98rem] font-light leading-[1.95] tracking-[0.01em] text-white/68 md:text-[1.05rem]"
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
            className="h-px w-12 origin-left bg-white/20"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 relative min-h-[480px] w-full overflow-hidden bg-[#2A2826] lg:min-h-0"
        >
          <div className="relative h-full w-full lg:absolute lg:inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-[1800ms] hover:grayscale-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}