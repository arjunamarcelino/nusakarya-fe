"use client";

interface WorkVerification {
  isVerified: boolean;
  work?: {
    id: string;
    title: string;
    description: string;
    type: string;
    category: string | null;
    tags: string[];
    fileUrl: string;
    fileHash: string;
    nftId: string | null;
    txHash: string | null;
    createdAt: string;
    creator: {
      id: string;
      walletAddress: string | null;
      email: string | null;
    };
    licenses: Array<{
      id: string;
      type: string;
      price: number;
      duration: number;
      description: string;
      tnc: string;
      txHash: string | null;
      createdAt: string;
    }>;
  };
  error?: string;
}

interface VerificationResultProps {
  result: WorkVerification;
  onReset: () => void;
}

export function VerificationResult({ result, onReset }: VerificationResultProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getBlockExplorerUrl = (hash: string | null) => {
    if (!hash) return "#";
    // Use Etherscan for Ethereum Sepolia network
    return `https://sepolia.etherscan.io/tx/${hash}`;
  };

  const formatAddress = (address: string | null) => {
    if (!address) return "Tidak tersedia";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!result.isVerified) {
    return (
      <div className="bg-white border border-[var(--color-nusa-blue)]/20 rounded-xl p-8 text-center">
        <div className="space-y-6">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-[var(--color-accent-red)]/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-accent-red)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-accent-red)] mb-2">
              ❌ Tidak Ditemukan
            </h2>
            <p className="text-[var(--color-deep-navy)]/70 text-lg">
              {result.error || "Karya tidak ditemukan dalam sistem blockchain"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onReset}
              className="bg-[var(--color-nusa-blue)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-nusa-blue)]/90 transition-colors"
            >
              Verifikasi Lainnya
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-nusa-blue)]/20 rounded-xl p-8">
      <div className="space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-[var(--color-karya-gold)]/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[var(--color-karya-gold)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-karya-gold)] mb-2">
            ✅ Karya Terverifikasi
          </h2>
          <p className="text-[var(--color-deep-navy)]/70">
            Karya ini telah terdaftar dan dilindungi di blockchain
          </p>
        </div>

        {/* Work Details */}
        {result.work && (
          <div className="space-y-6">
            <div className="border border-[var(--color-nusa-blue)]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                Detail Karya
              </h3>
              <div className="grid gap-4">
                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Judul Karya</span>
                  <span className="text-[var(--color-deep-navy)] font-medium">
                    {result.work.title}
                  </span>
                </div>

                {result.work.description && (
                  <div>
                    <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Deskripsi</span>
                    <span className="text-[var(--color-deep-navy)]">
                      {result.work.description}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Tipe</span>
                  <span className="text-[var(--color-deep-navy)]">
                    {result.work.type}
                  </span>
                  {result.work.category && (
                    <span className="text-[var(--color-deep-navy)]/70 ml-2">
                      • {result.work.category}
                    </span>
                  )}
                </div>

                {result.work.tags.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Tag</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {result.work.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[var(--color-nusa-blue)]/10 text-[var(--color-nusa-blue)] rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Pemilik</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-medium">
                      {result.work.creator.email || formatAddress(result.work.creator.walletAddress)}
                    </span>
                    {result.work.creator.walletAddress && (
                      <button
                        onClick={() => copyToClipboard(result.work!.creator.walletAddress!)}
                        className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                        title="Salin wallet address"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {result.work.creator.walletAddress && (
                    <p className="text-xs text-[var(--color-deep-navy)]/60 font-mono mt-1">
                      {result.work.creator.walletAddress}
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Tanggal Registrasi</span>
                  <span className="text-[var(--color-deep-navy)]">
                    {formatDate(result.work.createdAt)}
                  </span>
                </div>

                {result.work.nftId && (
                  <div>
                    <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">NFT ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[var(--color-deep-navy)] font-mono">
                        #{result.work.nftId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.work!.nftId!)}
                        className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                        title="Salin NFT ID"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">File URL</span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={result.work.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-nusa-blue)] hover:text-[var(--color-nusa-blue)]/80 hover:underline font-mono text-sm break-all transition-colors"
                    >
                      {result.work.fileUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(result.work!.fileUrl)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin File URL"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">File Hash</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-mono text-sm break-all">
                      {result.work.fileHash}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.work!.fileHash)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin File Hash"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Details */}
            {result.work.txHash && (
              <div className="border border-[var(--color-nusa-blue)]/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                  Informasi Blockchain
                </h3>
                <div className="grid gap-4">
                  <div>
                    <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Transaction Hash</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[var(--color-deep-navy)] font-mono text-sm break-all">
                        {result.work.txHash}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.work!.txHash!)}
                        className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                        title="Salin Transaction Hash"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Licenses Section */}
            {result.work.licenses && result.work.licenses.length > 0 && (
              <div className="border border-[var(--color-nusa-blue)]/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                  Lisensi Tersedia ({result.work.licenses.length})
                </h3>
                <div className="space-y-4">
                  {result.work.licenses.map((license) => (
                    <div
                      key={license.id}
                      className="border border-[var(--color-nusa-blue)]/10 rounded-lg p-4 bg-[var(--color-nusa-blue)]/5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-[var(--color-deep-navy)]">
                            {license.type}
                          </h4>
                          <p className="text-sm text-[var(--color-deep-navy)]/70 mt-1">
                            {license.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[var(--color-nusa-blue)]">
                            {license.price.toFixed(4)} ETH
                          </p>
                          <p className="text-xs text-[var(--color-deep-navy)]/60">
                            {license.duration} hari
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[var(--color-nusa-blue)]/10">
                        <p className="text-xs text-[var(--color-deep-navy)]/70">
                          <span className="font-medium">Syarat & Ketentuan:</span> {license.tnc}
                        </p>
                        {license.txHash && (
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs text-[var(--color-deep-navy)]/60 font-mono">
                              TX: {formatAddress(license.txHash)}
                            </span>
                            <button
                              onClick={() => copyToClipboard(license.txHash!)}
                              className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                              title="Salin Transaction Hash"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {result.work.txHash && (
                <a
                  href={getBlockExplorerUrl(result.work.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-nusa-blue)]/10 text-[var(--color-deep-navy)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-nusa-blue)]/20 transition-colors flex items-center space-x-2 border border-[var(--color-nusa-blue)]/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Lihat di Explorer</span>
                </a>
              )}
              <button
                onClick={onReset}
                className="bg-[var(--color-nusa-blue)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-nusa-blue)]/90 transition-colors"
              >
                Verifikasi Lainnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
