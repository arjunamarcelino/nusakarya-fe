import { motion } from "framer-motion";
import Image from "next/image";
import AppButton from "./AppButton";

export const Hero = ({
}) => {
  return (
    <section className="pt-0 pb-20 relative" id="nusa-karya">
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, delay: 0.2 },
        }}
        src="/images/img-highlight-2.svg"
        className="absolute top-0 left-0"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, delay: 0.2 },
        }}
        viewport={{ once: true }}
        src="/images/img-highlight-1.svg"
        className="absolute top-0 right-0"
      />
      <div className="container mx-auto max-lg:px-6 min-h-[100dvh] flex items-center justify-center ">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.5, delay: 0.2 },
            }}
            className="relative overflow-hidden h-[100dvh] w-full flex items-center justify-center -mt-28"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full"
                style={{
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(30, 77, 139, 0.25) 0%, rgba(12, 32, 57, 0.2) 50%, rgba(30, 77, 139, 0.15) 70%, transparent 100%)',
                  filter: 'blur(40px)',
                  border: '1px solid rgba(30, 77, 139, 0.1)',
                  boxShadow: '0 0 80px rgba(30, 77, 139, 0.2), inset 0 0 60px rgba(12, 32, 57, 0.1)',
                }}
              ></div>
            </div>
            <Image
              src="/images/nusakarya-logo-inverted.png"
              alt="NusaKarya Logo"
              width={500}
              height={500}
              className="object-contain relative z-10"
              priority
            />
          </motion.div>
          <div className="gap-5 flex flex-col">
            <div className="gap-10 flex flex-col lg:items-end ">
              <motion.h1
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, delay: 0.4 },
                }}
                className="text-[48px] lg:text-[64px] lg:whitespace-nowrap font-plusJakartaSansMedium bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent leading-tight lg:text-right"
              >
                Karyamu <br className="max-lg:hidden" />
                Hakmu <br className="max-lg:hidden" />
                Dijaga Blockchain <br className="max-lg:hidden" />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, delay: 0.6 },
                }}
                className="lg:text-right text-[var(--color-slate-gray)] max-w-[535px] font-plusJakartaSansRegular"
              >
                Platform yang membantu kreator melindungi, membuktikan, dan menghargai karyanya secara digital.
                Dari karya lahir nilai — kami memastikan setiap kreator mendapatkan pengakuan dan hak ekonominya secara adil dan transparan.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, delay: 0.2 },
                }}
                className="relative"
              >
                <AppButton className="!py-3 !px-6 !text-base" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
