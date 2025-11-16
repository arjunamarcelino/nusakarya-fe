"use client";

import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { PrimaryButton } from "../ui/Button";

export function CTASection() {
  const goToRegister = () => {
    window.location.href = '/register';
  };

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-nusa-blue)] rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--color-karya-gold)] rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--color-nusa-blue)] rounded-full blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--color-karya-gold)] rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
      >
        {/* Main Message */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-deep-navy)] mb-6 leading-tight"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          Mulai dari sekarang,<br />
          <span className="text-[var(--color-nusa-blue)]">setiap karya punya bukti.</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-[var(--color-deep-navy)]/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          Bergabunglah dengan kreator dari seluruh Indonesia untuk melindungi karya digital mereka.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PrimaryButton
              onClick={goToRegister}
              className="border-2 border-[var(--color-nusa-blue)] text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)] hover:text-white font-semibold px-8 py-4 text-lg shadow-lg transition-all duration-300 min-w-[200px]"
            >
              Daftar Karya
            </PrimaryButton>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PrimaryButton
              onClick={scrollToGallery}
              className="bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold px-8 py-4 text-lg shadow-lg transition-all duration-300 min-w-[200px]"
            >
              Lihat Karya Terdaftar
            </PrimaryButton>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            { number: "1000+", label: "Karya Terdaftar" },
            { number: "500+", label: "Kreator Aktif" },
            { number: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <AnimatedStatCard
              key={index}
              stat={stat}
              cardVariants={cardVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function AnimatedStatCard({
  stat,
  cardVariants,
}: {
  stat: { number: string; label: string };
  cardVariants: {
    hidden: { opacity: number; scale: number; y: number };
    visible: { opacity: number; scale: number; y: number };
  };
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse the number from string (handles "1000+", "500+", "99.9%")
  const parseNumber = (str: string): { value: number; suffix: string } => {
    if (str.includes("%")) {
      const num = parseFloat(str.replace("%", ""));
      return { value: num, suffix: "%" };
    } else if (str.includes("+")) {
      const num = parseInt(str.replace("+", ""));
      return { value: num, suffix: "+" };
    }
    return { value: parseFloat(str), suffix: "" };
  };

  const { value: targetValue, suffix } = parseNumber(stat.number);

  // Random starting value (between 0 and 30% of target)
  const [startValue] = useState(() =>
    Math.random() * targetValue * 0.3
  );

  const motionValue = useMotionValue(startValue);
  const spring = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const displayValue = useTransform(spring, (latest) => {
    if (suffix === "%") {
      return latest.toFixed(1);
    }
    return Math.floor(latest).toString();
  });

  const [display, setDisplay] = useState(() => {
    if (suffix === "%") {
      return startValue.toFixed(1);
    }
    return Math.floor(startValue).toString();
  });

  useMotionValueEvent(displayValue, "change", (latest) => {
    setDisplay(latest);
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(targetValue);
    }
  }, [isInView, motionValue, targetValue]);

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-[var(--color-nusa-blue)]/5 to-[var(--color-karya-gold)]/5 rounded-xl p-6 border border-[var(--color-nusa-blue)]/20 hover:border-[var(--color-nusa-blue)]/40 transition-all duration-300"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="text-2xl font-bold text-[var(--color-nusa-blue)] mb-2">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-[var(--color-deep-navy)]/70">{stat.label}</div>
    </motion.div>
  );
}
