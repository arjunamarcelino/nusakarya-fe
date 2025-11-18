"use client";

import { useState } from "react";
import { PrimaryButton } from "../ui/Button";

interface MintCertificateProps {
  onMint: () => void;
  isMinting: boolean;
  canMint: boolean;
  file: File | null;
  metadata: {
    title: string;
    description: string;
    workType: string;
  };
  progress?: string;
}

export function MintCertificate({ onMint, isMinting, canMint, file, metadata, progress }: MintCertificateProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getValidationErrors = () => {
    const errors = [];
    if (!file) errors.push("File belum diupload");
    if (!metadata.title.trim()) errors.push("Judul karya belum diisi");
    if (!metadata.description.trim()) errors.push("Deskripsi belum diisi");
    if (!metadata.workType) errors.push("Jenis karya belum dipilih");
    return errors;
  };

  const validationErrors = getValidationErrors();
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-3xl">🏆</div>
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-deep-navy)]">
            Mint Sertifikat NFT
          </h3>
          <p className="text-[var(--color-slate-gray)]">
            Dapatkan sertifikat kepemilikan digital yang permanen
          </p>
        </div>
      </div>

      {/* Validation Status */}
      {hasErrors ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-red-500">⚠️</div>
            <h4 className="font-semibold text-red-800">Lengkapi data terlebih dahulu</h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-green-500">✅</div>
            <h4 className="font-semibold text-green-800">Data siap untuk di-mint</h4>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Semua data telah lengkap dan siap untuk dibuatkan sertifikat NFT
          </p>
        </div>
      )}

      {/* Process Steps */}
      <div className="mb-6">
        <h4 className="font-semibold text-[var(--color-deep-navy)] mb-3">
          Proses Minting:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[var(--color-nusa-blue)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-sm text-[var(--color-slate-gray)]">
              Upload file ke IPFS dan buat hash unik
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[var(--color-nusa-blue)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm text-[var(--color-slate-gray)]">
              Buat metadata JSON dan simpan ke IPFS
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[var(--color-nusa-blue)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className="text-sm text-[var(--color-slate-gray)]">
              Mint NFT Certificate di blockchain
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[var(--color-karya-gold)] text-[var(--color-deep-navy)] rounded-full flex items-center justify-center text-sm font-semibold">
              4
            </div>
            <span className="text-sm text-[var(--color-slate-gray)]">
              Dapatkan sertifikat dan link IPFS
            </span>
          </div>
        </div>
      </div>

      {/* Cost Information */}
      <div className="bg-[var(--color-nusa-blue)]/5 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-[var(--color-deep-navy)] mb-2">
          Biaya Minting
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--color-slate-gray)]">Gas Fee (Blockchain):</span>
            <span className="font-medium">~$2-5 USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-slate-gray)]">IPFS Storage:</span>
            <span className="font-medium text-green-600">Gratis</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold text-[var(--color-deep-navy)]">Total:</span>
            <span className="font-semibold text-[var(--color-deep-navy)]">~$2-5 USD</span>
          </div>
        </div>
        <p className="text-xs text-[var(--color-slate-gray)] mt-2">
          * Biaya gas bervariasi tergantung kondisi jaringan blockchain
        </p>
      </div>

      {/* Progress Message */}
      {isMinting && progress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-800 font-medium">{progress}</span>
          </div>
        </div>
      )}

      {/* Mint Button */}
      <div className="space-y-4">
        <PrimaryButton
          onClick={onMint}
          disabled={!canMint || isMinting}
          className="w-full"
          textClassName="justify-center"
        >
          {isMinting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Minting NFT Certificate...</span>
            </div>
          ) : (
            "🏆 Mint Sertifikat NFT"
          )}
        </PrimaryButton>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="border border-gray-300 rounded-lg w-full text-center text-sm text-[var(--color-nusa-blue)] hover:text-[var(--color-deep-navy)] transition-colors duration-200 py-2"
        >
          {showDetails ? "Sembunyikan" : "Tampilkan"} detail teknis
        </button>
        {showDetails && (
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <h5 className="font-semibold text-[var(--color-deep-navy)] mb-2">
              Detail Teknis:
            </h5>
            <ul className="space-y-1 text-[var(--color-slate-gray)]">
              <li>• Smart Contract: NusaKarya Certificate v1.0</li>
              <li>• Blockchain: Polygon (Layer 2)</li>
              <li>• Standard: ERC-721 (NFT)</li>
              <li>• IPFS Gateway: ipfs.io</li>
              <li>• Metadata Format: JSON-LD</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
