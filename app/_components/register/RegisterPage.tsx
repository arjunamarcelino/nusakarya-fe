"use client";

import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { MetadataForm, WorkMetadata } from "./MetadataForm";
import { FilePreview } from "./FilePreview";
import { MintCertificate } from "./MintCertificate";
import { TransactionNotification } from "./TransactionNotification";
import { CertificateResult } from "./CertificateResult";

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

  const handleFileSelect = async (file: File | null) => {
    if (file) {
      setIsUploading(true);
      // Simulate file processing/validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedFile(file);
      setCurrentStep('metadata');
      setIsUploading(false);
    } else {
      setSelectedFile(file);
    }
  };

  const handleMetadataChange = (newMetadata: WorkMetadata) => {
    setMetadata(newMetadata);
    if (selectedFile && newMetadata.title && newMetadata.description && newMetadata.workType) {
      setCurrentStep('preview');
    }
  };

  const handleMint = async () => {
    if (!selectedFile || !metadata.title || !metadata.description || !metadata.workType) {
      return;
    }

    setIsMinting(true);
    setCurrentStep('mint');

    try {
      // Simulate IPFS upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate blockchain transaction
      const mockTransaction: Transaction = {
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'pending',
        timestamp: Date.now()
      };
      
      setTransaction(mockTransaction);

      // Simulate transaction confirmation
      setTimeout(() => {
        const confirmedTransaction: Transaction = {
          ...mockTransaction,
          status: 'success',
          blockNumber: Math.floor(Math.random() * 1000000) + 50000000,
          gasUsed: (Math.random() * 200000 + 100000).toString()
        };
        
        setTransaction(confirmedTransaction);

        // Generate certificate
        const mockCertificate: Certificate = {
          nftId: Math.floor(Math.random() * 10000).toString(),
          ipfsHash: 'Qm' + Math.random().toString(16).substr(2, 44),
          ipfsUrl: `https://ipfs.io/ipfs/Qm${Math.random().toString(16).substr(2, 44)}`,
          metadataUrl: `https://ipfs.io/ipfs/Qm${Math.random().toString(16).substr(2, 44)}`,
          registrationDate: new Date().toISOString(),
          transactionHash: confirmedTransaction.hash,
          blockNumber: confirmedTransaction.blockNumber!,
          contractAddress: '0x' + Math.random().toString(16).substr(2, 40)
        };

        setCertificate(mockCertificate);
        setCurrentStep('result');
      }, 5000);

    } catch (error) {
      console.error('Minting failed:', error);
      setTransaction({
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'failed',
        timestamp: Date.now()
      });
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
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                Daftarkan Karya Digital
              </h1>
              <p className="text-[var(--color-slate-gray)] mt-1">
                Dapatkan sertifikat NFT untuk melindungi hak cipta karya digitalmu
              </p>
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
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  isUploading={isUploading}
                />
              )}

              {currentStep === 'metadata' && (
                <MetadataForm
                  onMetadataChange={handleMetadataChange}
                  metadata={metadata}
                />
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
                    </div>
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
