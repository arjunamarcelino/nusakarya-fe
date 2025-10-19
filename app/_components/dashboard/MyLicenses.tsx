"use client";

import { useState } from "react";

interface License {
  id: string;
  workId: string;
  workTitle: string;
  licensee: string;
  licenseeAddress: string;
  licenseType: 'exclusive' | 'non-exclusive' | 'commercial' | 'personal';
  startDate: string;
  endDate: string;
  price: number;
  royaltyRate: number;
  totalEarnings: number;
  status: 'active' | 'expired' | 'cancelled';
  transactionHash: string;
  blockNumber: number;
}

// Mock data - replace with actual data fetching
const mockLicenses: License[] = [
  {
    id: "1",
    workId: "1",
    workTitle: "Digital Art Collection #1",
    licensee: "Creative Studio XYZ",
    licenseeAddress: "0x1234567890123456789012345678901234567890",
    licenseType: "commercial",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2025-01-20T00:00:00Z",
    price: 0.1,
    royaltyRate: 5,
    totalEarnings: 0.05,
    status: "active",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345680
  },
  {
    id: "2",
    workId: "2",
    workTitle: "Music Track - Sunset Dreams",
    licensee: "Indie Film Productions",
    licenseeAddress: "0x2345678901234567890123456789012345678901",
    licenseType: "non-exclusive",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2026-01-15T00:00:00Z",
    price: 0.2,
    royaltyRate: 3,
    totalEarnings: 0.12,
    status: "active",
    transactionHash: "0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345675
  },
  {
    id: "3",
    workId: "1",
    workTitle: "Digital Art Collection #1",
    licensee: "Personal User",
    licenseeAddress: "0x3456789012345678901234567890123456789012",
    licenseType: "personal",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2024-12-01T00:00:00Z",
    price: 0.05,
    royaltyRate: 0,
    totalEarnings: 0.05,
    status: "expired",
    transactionHash: "0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345650
  }
];

export function MyLicenses() {
  const [licenses] = useState<License[]>(mockLicenses);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'cancelled'>('all');

  const filteredLicenses = licenses.filter(license => 
    filter === 'all' || license.status === filter
  );

  const getStatusBadge = (status: License['status']) => {
    const statusConfig = {
      active: { label: 'Aktif', color: 'bg-green-100 text-green-800' },
      expired: { label: 'Kedaluwarsa', color: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Dibatalkan', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getLicenseTypeBadge = (type: License['licenseType']) => {
    const typeConfig = {
      exclusive: { label: 'Eksklusif', color: 'bg-purple-100 text-purple-800' },
      'non-exclusive': { label: 'Non-Eksklusif', color: 'bg-blue-100 text-blue-800' },
      commercial: { label: 'Komersial', color: 'bg-orange-100 text-orange-800' },
      personal: { label: 'Personal', color: 'bg-green-100 text-green-800' }
    };
    
    const config = typeConfig[type];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getBasescanUrl = (txHash: string) => {
    return `https://basescan.org/tx/${txHash}`;
  };

  const totalEarnings = licenses.reduce((sum, license) => sum + license.totalEarnings, 0);
  const activeLicenses = licenses.filter(license => license.status === 'active').length;
  const totalRoyalties = licenses.reduce((sum, license) => sum + (license.totalEarnings * license.royaltyRate / 100), 0);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Lisensi</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{licenses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Lisensi Aktif</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{activeLicenses}</p>
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
                {totalEarnings.toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Royalti</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {totalRoyalties.toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">Lisensi Saya</h3>
          <div className="flex space-x-2">
            {(['all', 'active', 'expired', 'cancelled'] as const).map((filterType) => (
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
                 filterType === 'expired' ? 'Kedaluwarsa' : 'Dibatalkan'}
              </button>
            ))}
          </div>
        </div>

        {/* Licenses List */}
        {filteredLicenses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[var(--color-slate-gray)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
              Belum ada lisensi
            </h3>
            <p className="text-[var(--color-slate-gray)]">
              Lisensi yang dijual untuk karya Anda akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLicenses.map((license) => (
              <div key={license.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-[var(--color-deep-navy)]">
                        {license.workTitle}
                      </h4>
                      {getStatusBadge(license.status)}
                      {getLicenseTypeBadge(license.licenseType)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Lisensi:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {license.licensee}
                        </p>
                        <p className="text-xs text-[var(--color-slate-gray)] font-mono">
                          {license.licenseeAddress.slice(0, 6)}...{license.licenseeAddress.slice(-4)}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Periode:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {new Date(license.startDate).toLocaleDateString('id-ID')} - {new Date(license.endDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Harga Lisensi:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {license.price} ETH
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Rate Royalti:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {license.royaltyRate}%
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Total Pendapatan:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          {license.totalEarnings} ETH
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Block:</span>
                        <p className="font-medium text-[var(--color-deep-navy)]">
                          #{license.blockNumber.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <a
                      href={getBasescanUrl(license.transactionHash)}
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
