import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { DecryptedText } from "../ui/DecryptText";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";

export const MainFeatures = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Line 1: Membangun ekosistem - Start from left, move apart
  const x1 = useTransform(scrollYProgress, [0, 1], isMobile ? [-715, 0] : [0, 0]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-600, 0]);

  // Line 2: di mana setiap karya dihargai, - Start from right, move apart
  const x3 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [290, 0]);
  const x4 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [230, 0]);
  const x5 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [160, 0]);
  const x6 = useTransform(scrollYProgress, [0, 1], isMobile ? [140, 0] : [80, 0]);
  const x7 = useTransform(scrollYProgress, [0, 1], isMobile ? [565, 0] : [0, 0]);

  // Line 3: setiap kreator terlindungi, - Start from left, move apart
  const x8 = useTransform(scrollYProgress, [0, 1], isMobile ? [-715, 0] : [0, 0]);
  const x9 = useTransform(scrollYProgress, [0, 1], isMobile ? [-100, 0] : [-200, 0]);
  const x10 = useTransform(scrollYProgress, [0, 1], isMobile ? [-100, 0] : [-400, 0]);

  // Line 4: dan nilai kreatif tumbuh bersama. - Start from right, move apart
  const x11 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [150, 0]);
  const x12 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [120, 0]);
  const x13 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [80, 0]);
  const x14 = useTransform(scrollYProgress, [0, 1], isMobile ? [100, 0] : [40, 0]);
  const x15 = useTransform(scrollYProgress, [0, 1], isMobile ? [690, 0] : [0, 0]);


  return (
    <>
      <section className="relative h-[320vh]">
        <div ref={containerRef} className="relative z-10 h-[300vh]">
          <div className="sticky top-[58px] flex h-[calc(100vh-60px)] flex-col">
            <div className="bg-base-dark-secondary relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 lg:px-12">
              <div className="w-full max-w-[1440px]">
                <div className="relative z-10 flex w-full justify-between text-[32px] font-semibold text-[var(--color-nusa-blue)] lg:text-[72px]">
                  <motion.div style={{ x: x1 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      Membangun
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x2 }}>
                    <DecryptedText
                      animateOnHover={false}
                      duration={1000}
                      startOnView={true}
                      className="text-[var(--color-karya-gold)]"
                    >
                      ekosistem
                    </DecryptedText>
                  </motion.div>
                </div>
                <div className="relative z-10 flex w-full justify-between text-[32px] font-semibold text-[var(--color-nusa-blue)] lg:text-[72px]">
                  <motion.div style={{ x: x3 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      di
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x4 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      mana
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x5 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      setiap
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x6 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      karya
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x7 }}>
                    <DecryptedText
                      animateOnHover={false}
                      duration={1000}
                      startOnView={true}
                      className="text-[var(--color-karya-gold)]"
                    >
                      dihargai,
                    </DecryptedText>
                  </motion.div>
                </div>
                <div className="relative z-10 flex w-full justify-between text-[32px] font-semibold text-[var(--color-nusa-blue)] lg:text-[72px]">
                  <motion.div style={{ x: x8 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      setiap
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x9 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      kreator
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x10 }}>
                    <DecryptedText
                      animateOnHover={false}
                      duration={1000}
                      startOnView={true}
                      className="text-[var(--color-karya-gold)]"
                    >
                      terlindungi,
                    </DecryptedText>
                  </motion.div>
                </div>
                <div className="relative z-10 flex w-full justify-between text-[32px] font-semibold text-[var(--color-nusa-blue)] lg:text-[72px]">
                  <motion.div style={{ x: x11 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      dan
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x12 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      nilai
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x13 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      kreatif
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x14 }}>
                    <DecryptedText
                      animateOnHover={false}
                      duration={1000}
                      startOnView={true}
                      className="text-[var(--color-karya-gold)]"
                    >
                      tumbuh
                    </DecryptedText>
                  </motion.div>
                  <motion.div style={{ x: x15 }}>
                    <DecryptedText animateOnHover={false} duration={1000} startOnView={true}>
                      bersama.
                    </DecryptedText>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};