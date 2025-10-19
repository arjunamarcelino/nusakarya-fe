export function Keunggulan() {
  const advantages = [
    {
      icon: "🏆",
      title: "Bukti Kepemilikan Digital",
      subtitle: "NFT Certificate",
      description: "Setiap karya yang terdaftar akan mendapat sertifikat NFT yang tidak dapat dipalsukan, memberikan bukti kepemilikan yang permanen dan terverifikasi di blockchain.",
      features: [
        "Sertifikat NFT unik",
        "Tidak dapat dipalsukan",
        "Tercatat permanen di blockchain",
        "Verifikasi instan"
      ]
    },
    {
      icon: "🤖",
      title: "Royalti Otomatis",
      subtitle: "Smart Contract",
      description: "Terima pembayaran royalti secara otomatis setiap kali karya digunakan atau dilisensikan, tanpa perlu intervensi manual.",
      features: [
        "Pembayaran otomatis",
        "Transparan dan adil",
        "Tidak ada biaya tersembunyi",
        "Real-time tracking"
      ]
    },
    {
      icon: "📋",
      title: "Lisensi Transparan",
      subtitle: "NFT License",
      description: "Kelola lisensi penggunaan karya dengan smart contract yang transparan, memastikan setiap penggunaan tercatat dan terbayar.",
      features: [
        "Lisensi terprogram",
        "Kondisi penggunaan jelas",
        "Tracking penggunaan",
        "Pembayaran otomatis"
      ]
    },
    {
      icon: "🏛️",
      title: "Terintegrasi DJKI",
      subtitle: "Future Integration",
      description: "Kedepannya akan terintegrasi dengan Direktorat Jenderal Kekayaan Intelektual untuk perlindungan hukum yang lebih kuat.",
      features: [
        "Integrasi dengan DJKI",
        "Perlindungan hukum",
        "Standar internasional",
        "Recognition resmi"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[var(--color-deep-navy)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Keunggulan NusaKarya
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-ivory-white)]/80 max-w-3xl mx-auto">
            Platform terdepan untuk perlindungan dan monetisasi karya digital dengan teknologi blockchain
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">
                {advantage.icon}
              </div>
              
              {/* Subtitle */}
              <div className="text-[var(--color-karya-gold)] text-sm font-semibold uppercase tracking-wider mb-2">
                {advantage.subtitle}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {advantage.title}
              </h3>
              
              {/* Description */}
              <p className="text-[var(--color-ivory-white)]/80 text-sm mb-4 leading-relaxed">
                {advantage.description}
              </p>
              
              {/* Features List */}
              <ul className="space-y-2">
                {advantage.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-[var(--color-ivory-white)]/70">
                    <div className="w-1.5 h-1.5 bg-[var(--color-karya-gold)] rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-[var(--color-karya-gold)] mb-2">100%</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Secure</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-[var(--color-karya-gold)] mb-2">24/7</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Automated</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-[var(--color-karya-gold)] mb-2">0%</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Hidden Fees</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-[var(--color-karya-gold)] mb-2">∞</div>
            <div className="text-sm text-[var(--color-ivory-white)]/80">Permanent</div>
          </div>
        </div>
      </div>
    </section>
  );
}
