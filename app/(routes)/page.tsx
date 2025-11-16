"use client";

import { Hero } from "../_components/home";
import LenisSmoothScrollProvider from "../_providers/LenisSmoothScrollProvider";
import { Timeline } from "../_components/ui/Timeline";
import { Header } from "../_components/Header";
import { MainFeatures } from "../_components/home/Features";
import FeaturesSection from "../_components/home/FeaturedCard";
import Ecosystems from "../_components/home/Ecosystems";
import Footer from "../_components/Footers";
import About from "../_components/home/About";
import { CTASection } from "../_components/home/CTASection";

export default function HomePage() {

  const data = [
    {
      title: "NusaKarya",
      color: "var(--color-nusa-blue)",
      id: "nusa-karya",
    },
    {
      title: "Misi Kami",
      color: "var(--color-nusa-blue)",
      id: "misi-kami",
    },
    {
      title: "Fitur Utama",
      color: "var(--color-nusa-blue)",
      id: "fitur-utama",
    },
    {
      title: "Kenapa NusaKarya",
      color: "var(--color-karya-gold)",
      id: "kenapa-nusakarya",
    },
    {
      title: "Tentang Kami",
      color: "var(--color-nusa-blue)",
      id: "tentang-kami",
    },
  ];

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
      <LenisSmoothScrollProvider />
      <Header />
      <Timeline data={data} />
      <div className="relative w-full">
        <Hero />
        <section id="misi-kami">
          <MainFeatures />
        </section>
        <section id="fitur-utama">
          <FeaturesSection />
        </section>
        <section
          id="kenapa-nusakarya"
          className="bg-gradient-to-r from-[var(--color-deep-navy)] to-[var(--color-deep-navy)]"
        >
          <About />
        </section>
        <section id="tentang-kami" className="overflow-hidden relative">
          <CTASection />
          <Ecosystems />
          <Footer />
        </section>
      </div>
    </div>
  );
}
