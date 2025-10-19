"use client";

import { useState } from "react";

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

// Mock data - replace with actual data fetching
const mockWorks: NFTWork[] = [
  {
    id: "1",
    title: "Digital Art Collection #1",
    description: "A beautiful digital artwork showcasing modern abstract design",
    workType: "Digital Art",
    category: "Visual Art",
    tags: ["abstract", "modern", "digital"],
    ipfsHash: "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    ipfsUrl: "https://ipfs.io/ipfs/QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    metadataUrl: "https://ipfs.io/ipfs/QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    registrationDate: "2024-01-15T10:30:00Z",
    transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    blockNumber: 12345678,
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    licenseCount: 5,
    totalEarnings: 0.25,
    status: "active"
  },
  {
    id: "2",
    title: "Music Track - Sunset Dreams",
    description: "An ambient electronic track perfect for relaxation",
    workType: "Music",
    category: "Electronic",
    tags: ["ambient", "electronic", "relaxation"],
    ipfsHash: "QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
    ipfsUrl: "https://ipfs.io/ipfs/QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
    metadataUrl: "https://ipfs.io/ipfs/QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
    registrationDate: "2024-01-10T14:20:00Z",
    transactionHash: "0x2345678901bcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    blockNumber: 12345670,
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    licenseCount: 12,
    totalEarnings: 0.8,
    status: "licensed"
  }
];

export function MyWorks() {
  const [works] = useState<NFTWork[]>(mockWorks);
  const [filter, setFilter] = useState<'all' | 'active' | 'licensed' | 'sold'>('all');

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
              href="/register"
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
