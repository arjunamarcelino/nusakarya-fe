"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AppButton from "./home/AppButton";
import { useRouter } from "next/navigation";

// Logo Component
function NusaKaryaLogo({ isDarkBg }: { isDarkBg?: boolean }) {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src={isDarkBg ? "/images/nusakarya-logo-inverted.png" : "/images/nusakarya-logo.png"}
        alt="NusaKarya Logo"
        width={32}
        height={32}
        className="object-contain transition-opacity"
        priority
      />
      <span className={`text-2xl font-bold transition-colors ${isDarkBg
          ? "text-[var(--color-ivory-white)]"
          : "text-[var(--color-deep-navy)]"
        }`}>
        NUSAKARYA
      </span>
    </div>
  );
}

export function Header() {
  const [isAboutUs, setIsAboutUs] = useState(false);
  const [isPassHero, setPassHero] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("kenapa-nusakarya");
      if (section) {
        const rect = section.getBoundingClientRect();
        const shouldBeActive = rect.top <= 0 && rect.bottom >= 0;
        if (shouldBeActive !== isAboutUs) {
          setIsAboutUs(shouldBeActive);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAboutUs]);

  useEffect(() => {
    const handleHeroScroll = () => {
      const heroSection = document.getElementById("nusa-karya");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const shouldBeActive = rect.bottom <= 0;
        if (shouldBeActive !== isPassHero) {
          setPassHero(shouldBeActive);
        }
      }
    };
    window.addEventListener("scroll", handleHeroScroll);
    return () => window.removeEventListener("scroll", handleHeroScroll);
  }, [isPassHero]);

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300 py-4 backdrop-blur-md lg:px-32 bg-transparent"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.2 },
          }}
          className="flex items-center gap-1 max-w-[108px] max-h-[30px]"
        >
          <NusaKaryaLogo isDarkBg={isAboutUs} />
        </motion.div>
        <div className="flex items-center gap-6">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: 0.6 },
            }}
            whileHover={{
              scale: 1.1,
              y: -2,
              transition: { type: "spring", stiffness: 300 },
            }}
            onClick={() => router.push("/verify")}
            className={`flex gap-2.5 items-center font-OnestMedium text-sm outline-none group border py-2 px-4 rounded-full transition-colors ${isAboutUs
                ? "border-[var(--color-ivory-white)]/40 bg-[var(--color-ivory-white)]/20 text-[var(--color-ivory-white)] hover:border-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/20 hover:text-[var(--color-karya-gold)]"
                : "border-[var(--color-nusa-blue)]/20 bg-[var(--color-ivory-white)]/50 text-[var(--color-nusa-blue)] hover:border-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/10 hover:text-[var(--color-karya-gold)]"
              }`}
          >
            Verifikasi Karya
          </motion.button>
          {isPassHero && (
            <div>
              <AppButton
                className="h-[38px] text-sm min-w-[64px] px-4"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
