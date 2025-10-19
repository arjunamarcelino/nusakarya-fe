"use client";

import { useState } from "react";
import { WorkList } from "./WorkList";
import { LicenseForm } from "./LicenseForm";
import { LicensePreview } from "./LicensePreview";
import { TransactionHistory } from "./TransactionHistory";
import { DigitalWork, License, LicenseFormData, LicenseTransaction } from "./types";
import Image from "next/image";

type ViewMode = 'works' | 'create' | 'preview' | 'transactions' | 'marketplace';

/**
 * Halaman Lisensi Digital - Marketplace & License Management
 * 
 * Purpose: Public marketplace for license browsing and private license creation
 * Access: Public (marketplace) + Authenticated creators (license management)
 * Focus: License marketplace, creation, publishing, and transaction history
 * Analogy: "Toko karya" - public storefront for digital licenses
 * 
 * Features:
 * - Marketplace: Browse and purchase licenses from all creators (public)
 * - Etalase Saya: Create and manage licenses for own works (authenticated)
 * - Transactions: View license purchase and sales history
 * - License Creation: Configure and publish new licenses
 */
export function LicensePage() {
  const [currentView, setCurrentView] = useState<ViewMode>('marketplace');
  const [selectedWork, setSelectedWork] = useState<DigitalWork | null>(null);
  const [licenseFormData, setLicenseFormData] = useState<LicenseFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
      type: 'royalty',
      licenseId: 'lic1',
      fromAddress: '0x1234567890abcdef1234567890abcdef12345678',
      toAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      amount: 0.005,
      currency: 'ETH',
      transactionHash: '0xbcdefg1234567890bcdefg1234567890bcdefg1234567890bcdefg1234567890',
      blockNumber: 45234568,
      timestamp: '2024-01-28T16:35:00Z',
      status: 'confirmed'
    }
  ]);

  const handleWorkSelect = (work: DigitalWork) => {
    setSelectedWork(work);
  };

  const handleCreateLicense = (work: DigitalWork) => {
    setSelectedWork(work);
    setCurrentView('create');
  };

  const handleLicenseFormSubmit = (formData: LicenseFormData) => {
    setLicenseFormData(formData);
    setCurrentView('preview');
  };

  const handleLicensePublish = async () => {
    if (!licenseFormData || !selectedWork) return;

    setIsLoading(true);
    try {
      // Simulate API call to create license
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock license creation
      const newLicense: License = {
        id: Math.random().toString(36).substr(2, 9),
        workId: selectedWork.id,
        licenseType: licenseFormData.licenseType,
        price: licenseFormData.price,
        priceUnit: licenseFormData.priceUnit,
        duration: licenseFormData.duration,
        durationUnit: licenseFormData.durationUnit,
        description: licenseFormData.description,
        terms: licenseFormData.terms,
        isActive: true,
        createdAt: new Date().toISOString(),
        contractAddress: '0x' + Math.random().toString(16).substr(2, 40)
      };

      console.log('License created:', newLicense);
      
      // Reset form and go back to works view
      setLicenseFormData(null);
      setSelectedWork(null);
      setCurrentView('works');
      
      // Show success message (you could add a toast notification here)
      alert('Lisensi berhasil dipublikasikan!');
      
    } catch (error) {
      console.error('Failed to create license:', error);
      alert('Gagal membuat lisensi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToWorks = () => {
    setSelectedWork(null);
    setLicenseFormData(null);
    setCurrentView('works');
  };

  const handleEditLicense = () => {
    setCurrentView('create');
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'works':
        return 'Etalase Lisensi Digital';
      case 'create':
        return 'Buat Lisensi';
      case 'preview':
        return 'Preview Lisensi';
      case 'transactions':
        return 'Riwayat Transaksi';
      case 'marketplace':
        return 'Marketplace Lisensi';
      default:
        return 'Lisensi Digital';
    }
  };

  const getViewDescription = () => {
    switch (currentView) {
      case 'works':
        return 'Jelajahi karya digital dan buat lisensi untuk dijual';
      case 'create':
        return 'Konfigurasi lisensi untuk karya yang dipilih';
      case 'preview':
        return 'Review lisensi sebelum dipublikasikan';
      case 'transactions':
        return 'Lihat semua transaksi lisensi dan royalti';
      case 'marketplace':
        return 'Jelajahi dan beli lisensi karya digital dari kreator terbaik';
      default:
        return 'Marketplace lisensi digital untuk kreator dan pembeli';
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
                🛒 Beli Lisensi
              </button>
              <button
                onClick={() => setCurrentView('works')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'works'
                    ? 'bg-[var(--color-nusa-blue)] text-white'
                    : 'text-[var(--color-slate-gray)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
                }`}
              >
                🏪 Etalase Saya
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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent">
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
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
                onClick={() => window.location.href = '/register'}
                className="px-6 py-3 bg-white text-[var(--color-deep-navy)] rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                🏆 Daftarkan Karya
              </button>
            </div>
          </div>
        )}

        {currentView === 'works' && (
          <WorkList
            works={works}
            selectedWork={selectedWork}
            onWorkSelect={handleWorkSelect}
            onCreateLicense={handleCreateLicense}
          />
        )}

        {currentView === 'create' && selectedWork && (
          <div className="max-w-2xl mx-auto">
            <LicenseForm
              work={selectedWork}
              onSubmit={handleLicenseFormSubmit}
              onCancel={handleBackToWorks}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentView === 'preview' && selectedWork && licenseFormData && (
          <div className="max-w-2xl mx-auto">
            <LicensePreview
              work={selectedWork}
              formData={licenseFormData}
              onPublish={handleLicensePublish}
              onEdit={handleEditLicense}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentView === 'transactions' && (
          <TransactionHistory
            transactions={transactions}
            isLoading={false}
          />
        )}
      </div>
    </div>
  );
}
