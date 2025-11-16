"use client";

import { useState, useEffect } from "react";
import { PrimaryButton } from "../ui/Button";

interface TransactionNotificationProps {
  transaction: {
    hash: string;
    status: 'pending' | 'success' | 'failed';
    blockNumber?: number;
    gasUsed?: string;
    timestamp: number;
  } | null;
  onClose: () => void;
}

export function TransactionNotification({ transaction, onClose }: TransactionNotificationProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!transaction) return;

    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - transaction.timestamp) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [transaction]);

  if (!transaction) return null;

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'pending':
        return '⏳';
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getStatusMessage = () => {
    switch (transaction.status) {
      case 'pending':
        return 'Transaksi sedang diproses...';
      case 'success':
        return 'NFT Certificate berhasil dibuat!';
      case 'failed':
        return 'Transaksi gagal. Silakan coba lagi.';
      default:
        return 'Memproses transaksi...';
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">
            Status Transaksi
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-slate-gray)] hover:text-[var(--color-deep-navy)] transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Status Card */}
        <div className={`border rounded-lg p-4 mb-4 ${getStatusColor()}`}>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getStatusIcon()}</div>
            <div>
              <h4 className="font-semibold">{getStatusMessage()}</h4>
              {transaction.status === 'pending' && (
                <p className="text-sm opacity-80">
                  Waktu: {formatTime(timeElapsed)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
              Transaction Hash
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                {transaction.hash}
              </code>
              <PrimaryButton
                onClick={() => copyToClipboard(transaction.hash)}
                className="px-2"
              >
                📋
              </PrimaryButton>
            </div>
          </div>

          {transaction.blockNumber && (
            <div>
              <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
                Block Number
              </label>
              <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)]">
                {transaction.blockNumber.toLocaleString()}
              </div>
            </div>
          )}

          {transaction.gasUsed && (
            <div>
              <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
                Gas Used
              </label>
              <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)]">
                {parseInt(transaction.gasUsed).toLocaleString()} gas
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <PrimaryButton
            onClick={() => window.open(`https://polygonscan.com/tx/${transaction.hash}`, '_blank')}
            className="flex-1"
          >
            🔍 View on Explorer
          </PrimaryButton>
          
          {transaction.status === 'success' && (
            <PrimaryButton
              onClick={onClose}
              className="flex-1 bg-[var(--color-nusa-blue)] hover:bg-[var(--color-deep-navy)]"
            >
              Lihat Sertifikat
            </PrimaryButton>
          )}
          
          {transaction.status === 'failed' && (
            <PrimaryButton
              onClick={onClose}
              className="flex-1"
            >
              Tutup
            </PrimaryButton>
          )}
        </div>

        {/* Progress Indicator for Pending */}
        {transaction.status === 'pending' && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-[var(--color-slate-gray)] mb-2">
              <span>Memproses transaksi...</span>
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[var(--color-nusa-blue)] h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((timeElapsed / 30) * 100, 90)}%` }}
              ></div>
            </div>
            <p className="text-xs text-[var(--color-slate-gray)] mt-2">
              Transaksi biasanya memakan waktu 15-30 detik
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
