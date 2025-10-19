"use client";

import { useState } from "react";

interface Transaction {
  id: string;
  type: 'mint' | 'license_sale' | 'royalty_payment' | 'license_purchase';
  title: string;
  description: string;
  amount: number;
  token: 'ETH' | 'USDC' | 'USDT';
  status: 'pending' | 'confirmed' | 'failed';
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  gasUsed: string;
  gasPrice: string;
}

// Mock data - replace with actual data fetching
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "license_sale",
    title: "Penjualan Lisensi - Digital Art Collection #1",
    description: "Lisensi komersial dijual ke Creative Studio XYZ",
    amount: 0.1,
    token: "ETH",
    status: "confirmed",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345680,
    timestamp: "2024-01-20T10:30:00Z",
    fromAddress: "0x1234567890123456789012345678901234567890",
    toAddress: "0x2345678901234567890123456789012345678901",
    gasUsed: "150000",
    gasPrice: "20000000000"
  },
  {
    id: "2",
    type: "royalty_payment",
    title: "Pembayaran Royalti - Music Track Sunset Dreams",
    description: "Royalti 3% dari penggunaan komersial",
    amount: 0.05,
    token: "ETH",
    status: "confirmed",
    transactionHash: "0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345675,
    timestamp: "2024-01-18T14:20:00Z",
    fromAddress: "0x2345678901234567890123456789012345678901",
    toAddress: "0x3456789012345678901234567890123456789012",
    gasUsed: "120000",
    gasPrice: "18000000000"
  },
  {
    id: "3",
    type: "mint",
    title: "Minting NFT Certificate - Digital Art Collection #1",
    description: "Sertifikat NFT baru berhasil dibuat",
    amount: 0,
    token: "ETH",
    status: "confirmed",
    transactionHash: "0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345678,
    timestamp: "2024-01-15T09:15:00Z",
    fromAddress: "0x3456789012345678901234567890123456789012",
    toAddress: "0x4567890123456789012345678901234567890123",
    gasUsed: "200000",
    gasPrice: "22000000000"
  },
  {
    id: "4",
    type: "license_sale",
    title: "Penjualan Lisensi - Music Track Sunset Dreams",
    description: "Lisensi non-eksklusif dijual ke Indie Film Productions",
    amount: 0.2,
    token: "ETH",
    status: "confirmed",
    transactionHash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345670,
    timestamp: "2024-01-10T16:45:00Z",
    fromAddress: "0x2345678901234567890123456789012345678901",
    toAddress: "0x5678901234567890123456789012345678901234",
    gasUsed: "180000",
    gasPrice: "21000000000"
  },
  {
    id: "5",
    type: "mint",
    title: "Minting NFT Certificate - Music Track Sunset Dreams",
    description: "Sertifikat NFT baru berhasil dibuat",
    amount: 0,
    token: "ETH",
    status: "confirmed",
    transactionHash: "0xef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345665,
    timestamp: "2024-01-08T11:30:00Z",
    fromAddress: "0x3456789012345678901234567890123456789012",
    toAddress: "0x6789012345678901234567890123456789012345",
    gasUsed: "195000",
    gasPrice: "20500000000"
  }
];

export function Transactions() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<'all' | 'mint' | 'license_sale' | 'royalty_payment' | 'license_purchase'>('all');

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  );

  const getTypeIcon = (type: Transaction['type']) => {
    const icons = {
      mint: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      license_sale: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      royalty_payment: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      license_purchase: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    };
    return icons[type];
  };

  const getTypeLabel = (type: Transaction['type']) => {
    const labels = {
      mint: 'Minting',
      license_sale: 'Penjualan Lisensi',
      royalty_payment: 'Pembayaran Royalti',
      license_purchase: 'Pembelian Lisensi'
    };
    return labels[type];
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const statusConfig = {
      pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Dikonfirmasi', color: 'bg-green-100 text-green-800' },
      failed: { label: 'Gagal', color: 'bg-red-100 text-red-800' }
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

  const totalTransactions = transactions.length;
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const confirmedTransactions = transactions.filter(tx => tx.status === 'confirmed').length;
  const pendingTransactions = transactions.filter(tx => tx.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Transaksi</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{totalTransactions}</p>
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
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Dikonfirmasi</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{confirmedTransactions}</p>
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
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Total Volume</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {totalVolume.toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--color-slate-gray)]">Pending</p>
              <p className="text-2xl font-bold text-[var(--color-deep-navy)]">{pendingTransactions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">Riwayat Transaksi</h3>
          <div className="flex space-x-2">
            {(['all', 'mint', 'license_sale', 'royalty_payment', 'license_purchase'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  filter === filterType
                    ? 'bg-[var(--color-deep-navy)] text-white'
                    : 'bg-gray-100 text-[var(--color-slate-gray)] hover:bg-gray-200'
                }`}
              >
                {filterType === 'all' ? 'Semua' : getTypeLabel(filterType)}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[var(--color-slate-gray)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
              Belum ada transaksi
            </h3>
            <p className="text-[var(--color-slate-gray)]">
              Transaksi minting, lisensi, dan pembayaran akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(transaction.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-[var(--color-deep-navy)]">
                          {transaction.title}
                        </h4>
                        {getStatusBadge(transaction.status)}
                      </div>
                      
                      <p className="text-[var(--color-slate-gray)] mb-4">
                        {transaction.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Jumlah:</span>
                          <p className="font-medium text-[var(--color-deep-navy)]">
                            {transaction.amount > 0 ? `${transaction.amount} ${transaction.token}` : 'Gas Only'}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Tanggal:</span>
                          <p className="font-medium text-[var(--color-deep-navy)]">
                            {new Date(transaction.timestamp).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Block:</span>
                          <p className="font-medium text-[var(--color-deep-navy)]">
                            #{transaction.blockNumber.toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Gas Used:</span>
                          <p className="font-medium text-[var(--color-deep-navy)]">
                            {parseInt(transaction.gasUsed).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <a
                      href={getBasescanUrl(transaction.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
