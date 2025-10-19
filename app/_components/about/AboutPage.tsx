import { VisionMission } from "./VisionMission";
import { TimAksara } from "./TimAksara";
import { PartnersSponsors } from "./PartnersSponsors";
import { Contact } from "./Contact";

export function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-gray-50 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-foreground)] mb-6">
            Tentang{" "}
            <span className="bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] bg-clip-text text-transparent">
              NusaKarya
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Platform digital rights berbasis blockchain yang dibangun untuk melindungi karya kreatif Indonesia. 
            Kami percaya setiap karya memiliki nilai dan pantas mendapatkan perlindungan yang abadi.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Tim Aksara */}
      <TimAksara />

      {/* Partners & Sponsors */}
      <PartnersSponsors />

      {/* Contact */}
      <Contact />
    </main>
  );
}
