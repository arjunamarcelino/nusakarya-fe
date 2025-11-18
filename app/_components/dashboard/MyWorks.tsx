"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_hooks/useAuth";
import { createKaryaApi, type Karya } from "@/app/_libs/api";

interface NFTWork {
  id: string;
  title: string;
  description: string;
  workType: string;
  category: string;
  tags: string[];
  ipfsHash: string;
  ipfsUrl: string;
  metadataUrl: string;
  registrationDate: string;
  transactionHash: string;
  blockNumber: number;
  contractAddress: string;
  licenseCount: number;
  totalEarnings: number;
  status: 'active' | 'licensed' | 'sold';
}

// Helper function to map API Karya to NFTWork format
function mapKaryaToNFTWork(karya: Karya): NFTWork {
  // Generate dummy data for fields not provided by API
  const dummyBlockNumber = Math.floor(Math.random() * 10000000) + 10000000;
  const dummyContractAddress = "0xabcdef1234567890abcdef1234567890abcdef12";
  const dummyLicenseCount = Math.floor(Math.random() * 20) + 1;
  const dummyTotalEarnings = parseFloat((Math.random() * 2).toFixed(3));
  
  // Determine status based on license count (dummy logic)
  let status: 'active' | 'licensed' | 'sold' = 'active';
  if (dummyLicenseCount > 10) {
    status = 'licensed';
  } else if (dummyLicenseCount > 5) {
    status = 'active';
  }

  return {
    id: karya.id,
    title: karya.title,
    description: karya.description,
    workType: karya.type,
    category: karya.category || "Uncategorized",
    tags: karya.tag || [],
    ipfsHash: karya.fileHash,
    ipfsUrl: karya.fileUrl,
    metadataUrl: karya.fileUrl, // Use fileUrl as metadataUrl
    registrationDate: karya.createdAt,
    transactionHash: karya.txHash || `0x${Math.random().toString(16).substr(2, 64)}`,
    blockNumber: dummyBlockNumber,
    contractAddress: dummyContractAddress,
    licenseCount: dummyLicenseCount,
    totalEarnings: dummyTotalEarnings,
    status: status
  };
}

export function MyWorks() {
  const router = useRouter();
  const { isAuthenticated, getClient } = useAuth();
  const [works, setWorks] = useState<NFTWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'licensed' | 'sold'>('all');

  useEffect(() => {
    const fetchKarya = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);

      try {
        const client = getClient();
        const karyaApi = createKaryaApi(client);
        const karyaList = await karyaApi.getAllKarya();
        
        // Map API response to component format
        const mappedWorks = karyaList.map(mapKaryaToNFTWork);
        setWorks(mappedWorks);
      } catch (err) {
        console.error("Failed to fetch karya:", err);
        setError(err instanceof Error ? err.message : "Gagal memuat karya");
        // On error, show empty state
        setWorks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKarya();
  }, [isAuthenticated, getClient]);

  const handleCreateLicense = (work: NFTWork) => {
    // Navigate to app license page with work ID as query parameter
    router.push(`/app/license?workId=${work.id}`);
  };

  const filteredWorks = works.filter(work => 
    filter === 'all' || work.status === filter
  );

  const getStatusBadge = (status: NFTWork['status']) => {
    const statusConfig = {
      active: { label: 'Aktif', color: 'bg-green-100 text-green-800' },
      licensed: { label: 'Dilisensikan', color: 'bg-blue-100 text-blue-800' },
      sold: { label: 'Terjual', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getBasescanUrl = (txHash: string) => {
    return `https://basescan.org/tx/${txHash}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
            <p className="text-sm text-[var(--color-slate-gray)]">Memuat karya...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-[var(--color-slate-gray)]">
            <svg className="mx-auto h-12 w-12 mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
              Gagal memuat karya
            </h3>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-[var(--color-deep-navy)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Karya</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{works.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Lisensi</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {works.reduce((sum, work) => sum + work.licenseCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Pendapatan</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {works.reduce((sum, work) => sum + work.totalEarnings, 0).toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Karya Aktif</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {works.filter(work => work.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">Karya Saya</h3>
          <div className="flex space-x-2">
            {(['all', 'active', 'licensed', 'sold'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  filter === filterType
                    ? 'bg-[var(--color-deep-navy)] text-white'
                    : 'bg-gray-100 text-[var(--color-slate-gray)] hover:bg-gray-200'
                }`}
              >
                {filterType === 'all' ? 'Semua' : 
                 filterType === 'active' ? 'Aktif' :
                 filterType === 'licensed' ? 'Dilisensikan' : 'Terjual'}
              </button>
            ))}
          </div>
        </div>

        {/* Works List */}
        {filteredWorks.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[var(--color-slate-gray)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
              Belum ada karya
            </h3>
            <p className="text-[var(--color-slate-gray)] mb-4">
              Mulai daftarkan karya digital Anda untuk mendapatkan sertifikat NFT
            </p>
            <a
              href="/app/register"
              className="inline-flex items-center px-4 py-2 bg-[var(--color-deep-navy)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Daftarkan Karya
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWorks.map((work) => (
              <div key={work.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-[var(--color-deep-navy)]">
                        {work.title}
                      </h4>
                      {getStatusBadge(work.status)}
                    </div>
                    
                    <p className="text-[var(--color-slate-gray)] mb-3 line-clamp-2">
                      {work.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {work.workType}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {work.category}
                      </span>
                      {work.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Tanggal Daftar:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {new Date(work.registrationDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Lisensi:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {work.licenseCount} lisensi
                        </p>
                      </div>
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Pendapatan:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {work.totalEarnings} ETH
                        </p>
                      </div>
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Block:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          #{work.blockNumber.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      onClick={() => handleCreateLicense(work)}
                      className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Buat Lisensi
                    </button>
                    
                    <a
                      href={work.ipfsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Lihat di IPFS
                    </a>
                    
                    <a
                      href={getBasescanUrl(work.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Lihat di Basescan
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
