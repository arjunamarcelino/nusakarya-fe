"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface FilePreviewProps {
  file: File;
  metadata: {
    title: string;
    workType: string;
  };
}

export function FilePreview({ file, metadata }: FilePreviewProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('audio/')) {
      const reader = new FileReader();
      reader.onload = (e) => setAudioPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const getFileTypeIcon = () => {
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

  const getWorkTypeLabel = (workType: string) => {
    const types: { [key: string]: string } = {
      music: "Musik",
      design: "Desain", 
      photo: "Foto",
      video: "Video",
      writing: "Tulisan",
      other: "Lainnya"
    };
    return types[workType] || "Lainnya";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-4">
        Preview Karya
      </h3>

      <div className="space-y-6">
        {/* File Info */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl">{getFileTypeIcon()}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-[var(--color-deep-navy)]">
              {metadata.title || file.name}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-[var(--color-slate-gray)]">
              <span>{getWorkTypeLabel(metadata.workType)}</span>
              <span>•</span>
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{file.type}</span>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {file.type.startsWith('image/') && imagePreview && (
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover"
                width={100}
                height={100}
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {getFileTypeIcon()} Gambar
              </div>
            </div>
          )}

          {file.type.startsWith('video/') && videoPreview && (
            <div className="relative">
              <video
                src={videoPreview}
                controls
                className="w-full h-64 object-cover"
                preload="metadata"
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {getFileTypeIcon()} Video
              </div>
            </div>
          )}

          {file.type.startsWith('audio/') && audioPreview && (
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{getFileTypeIcon()}</div>
                <div>
                  <h5 className="font-semibold text-[var(--color-deep-navy)]">
                    {file.name}
                  </h5>
                  <p className="text-sm text-[var(--color-slate-gray)]">
                    Audio Preview
                  </p>
                </div>
              </div>
              
              <audio
                ref={audioRef}
                src={audioPreview}
                controls
                className="w-full"
                preload="metadata"
              />
              
              {/* Waveform Placeholder */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-1 h-8">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[var(--color-nusa-blue)] rounded-full"
                      style={{
                        width: '3px',
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-[var(--color-slate-gray)] mt-2">
                  Waveform akan tersedia setelah upload ke IPFS
                </p>
              </div>
            </div>
          )}

          {!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.startsWith('audio/') && (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h4 className="font-semibold text-[var(--color-deep-navy)] mb-2">
                File Preview
              </h4>
              <p className="text-[var(--color-slate-gray)]">
                Preview tidak tersedia untuk tipe file ini
              </p>
            </div>
          )}
        </div>

        {/* Metadata Summary */}
        <div className="bg-[var(--color-nusa-blue)]/5 rounded-lg p-4">
          <h5 className="font-semibold text-[var(--color-deep-navy)] mb-2">
            Ringkasan Metadata
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-[var(--color-slate-gray)]">Judul:</span>
              <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                {metadata.title || "Belum diisi"}
              </span>
            </div>
            <div>
              <span className="text-[var(--color-slate-gray)]">Jenis:</span>
              <span className="ml-2 font-medium text-[var(--color-deep-navy)]">
                {getWorkTypeLabel(metadata.workType) || "Belum dipilih"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
