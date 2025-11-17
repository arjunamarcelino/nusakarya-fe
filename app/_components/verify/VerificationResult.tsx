"use client";

interface WorkVerification {
  isVerified: boolean;
  work?: {
    title: string;
    creator: string;
    creatorWallet: string;
    mintDate: string;
    tokenId: string;
    ipfsLink: string;
    transactionHash: string;
    blockNumber: number;
    contractAddress: string;
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

  const getBlockExplorerUrl = (hash: string) => {
    // This would be the actual blockchain explorer URL
    return `https://etherscan.io/tx/${hash}`;
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
                
                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Pemilik</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-medium">
                      {result.work.creator}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.work!.creatorWallet)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin wallet address"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--color-deep-navy)]/60 font-mono">
                    {result.work.creatorWallet}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Tanggal Minting</span>
                  <span className="text-[var(--color-deep-navy)]">
                    {formatDate(result.work.mintDate)}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Token ID</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-mono">
                      #{result.work.tokenId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.work!.tokenId)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin Token ID"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">IPFS Link</span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={result.work.ipfsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-nusa-blue)] hover:text-[var(--color-nusa-blue)]/80 hover:underline font-mono text-sm break-all transition-colors"
                    >
                      {result.work.ipfsLink}
                    </a>
                    <button
                      onClick={() => copyToClipboard(result.work!.ipfsLink)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin IPFS Link"
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
            <div className="border border-[var(--color-nusa-blue)]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-4">
                Informasi Blockchain
              </h3>
              <div className="grid gap-4">
                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Transaction Hash</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-mono text-sm break-all">
                      {result.work.transactionHash}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.work!.transactionHash)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin Transaction Hash"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Block Number</span>
                  <span className="text-[var(--color-deep-navy)] font-mono">
                    {result.work.blockNumber.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-[var(--color-deep-navy)]/70 block">Contract Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--color-deep-navy)] font-mono text-sm">
                      {result.work.contractAddress}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.work!.contractAddress)}
                      className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                      title="Salin Contract Address"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <a
                href={getBlockExplorerUrl(result.work.transactionHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-nusa-blue)]/10 text-[var(--color-deep-navy)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-nusa-blue)]/20 transition-colors flex items-center space-x-2 border border-[var(--color-nusa-blue)]/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Lihat di Blockchain Explorer</span>
              </a>
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
