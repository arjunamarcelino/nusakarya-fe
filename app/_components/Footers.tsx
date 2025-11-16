import { motion } from "framer-motion";
import AppButton from "./home/AppButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 lg:px-32 border-t border-[var(--color-nusa-blue)]/20 overflow-hidden relative bg-white">
      <div className="container mx-auto px-6">
        <div className="space-y-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, delay: 0.2 },
            }}
            viewport={{ once: true }}
            className="text-[48px] lg:text-[64px] font-plusJakartaSansMedium bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent leading-tight"
          >
            Karyamu. Hakmu.
            <br className="ml-2 max-lg:hidden" />
            Dijaga Blockchain.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, delay: 0.4 },
            }}
            viewport={{ once: true }}
          >
            <AppButton className="!py-3 !px-6 !text-base" />
          </motion.div>

          <div className="flex max-lg:flex-col justify-center gap-8 lg:justify-between items-center lg:items-end pt-8">
            <div className="max-lg:order-1 flex gap-8 font-plusJakartaSansRegular text-xs">
            </div>
            <div className="flex flex-col items-center lg:items-end gap-6">
              <h3 className="text-[var(--color-deep-navy)]/70 font-plusJakartaSansRegular outline-none">
                Temui Kami
              </h3>
              <div className="flex items-center gap-4">
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3, delay: 0.4 },
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  // onClick={() => navigateTo(X)}
                  className="border border-[var(--color-nusa-blue)]/30 rounded-full p-3 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10 transition-all duration-300 outline-none cursor-pointer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      d="M17.751 3H20.818L14.118 10.625L22 21H15.828L10.995 14.707L5.464 21H2.394L9.561 12.845L2 3H8.328L12.698 8.752L17.751 3ZM16.675 19.172H18.375L7.404 4.732H5.58L16.675 19.172Z"
                      fill="var(--color-nusa-blue)"
                    />
                  </svg>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3, delay: 0.6 },
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  // onClick={() => navigateTo(GITBOOK)}
                  className="border border-[var(--color-nusa-blue)]/30 rounded-full p-3 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10 transition-all duration-300 outline-none cursor-pointer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <g transform="scale(0.369)">
                      <path d="M27.3964 34.2198C30.5255 36.0258 32.09 36.9288 33.8083 36.9303C35.5265 36.9318 37.0926 36.0316 40.2249 34.231L60.1914 22.7537C61.0927 22.2356 61.6484 21.2752 61.6484 20.2355C61.6484 19.1958 61.0927 18.2354 60.1914 17.7173L40.2177 6.23577C37.0888 4.43719 35.5243 3.5379 33.8078 3.53857C32.0912 3.53924 30.5275 4.43975 27.4 6.24077L10.2293 16.1289C10.102 16.2022 10.0384 16.2388 9.97905 16.2735C4.11368 19.7071 0.489862 25.9757 0.441408 32.772C0.440918 32.8407 0.440918 32.9141 0.440918 33.061C0.440918 33.2077 0.440918 33.281 0.441407 33.3496C0.489754 40.1383 4.10549 46.401 9.96041 49.8373C10.0196 49.8721 10.0831 49.9087 10.2102 49.9821L20.9659 56.1921C27.2332 59.8107 30.3668 61.6199 33.8081 61.6211C37.2493 61.6223 40.3842 59.8151 46.6539 56.2008L58.008 49.6554C61.1474 47.8456 62.7171 46.9408 63.579 45.449C64.4409 43.9572 64.4409 42.1454 64.4409 38.5217V31.5215C64.4409 30.5162 63.8965 29.5898 63.0182 29.1006C62.1683 28.6273 61.1325 28.6343 60.2891 29.1191L37.0074 42.5021C35.4454 43.4001 34.6643 43.849 33.8072 43.8493C32.9502 43.8495 32.1689 43.401 30.6063 42.5041L14.8487 33.4589C14.0594 33.0058 13.6647 32.7792 13.3477 32.7383C12.625 32.6451 11.9301 33.0499 11.6548 33.7246C11.5341 34.0206 11.5365 34.4756 11.5414 35.3857C11.545 36.0558 11.5468 36.3908 11.6094 36.6989C11.7497 37.389 12.1127 38.0139 12.6428 38.4774C12.8795 38.6844 13.1696 38.8519 13.7499 39.1868L30.5974 48.9105C32.1641 49.8147 32.9474 50.2668 33.8075 50.2671C34.6677 50.2673 35.4513 49.8156 37.0184 48.9123L57.6684 37.0088C58.2037 36.7002 58.4714 36.546 58.6721 36.6619C58.8727 36.7779 58.8727 37.0868 58.8727 37.7047V40.8798C58.8727 41.7858 58.8727 42.2387 58.6572 42.6117C58.4417 42.9846 58.0493 43.2109 57.2644 43.6633L40.2322 53.4813C37.0966 55.2888 35.5288 56.1925 33.8079 56.1917C32.0869 56.191 30.5199 55.2858 27.386 53.4754L11.4509 44.2704C11.4003 44.2411 11.375 44.2265 11.3514 44.2127C8.01021 42.2603 5.94857 38.6885 5.92923 34.8187C5.92909 34.7914 5.92909 34.7622 5.92909 34.7037V31.7891C5.92909 29.6528 7.06686 27.6783 8.9151 26.607C10.5483 25.6603 12.5628 25.6584 14.1977 26.6021L27.3964 34.2198Z" fill="var(--color-nusa-blue)" />
                    </g>
                  </svg>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3, delay: 0.6 },
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  // onClick={() => navigateTo(TELEGRAM)}
                  className="border border-[var(--color-nusa-blue)]/30 rounded-full p-3 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10 transition-all duration-300 outline-none cursor-pointer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      d="M9.78 18.65L10.06 14.42L17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3L3.64 12C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3L10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z"
                      fill="var(--color-nusa-blue)"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
