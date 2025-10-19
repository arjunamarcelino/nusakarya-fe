export function TimAksara() {
  const teamMembers = [
    {
      name: "Arjuna Marcelino",
      role: "Full Stack Developer",
      description: "Full Stack Developer yang berpengalaman dalam pengembangan platform terdesentralisasi",
      image: "/images/team/arjuna-marcelino.jpg"
    },
    {
        name: "Azka Willian Muhammad",
        role: "Smart Contract Developer",
        description: "Smart Contract Developer yang berpengalaman dalam pengembangan platform terdesentralisasi",
        image: "/images/team/azka-willian-muhammad.jpg"
      },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Tim Aksara
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tim profesional yang berdedikasi untuk melindungi dan memberdayakan kreator Indonesia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                  {member.name}
                </h3>
                <p className="text-[var(--color-nusa-blue)] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-[var(--color-foreground)] mb-12">
            Nilai-Nilai Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-foreground)] mb-2">Transparansi</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Setiap transaksi dan proses tercatat secara permanen dan dapat diverifikasi
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-karya-gold)] to-[var(--color-nusa-blue)] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-foreground)] mb-2">Keamanan</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Teknologi blockchain terdepan untuk perlindungan maksimal karya kreatif
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-foreground)] mb-2">Komunitas</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Membangun ekosistem yang mendukung dan memberdayakan kreator Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
