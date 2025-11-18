"use client";

import { useState } from "react";
import { VerificationInput } from "../../_components/verify/VerificationInput";
import { VerificationResult } from "../../_components/verify/VerificationResult";
import { FileUpload } from "../../_components/verify/FileUpload";
import { Header } from "../Header";
import { getApiClient, createKaryaApi } from "@/app/_libs/api";
import { ApiError } from "@/app/_libs/api";

interface WorkVerification {
  isVerified: boolean;
  work?: {
    id: string;
    title: string;
    description: string;
    type: string;
    category: string | null;
    tags: string[];
    fileUrl: string;
    fileHash: string;
    nftId: string | null;
    txHash: string | null;
    createdAt: string;
    creator: {
      id: string;
      walletAddress: string | null;
      email: string | null;
    };
    licenses: Array<{
      id: string;
      type: string;
      price: number;
      duration: number;
      description: string;
      tnc: string;
      txHash: string | null;
      createdAt: string;
    }>;
  };
  error?: string;
}

export function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState<WorkVerification | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [inputMethod, setInputMethod] = useState<'file' | 'hash'>('file');

  const handleVerification = async (input: { hash: string }) => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Ensure hash has 0x prefix for API
      let hash = input.hash.trim();
      if (!hash.startsWith('0x')) {
        hash = `0x${hash}`;
      }

      if (!hash || hash === '0x') {
        throw new Error("Hash harus disediakan");
      }

      // Create API client without authentication (public endpoint)
      const client = getApiClient();
      const karyaApi = createKaryaApi(client);
      
      // Call verify API
      const karyaData = await karyaApi.verifyKarya(hash);

      // Map API response to WorkVerification format
      const result: WorkVerification = {
        isVerified: true,
        work: {
          id: karyaData.id,
          title: karyaData.title,
          description: karyaData.description,
          type: karyaData.type,
          category: karyaData.category || null,
          tags: karyaData.tag || [],
          fileUrl: karyaData.fileUrl,
          fileHash: karyaData.fileHash,
          nftId: karyaData.nftId || null,
          txHash: karyaData.txHash || null,
          createdAt: karyaData.createdAt,
          creator: {
            id: karyaData.user.id,
            walletAddress: karyaData.user.walletAddress || null,
            email: karyaData.user.email || null,
          },
          licenses: karyaData.licenses.map(license => ({
            id: license.id,
            type: license.type,
            price: license.price,
            duration: license.duration,
            description: license.description,
            tnc: license.tnc,
            txHash: license.txHash || null,
            createdAt: license.createdAt,
          })),
        },
      };

      setVerificationResult(result);
    } catch (err) {
      console.error("Verification error:", err);
      
      let errorMessage = "Terjadi kesalahan saat memverifikasi karya";
      
      if (err instanceof ApiError) {
        if (err.status === 404) {
          errorMessage = "Karya tidak ditemukan dalam sistem";
        } else {
          errorMessage = err.message || errorMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setVerificationResult({
        isVerified: false,
        error: errorMessage,
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
      <Header />
      {/* Header */}
      <div className="pt-12 bg-white border-b border-[var(--color-nusa-blue)]/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                Verifikasi Karya Digital
              </h1>
              <p className="text-[var(--color-deep-navy)]/70 mt-1">
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
            <div className="bg-white border border-[var(--color-nusa-blue)]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
                Pilih Metode Verifikasi
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setInputMethod('file')}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    inputMethod === 'file'
                      ? 'border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/10 text-[var(--color-nusa-blue)]'
                      : 'border-[var(--color-nusa-blue)]/30 text-[var(--color-deep-navy)]/70 hover:border-[var(--color-nusa-blue)]/50'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setInputMethod('hash')}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    inputMethod === 'hash'
                      ? 'border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/10 text-[var(--color-nusa-blue)]'
                      : 'border-[var(--color-nusa-blue)]/30 text-[var(--color-deep-navy)]/70 hover:border-[var(--color-nusa-blue)]/50'
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
