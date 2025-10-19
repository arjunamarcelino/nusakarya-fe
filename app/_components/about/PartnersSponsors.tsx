export function PartnersSponsors() {
  const partners = [
    {
      name: "Kementerian Pariwisata dan Ekonomi Kreatif",
      type: "Government Partner",
      description: "Mendukung pengembangan ekosistem ekonomi kreatif Indonesia",
      logo: "/images/partners/kemenparekraf.png"
    },
    {
      name: "Asosiasi Blockchain Indonesia",
      type: "Industry Partner",
      description: "Kolaborasi dalam pengembangan standar blockchain nasional",
      logo: "/images/partners/abi.png"
    },
    {
      name: "Otoritas Jasa Keuangan",
      type: "Financial Regulatory Partner",
      description: "Mendorong inovasi dalam industri keuangan digital",
      logo: "/images/partners/ojk.jpg"
    }
  ];

  const sponsors = [
    {
      name: "AWS",
      type: "Official Sponsor",
      description: "Mendukung inovasi fintech dan digital economy",
      logo: "/images/sponsors/aws.png"
    },
    {
      name: "Tether",
      type: "Technology Sponsor",
      description: "Mendukung inovasi fintech dan digital economy",
      logo: "/images/sponsors/tether.png"
    },
    {
      name: "GitLab",
      type: "Innovation Sponsor",
      description: "Mendukung inovasi fintech dan digital economy",
      logo: "/images/sponsors/gitlab.png"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        {/* Partners Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Mitra & Partner
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kolaborasi strategis dengan berbagai organisasi untuk membangun ekosistem yang kuat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {partner.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-[var(--color-nusa-blue)] font-semibold text-sm mb-3">
                    {partner.type}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Sponsor & Pendukung
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Organisasi yang mendukung visi dan misi NusaKarya dalam melindungi karya kreatif Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[var(--color-nusa-blue)]/5 to-[var(--color-karya-gold)]/5 rounded-2xl p-6 border border-[var(--color-nusa-blue)]/20 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[var(--color-karya-gold)] to-[var(--color-nusa-blue)] rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {sponsor.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">
                    {sponsor.name}
                  </h3>
                  <p className="text-[var(--color-karya-gold)] font-semibold text-sm mb-3">
                    {sponsor.type}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ingin Bergabung Sebagai Partner?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Mari bersama-sama membangun ekosistem yang melindungi dan memberdayakan kreator Indonesia
            </p>
            <button className="bg-white text-[var(--color-nusa-blue)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
