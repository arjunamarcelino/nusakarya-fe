"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LicenseForm } from "./LicenseForm";
import { DigitalWork } from "./types";

// Mock function to get work by ID - in real app, this would be an API call
const getWorkById = (workId: string): DigitalWork | null => {
  const mockWorks: DigitalWork[] = [
    {
      id: '1',
      nftId: '1234',
      title: 'Digital Art Collection #1',
      description: 'Koleksi seni digital dengan tema futuristik',
      workType: 'image',
      category: 'digital-art',
      tags: ['art', 'futuristic', 'digital'],
      ipfsHash: 'Qm1234567890abcdef',
      ipfsUrl: 'https://ipfs.io/ipfs/Qm1234567890abcdef',
      metadataUrl: 'https://ipfs.io/ipfs/Qm1234567890abcdef',
      registrationDate: '2024-01-15T10:30:00Z',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      ownerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      imageUrl: '/images/sample-art.jpg'
    },
    {
      id: '2',
      nftId: '1235',
      title: 'Music Track - Ocean Waves',
      description: 'Lagu instrumental dengan suara ombak laut',
      workType: 'audio',
      category: 'music',
      tags: ['music', 'ambient', 'ocean'],
      ipfsHash: 'Qm2345678901bcdefg',
      ipfsUrl: 'https://ipfs.io/ipfs/Qm2345678901bcdefg',
      metadataUrl: 'https://ipfs.io/ipfs/Qm2345678901bcdefg',
      registrationDate: '2024-01-20T14:15:00Z',
      contractAddress: '0x2345678901bcdefg2345678901bcdefg23456789',
      ownerAddress: '0xbcdefg1234567890bcdefg1234567890bcdefg12',
    },
    {
      id: '3',
      nftId: '1236',
      title: '3D Model - Ancient Temple',
      description: 'Model 3D kuil kuno untuk game atau VR',
      workType: '3d-model',
      category: '3d-art',
      tags: ['3d', 'temple', 'ancient', 'game'],
      ipfsHash: 'Qm3456789012cdefgh',
      ipfsUrl: 'https://ipfs.io/ipfs/Qm3456789012cdefgh',
      metadataUrl: 'https://ipfs.io/ipfs/Qm3456789012cdefgh',
      registrationDate: '2024-01-25T09:45:00Z',
      contractAddress: '0x3456789012cdefgh3456789012cdefgh34567890',
      ownerAddress: '0xcdefgh1234567890cdefgh1234567890cdefgh12',
    }
  ];
  
  return mockWorks.find(w => w.id === workId) || null;
};

export function CreateLicensePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [work, setWork] = useState<DigitalWork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const workId = searchParams.get('workId');
    
    if (workId) {
      const foundWork = getWorkById(workId);
      if (foundWork) {
        setWork(foundWork);
      } else {
        // Work not found, redirect to dashboard
        router.push('/app/dashboard');
      }
    } else {
      // No workId provided, redirect to dashboard
      router.push('/app/dashboard');
    }
    
    setIsLoading(false);
  }, [searchParams, router]);

  const handleSubmit = async () => {
    if (!work) return;

    setIsSubmitting(true);
    try {
      // Simulate API call to create license
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Lisensi berhasil dibuat!');
      
      // Redirect to dashboard
      router.push('/app/dashboard');
    } catch (error) {
      console.error('Failed to create license:', error);
      alert('Gagal membuat lisensi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/app/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory-white)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
          <p className="text-sm text-[var(--color-slate-gray)]">Memuat...</p>
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

