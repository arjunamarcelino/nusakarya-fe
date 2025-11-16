"use client";

import { useState } from "react";
import { PrimaryButton } from "../ui/Button";
import { DigitalWork } from "./types";
import Image from "next/image";

interface WorkListProps {
  works: DigitalWork[];
  selectedWork: DigitalWork | null;
  onWorkSelect: (work: DigitalWork) => void;
  onCreateLicense: (work: DigitalWork) => void;
}

export function WorkList({ works, selectedWork, onWorkSelect, onCreateLicense }: WorkListProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const filteredWorks = works.filter(work => 
    filterType === "all" || work.workType === filterType
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWorkTypeIcon = (workType: string) => {
    const icons: { [key: string]: string } = {
      'image': '🖼️',
      'video': '🎥',
      'audio': '🎵',
      'document': '📄',
      '3d-model': '🎲',
      'other': '📁'
    };
    return icons[workType] || '📁';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-deep-navy)]">
            Karya Tersedia
          </h3>
          <p className="text-[var(--color-slate-gray)] text-sm mt-1">
            Jelajahi karya digital dan buat lisensi untuk dijual
          </p>
        </div>
        <div className="text-sm text-[var(--color-slate-gray)]">
          {filteredWorks.length} dari {works.length} karya
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <PrimaryButton
            onClick={() => setFilterType("all")}
          >
            Semua
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("image")}
          >
            🖼️ Gambar
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("video")}
          >
            🎥 Video
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("audio")}
          >
            🎵 Audio
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setFilterType("document")}
          >
            📄 Dokumen
          </PrimaryButton>
        </div>
      </div>

      {/* Works Grid */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h4 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-2">
            Belum Ada Karya
          </h4>
          <p className="text-[var(--color-slate-gray)] mb-6">
            Daftarkan karya digitalmu terlebih dahulu untuk membuat lisensi
          </p>
          <PrimaryButton
            onClick={() => window.location.href = '/register'}
            className="bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold"
          >
            🏆 Daftarkan Karya
          </PrimaryButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedWork?.id === work.id
                  ? 'border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/5'
                  : 'border-gray-200 hover:border-[var(--color-nusa-blue)]/50'
              }`}
              onClick={() => onWorkSelect(work)}
            >
              {/* Work Preview */}
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {work.imageUrl ? (
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="text-4xl text-[var(--color-slate-gray)]">
                    {getWorkTypeIcon(work.workType)}
                  </div>
                )}
              </div>

              {/* Work Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--color-deep-navy)] truncate">
                  {work.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-[var(--color-slate-gray)]">
                  <span className="flex items-center space-x-1">
                    {getWorkTypeIcon(work.workType)}
                    <span className="capitalize">{work.workType}</span>
                  </span>
                  <span>{formatDate(work.registrationDate)}</span>
                </div>
                
                {work.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {work.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-xs text-[var(--color-slate-gray)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {work.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs text-[var(--color-slate-gray)] rounded">
                        +{work.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-3">
                <PrimaryButton
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateLicense(work);
                  }}
                >
                  {selectedWork?.id === work.id ? '✓ Dipilih' : 'Buat Lisensi'}
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
