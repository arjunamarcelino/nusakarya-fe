"use client";

import { Button } from "../ui/Button";

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

  return (
    <section className="py-20 bg-gradient-to-br from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-karya-gold)] rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--color-ivory-white)] rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--color-karya-gold)] rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--color-ivory-white)] rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Mulai dari sekarang,<br />
          <span className="text-[var(--color-karya-gold)]">setiap karya punya bukti.</span>
        </h2>

        <p className="text-lg md:text-xl text-[var(--color-ivory-white)]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Bergabunglah dengan ribuan kreator yang telah mempercayai NusaKarya untuk melindungi karya digital mereka.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            onClick={goToRegister}
            size="lg"
            className="bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            📜 Daftarkan Karya
          </Button>
          
          <Button
            onClick={scrollToGallery}
            variant="outline"
            size="lg"
            className="border-2 border-[var(--color-ivory-white)] text-[var(--color-ivory-white)] hover:bg-[var(--color-ivory-white)] hover:text-[var(--color-deep-navy)] font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            🖼️ Lihat Karya Terdaftar
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-[var(--color-karya-gold)] mb-2">1000+</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Karya Terdaftar</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-[var(--color-karya-gold)] mb-2">500+</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Kreator Aktif</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-[var(--color-karya-gold)] mb-2">99.9%</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Uptime</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--color-ivory-white)]/70 mb-4">
            Gratis untuk mendaftar • Tidak ada biaya tersembunyi • Dukungan 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[var(--color-ivory-white)]/60">
            <span>🔒 SSL Encrypted</span>
            <span>⚡ Lightning Fast</span>
            <span>🌐 Global Access</span>
            <span>📱 Mobile Friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
