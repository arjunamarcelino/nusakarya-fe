"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { LicenseForm } from "./LicenseForm";
import { DigitalWork, LicenseFormData } from "./types";
import { useAuth } from "@/app/_hooks/useAuth";
import { createKaryaApi, createLicenseApi, type Karya } from "@/app/_libs/api";
import { createLicenseService } from "@/app/_libs/services/license";
import { getWalletAddress } from "@/app/_libs/utils/wallet";
import { NETWORKS } from "@/app/_libs/contracts/config";
import type { EIP1193Provider } from "viem";

// Map Karya from API to DigitalWork format
function mapKaryaToDigitalWork(karya: Karya, walletAddress: string | null): DigitalWork {
  // Generate dummy data for fields not provided by API
  const dummyContractAddress = "0xabcdef1234567890abcdef1234567890abcdef12";
  
  return {
    id: karya.id,
    nftId: karya.nftId || "",
    title: karya.title,
    description: karya.description,
    workType: karya.type,
    category: karya.category || "Uncategorized",
    tags: karya.tag || [],
    ipfsHash: karya.fileHash,
    ipfsUrl: karya.fileUrl,
    metadataUrl: karya.fileUrl, // Use fileUrl as metadataUrl
    registrationDate: karya.createdAt,
    contractAddress: dummyContractAddress,
    ownerAddress: walletAddress || "0x0000000000000000000000000000000000000000",
  };
}

export function CreateLicensePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, getClient, isLoading: authLoading } = useAuth();
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { wallets } = useWallets();
  const [work, setWork] = useState<DigitalWork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      const workId = searchParams.get('workId');
    
      // Wait for auth to be ready
      if (authLoading) {
        return;
      }
      
      if (!workId) {
        // No workId provided, redirect to dashboard
        setError('Tidak ada workId dalam URL');
        setTimeout(() => {
          router.push('/app/dashboard');
        }, 2000);
        return;
      }

      if (!isAuthenticated) {
        // Not authenticated, redirect to dashboard
        setError('Anda harus login terlebih dahulu');
        setTimeout(() => {
          router.push('/app/dashboard');
        }, 2000);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const client = getClient();
        const karyaApi = createKaryaApi(client);
        const karyaList = await karyaApi.getAllKarya();
        
        // Find the karya with matching ID
        const foundKarya = karyaList.find(k => k.id === workId);
        
        if (foundKarya) {
          // Get wallet address from user
          const walletAddress = privyUser?.wallet?.address || null;
          const digitalWork = mapKaryaToDigitalWork(foundKarya, walletAddress);
          setWork(digitalWork);
        } else {
          // Work not found, redirect to dashboard
          setError(`Karya tidak ditemukan. ID: ${workId}`);
          setTimeout(() => {
            router.push('/app/dashboard');
          }, 3000);
        }
      } catch (err) {
        console.error("Failed to fetch karya:", err);
        setError(err instanceof Error ? err.message : "Gagal memuat karya");
        setTimeout(() => {
          router.push('/app/dashboard');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWork();
  }, [searchParams, router, isAuthenticated, getClient, privyUser, authLoading]);

  const handleSubmit = async (formData: LicenseFormData) => {
    if (!work) return;

    // Check authentication
    if (!ready || !authenticated || !privyUser) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    // Get wallet address
    const walletAddress = getWalletAddress(privyUser);
    if (!walletAddress) {
      alert("Alamat wallet tidak ditemukan. Silakan hubungkan wallet Anda.");
      return;
    }

    // Get wallet provider from Privy
    const wallet = wallets[0];
    if (!wallet) {
      alert("Wallet tidak ditemukan. Silakan hubungkan wallet Anda.");
      return;
    }

    // Get Ethereum provider from Privy wallet
    let ethereumProvider: EIP1193Provider;
    try {
      const provider = await wallet.getEthereumProvider();
      if (!provider) {
        alert("Ethereum provider tidak tersedia. Silakan hubungkan wallet Anda.");
        return;
      }
      // Cast to EIP1193Provider to handle type compatibility
      ethereumProvider = provider as unknown as EIP1193Provider;
    } catch (err) {
      alert("Gagal mendapatkan provider wallet. Silakan coba lagi.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Calculate expiry timestamp
      const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      let durationInSeconds: number;
      
      switch (formData.durationUnit) {
        case 'days':
          durationInSeconds = formData.duration * 24 * 60 * 60;
          break;
        case 'months':
          durationInSeconds = formData.duration * 30 * 24 * 60 * 60; // Approximate
          break;
        case 'years':
          durationInSeconds = formData.duration * 365 * 24 * 60 * 60; // Approximate
          break;
        default:
          durationInSeconds = formData.duration * 24 * 60 * 60;
      }
      
      const expiry = BigInt(now + durationInSeconds);

      // Map license type to enum (commercial = 0, other = 1)
      const usageType: 0 | 1 = formData.licenseType === 'commercial' ? 0 : 1;

      // Parse nftId to bigint
      const certificateId = BigInt(work.nftId || "0");
      if (certificateId === BigInt(0)) {
        throw new Error("NFT ID tidak valid");
      }

      // Create license service
      const licenseService = createLicenseService(
        NETWORKS.ETH_SEPOLIA,
        ethereumProvider,
        walletAddress
      );

      // Call mintLicense contract function
      const result = await licenseService.mintLicense({
        to: walletAddress,
        certificateId,
        expiry,
        usageType,
        amount: BigInt(1),
      });

      // Call POST API to create license
      const client = getClient();
      const licenseApi = createLicenseApi(client);
      
      await licenseApi.createLicense({
        karyaId: work.id,
        type: formData.licenseType,
        price: formData.price,
        duration: formData.duration,
        description: formData.description,
        tnc: formData.terms,
        txHash: result.transactionHash,
      });

      // Show success message
      alert('Lisensi berhasil dibuat!');
      
      // Redirect to dashboard
      router.push('/app/dashboard');
    } catch (error) {
      console.error('Failed to create license:', error);
      const errorMessage = error instanceof Error ? error.message : "Gagal membuat lisensi. Silakan coba lagi.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/app/dashboard');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory-white)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
          <p className="text-sm text-[var(--color-slate-gray)]">
            {authLoading ? "Memuat autentikasi..." : "Memuat karya..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory-white)] flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-xl p-8 text-center max-w-md">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">Gagal Memuat Karya</h3>
            <p className="text-sm text-[var(--color-slate-gray)]">{error}</p>
            <p className="text-xs text-[var(--color-slate-gray)] mt-2">Mengalihkan ke dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!work) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/app/dashboard")}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/5 transition-all duration-200 group"
                aria-label="Kembali ke dashboard"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 group-hover:text-[var(--color-nusa-blue)] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                  Buat Lisensi
                </h1>
                <p className="text-[var(--color-slate-gray)] mt-1">
                  Konfigurasi lisensi untuk karya yang dipilih
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <LicenseForm
          work={work}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}

