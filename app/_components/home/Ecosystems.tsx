import { motion } from "framer-motion";
import { FC } from "react";import { Marquee } from "../ui/Marquee";

const Ecosystem: FC = () => {
  return (
    <section className="w-full pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        viewport={{ once: true }}
        className="relative flex overflow-x-hidden  pb-[100px]"
      >
        <Marquee pauseOnHover className="[--duration:70s] [--gap:64px]">
          {[..."nusakarya"].map((_, index) => (
            <div key={index} className="flex items-start">
              <h2 className="text-[180px] font-OnestSemiBold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-deep-navy)] to-[var(--color-nusa-blue)]">
                NUSAKARYA
              </h2>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Ecosystem;
