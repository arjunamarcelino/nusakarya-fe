"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

// Logo Component
function NusaKaryaLogo() {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src="/images/nusakarya-logo.png"
        alt="NusaKarya Logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
      <span className="text-xl font-bold text-[var(--color-foreground)]">
        NusaKarya
      </span>
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add theme switching logic here
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

// Wallet Connection Button
function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsConnected(!isConnected);
    // Add wallet connection logic here
  };

  return (
    <Button
      onClick={handleWalletConnect}
      className="bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
    >
      {isConnected ? "Disconnect" : "Hubungkan Wallet"}
    </Button>
  );
}

// Mobile Menu Toggle
function MobileMenuToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle menu"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Beranda", href: "/" },
    { name: "Daftarkan Karya", href: "/register" },
    { name: "Verifikasi Karya", href: "/verify" },
    { name: "Lisensi Digital", href: "/license" },
    { name: "Dashboard Kreator", href: "/dashboard" },
    { name: "Tentang", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NusaKaryaLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-[var(--color-nusa-blue)] dark:hover:text-[var(--color-karya-gold)] font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <WalletButton />
            </div>
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[var(--color-nusa-blue)] dark:hover:text-[var(--color-karya-gold)] font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
