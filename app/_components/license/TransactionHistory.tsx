"use client";

import { useState } from "react";
import { PrimaryButton } from "../ui/Button";
import { LicenseTransaction } from "./types";

interface TransactionHistoryProps {
  transactions: LicenseTransaction[];
  isLoading?: boolean;
}

export function TransactionHistory({ transactions, isLoading = false }: TransactionHistoryProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredTransactions = transactions
    .filter(tx => filterType === "all" || tx.type === filterType)
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

  const totalEarnings = transactions
    .filter(tx => tx.type === 'purchase' && tx.status === 'confirmed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalRoyalties = transactions
    .filter(tx => tx.type === 'royalty' && tx.status === 'confirmed')
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
            Riwayat Transaksi
          </h3>
          <p className="text-[var(--color-slate-gray)] text-sm mt-1">
            Catatan semua transaksi lisensi dan royalti
          </p>
        </div>
        <div className="text-sm text-[var(--color-slate-gray)]">
          {filteredTransactions.length} transaksi
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💰</div>
            <div>
              <h4 className="font-semibold text-green-800">Total Penjualan</h4>
              <p className="text-green-600 font-semibold">
                {totalEarnings.toFixed(4)} ETH
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h4 className="font-semibold text-blue-800">Total Royalti</h4>
              <p className="text-blue-600 font-semibold">
                {totalRoyalties.toFixed(4)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex space-x-2">
          <PrimaryButton
            onClick={() => setFilterType("all")}
          >
            Semua
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("purchase")}
          >
            🛒 Pembelian
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("royalty")}
          >
            💰 Royalti
          </PrimaryButton>
        </div>
        
        <div className="flex space-x-2">
          <PrimaryButton
            onClick={() => setSortBy("newest")}
          >
            Terbaru
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setSortBy("oldest")}
          >
            Terlama
          </PrimaryButton>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-2">
            Belum Ada Transaksi
          </h4>
          <p className="text-[var(--color-slate-gray)]">
            Transaksi lisensi dan royalti akan muncul di sini
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
