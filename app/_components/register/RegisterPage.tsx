"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { FileUpload } from "./FileUpload";
import { MetadataForm, WorkMetadata } from "./MetadataForm";
import { FilePreview } from "./FilePreview";
import { MintCertificate } from "./MintCertificate";
import { TransactionNotification } from "./TransactionNotification";
import { CertificateResult } from "./CertificateResult";
import { uploadFile, uploadMetadata, getGatewayUrl, type PinataUploadResponse } from "@/app/_libs/pinata";
import { calculateFileHash } from "@/app/_libs/utils/fileHash";
import { createNftService, MAX_ROYALTY_BPS } from "@/app/_libs/services/nft";
import { getWalletAddress } from "@/app/_libs/utils/wallet";
import { NETWORKS } from "@/app/_libs/contracts/config";
import { useAuth } from "@/app/_hooks/useAuth";
import { createKaryaApi } from "@/app/_libs/api/karya";
import type { Hex, EIP1193Provider } from "viem";

type TransactionStatus = 'pending' | 'success' | 'failed';

interface Transaction {
  hash: string;
  status: TransactionStatus;
  blockNumber?: number;
  gasUsed?: string;
  timestamp: number;
}

interface Certificate {
  nftId: string;
  ipfsHash: string;
  ipfsUrl: string;
  metadataUrl: string;
  registrationDate: string;
  transactionHash: string;
  blockNumber: number;
  contractAddress: string;
}

export function RegisterPage() {
  const router = useRouter();
  const { user, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { getClient } = useAuth();
  const [currentStep, setCurrentStep] = useState<'upload' | 'metadata' | 'preview' | 'mint' | 'result'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<WorkMetadata>({
    title: '',
    description: '',
    workType: '',
    category: '',
    tags: []
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [mintProgress, setMintProgress] = useState<string>("");

  const handleFileSelect = async (file: File | null) => {
    if (file) {
      setIsUploading(true);
      // Simulate file processing/validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedFile(file);
      setIsUploading(false);
    } else {
      setSelectedFile(file);
    }
  };

  const handleMetadataChange = (newMetadata: WorkMetadata) => {
    setMetadata(newMetadata);
    // User will manually proceed to preview using the button
  };

  const handleMint = async () => {
    if (!selectedFile || !metadata.title || !metadata.description || !metadata.workType) {
      return;
    }

    // Check authentication
    if (!ready || !authenticated || !user) {
      alert("Please login to mint NFT certificate");
      return;
    }

    // Get wallet address
    const walletAddress = getWalletAddress(user);
    if (!walletAddress) {
      alert("Wallet address not found. Please connect your wallet.");
      return;
    }

    // Get wallet provider from Privy
    const wallet = wallets[0];
    if (!wallet) {
      alert("Wallet not found. Please connect your wallet.");
      return;
    }

    // Get Ethereum provider from Privy wallet
    const ethereumProvider = await wallet.getEthereumProvider();
    if (!ethereumProvider) {
      alert("Ethereum provider not available. Please connect your wallet.");
      return;
    }

    setIsMinting(true);
    setCurrentStep('mint');
    setMintProgress("Preparing minting process...");

    try {
      // Step 1: Calculate file hash
      setMintProgress("Calculating file hash...");
      const fileHash = await calculateFileHash(selectedFile);
      const fileHashBytes32 = fileHash as Hex;

      // Step 2: Upload file to Pinata
      setMintProgress("Uploading file to IPFS...");
      const fileUploadResponse: PinataUploadResponse = await uploadFile(selectedFile, "public");
      const fileUrl = getGatewayUrl(fileUploadResponse.cid);

      // Step 3: Create and upload metadata to Pinata
      setMintProgress("Creating metadata...");
      const nftMetadata = {
        name: metadata.title,
        description: metadata.description,
        image: fileUrl,
        external_url: fileUrl,
        attributes: [
          {
            trait_type: "Work Type",
            value: metadata.workType,
          },
          ...(metadata.category ? [{
            trait_type: "Category",
            value: metadata.category,
          }] : []),
          ...(metadata.tags && metadata.tags.length > 0 ? [{
            trait_type: "Tags",
            value: metadata.tags.join(", "),
          }] : []),
        ],
        properties: {
          fileHash: fileHashBytes32,
          fileUrl: fileUrl,
          mimeType: selectedFile.type,
          fileName: selectedFile.name,
        },
      };

      setMintProgress("Uploading metadata to IPFS...");
      const metadataUploadResponse: PinataUploadResponse = await uploadMetadata(
        nftMetadata,
        "metadata.json",
        "public"
      );
      const metadataUrl = getGatewayUrl(metadataUploadResponse.cid);

      // Step 4: Get wallet provider and create NFT service
      setMintProgress("Preparing blockchain transaction...");
      const walletProvider = ethereumProvider as unknown as EIP1193Provider;
      
      // Note: Chain switching will happen automatically in mintCertificate
      const nftService = createNftService(NETWORKS.ETH_SEPOLIA, walletProvider, walletAddress);

      // Step 5: Mint NFT certificate
      // Set max royalty BPS (10000 = 100%) - only owner can receive royalty
      setMintProgress("Minting NFT certificate on blockchain...");
      const mintResult = await nftService.mintCertificate({
        owner: walletAddress,
        uri: metadataUrl,
        fileHash: fileHashBytes32,
        royaltyRecipient: walletAddress, // Owner receives all royalties
        royaltyBps: MAX_ROYALTY_BPS, // 100% royalty to owner
      });

      // Step 6: Create transaction object
      const pendingTransaction: Transaction = {
        hash: mintResult.transactionHash,
        status: 'pending',
        timestamp: Date.now(),
      };
      setTransaction(pendingTransaction);

      // Step 7: Wait for transaction confirmation and get token ID
      setMintProgress("Waiting for transaction confirmation...");
      
      // Note: The transaction is already confirmed in mintCertificate, but we can get more details
      const contractAddress = nftService.getAddress();

      // Create certificate
      const newCertificate: Certificate = {
        nftId: mintResult.tokenId?.toString() || "pending",
        ipfsHash: fileUploadResponse.cid,
        ipfsUrl: fileUrl,
        metadataUrl: metadataUrl,
        registrationDate: new Date().toISOString(),
        transactionHash: mintResult.transactionHash,
        blockNumber: Number(mintResult.blockNumber),
        contractAddress: contractAddress,
      };

      // Update transaction status
      const confirmedTransaction: Transaction = {
        ...pendingTransaction,
        status: 'success',
        blockNumber: Number(mintResult.blockNumber),
      };
      setTransaction(confirmedTransaction);

      // Step 8: Save karya to backend API
      setMintProgress("Saving karya to database...");
      try {
        const apiClient = getClient();
        const karyaApi = createKaryaApi(apiClient);
        
        const karyaData = await karyaApi.createKarya({
          title: metadata.title,
          description: metadata.description,
          type: metadata.workType,
          category: metadata.category || undefined,
          tag: metadata.tags && metadata.tags.length > 0 ? metadata.tags : undefined,
          fileUrl: fileUrl,
          fileHash: fileHashBytes32, // Already a hex string (0x...)
          nftId: mintResult.tokenId?.toString() || newCertificate.nftId,
          txHash: mintResult.transactionHash,
        });

        console.log("Karya saved successfully:", karyaData);
      } catch (apiError) {
        console.error("Failed to save karya to API:", apiError);
        // Don't fail the entire minting process if API call fails
        // The NFT is already minted, so we just log the error
        const errorMessage = apiError instanceof Error ? apiError.message : "Unknown error";
        console.warn(`API save failed but NFT minted successfully: ${errorMessage}`);
      }

      setCertificate(newCertificate);
      setCurrentStep('result');
      setMintProgress("");

    } catch (error) {
      console.error('Minting failed:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setMintProgress(`Error: ${errorMessage}`);
      
      // Create failed transaction if we have a hash
      const failedTransaction: Transaction = {
        hash: transaction?.hash || ('0x' + Math.random().toString(16).substr(2, 64)),
        status: 'failed',
        timestamp: Date.now()
      };
      setTransaction(failedTransaction);
      
      // Show error to user
      alert(`Minting failed: ${errorMessage}`);
    } finally {
      setIsMinting(false);
    }
  };

  const handleMintAnother = () => {
    setSelectedFile(null);
    setMetadata({
      title: '',
      description: '',
      workType: '',
      category: '',
      tags: []
    });
    setTransaction(null);
    setCertificate(null);
    setCurrentStep('upload');
  };

  const canMint = selectedFile && metadata.title && metadata.description && metadata.workType;

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/app/dashboard")}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/5 transition-all duration-200 group"
                aria-label="Kembali ke dashboard"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 group-hover:text-[var(--color-nusa-blue)] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                  Daftarkan Karya Digital
                </h1>
                <p className="text-[var(--color-slate-gray)] mt-1">
                  Dapatkan sertifikat NFT untuk melindungi hak cipta karya digitalmu
                </p>
              </div>
            </div>
            <div className="text-sm text-[var(--color-slate-gray)]">
              Langkah {currentStep === 'upload' ? 1 : currentStep === 'metadata' ? 2 : currentStep === 'preview' ? 3 : currentStep === 'mint' ? 4 : 5} dari 5
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentStep === 'result' && certificate ? (
          <CertificateResult 
            certificate={certificate} 
            onMintAnother={handleMintAnother}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {currentStep === 'upload' && (
                <div className="space-y-6">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    isUploading={isUploading}
                  />
                  
                  {/* Navigation Button */}
                  {selectedFile && !isUploading && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => setCurrentStep('metadata')}
                        className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%] transition-all duration-500 hover:scale-105 active:scale-95"
                      >
                        Lanjutkan ke Metadata
                      </button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 'metadata' && (
                <div className="space-y-6">
                  <MetadataForm
                    onMetadataChange={handleMetadataChange}
                    metadata={metadata}
                  />
                  
                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep('upload')}
                      className="px-6 py-3 rounded-lg font-semibold text-[var(--color-deep-navy)] border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/5 transition-all duration-200"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => {
                        if (metadata.title && metadata.description && metadata.workType) {
                          setCurrentStep('preview');
                        }
                      }}
                      disabled={!metadata.title || !metadata.description || !metadata.workType}
                      className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%] transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'preview' && selectedFile && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
                      Konfirmasi Data
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[var(--color-slate-gray)]">File:</span>
                        <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                          {selectedFile.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Judul:</span>
                        <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                          {metadata.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--color-slate-gray)]">Jenis:</span>
                        <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                          {metadata.workType}
                        </span>
                      </div>
                      {metadata.category && (
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Kategori:</span>
                          <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                            {metadata.category}
                          </span>
                        </div>
                      )}
                      {metadata.description && (
                        <div>
                          <span className="text-[var(--color-slate-gray)]">Deskripsi:</span>
                          <p className="mt-1 text-sm text-[var(--color-deep-navy)]">
                            {metadata.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() => setCurrentStep('metadata')}
                      className="px-6 py-3 rounded-lg font-semibold text-[var(--color-deep-navy)] border border-gray-300 hover:border-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/5 transition-all duration-200"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => setCurrentStep('mint')}
                      className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                      Lanjutkan ke Mint
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'mint' && (
                <MintCertificate
                  onMint={handleMint}
                  isMinting={isMinting}
                  canMint={!!canMint}
                  file={selectedFile}
                  metadata={metadata}
                  progress={mintProgress}
                />
              )}
            </div>

            {/* Right Column - Preview */}
            <div>
              {selectedFile && currentStep !== 'mint' && (
                <FilePreview file={selectedFile} metadata={metadata} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Transaction Notification Modal */}
      {transaction && (
        <TransactionNotification
          transaction={transaction}
          onClose={() => setTransaction(null)}
        />
      )}
    </div>
  );
}
