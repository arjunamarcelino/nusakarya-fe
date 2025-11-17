"use client";

import { useState } from "react";
import { TransactionHistory } from "./TransactionHistory";
import { DigitalWork, License, LicenseTransaction } from "./types";
import Image from "next/image";

type ViewMode = 'marketplace' | 'transactions' | 'my-licenses';

/**
 * Halaman Lisensi Digital - Buyer Marketplace
 * 
 * Purpose: Marketplace for buyers to browse, purchase, and manage licenses
 * Access: Authenticated users (buyers)
 * Focus: License browsing, purchasing, usage history, and transaction history
 * Analogy: "Toko karya" - public storefront for digital licenses
 * 
 * Features:
 * - Marketplace: Browse and search available licenses from all creators
 * - My Licenses: View purchased licenses and usage history
 * - Transactions: View purchase and transaction history
 */
export function LicensePage() {
  const [currentView, setCurrentView] = useState<ViewMode>('marketplace');
  
  // Mock data - in real app, this would come from API/blockchain
  const [works] = useState<DigitalWork[]>([
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
  ]);

  // Only purchase transactions for buyer/user side
  const [transactions] = useState<LicenseTransaction[]>([
    {
      id: 'tx1',
      type: 'purchase',
      licenseId: 'lic1',
      fromAddress: '0x1234567890abcdef1234567890abcdef12345678',
      toAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      amount: 0.05,
      currency: 'ETH',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      blockNumber: 45234567,
      timestamp: '2024-01-28T16:30:00Z',
      status: 'confirmed'
    },
    {
      id: 'tx2',
      type: 'purchase',
      licenseId: 'lic2',
      fromAddress: '0x1234567890abcdef1234567890abcdef12345678',
      toAddress: '0xbcdefg1234567890bcdefg1234567890bcdefg12',
      amount: 0.08,
      currency: 'ETH',
      transactionHash: '0xbcdefg1234567890bcdefg1234567890bcdefg1234567890bcdefg1234567890',
      blockNumber: 45234568,
      timestamp: '2024-01-25T14:20:00Z',
      status: 'confirmed'
    }
  ]);

  // Mock purchased licenses - in real app, this would come from API/blockchain
  const [purchasedLicenses] = useState<License[]>([
    {
      id: 'lic1',
      workId: '1',
      licenseType: 'commercial',
      price: 0.05,
      priceUnit: 'ETH',
      duration: 6,
      durationUnit: 'months',
      description: 'Lisensi komersial untuk penggunaan dalam proyek komersial',
      terms: 'Dapat digunakan untuk tujuan komersial selama 6 bulan',
      isActive: true,
      createdAt: '2024-01-28T16:30:00Z',
      contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      tokenId: '123'
    }
  ]);

  const getViewTitle = () => {
    switch (currentView) {
      case 'marketplace':
        return 'Marketplace Lisensi';
      case 'my-licenses':
        return 'Lisensi Saya';
      case 'transactions':
        return 'Riwayat Pembelian';
      default:
        return 'Lisensi Digital';
    }
  };

  const getViewDescription = () => {
    switch (currentView) {
      case 'marketplace':
        return 'Jelajahi dan beli lisensi karya digital dari kreator terbaik';
      case 'my-licenses':
        return 'Lihat lisensi yang telah Anda beli dan riwayat penggunaannya';
      case 'transactions':
        return 'Lihat riwayat pembelian lisensi yang telah Anda lakukan';
      default:
        return 'Marketplace lisensi digital untuk pembeli';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {getViewTitle()}
              </h1>
              <p className="text-[var(--color-slate-gray)] mt-1">
                {getViewDescription()}
              </p>
            </div>
            
            {/* Navigation */}
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView('marketplace')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'marketplace'
                    ? 'bg-[var(--color-nusa-blue)] text-white'
                    : 'text-[var(--color-slate-gray)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
                }`}
              >
                🛒 Marketplace
              </button>
              <button
                onClick={() => setCurrentView('my-licenses')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'my-licenses'
                    ? 'bg-[var(--color-nusa-blue)] text-white'
                    : 'text-[var(--color-slate-gray)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
                }`}
              >
                📜 Lisensi Saya
              </button>
              <button
                onClick={() => setCurrentView('transactions')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'transactions'
                    ? 'bg-[var(--color-nusa-blue)] text-white'
                    : 'text-[var(--color-slate-gray)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
                }`}
              >
                📊 Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'marketplace' && (
          <div className="space-y-6">
            {/* Marketplace Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[var(--color-deep-navy)] mb-2">
                  🛒 Marketplace Lisensi Digital
                </h2>
                <p className="text-[var(--color-slate-gray)] mb-6">
                  Jelajahi dan beli lisensi karya digital dari kreator terbaik
                </p>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Cari karya atau kreator..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent text-[var(--color-deep-navy)] placeholder:text-gray-400 bg-white"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent text-[var(--color-deep-navy)] bg-white">
                    <option value="">Semua Kategori</option>
                    <option value="digital-art">Digital Art</option>
                    <option value="music">Music</option>
                    <option value="3d-art">3D Art</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Licenses */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                🔥 Lisensi Populer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {works.slice(0, 6).map((work) => (
                  <div key={work.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {work.imageUrl ? (
                        <Image
                          src={work.imageUrl}
                          alt={work.title}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className="text-4xl text-[var(--color-slate-gray)]">
                          {work.workType === 'image' ? '🖼️' : 
                           work.workType === 'audio' ? '🎵' : 
                           work.workType === '3d-model' ? '🎲' : '📁'}
                        </div>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-[var(--color-deep-navy)] mb-2 truncate">
                      {work.title}
                    </h4>
                    
                    <p className="text-sm text-[var(--color-slate-gray)] mb-3 line-clamp-2">
                      {work.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[var(--color-slate-gray)]">
                        oleh {work.ownerAddress.slice(0, 6)}...{work.ownerAddress.slice(-4)}
                      </span>
                      <span className="text-xs bg-[var(--color-nusa-blue)]/10 text-[var(--color-nusa-blue)] px-2 py-1 rounded">
                        {work.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-[var(--color-slate-gray)]">Mulai dari:</span>
                        <span className="font-semibold text-[var(--color-deep-navy)] ml-1">0.05 ETH</span>
                      </div>
                      <button className="px-3 py-1.5 bg-[var(--color-nusa-blue)] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                        Lihat Lisensi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-xl p-8 text-center text-white">
              <h3 className="text-xl font-bold mb-2">Siap Menjadi Kreator?</h3>
              <p className="mb-4 opacity-90">
                Daftarkan karya digital Anda dan mulai menjual lisensi
              </p>
              <button
                onClick={() => window.location.href = '/app/register'}
                className="px-6 py-3 bg-white text-[var(--color-deep-navy)] rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                🏆 Daftarkan Karya
              </button>
            </div>
          </div>
        )}

        {currentView === 'my-licenses' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                Lisensi yang Telah Dibeli
              </h3>
              {purchasedLicenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📜</div>
                  <h4 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-2">
                    Belum Ada Lisensi
                  </h4>
                  <p className="text-[var(--color-slate-gray)] mb-6">
                    Beli lisensi dari marketplace untuk mulai menggunakan karya digital
                  </p>
                  <button
                    onClick={() => setCurrentView('marketplace')}
                    className="px-6 py-3 bg-[var(--color-nusa-blue)] text-white rounded-lg font-semibold hover:opacity-90 transition-colors"
                  >
                    Jelajahi Marketplace
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchasedLicenses.map((license) => {
                    const work = works.find(w => w.id === license.workId);
                    return (
                      <div key={license.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[var(--color-deep-navy)] mb-2">
                              {work?.title || 'Unknown Work'}
                            </h4>
                            <p className="text-sm text-[var(--color-slate-gray)] mb-3">
                              {license.description}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-[var(--color-slate-gray)]">Jenis:</span>
                                <p className="font-medium text-[var(--color-deep-navy)]">
                                  {license.licenseType === 'commercial' ? 'Komersial' : 
                                   license.licenseType === 'non-commercial' ? 'Non-Komersial' : 
                                   'Event-based'}
                                </p>
                              </div>
                              <div>
                                <span className="text-[var(--color-slate-gray)]">Durasi:</span>
                                <p className="font-medium text-[var(--color-deep-navy)]">
                                  {license.duration} {license.durationUnit === 'days' ? 'Hari' : 
                                                      license.durationUnit === 'months' ? 'Bulan' : 
                                                      'Tahun'}
                                </p>
                              </div>
                              <div>
                                <span className="text-[var(--color-slate-gray)]">Harga:</span>
                                <p className="font-medium text-[var(--color-deep-navy)]">
                                  {license.price} {license.priceUnit}
                                </p>
                              </div>
                              <div>
                                <span className="text-[var(--color-slate-gray)]">Status:</span>
                                <p className="font-medium text-green-600">
                                  {license.isActive ? 'Aktif' : 'Tidak Aktif'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'transactions' && (
          <TransactionHistory
            transactions={transactions.filter(tx => tx.type === 'purchase')}
            isLoading={false}
          />
        )}
      </div>
    </div>
  );
}
