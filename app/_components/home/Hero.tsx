"use client";

import { Button } from "../ui/Button";

export function Hero() {
  const goToRegister = () => {
    window.location.href = '/register';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-deep-navy)] via-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[var(--color-karya-gold)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[var(--color-ivory-white)] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[var(--color-karya-gold)] rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Karyamu.</span>
          <span className="block text-[var(--color-karya-gold)]">Hakmu.</span>
          <span className="block">Dijaga Blockchain.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-ivory-white)] mb-12 max-w-4xl mx-auto leading-relaxed">
          Daftarkan karya digitalmu, dapatkan sertifikat NFT, dan lindungi hak cipta secara otomatis.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={goToRegister}
            size="lg"
            className="bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            📜 Daftarkan Karya Sekarang
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[var(--color-ivory-white)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--color-ivory-white)] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
