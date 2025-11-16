"use client";

import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { cn } from "@/app/_libs/utils";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Marquee } from "../ui/Marquee";

export default function HomeFeature() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x1 = useTransform(scrollYProgress, [0, 0.4], [140, 0]);
  const x2 = useTransform(scrollYProgress, [0, 0.4], [47, 0]);
  const x3 = useTransform(scrollYProgress, [0, 0.4], [-47, 0]);
  const x4 = useTransform(scrollYProgress, [0, 0.4], [-140, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.4], [-20, 0]);
  const y3 = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const y4 = useTransform(scrollYProgress, [0, 0.4], [-20, 0]);

  const rotateZCard1 = useTransform(scrollYProgress, [0, 0.4], [-6, 0]);
  const rotateZCard2 = useTransform(scrollYProgress, [0, 0.4], [-3, 0]);
  const rotateZCard3 = useTransform(scrollYProgress, [0, 0.4], [3, 0]);
  const rotateZCard4 = useTransform(scrollYProgress, [0, 0.4], [6, 0]);

  const rotateY = useTransform(scrollYProgress, [0.4, 1], [0, 180]);

  const DATA = [
    {
      text3: "Bukti Asli, Sekali untuk Selamanya",
      text4:
        "Setiap karya memiliki identitas digital yang membuktikan siapa pemiliknya secara sah dan permanen.",
      letter: "N",
      topText: "100% AMAN",
      bottomText: "100% AMAN",
      rotateY: rotateY,
      rotateZCard: rotateZCard1,
      x: x1,
      y: y1,
      bgColor: "var(--color-nusa-blue)",
      borderColor: "var(--color-deep-navy)",
      textColor: "var(--color-ivory-white)",
    },
    {
      text3: "Pakai Karya Tanpa Ragu",
      text4:
        "Semua aturan penggunaan karya terdokumentasi jelas, sehingga kreator dan pengguna sama-sama terlindungi.",
      letter: "U",
      topText: "OTOMATIS 24/7",
      bottomText: "OTOMATIS 24/7",
      rotateY: rotateY,
      rotateZCard: rotateZCard2,
      x: x2,
      y: y2,
      bgColor: "var(--color-karya-gold)",
      borderColor: "var(--color-nusa-blue)",
      textColor: "var(--color-deep-navy)",
    },
    {
      text3: "Hasil Karya Kembali ke Kreatornya",
      text4:
        "Setiap lisensi otomatis membagikan royalti ke kreator dan rekan kolaborator tanpa proses manual.",
      letter: "S",
      topText: "0% BIAYA TERSEMBUNYI",
      bottomText: "0% BIAYA TERSEMBUNYI",
      rotateY: rotateY,
      rotateZCard: rotateZCard3,
      x: x3,
      y: y3,
      bgColor: "var(--color-ivory-white)",
      borderColor: "var(--color-nusa-blue)",
      textColor: "var(--color-deep-navy)",
    },
    {
      text3: "Cek Keaslian dalam Hitungan Detik",
      text4:
        "Siapa pun dapat memeriksa apakah karya asli dan berlisensi, sehingga plagiarisme bisa dicegah sejak awal.",
      letter: "A",
      topText: "BERLAKU SELAMANYA",
      bottomText: "BERLAKU SELAMANYA",
      rotateY: rotateY,
      rotateZCard: rotateZCard4,
      x: x4,
      y: y4,
      bgColor: "var(--color-deep-navy)",
      borderColor: "var(--color-nusa-blue)",
      textColor: "var(--color-karya-gold)",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="lg:h-[250vh] w-full bg-base-dark-secondary"
    >
      <div className="lg:sticky top-0 lg:h-screen flex max-lg:flex-col max-lg:relative gap-6 lg:gap-8 max-lg:p-6 w-full items-center justify-center relative overflow-hidden">
        {DATA.map((item, index) => (
          <FlipCard key={index} {...item} index={index} />
        ))}
        <MarqueeItem />
      </div>
    </section>
  );
}

function MarqueeItem() {
  return (
    <motion.div
      initial={{ opacity: 0, y: "2rem", scale: 0.8 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, delay: 0.2 },
      }}
      viewport={{ once: true }}
      className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-0"
    >
      <Marquee repeat={10} className="p-0 [--duration:180s] [--gap:2rem]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="text-[var(--color-nusa-blue)] text-[80px] uppercase font-medium opacity-10 whitespace-nowrap"
            key={index}
          >
            NUSAKARYA
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}

interface FlipCardProps {
  rotateY: MotionValue<number>;
  rotateZCard: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  text3: string;
  text4: string;
  letter: string;
  topText: string;
  bottomText: string;
  index: number;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

function FlipCard({
  rotateY,
  rotateZCard,
  x,
  y,
  text3,
  text4,
  letter,
  topText,
  bottomText,
  index,
  bgColor = "var(--color-nusa-blue)",
  borderColor = "var(--color-deep-navy)",
  textColor = "var(--color-ivory-white)",
}: FlipCardProps) {
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.4, delay: 0.2 * index },
      }}
      viewport={{ once: true }}
      className="relative w-full lg:w-[280px] h-[380px] perspective-1000 z-10"
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          rotateY: isMobile ? 180 : rotateY,
          rotateZ: isMobile ? 0 : rotateZCard,
          x: isMobile ? 0 : x,
          y: isMobile ? 0 : y,
          willChange: "transform, rotateY, rotateZ, x, y",
        }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full">
          <FrontCard bgColor={bgColor} borderColor={borderColor} />
          <div className="absolute top-3 right-4">
            <span
              className="text-xs font-semibold tracking-wider"
              style={{ fontFamily: 'Dangrek, sans-serif', color: textColor }}
            >
              {topText}
            </span>
          </div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <span
              className="text-[140px] lg:text-[160px] font-bold leading-none"
              style={{ color: textColor }}
            >
              {letter}
            </span>
          </div>
          <div className="absolute bottom-3 left-4">
            <span
              className="text-xs font-semibold tracking-wider"
              style={{ fontFamily: 'Dangrek, sans-serif', color: textColor }}
            >
              {bottomText}
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <FrontCard bgColor={bgColor} borderColor={borderColor} />
          <div className="flex z-10 relative h-full flex-col justify-between py-8 px-6">
            <div>
              {/* <ArrowRightTopIcon className="size-8 text-primary ml-auto" /> */}
              <h2 className="text-3xl lg:text-4xl max-w-full" style={{ color: textColor }}>{text3}</h2>
            </div>
            <p className="text-sm max-w-full" style={{ color: textColor, opacity: 0.8 }}>
              {text4}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FrontCard({
  className,
  bgColor = "var(--color-nusa-blue)",
  borderColor = "var(--color-deep-navy)"
}: {
  className?: string;
  bgColor?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full absolute inset-0 rounded-2xl border",
        className
      )}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    />
  );
}
