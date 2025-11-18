"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_hooks/useAuth";
import { createKaryaApi, type Karya } from "@/app/_libs/api";

interface RoyaltyRecipient {
  address: string;
  percentage: number;
}

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
  royaltyRecipients: RoyaltyRecipient[];
}

// Helper function to generate dummy Ethereum address
function generateDummyAddress(): string {
  return `0x${Math.random().toString(16).substr(2, 40)}`;
}

// Helper function to map API Karya to NFTWork format
function mapKaryaToNFTWork(karya: Karya): NFTWork {
  // Generate dummy data for fields not provided by API
  const dummyBlockNumber = Math.floor(Math.random() * 10000000) + 10000000;
  const dummyContractAddress = "0xabcdef1234567890abcdef1234567890abcdef12";
  const dummyLicenseCount = Math.floor(Math.random() * 20) + 1;
  const dummyTotalEarnings = parseFloat((Math.random() * 2).toFixed(3));
  
  // Generate dummy royalty recipients (1-3 recipients)
  const recipientCount = Math.floor(Math.random() * 3) + 1;
  const dummyRoyaltyRecipients: RoyaltyRecipient[] = [];
  let totalPercentage = 0;
  
  for (let i = 0; i < recipientCount; i++) {
    const percentage = i === recipientCount - 1 
      ? Math.max(1, 100 - totalPercentage) // Last one gets remaining
      : Math.floor(Math.random() * 30) + 5; // 5-35% for others
    totalPercentage += percentage;
    
    dummyRoyaltyRecipients.push({
      address: generateDummyAddress(),
      percentage: Math.min(percentage, 100 - (totalPercentage - percentage))
    });
  }
  
  // Ensure total doesn't exceed 100%
  const finalTotal = dummyRoyaltyRecipients.reduce((sum, r) => sum + r.percentage, 0);
  if (finalTotal > 100) {
    dummyRoyaltyRecipients[dummyRoyaltyRecipients.length - 1].percentage -= (finalTotal - 100);
  }
  
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
    status: status,
    royaltyRecipients: dummyRoyaltyRecipients
  };
}

interface RoyaltyModalProps {
  work: NFTWork | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (workId: string, recipients: RoyaltyRecipient[]) => void;
}

function RoyaltyModal({ work, isOpen, onClose, onUpdate }: RoyaltyModalProps) {
  const [recipients, setRecipients] = useState<RoyaltyRecipient[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [newPercentage, setNewPercentage] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (work) {
      setRecipients([...work.royaltyRecipients]);
    }
  }, [work]);

  if (!isOpen || !work) return null;

  const totalPercentage = recipients.reduce((sum, r) => sum + r.percentage, 0);
  const remainingPercentage = 100 - totalPercentage;

  const handleAdd = () => {
    if (!newAddress || !newPercentage) return;
    
    const percentage = parseFloat(newPercentage);
    if (percentage <= 0 || percentage > remainingPercentage) {
      alert(`Persentase harus antara 0 dan ${remainingPercentage.toFixed(2)}%`);
      return;
    }

    // Basic address validation
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      alert("Alamat harus berupa alamat Ethereum yang valid (0x...)");
      return;
    }

    setRecipients([...recipients, { address: newAddress, percentage }]);
    setNewAddress("");
    setNewPercentage("");
  };

  const handleUpdate = (index: number) => {
    if (!newAddress || !newPercentage) return;
    
    const percentage = parseFloat(newPercentage);
    const currentRecipient = recipients[index];
    const maxPercentage = remainingPercentage + currentRecipient.percentage;
    
    if (percentage <= 0 || percentage > maxPercentage) {
      alert(`Persentase harus antara 0 dan ${maxPercentage.toFixed(2)}%`);
      return;
    }

    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      alert("Alamat harus berupa alamat Ethereum yang valid (0x...)");
      return;
    }

    const updated = [...recipients];
    updated[index] = { address: newAddress, percentage };
    setRecipients(updated);
    setEditingIndex(null);
    setNewAddress("");
    setNewPercentage("");
  };

  const handleDelete = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (totalPercentage !== 100) {
      alert("Total persentase harus tepat 100%");
      return;
    }
    onUpdate(work.id, recipients);
    onClose();
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setNewAddress(recipients[index].address);
    setNewPercentage(recipients[index].percentage.toString());
  };

  return (
    <>
      {/* Backdrop with gradient */}
      <div 
        className="fixed inset-0 z-[9998] bg-gradient-to-br from-black/20 via-black/40 to-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">
                Kelola Penerima Royalti
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[var(--color-slate-gray)] mb-2">
                <strong>Karya:</strong> {work.title}
              </p>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Total Persentase:</span>
                <span className={`text-lg font-bold ${totalPercentage === 100 ? 'text-green-600' : totalPercentage > 100 ? 'text-red-600' : 'text-orange-600'}`}>
                  {totalPercentage.toFixed(2)}%
                </span>
              </div>
              {totalPercentage !== 100 && (
                <p className="text-xs text-orange-600 mt-1">
                  {totalPercentage < 100 
                    ? `Sisa: ${remainingPercentage.toFixed(2)}%` 
                    : `Melebihi: ${(totalPercentage - 100).toFixed(2)}%`}
                </p>
              )}
            </div>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {recipients.length === 0 ? (
                <p className="text-sm text-[var(--color-slate-gray)] text-center py-4 italic">
                  Belum ada penerima royalti. Tambahkan penerima baru di bawah.
                </p>
              ) : (
                recipients.map((recipient, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                  {editingIndex === index ? (
                    <>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="0x..."
                          className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm mb-2 text-[var(--color-deep-navy)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="number"
                          value={newPercentage}
                          onChange={(e) => setNewPercentage(e.target.value)}
                          placeholder="Persentase"
                          step="0.01"
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm text-[var(--color-deep-navy)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => handleUpdate(index)}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => {
                          setEditingIndex(null);
                          setNewAddress("");
                          setNewPercentage("");
                        }}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--color-deep-navy)] break-all">
                          {recipient.address}
                        </p>
                        <p className="text-xs text-[var(--color-slate-gray)]">
                          {recipient.percentage.toFixed(2)}%
                        </p>
                      </div>
                      <button
                        onClick={() => startEdit(index)}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>
                ))
              )}
            </div>

            {editingIndex === null && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Alamat Ethereum (0x...)"
                    className="flex-1 px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm text-[var(--color-deep-navy)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(e.target.value)}
                    placeholder="%"
                    step="0.01"
                    min="0"
                    max={remainingPercentage}
                    className="w-24 px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm text-[var(--color-deep-navy)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Tambah
                  </button>
                </div>
                {remainingPercentage > 0 && (
                  <p className="text-xs text-[var(--color-slate-gray)]">
                    Sisa persentase yang tersedia: {remainingPercentage.toFixed(2)}%
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              disabled={totalPercentage !== 100}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                totalPercentage === 100
                  ? 'bg-[var(--color-deep-navy)] hover:bg-opacity-90'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Simpan Perubahan
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function MyWorks() {
  const router = useRouter();
  const { isAuthenticated, getClient } = useAuth();
  const [works, setWorks] = useState<NFTWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'licensed' | 'sold'>('all');
  const [selectedWork, setSelectedWork] = useState<NFTWork | null>(null);
  const [isRoyaltyModalOpen, setIsRoyaltyModalOpen] = useState(false);

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

  const handleOpenRoyaltyModal = (work: NFTWork) => {
    setSelectedWork(work);
    setIsRoyaltyModalOpen(true);
  };

  const handleUpdateRoyalty = (workId: string, recipients: RoyaltyRecipient[]) => {
    // Update the work's royalty recipients (dummy update)
    setWorks(works.map(work => 
      work.id === workId 
        ? { ...work, royaltyRecipients: recipients }
        : work
    ));
    console.log("Updated royalty recipients for work:", workId, recipients);
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

  const getBlockExplorerUrl = (txHash: string) => {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
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
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
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

                    {/* Royalty Recipients Section */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-[var(--color-deep-navy)] flex items-center">
                          <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Penerima Royalti ({work.royaltyRecipients.length})
                        </h5>
                        <button
                          onClick={() => handleOpenRoyaltyModal(work)}
                          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                        >
                          Kelola
                        </button>
                      </div>
                      <div className="space-y-2">
                        {work.royaltyRecipients.map((recipient, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-mono text-[var(--color-deep-navy)] truncate">
                                {recipient.address}
                              </p>
                            </div>
                            <span className="ml-2 text-xs font-semibold text-purple-600 whitespace-nowrap">
                              {recipient.percentage.toFixed(2)}%
                            </span>
                          </div>
                        ))}
                        {work.royaltyRecipients.length === 0 && (
                          <p className="text-xs text-[var(--color-slate-gray)] italic">
                            Belum ada penerima royalti
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      type="button"
                      onClick={() => handleCreateLicense(work)}
                      className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] text-white rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Buat Lisensi
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleOpenRoyaltyModal(work)}
                      className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Kelola Royalti
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
                      href={getBlockExplorerUrl(work.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Lihat di Explorer
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Royalty Modal */}
      <RoyaltyModal
        work={selectedWork}
        isOpen={isRoyaltyModalOpen}
        onClose={() => {
          setIsRoyaltyModalOpen(false);
          setSelectedWork(null);
        }}
        onUpdate={handleUpdateRoyalty}
      />
    </div>
  );
}
