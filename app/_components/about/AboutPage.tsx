"use client";

import { VisionMission } from "./VisionMission";
import { TimAksara } from "./TimAksara";
import { PartnersSponsors } from "./PartnersSponsors";
import { Contact } from "./Contact";
import { motion } from "framer-motion";

export function AboutPage() {
  return (
    <main className="min-h-screen w-full relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background blurs */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 bg-[var(--color-nusa-blue)] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-[var(--color-karya-gold)] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-36 h-36 bg-[var(--color-nusa-blue)] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10 mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl py-1 font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-6"
          >
            Tentang NusaKarya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--color-slate-gray)] max-w-3xl mx-auto leading-relaxed"
          >
            Platform digital rights berbasis blockchain yang dibangun untuk melindungi karya kreatif Indonesia.
            Kami percaya setiap karya memiliki nilai dan pantas mendapatkan perlindungan yang abadi.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Tim Aksara */}
      <TimAksara />

      {/* Partners & Sponsors */}
      <PartnersSponsors />

      {/* Contact */}
      <Contact />
    </main>
  );
}
