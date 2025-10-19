import { Hero, HowItWorks, Keunggulan, CTASection, UploadForm, Gallery } from "../_components/home";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Keunggulan />
      <CTASection />
      <UploadForm />
      <Gallery />
    </main>
  );
}
