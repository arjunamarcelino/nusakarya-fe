"use client";

import { AboutPage } from "../../_components/about";
import { Header } from "../../_components/Header";

export default function About() {
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
      <Header />
      <div className="relative w-full">
        <AboutPage />
      </div>
    </div>
  );
}
