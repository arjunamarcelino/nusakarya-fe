"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

interface CertificateResultProps {
  certificate: {
    nftId: string;
    ipfsHash: string;
    ipfsUrl: string;
    metadataUrl: string;
    registrationDate: string;
    transactionHash: string;
    blockNumber: number;
    contractAddress: string;
  };
  onMintAnother: () => void;
}

export function CertificateResult({ certificate, onMintAnother }: CertificateResultProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, field)}
      className="px-2"
    >
      {copiedField === field ? '✅' : '📋'}
    </Button>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[var(--color-deep-navy)] mb-2">
          Sertifikat NFT Berhasil Dibuat!
        </h2>
        <p className="text-[var(--color-slate-gray)]">
          Karya digitalmu telah terdaftar dan dilindungi dengan teknologi blockchain
        </p>
      </div>

      {/* Certificate Card */}
      <div className="bg-gradient-to-br from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] rounded-xl p-6 text-white mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-3xl">🏆</div>
          <div>
            <h3 className="text-xl font-semibold">NFT Certificate</h3>
            <p className="text-[var(--color-ivory-white)]/80">NusaKarya Digital Copyright</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[var(--color-ivory-white)]/80 mb-1">
              NFT ID
            </label>
            <div className="font-mono text-lg font-semibold">
              #{certificate.nftId}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--color-ivory-white)]/80 mb-1">
              Tanggal Registrasi
            </label>
            <div className="font-semibold">
              {formatDate(certificate.registrationDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-[var(--color-deep-navy)]">
          Detail Sertifikat
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
              IPFS Hash (File)
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                {certificate.ipfsHash}
              </code>
              <CopyButton text={certificate.ipfsHash} field="ipfsHash" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
              IPFS URL (File)
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                {certificate.ipfsUrl}
              </code>
              <CopyButton text={certificate.ipfsUrl} field="ipfsUrl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
              Metadata URL
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                {certificate.metadataUrl}
              </code>
              <CopyButton text={certificate.metadataUrl} field="metadataUrl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
              Transaction Hash
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                {certificate.transactionHash}
              </code>
              <CopyButton text={certificate.transactionHash} field="transactionHash" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
                Block Number
              </label>
              <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)]">
                {certificate.blockNumber.toLocaleString()}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-slate-gray)] mb-1">
                Contract Address
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-[var(--color-deep-navy)] truncate">
                  {certificate.contractAddress}
                </code>
                <CopyButton text={certificate.contractAddress} field="contractAddress" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => window.open(certificate.ipfsUrl, '_blank')}
          variant="outline"
          className="flex-1"
        >
          🔗 Lihat File di IPFS
        </Button>
        
        <Button
          onClick={() => window.open(`https://polygonscan.com/tx/${certificate.transactionHash}`, '_blank')}
          variant="outline"
          className="flex-1"
        >
          🔍 Lihat di Explorer
        </Button>
        
        <Button
          onClick={onMintAnother}
          className="flex-1 bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold"
        >
          🏆 Daftarkan Karya Lain
        </Button>
      </div>

      {/* Success Message */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="text-green-500">✅</div>
          <div>
            <h5 className="font-semibold text-green-800">Sertifikat Berhasil Disimpan</h5>
            <p className="text-sm text-green-700 mt-1">
              Sertifikat NFT telah tersimpan di blockchain dan tidak dapat diubah atau dihapus. 
              File asli tersimpan aman di IPFS dengan hash yang unik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
