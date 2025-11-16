import { motion, useInView } from "framer-motion";
import { FC, forwardRef, useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Feature } from "@/app/_types/feature";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRef4 = useRef<HTMLDivElement>(null);
  const isCard1InView = useInView(cardRef1, { margin: "0px 0px -40% 0px" });
  const isCard2InView = useInView(cardRef2, { margin: "0px 0px -40% 0px" });
  const isCard3InView = useInView(cardRef3, { margin: "0px 0px -40% 0px" });
  const isCard4InView = useInView(cardRef4, { margin: "0px 0px -40% 0px" });
  const CARD_ITEMS = [
    {
      title: "Registrasi & Bukti \n Kepemilikan Digital",
      description:
        "Daftarkan karya dalam bentuk sertifikat digital yang menyimpan informasi kepemilikan, tanggal penciptaan, dan identitas kreator. Semua data terekam rapi dan dapat dibuktikan kembali kapan saja. Bukti ini membantu kreator mempertahankan hak mereka jika muncul klaim dari pihak lain. \n \n 💡 Kenapa penting: Karya tidak lagi “melayang” tanpa identitas. Kreator punya bukti kuat dan sah bahwa karya tersebut miliknya.",
      tryText: null,
      features: [],
      ref: cardRef1,
      isInView: isCard1InView,
      className: "py-20",
    },
    {
      title: "Verifikasi Publik & \n Pemantauan Penggunaan Karya",
      description:
        "Siapa pun dapat mengecek keaslian karya atau status lisensinya dalam hitungan detik. Kreator juga memiliki dashboard untuk memantau aktivitas karya, lisensi aktif, dan pendapatan royalti. Ini menciptakan ruang kreatif yang lebih terbuka dan bertanggung jawab. \n \n 💡Kenapa penting: Plagiarisme berkurang, penggunaan karya menjadi lebih tertib, dan seluruh ekosistem kreatif menjadi lebih terpercaya.",
      tryText: null,
      features: [],
      ref: cardRef2,
      isInView: isCard2InView,
      className: "py-20",
    },
    {
      title: "Lisensi Penggunaan \n Terdokumentasi",
      description:
        "Kreator dapat membuat lisensi penggunaan karya yang jelas, mulai dari komersial, non-komersial, hingga lisensi event. Pengguna karya dapat membeli atau meminta izin dengan proses yang mudah dan transparan. Semua aturan dan persetujuan tersimpan dan bisa dicek kembali kapan saja. \n \n 💡Kenapa penting: Tidak ada lagi kebingungan soal izin. Kreator terlindungi, pengguna pun merasa aman karena memakai karya secara resmi.",
      tryText: "Segera Hadir",
      features: [],
      ref: cardRef3,
      isInView: isCard3InView,
      className: "pt-20 pb-40",
    },
    {
      title: "Royalti Otomatis \n dan Pembagian Multi-Pihak",
      description:
        "Setiap transaksi lisensi akan memicu pembagian royalti secara otomatis ke kreator dan pihak lain yang terlibat. Pembagian bisa diatur sesuai persentase yang disepakati tanpa proses manual. Dengan ini, kreator dapat menikmati hasil karyanya secara berkelanjutan. \n \n 💡Kenapa penting: Pendapatan kreator lebih adil, transparan, dan tidak bergantung pada laporan manual yang sering terlambat atau tidak akurat.",
      tryText: "Segera Hadir",
      features: [],
      ref: cardRef4,
      isInView: isCard4InView,
      className: "py-20",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "bottom center",
                scrub: 1,
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }

      // Animations for circle and map section only
      gsap.to(".sticky-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".sticky-container",
          pinSpacing: true,
        },
      });

      // Circle fill animation
      const circleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      circleTl.to("#circle-path", {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".sticky-container",
        pinSpacing: true,
        onLeaveBack: () => {
          gsap.set(".sticky-container", { clearProps: "all" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 pt-40 lg:px-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3">
          <div ref={cardsRef} className="">
            {CARD_ITEMS.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>

          {/* Fixed animations container with boundaries */}
          <div className="col-span-2 max-lg:hidden">
            <div className="sticky top-1/2 -translate-y-1/2 grid grid-cols-2 gap-8">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 400"
                    className="absolute"
                  >
                    <line
                      x1="200"
                      y1="0"
                      x2="200"
                      y2="400"
                      stroke="var(--color-nusa-blue)"
                      strokeOpacity="0.3"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div ref={circleRef} className="relative z-10">
                  {/* <CircleMiddle /> */}
                  <svg
                    width="69"
                    height="69"
                    viewBox="0 0 69 69"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="1.5"
                      width="67"
                      height="67"
                      rx="33.5"
                      fill="var(--color-ivory-white)"
                      fillOpacity="0.6"
                    />
                    <rect
                      x="0.5"
                      y="1.5"
                      width="67"
                      height="67"
                      rx="33.5"
                      stroke="var(--color-nusa-blue)"
                      strokeOpacity="0.3"
                    />

                    {/* Circle path for animation */}
                    <path
                      id="circle-path"
                      d="M34.5 1.5 A33.5 33.5 0 1 1 34.5 68.5 A33.5 33.5 0 1 1 34.5 1.5"
                      stroke="var(--color-nusa-blue)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="210.487" // Circumference of circle (2 * π * r)
                      strokeDashoffset="210.487" // Start with full offset (hidden)
                    />

                    {/* Center content */}
                    {isCard1InView ? (
                      <Icon1 isInView={isCard1InView} />
                    ) : isCard2InView ? (
                      <Icon2 isInView={isCard2InView} />
                    ) : isCard3InView ? (
                      <Icon3 isInView={isCard3InView} />
                    ) : isCard4InView ? (
                      <Icon4 isInView={isCard4InView} />
                    ) : null}
                  </svg>
                </div>
              </div>

              {/* Map section */}
              <div className="relative max-lg:hidden">
                <div className="w-full border border-[var(--color-nusa-blue)]/30 bg-[var(--color-ivory-white)] rounded-xl relative overflow-hidden">
                  {isCard1InView ? (
                    <motion.img
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{
                        opacity: isCard1InView ? 1 : 0,
                        filter: isCard1InView ? "blur(0px)" : "blur(10px)",
                        transition: { duration: 0.5, delay: 0.2 },
                      }}
                      src="/images/img-feature-1.png"
                      alt="Map"
                      className="w-full h-full object-contain"
                    />
                  ) : isCard2InView ? (
                    <motion.img
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{
                        opacity: isCard2InView ? 1 : 0,
                        filter: isCard2InView ? "blur(0px)" : "blur(10px)",
                        transition: { duration: 0.5, delay: 0.2 },
                      }}
                      src="/images/img-feature-2.png"
                      alt="Map"
                      className="w-full h-full object-contain"
                    />
                  ) : isCard3InView ? (
                    <motion.img
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{
                        opacity: isCard3InView ? 1 : 0,
                        filter: isCard3InView ? "blur(0px)" : "blur(10px)",
                        transition: { duration: 0.5, delay: 0.2 },
                      }}
                      src="/images/img-feature-3.png"
                      alt="Map"
                      className="w-full h-full object-contain"
                    />
                  ) : isCard4InView ? (
                    <motion.img
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{
                        opacity: isCard4InView ? 1 : 0,
                        filter: isCard4InView ? "blur(0px)" : "blur(10px)",
                        transition: { duration: 0.5, delay: 0.2 },
                      }}
                      src="/images/img-feature-4.png"
                      alt="Map"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = forwardRef<
  HTMLDivElement,
  Feature & { className?: string }
>(({ title, description, features, className, tryText }, ref) => {
  return (
    <div ref={ref} className={className}>
      <div className="flex flex-col gap-4 lg:mb-8">
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-[48px] leading-none font-plusJakartaSansMedium text-[var(--color-nusa-blue)] whitespace-pre-line">
            {title}
          </h2>
          {tryText && (
            <button className="w-fit h-fit text-sm border border-[var(--color-nusa-blue)]/30 hover:border-[var(--color-nusa-blue)] transition-all duration-300 py-2 px-4 rounded-full text-[var(--color-nusa-blue)] font-plusJakartaSansRegular flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 bg-[var(--color-karya-gold)] rounded-full" />
              <span className="text-[var(--color-nusa-blue)] font-SourceSans3SemiBold text-xs leading-5">
                {tryText}
              </span>
            </button>
          )}
        </div>
        <p className="text-[var(--color-slate-gray)] mt-[10px] lg:hidden whitespace-pre-line">{description}</p>
      </div>
      <p className="text-[var(--color-slate-gray)] mt-[10px] max-lg:hidden whitespace-pre-line">{description}</p>
      <div className="mt-16">
        {features.map((feature: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-4 font-plusJakartaSansRegular border-b border-[var(--color-nusa-blue)]/30 py-6"
          >
            <span className="text-[var(--color-slate-gray)] text-base rounded-full p-3 py-1 min-w-8 h-8 flex items-center justify-center border border-[var(--color-nusa-blue)]/30 bg-[var(--color-ivory-white)]">
              {index + 1}
            </span>
            <p className="text-[var(--color-slate-gray)] text-sm">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

FeatureCard.displayName = "FeatureCard";

const Icon1 = ({ isInView }: { isInView: boolean }) => (
  <motion.path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M24.0987 44.9013C29.5637 50.3662 38.4363 50.3662 43.9013 44.9013C49.3662 39.4363 49.3662 30.5637 43.9013 25.0987C38.4363 19.6338 29.5637 19.6338 24.0987 25.0987C18.6338 30.5637 18.6338 39.4363 24.0987 44.9013ZM39.1094 38.023L36.2409 41.3506C35.8798 41.7687 35.9268 42.4008 36.3449 42.7609C36.763 43.1219 37.3951 43.075 37.7552 42.6569L41.6219 38.1721C41.9539 37.787 42.0309 37.2429 41.8189 36.7808C41.6078 36.3188 41.1458 36.0227 40.6377 36.0227H26.9962C26.4441 36.0227 25.9961 36.4708 25.9961 37.0229C25.9961 37.5749 26.4441 38.023 26.9962 38.023H39.1094ZM29.4107 31.982L32.6843 28.7084C33.0753 28.3183 33.0753 27.6842 32.6843 27.2941C32.2942 26.9041 31.6601 26.9041 31.27 27.2941C31.27 27.2941 28.0724 30.4917 26.8012 31.7629C26.4291 32.135 26.3181 32.6941 26.5192 33.1802C26.7202 33.6653 27.1943 33.9823 27.7204 33.9823H40.9987C41.5508 33.9823 41.9989 33.5343 41.9989 32.9822C41.9989 32.4301 41.5508 31.982 40.9987 31.982H29.4107Z"
    fill="var(--color-nusa-blue)"
    initial={{ opacity: 0 }}
    animate={{ opacity: isInView ? 1 : 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />
);

const Icon2 = ({ isInView }: { isInView: boolean }) => (
  <>
    <motion.rect
      x="20"
      y="20"
      width="28"
      height="28"
      rx="14"
      fill="var(--color-nusa-blue)"
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
      d="M19.4091 15.612C19.3857 15.6353 19.358 15.6539 19.3274 15.6666C19.2969 15.6792 19.2641 15.6857 19.2311 15.6857C19.198 15.6857 19.1653 15.6792 19.1347 15.6666C19.1041 15.6539 19.0764 15.6353 19.053 15.612L18.5029 15.0622C18.3909 15.3011 18.2658 15.5336 18.128 15.7586L19.1685 16.7991C19.1919 16.8225 19.2104 16.8502 19.2231 16.8807C19.2357 16.9113 19.2422 16.944 19.2422 16.977C19.2422 17.0101 19.2357 17.0428 19.2231 17.0733C19.2104 17.1038 19.1919 17.1316 19.1685 17.1549L17.1547 19.1688C17.1314 19.1922 17.1037 19.2108 17.0732 19.2235C17.0426 19.2362 17.0099 19.2427 16.9769 19.2427C16.9438 19.2427 16.9111 19.2362 16.8805 19.2235C16.85 19.2108 16.8223 19.1922 16.799 19.1688L15.7585 18.1283C15.5333 18.2663 15.3006 18.3916 15.0615 18.5039L15.6112 19.0537C15.6585 19.1009 15.685 19.1649 15.6851 19.2318C15.6851 19.2986 15.6586 19.3627 15.6114 19.4099C15.5642 19.4572 15.5001 19.4838 15.4333 19.4838C15.3665 19.4838 15.3024 19.4573 15.2551 19.4101L14.561 18.7153C14.1905 18.8557 13.8088 18.9646 13.4199 19.0409C13.7361 19.5854 14.1731 20.05 14.6973 20.3988C15.2215 20.7476 15.8187 20.9714 16.443 21.0528C17.0674 21.1342 17.702 21.0711 18.2981 20.8684C18.8942 20.6657 19.4358 20.3287 19.881 19.8836C20.3263 19.4384 20.6633 18.8969 20.8662 18.3008C21.069 17.7048 21.1322 17.0701 21.051 16.4457C20.9697 15.8213 20.7461 15.2239 20.3974 14.6997C20.0487 14.1754 19.5843 13.7382 19.0399 13.4219C18.9636 13.8107 18.8547 14.1925 18.7144 14.5631L19.4091 15.2558C19.4325 15.2792 19.4511 15.307 19.4637 15.3375C19.4764 15.3681 19.4829 15.4008 19.4829 15.4339C19.4829 15.467 19.4764 15.4997 19.4637 15.5303C19.4511 15.5608 19.4325 15.5886 19.4091 15.612ZM19.4091 18.6975L18.6966 19.4101C18.6494 19.4573 18.5853 19.4839 18.5185 19.4839C18.4518 19.4839 18.3877 19.4573 18.3405 19.4101C18.2933 19.3629 18.2667 19.2988 18.2667 19.2321C18.2667 19.1653 18.2933 19.1012 18.3405 19.054L19.0523 18.3421C19.0995 18.2948 19.1635 18.2681 19.2303 18.268C19.297 18.2679 19.3611 18.2943 19.4084 18.3414C19.4558 18.3886 19.4824 18.4526 19.4825 18.5193C19.4827 18.5861 19.4562 18.6502 19.4091 18.6975Z"
      fill="var(--color-ivory-white)"
      transform="translate(20, 20)"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
      d="M19.1629 11.7715C19.1656 11.8523 19.1676 11.9331 19.1676 12.0145C19.1676 12.2995 19.1505 12.5842 19.1165 12.8672C19.8627 13.2599 20.4876 13.8489 20.9237 14.5707C21.3598 15.2924 21.5906 16.1195 21.5913 16.9628C21.5913 19.515 19.515 21.5913 16.9628 21.5913C16.1195 21.5906 15.2924 21.3598 14.5707 20.9237C13.8489 20.4876 13.2599 19.8627 12.8672 19.1165C12.5842 19.1505 12.2995 19.1676 12.0145 19.1676C11.9331 19.1676 11.8523 19.1656 11.7715 19.1629C12.6305 21.1826 14.6327 22.6011 16.9628 22.6011C20.0718 22.6011 22.6011 20.0718 22.6011 16.9628C22.6011 14.6341 21.182 12.6305 19.1629 11.7715Z"
      fill="var(--color-ivory-white)"
      transform="translate(20, 20)"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
      d="M12.0387 16.9855C14.7663 16.9855 16.9855 14.7663 16.9855 12.0387C16.9855 9.31102 14.7663 7.0918 12.0387 7.0918C9.31102 7.0918 7.0918 9.31102 7.0918 12.0387C7.0918 14.7663 9.31102 16.9855 12.0387 16.9855ZM12.8771 15.644H11.2002C11.1335 15.644 11.0695 15.6175 11.0224 15.5704C10.9752 15.5232 10.9487 15.4592 10.9487 15.3925C10.9487 15.3258 10.9752 15.2618 11.0224 15.2146C11.0695 15.1675 11.1335 15.141 11.2002 15.141H12.8771C12.9438 15.141 13.0078 15.1675 13.055 15.2146C13.1022 15.2618 13.1287 15.3258 13.1287 15.3925C13.1287 15.4592 13.1022 15.5232 13.055 15.5704C13.0078 15.6175 12.9438 15.644 12.8771 15.644ZM15.141 11.2002C15.141 11.1335 15.1675 11.0695 15.2146 11.0224C15.2618 10.9752 15.3258 10.9487 15.3925 10.9487C15.4592 10.9487 15.5232 10.9752 15.5704 11.0224C15.6175 11.0695 15.644 11.1335 15.644 11.2002V12.8771C15.644 12.9438 15.6175 13.0078 15.5704 13.055C15.5232 13.1022 15.4592 13.1287 15.3925 13.1287C15.3258 13.1287 15.2618 13.1022 15.2146 13.055C15.1675 13.0078 15.141 12.9438 15.141 12.8771V11.2002ZM11.2002 8.43332H12.8771C12.9438 8.43332 13.0078 8.45982 13.055 8.507C13.1022 8.55417 13.1287 8.61815 13.1287 8.68486C13.1287 8.75157 13.1022 8.81555 13.055 8.86272C13.0078 8.90989 12.9438 8.93639 12.8771 8.93639H11.2002C11.1335 8.93639 11.0695 8.90989 11.0224 8.86272C10.9752 8.81555 10.9487 8.75157 10.9487 8.68486C10.9487 8.61815 10.9752 8.55417 11.0224 8.507C11.0695 8.45982 11.1335 8.43332 11.2002 8.43332ZM10.0264 10.2501C10.0263 10.2207 10.0321 10.1916 10.0433 10.1644C10.0545 10.1373 10.071 10.1126 10.0918 10.0918C10.1126 10.071 10.1373 10.0545 10.1644 10.0433C10.1916 10.0321 10.2207 10.0263 10.2501 10.0264H13.8273C13.8567 10.0263 13.8858 10.0321 13.9129 10.0433C13.9401 10.0545 13.9648 10.071 13.9855 10.0918C14.0063 10.1126 14.0228 10.1373 14.034 10.1644C14.0452 10.1916 14.051 10.2207 14.051 10.2501V13.8273C14.051 13.8567 14.0452 13.8858 14.034 13.9129C14.0228 13.9401 14.0063 13.9648 13.9855 13.9855C13.9648 14.0063 13.9401 14.0228 13.9129 14.034C13.8858 14.0452 13.8567 14.051 13.8273 14.051H10.2501C10.2207 14.051 10.1916 14.0452 10.1644 14.034C10.1373 14.0228 10.1126 14.0063 10.0918 13.9855C10.071 13.9648 10.0545 13.9401 10.0433 13.9129C10.0321 13.8858 10.0263 13.8567 10.0264 13.8273V10.2501ZM8.43332 12.8771V11.2002C8.43332 11.1335 8.45982 11.0695 8.507 11.0224C8.55417 10.9752 8.61815 10.9487 8.68486 10.9487C8.75157 10.9487 8.81555 10.9752 8.86272 11.0224C8.90989 11.0695 8.93639 11.1335 8.93639 11.2002V12.8771C8.93639 12.9438 8.90989 13.0078 8.86272 13.055C8.81555 13.1022 8.75157 13.1287 8.68486 13.1287C8.61815 13.1287 8.55417 13.1022 8.507 13.055C8.45982 13.0078 8.43332 12.9438 8.43332 12.8771Z"
      fill="var(--color-ivory-white)"
      transform="translate(20, 20)"
    />
  </>
);

const Icon3 = ({ isInView }: { isInView: boolean }) => (
  <>
    <motion.rect
      x="20"
      y="20"
      width="28"
      height="28"
      rx="14"
      fill="var(--color-nusa-blue)"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
    />
    <motion.path
      d="M10.0835 14.1C10.3724 13.3666 10.7198 12.6611 11.1255 11.9833C11.5313 11.3055 11.9895 10.6666 12.5002 10.0666L11.6335 9.8833C11.4113 9.83886 11.1946 9.84997 10.9835 9.91663C10.7724 9.9833 10.5891 10.0944 10.4335 10.25L8.33353 12.35C8.16686 12.5166 8.10286 12.7166 8.14153 12.95C8.1802 13.1833 8.31086 13.3444 8.53353 13.4333L10.0835 14.1ZM19.8835 7.59997C18.7058 7.54441 17.5864 7.77219 16.5255 8.2833C15.4646 8.79441 14.5173 9.46663 13.6835 10.3C13.1502 10.8333 12.6806 11.4111 12.2749 12.0333C11.8691 12.6555 11.5166 13.3111 11.2175 14C11.162 14.1444 11.1342 14.2917 11.1342 14.442C11.1342 14.5922 11.1898 14.7226 11.3009 14.8333L13.3842 16.9166C13.4953 17.0277 13.626 17.0833 13.7762 17.0833C13.9264 17.0833 14.0735 17.0555 14.2175 17C14.9064 16.7 15.562 16.3471 16.1842 15.9413C16.8064 15.5355 17.3842 15.0662 17.9175 14.5333C18.7509 13.7 19.4231 12.7529 19.9342 11.692C20.4453 10.6311 20.6729 9.51152 20.6169 8.3333C20.6169 8.24441 20.5946 8.15552 20.5502 8.06663C20.5058 7.97774 20.4502 7.89997 20.3835 7.8333C20.3169 7.76663 20.2391 7.71108 20.1502 7.66663C20.0613 7.62219 19.9724 7.59997 19.8835 7.59997ZM15.6502 12.5666C15.3946 12.3111 15.2669 11.9973 15.2669 11.6253C15.2669 11.2533 15.3946 10.9393 15.6502 10.6833C15.9058 10.4273 16.2198 10.2995 16.5922 10.3C16.9646 10.3004 17.2784 10.4282 17.5335 10.6833C17.7886 10.9384 17.9164 11.2524 17.9169 11.6253C17.9173 11.9982 17.7895 12.312 17.5335 12.5666C17.2775 12.8213 16.9638 12.9491 16.5922 12.95C16.2206 12.9509 15.9066 12.8231 15.6502 12.5666ZM14.1169 18.1333L14.7835 19.6833C14.8724 19.9055 15.0335 20.0389 15.2669 20.0833C15.5002 20.1277 15.7002 20.0666 15.8669 19.9L17.9669 17.8C18.1224 17.6444 18.2335 17.4584 18.3002 17.242C18.3669 17.0255 18.378 16.806 18.3335 16.5833L18.1669 15.7166C17.5558 16.2277 16.9142 16.6862 16.2422 17.092C15.5702 17.4977 14.8618 17.8449 14.1169 18.1333ZM8.7002 16.7C9.08908 16.3111 9.56131 16.1137 10.1169 16.108C10.6724 16.1022 11.1446 16.294 11.5335 16.6833C11.9224 17.0726 12.1169 17.5449 12.1169 18.1C12.1169 18.6551 11.9224 19.1273 11.5335 19.5166C11.0002 20.05 10.3695 20.3666 9.64153 20.4666C8.91353 20.5666 8.18308 20.6666 7.4502 20.7666C7.5502 20.0333 7.65308 19.3029 7.75886 18.5753C7.86464 17.8477 8.17842 17.2226 8.7002 16.7Z"
      fill="var(--color-ivory-white)"
      transform="translate(20.5, 20.5)"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
    />
  </>
);

const Icon4 = ({ isInView }: { isInView: boolean }) => (
  <>
    <motion.rect
      x="20"
      y="20"
      width="28"
      height="28"
      rx="14"
      fill="var(--color-nusa-blue)"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
    />
    <motion.path
      d="M17.3333 10.6667C17.3333 9.5621 18.2288 8.66667 19.3333 8.66667C20.4379 8.66667 21.3333 9.5621 21.3333 10.6667C21.3333 11.7712 20.4379 12.6667 19.3333 12.6667C18.2288 12.6667 17.3333 11.7712 17.3333 10.6667ZM19.3333 7.33333C17.4924 7.33333 16 8.82576 16 10.6667C16 12.5076 17.4924 14 19.3333 14C21.1742 14 22.6667 12.5076 22.6667 10.6667C22.6667 8.82576 21.1742 7.33333 19.3333 7.33333ZM12.6667 15.3333C12.6667 14.2288 13.5621 13.3333 14.6667 13.3333C15.7712 13.3333 16.6667 14.2288 16.6667 15.3333C16.6667 16.4379 15.7712 17.3333 14.6667 17.3333C13.5621 17.3333 12.6667 16.4379 12.6667 15.3333ZM14.6667 12C12.8258 12 11.3333 13.4924 11.3333 15.3333C11.3333 17.1742 12.8258 18.6667 14.6667 18.6667C16.5076 18.6667 18 17.1742 18 15.3333C18 13.4924 16.5076 12 14.6667 12ZM24 15.3333C24 14.2288 24.8954 13.3333 26 13.3333C27.1046 13.3333 28 14.2288 28 15.3333C28 16.4379 27.1046 17.3333 26 17.3333C24.8954 17.3333 24 16.4379 24 15.3333ZM26 12C24.1591 12 22.6667 13.4924 22.6667 15.3333C22.6667 17.1742 24.1591 18.6667 26 18.6667C27.8409 18.6667 29.3333 17.1742 29.3333 15.3333C29.3333 13.4924 27.8409 12 26 12ZM19.3333 16.6667C19.7015 16.6667 20 16.9651 20 17.3333V19.3333C20 19.7015 19.7015 20 19.3333 20C18.9651 20 18.6667 19.7015 18.6667 19.3333V17.3333C18.6667 16.9651 18.9651 16.6667 19.3333 16.6667ZM14.6667 16.6667C15.0349 16.6667 15.3333 16.9651 15.3333 17.3333V19.3333C15.3333 19.7015 15.0349 20 14.6667 20C14.2985 20 14 19.7015 14 19.3333V17.3333C14 16.9651 14.2985 16.6667 14.6667 16.6667ZM26 16.6667C26.3682 16.6667 26.6667 16.9651 26.6667 17.3333V19.3333C26.6667 19.7015 26.3682 20 26 20C25.6318 20 25.3333 19.7015 25.3333 19.3333V17.3333C25.3333 16.9651 25.6318 16.6667 26 16.6667ZM19.3333 21.3333C19.7015 21.3333 20 21.6318 20 22V24C20 24.3682 19.7015 24.6667 19.3333 24.6667C18.9651 24.6667 18.6667 24.3682 18.6667 24V22C18.6667 21.6318 18.9651 21.3333 19.3333 21.3333ZM14.6667 21.3333C15.0349 21.3333 15.3333 21.6318 15.3333 22V24C15.3333 24.3682 15.0349 24.6667 14.6667 24.6667C14.2985 24.6667 14 24.3682 14 24V22C14 21.6318 14.2985 21.3333 14.6667 21.3333ZM26 21.3333C26.3682 21.3333 26.6667 21.6318 26.6667 22V24C26.6667 24.3682 26.3682 24.6667 26 24.6667C25.6318 24.6667 25.3333 24.3682 25.3333 24V22C25.3333 21.6318 25.6318 21.3333 26 21.3333Z"
      fill="var(--color-ivory-white)"
      transform="translate(14, 18)"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      exit={{ opacity: !isInView ? 0 : 1 }}
    />
  </>
);

export default FeaturesSection;
