"use client";

import { useState } from "react";
import { VerificationInput } from "../../_components/verify/VerificationInput";
import { VerificationResult } from "../../_components/verify/VerificationResult";
import { FileUpload } from "../../_components/verify/FileUpload";

interface WorkVerification {
  isVerified: boolean;
  work?: {
    title: string;
    creator: string;
    creatorWallet: string;
    mintDate: string;
    tokenId: string;
    ipfsLink: string;
    transactionHash: string;
    blockNumber: number;
    contractAddress: string;
  };
  error?: string;
}

export function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState<WorkVerification | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [inputMethod, setInputMethod] = useState<'file' | 'hash'>('file');

  const handleVerification = async () => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock verification result - in real implementation, this would check the blockchain
      const mockResult: WorkVerification = {
        isVerified: Math.random() > 0.3, // 70% chance of being verified for demo
        work: Math.random() > 0.3 ? {
          title: "Karya Digital Terdaftar",
          creator: "John Doe",
          creatorWallet: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
          mintDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          tokenId: Math.floor(Math.random() * 10000).toString(),
          ipfsLink: `https://ipfs.io/ipfs/Qm${Math.random().toString(16).substr(2, 44)}`,
          transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
          blockNumber: Math.floor(Math.random() * 1000000) + 50000000,
          contractAddress: '0x' + Math.random().toString(16).substr(2, 40)
        } : undefined,
        error: Math.random() <= 0.3 ? "Karya tidak ditemukan dalam sistem" : undefined
      };

      setVerificationResult(mockResult);
    } catch {
      setVerificationResult({
        isVerified: false,
        error: "Terjadi kesalahan saat memverifikasi karya"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                Verifikasi Karya Digital
              </h1>
              <p className="text-[var(--color-slate-gray)] mt-1">
                Periksa apakah karya digital telah terdaftar dan dilindungi di blockchain
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!verificationResult ? (
          <div className="space-y-8">
            {/* Input Method Selection */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
                Pilih Metode Verifikasi
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setInputMethod('file')}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    inputMethod === 'file'
                      ? 'border-[var(--color-primary-blue)] bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)]'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setInputMethod('hash')}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    inputMethod === 'hash'
                      ? 'border-[var(--color-primary-blue)] bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)]'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Input Hash
                </button>
              </div>
            </div>

            {/* Verification Input */}
            {inputMethod === 'file' ? (
              <FileUpload
                onVerify={handleVerification}
                isVerifying={isVerifying}
              />
            ) : (
              <VerificationInput
                onVerify={handleVerification}
                isVerifying={isVerifying}
              />
            )}
          </div>
        ) : (
          <VerificationResult
            result={verificationResult}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
