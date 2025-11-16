"use client";

import { useState, useRef, useCallback } from "react";
import { PrimaryButton } from "../ui/Button";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isUploading: boolean;
}

export function FileUpload({ onFileSelect, selectedFile, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3',
      'video/mp4', 'video/webm', 'video/ogg'
    ];

    if (file.size > maxSize) {
      alert('File terlalu besar. Maksimal 100MB.');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Gunakan gambar, audio, atau video.');
      return false;
    }

    return true;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.startsWith('video/')) return '🎬';
    return '📄';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
        Upload Karya Digital
      </h3>
      
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/5'
              : 'border-[var(--color-slate-gray)]/30 hover:border-[var(--color-nusa-blue)]/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-6xl">📁</div>
            <div>
              <p className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
                Drag & drop file di sini
              </p>
              <p className="text-[var(--color-slate-gray)] mb-4">
                atau klik untuk memilih file
              </p>
            </div>
            
            <PrimaryButton
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto"
            >
              Pilih File
            </PrimaryButton>
            
            <div className="text-sm text-[var(--color-slate-gray)]">
              <p>Format yang didukung: JPG, PNG, GIF, WebP, MP3, WAV, OGG, MP4, WebM</p>
              <p>Maksimal ukuran: 100MB</p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="image/*,audio/*,video/*"
          />
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{getFileIcon(selectedFile)}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--color-deep-navy)]">
                {selectedFile.name}
              </h4>
              <p className="text-sm text-[var(--color-slate-gray)]">
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
            <div className="flex space-x-2">
              <PrimaryButton
                onClick={() => onFileSelect(null)}
                disabled={isUploading}
              >
                Hapus
              </PrimaryButton>
              <PrimaryButton
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Ganti
              </PrimaryButton>
            </div>
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center space-x-2 text-[var(--color-nusa-blue)]">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-nusa-blue)]"></div>
                <span className="text-sm">Mengupload ke IPFS...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
