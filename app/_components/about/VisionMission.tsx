export function VisionMission() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-4">
            Visi & Misi Kami
          </h2>
          <p className="text-lg text-[var(--color-slate-gray)] max-w-2xl mx-auto">
            Membangun ekosistem yang adil dan transparan untuk melindungi hak kekayaan intelektual kreator Indonesia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Vision */}
          <div className="bg-gradient-to-br from-[var(--color-nusa-blue)]/10 to-[var(--color-karya-gold)]/10 p-8 rounded-2xl border border-[var(--color-nusa-blue)]/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent">Visi</h3>
            </div>
            <p className="text-[var(--color-slate-gray)] leading-relaxed">
              Menjadi platform terdepan di Indonesia yang melindungi dan memberdayakan kreator melalui teknologi blockchain, 
              menciptakan ekosistem yang adil, transparan, dan berkelanjutan untuk semua jenis karya kreatif.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-[var(--color-karya-gold)]/10 to-[var(--color-nusa-blue)]/10 p-8 rounded-2xl border border-[var(--color-karya-gold)]/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-karya-gold)] to-[var(--color-nusa-blue)] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent">Misi</h3>
            </div>
            <ul className="text-[var(--color-slate-gray)] space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[var(--color-karya-gold)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Memberikan perlindungan hak kekayaan intelektual yang aman dan permanen melalui teknologi blockchain
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[var(--color-karya-gold)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Meningkatkan transparansi dan keadilan dalam ekosistem kreatif Indonesia
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[var(--color-karya-gold)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Memberdayakan kreator dengan tools dan platform yang mudah digunakan
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[var(--color-karya-gold)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Membangun komunitas yang mendukung dan mengapresiasi karya kreatif Indonesia
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
