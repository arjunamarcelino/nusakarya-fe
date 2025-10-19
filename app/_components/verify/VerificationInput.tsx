"use client";

import { useState } from "react";

interface VerificationInputProps {
  onVerify: (input: { hash: string }) => void;
  isVerifying: boolean;
}

export function VerificationInput({ onVerify, isVerifying }: VerificationInputProps) {
  const [hash, setHash] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hash.trim()) {
      onVerify({ hash: hash.trim() });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
        Verifikasi dengan Hash
      </h2>
      <p className="text-[var(--color-slate-gray)] mb-6">
        Masukkan hash karya yang ingin diverifikasi. Hash ini biasanya berupa SHA-256 atau hash unik dari file.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hash" className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
            Hash Karya
          </label>
          <input
            id="hash"
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Contoh: a1b2c3d4e5f6..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-blue)] focus:border-transparent"
            disabled={isVerifying}
            required
          />
          <p className="text-sm text-[var(--color-slate-gray)] mt-2">
            Hash dapat berupa SHA-256, MD5, atau hash unik lainnya yang terkait dengan karya
          </p>
        </div>

        <button
          type="submit"
          disabled={!hash.trim() || isVerifying}
          className="w-full bg-[var(--color-primary-blue)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--color-primary-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Memverifikasi...
            </div>
          ) : (
            "Verifikasi Karya"
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-[var(--color-deep-navy)] mb-2">Cara Mendapatkan Hash:</h3>
        <ul className="text-sm text-[var(--color-slate-gray)] space-y-1">
          <li>• Gunakan tools online seperti SHA256 Generator</li>
          <li>• Gunakan command line: <code className="bg-gray-100 px-1 rounded">sha256sum filename</code></li>
          <li>• Dari metadata NFT atau sertifikat karya</li>
        </ul>
      </div>
    </div>
  );
}
