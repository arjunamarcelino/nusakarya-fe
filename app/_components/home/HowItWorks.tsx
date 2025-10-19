export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Unggah Karya",
      description: "Upload karya digitalmu ke platform NusaKarya",
      detail: "Sistem akan membuat hash unik di IPFS untuk memastikan keaslian dan keamanan karya",
      icon: "📤"
    },
    {
      number: "02", 
      title: "Mint Sertifikat NFT",
      description: "Dapatkan sertifikat kepemilikan digital",
      detail: "Smart contract akan mencetak NFT yang membuktikan kepemilikan karya secara permanen di blockchain",
      icon: "🏆"
    },
    {
      number: "03",
      title: "Lisensi & Royalti",
      description: "Lisensikan karya dan dapatkan royalti otomatis",
      detail: "Atur lisensi penggunaan dan terima pembayaran royalti secara otomatis melalui smart contract",
      icon: "💰"
    }
  ];

  return (
    <section className="py-20 bg-[var(--color-ivory-white)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-deep-navy)] mb-6">
            Cara Kerja NusaKarya
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-slate-gray)] max-w-3xl mx-auto">
            Tiga langkah sederhana untuk melindungi dan memonetisasi karya digitalmu
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] transform translate-x-4 z-0"></div>
              )}
              
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Step Number */}
                <div className="text-6xl font-bold text-[var(--color-nusa-blue)]/20 mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-4xl mb-4">
                  {step.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-deep-navy)] mb-3">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-[var(--color-slate-gray)] mb-4 font-medium">
                  {step.description}
                </p>
                
                {/* Detail */}
                <p className="text-sm text-[var(--color-slate-gray)]/80 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-[var(--color-slate-gray)] mb-6">
            Siap memulai perjalanan melindungi karya digitalmu?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--color-nusa-blue)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-deep-navy)] transition-colors duration-300">
              Mulai Sekarang
            </button>
            <button className="border border-[var(--color-nusa-blue)] text-[var(--color-nusa-blue)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-nusa-blue)] hover:text-white transition-colors duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
