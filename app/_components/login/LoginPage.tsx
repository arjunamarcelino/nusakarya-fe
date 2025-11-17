"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (ready && authenticated) {
      setIsRedirecting(true);
      // Small delay to show loading state
      setTimeout(() => {
        router.push("/app/dashboard");
      }, 500);
    }
  }, [ready, authenticated, router]);

  // Handle login success - redirect after successful authentication
  const handleLogin = async () => {
    try {
      await login();
      // The useEffect above will handle the redirect once authenticated becomes true
    } catch (error) {
      console.error("Login failed:", error);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Left gradient blur */}
      <div
        className="fixed left-0 top-0 h-full w-[200px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(30, 77, 139, 0.3), rgba(30, 77, 139, 0.1), transparent)',
          filter: 'blur(40px)',
        }}
      />
      {/* Right gradient blur */}
      <div
        className="fixed right-0 top-0 h-full w-[200px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, rgba(30, 77, 139, 0.3), rgba(30, 77, 139, 0.1), transparent)',
          filter: 'blur(40px)',
        }}
      />
      
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Logo and branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.5, delay: 0.2 },
              }}
              className="relative overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full"
                  style={{
                    width: '250px',
                    height: '250px',
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
                width={400}
                height={400}
                className="object-contain relative z-10"
                priority
              />
            </motion.div>

            {/* Right side - Login form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: 0.4 },
              }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.6 },
                  }}
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent"
                >
                  Masuk ke NusaKarya
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.8 },
                  }}
                  className="text-sm text-[var(--color-slate-gray)] max-w-md"
                >
                  Mulai lindungi karya kreatif Anda dengan teknologi blockchain. 
                  Masuk untuk mengakses dashboard dan kelola karya Anda.
                </motion.p>
              </div>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 1 },
                }}
                className="rounded-2xl p-8 border border-[var(--color-nusa-blue)]/30 backdrop-blur-md bg-[var(--color-nusa-blue)]/5"
              >
                {isRedirecting ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
                    <p className="text-sm text-[var(--color-slate-gray)] text-center">
                      Login berhasil! Mengarahkan ke dashboard...
                    </p>
                  </div>
                ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-2">
                      Pilih Metode Login
                    </h2>
                    <p className="text-sm text-[var(--color-slate-gray)]">
                      Gunakan metode login yang paling nyaman untuk Anda
                    </p>
                  </div>

                  {ready ? (
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={handleLogin}
                        className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%] transition-all duration-500 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                      >
                        Masuk dengan Privy
                      </button>
                      
                      <div className="relative flex items-center gap-4">
                        <div className="flex-1 border-t border-[var(--color-nusa-blue)]/20"></div>
                        <span className="text-sm text-[var(--color-slate-gray)]">
                          atau
                        </span>
                        <div className="flex-1 border-t border-[var(--color-nusa-blue)]/20"></div>
                      </div>

                      {/* Google Login */}
                      <button
                        disabled
                        className="w-full px-6 py-4 rounded-lg font-semibold text-[var(--color-slate-gray)] border border-[var(--color-nusa-blue)]/30 bg-transparent hover:border-[var(--color-nusa-blue)]/50 transition-all duration-300 flex items-center justify-center gap-3 relative group cursor-not-allowed opacity-60"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Masuk dengan Google</span>
                        <span className="absolute -top-1 -right-1 bg-[var(--color-karya-gold)] text-[var(--color-deep-navy)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Segera Hadir
                        </span>
                      </button>

                      {/* Email Login */}
                      <button
                        disabled
                        className="w-full px-6 py-4 rounded-lg font-semibold text-[var(--color-slate-gray)] border border-[var(--color-nusa-blue)]/30 bg-transparent hover:border-[var(--color-nusa-blue)]/50 transition-all duration-300 flex items-center justify-center gap-3 relative group cursor-not-allowed opacity-60"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Masuk dengan Email</span>
                        <span className="absolute -top-1 -right-1 bg-[var(--color-karya-gold)] text-[var(--color-deep-navy)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Segera Hadir
                        </span>
                      </button>

                      <p className="text-xs text-center text-[var(--color-slate-gray)]/70">
                        Dengan masuk, Anda menyetujui{" "}
                        <a href="/about" className="text-[var(--color-nusa-blue)] hover:underline">
                          Syarat & Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a href="/about" className="text-[var(--color-nusa-blue)] hover:underline">
                          Kebijakan Privasi
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
                    </div>
                  )}
                </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

