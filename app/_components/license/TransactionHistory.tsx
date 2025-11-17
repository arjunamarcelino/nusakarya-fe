"use client";

import { useState } from "react";
import { PrimaryButton } from "../ui/Button";
import { LicenseTransaction } from "./types";

interface TransactionHistoryProps {
  transactions: LicenseTransaction[];
  isLoading?: boolean;
}

export function TransactionHistory({ transactions, isLoading = false }: TransactionHistoryProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter to only show purchase transactions for buyer/user side
  const purchaseTransactions = transactions.filter(tx => tx.type === 'purchase');
  
  const filteredTransactions = purchaseTransactions
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'pending': '⏳',
      'confirmed': '✅',
      'failed': '❌'
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'text-yellow-600',
      'confirmed': 'text-green-600',
      'failed': 'text-red-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'purchase': '🛒',
      'royalty': '💰'
    };
    return icons[type as keyof typeof icons] || '💸';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'purchase': 'Pembelian Lisensi',
      'royalty': 'Pembayaran Royalti'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalEarnings = purchaseTransactions
    .filter(tx => tx.status === 'confirmed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-deep-navy)]">
            Riwayat Pembelian
          </h3>
          <p className="text-[var(--color-slate-gray)] text-sm mt-1">
            Catatan semua pembelian lisensi yang telah Anda lakukan
          </p>
        </div>
        <div className="text-sm text-[var(--color-slate-gray)]">
          {filteredTransactions.length} pembelian
        </div>
      </div>

      {/* Summary Card */}
      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💰</div>
            <div>
              <h4 className="font-semibold text-green-800">Total Pembelian</h4>
              <p className="text-green-600 font-semibold">
                {totalEarnings.toFixed(4)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'newest'
                ? 'bg-[var(--color-nusa-blue)] text-white'
                : 'text-[var(--color-slate-gray)] border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
            }`}
          >
            Terbaru
          </button>
          <button
            onClick={() => setSortBy("oldest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'oldest'
                ? 'bg-[var(--color-nusa-blue)] text-white'
                : 'text-[var(--color-slate-gray)] border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10'
            }`}
          >
            Terlama
          </button>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-2">
            Belum Ada Pembelian
          </h4>
          <p className="text-[var(--color-slate-gray)]">
            Riwayat pembelian lisensi akan muncul di sini setelah Anda membeli lisensi
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-[var(--color-nusa-blue)]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--color-deep-navy)]">
                      {getTypeLabel(transaction.type)}
                    </h5>
                    <div className="flex items-center space-x-4 text-sm text-[var(--color-slate-gray)]">
                      <span>
                        Dari: {formatAddress(transaction.fromAddress)}
                      </span>
                      <span>
                        Ke: {formatAddress(transaction.toAddress)}
                      </span>
                      <span>{formatDate(transaction.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-[var(--color-deep-navy)]">
                      {transaction.amount.toFixed(4)} {transaction.currency}
                    </span>
                    <span className={`text-lg ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--color-slate-gray)]">
                    Block #{transaction.blockNumber.toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Transaction Hash */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-slate-gray)]">
                    Transaction Hash:
                  </span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-[var(--color-deep-navy)]">
                      {formatAddress(transaction.transactionHash)}
                    </code>
                    <PrimaryButton
                      onClick={() => window.open(`https://polygonscan.com/tx/${transaction.transactionHash}`, '_blank')}
                      className="px-2"
                    >
                      🔗
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
