"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
  onVerify: (input: { file: File }) => void;
  isVerifying: boolean;
}

export function FileUpload({ onVerify, isVerifying }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleVerify = () => {
    if (selectedFile) {
      onVerify({ file: selectedFile });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white border border-[var(--color-nusa-blue)]/20 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
        Verifikasi dengan File
      </h2>
      <p className="text-[var(--color-deep-navy)]/70 mb-6">
        Upload file karya yang ingin diverifikasi. Sistem akan menghitung hash file dan memeriksa apakah karya telah terdaftar.
      </p>

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/5'
              : 'border-[var(--color-nusa-blue)]/30 hover:border-[var(--color-nusa-blue)]/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-[var(--color-nusa-blue)]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[var(--color-nusa-blue)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-[var(--color-deep-navy)]">
                Drag & drop file di sini
              </p>
              <p className="text-[var(--color-deep-navy)]/70">
                atau klik untuk memilih file
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[var(--color-nusa-blue)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-nusa-blue)]/90 transition-colors"
            >
              Pilih File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputChange}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-[var(--color-nusa-blue)]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--color-nusa-blue)]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[var(--color-nusa-blue)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-deep-navy)]">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-[var(--color-deep-navy)]/70">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-[var(--color-deep-navy)]/50 hover:text-[var(--color-nusa-blue)] transition-colors"
                disabled={isVerifying}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-[var(--color-nusa-blue)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--color-nusa-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memverifikasi...
              </div>
            ) : (
              "Verifikasi File"
            )}
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-[var(--color-nusa-blue)]/5 rounded-lg border border-[var(--color-nusa-blue)]/10">
        <h3 className="font-medium text-[var(--color-deep-navy)] mb-2">Format File yang Didukung:</h3>
        <ul className="text-sm text-[var(--color-deep-navy)]/70 space-y-1">
          <li>• Gambar: JPG, PNG, GIF, SVG, WebP</li>
          <li>• Video: MP4, AVI, MOV, WebM</li>
          <li>• Audio: MP3, WAV, FLAC, AAC</li>
          <li>• Dokumen: PDF, DOC, DOCX, TXT</li>
        </ul>
      </div>
    </div>
  );
}
