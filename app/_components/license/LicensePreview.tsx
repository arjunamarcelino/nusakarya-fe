"use client";

import { PrimaryButton } from "../ui/Button";
import { DigitalWork, LicenseFormData } from "./types";
import Image from "next/image";

interface LicensePreviewProps {
  work: DigitalWork;
  formData: LicenseFormData;
  onPublish: () => void;
  onEdit: () => void;
  isLoading?: boolean;
}

export function LicensePreview({ work, formData, onPublish, onEdit, isLoading = false }: LicensePreviewProps) {
  const formatPrice = (price: number, unit: string) => {
    return `${price} ${unit}`;
  };

  const formatDuration = (duration: number, unit: string) => {
    const unitLabels = {
      'days': 'hari',
      'months': 'bulan',
      'years': 'tahun'
    };
    return `${duration} ${unitLabels[unit as keyof typeof unitLabels] || unit}`;
  };

  const getLicenseTypeInfo = (type: string) => {
    const types = {
      'commercial': { icon: '💼', label: 'Lisensi Komersial', color: 'text-green-600' },
      'non-commercial': { icon: '🏠', label: 'Lisensi Non-Komersial', color: 'text-blue-600' },
      'event-based': { icon: '🎪', label: 'Lisensi Event-based', color: 'text-purple-600' }
    };
    return types[type as keyof typeof types] || types['non-commercial'];
  };

  const licenseTypeInfo = getLicenseTypeInfo(formData.licenseType);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-2">
          Preview Lisensi
        </h3>
        <p className="text-[var(--color-slate-gray)]">
          Review konfigurasi lisensi sebelum dipublikasikan
        </p>
      </div>

      {/* Work Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {work.imageUrl ? (
              <Image
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover rounded-lg"
                width={100}
                height={100}
              />
            ) : (
              <span className="text-2xl">📁</span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-deep-navy)]">
              {work.title}
            </h4>
            <p className="text-sm text-[var(--color-slate-gray)]">
              {work.workType} • NFT #{work.nftId}
            </p>
          </div>
        </div>
      </div>

      {/* License Details */}
      <div className="space-y-6">
        {/* License Type */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{licenseTypeInfo.icon}</span>
            <div>
              <h5 className="font-medium text-[var(--color-deep-navy)]">
                Jenis Lisensi
              </h5>
              <p className={`text-sm ${licenseTypeInfo.color}`}>
                {licenseTypeInfo.label}
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="font-medium text-[var(--color-deep-navy)]">
              Harga Lisensi
            </h5>
            <p className="text-sm text-[var(--color-slate-gray)]">
              Harga yang akan dibayar pembeli
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-[var(--color-deep-navy)]">
              {formatPrice(formData.price, formData.priceUnit)}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="font-medium text-[var(--color-deep-navy)]">
              Durasi Lisensi
            </h5>
            <p className="text-sm text-[var(--color-slate-gray)]">
              Berapa lama lisensi berlaku
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-[var(--color-deep-navy)]">
              {formatDuration(formData.duration, formData.durationUnit)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="py-3 border-b border-gray-200">
          <h5 className="font-medium text-[var(--color-deep-navy)] mb-2">
            Deskripsi Lisensi
          </h5>
          <p className="text-[var(--color-slate-gray)] text-sm leading-relaxed">
            {formData.description || 'Belum ada deskripsi'}
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="py-3">
          <h5 className="font-medium text-[var(--color-deep-navy)] mb-2">
            Syarat dan Ketentuan
          </h5>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[var(--color-slate-gray)] text-sm leading-relaxed">
              {formData.terms || 'Belum ada syarat dan ketentuan'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <PrimaryButton
          onClick={onEdit}
          className="flex-1"
          disabled={isLoading}
        >
          ✏️ Edit
        </PrimaryButton>
        <PrimaryButton
          onClick={onPublish}
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Mempublikasikan...' : '🚀 Publikasikan Lisensi'}
        </PrimaryButton>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-lg">ℹ️</div>
          <div>
            <h6 className="font-semibold text-blue-800 mb-1">
              Informasi Penting
            </h6>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Lisensi akan dipublikasikan di blockchain dan tidak dapat diubah</li>
              <li>• Pembeli akan membayar langsung ke smart contract</li>
              <li>• Royalti akan otomatis dikirim ke wallet Anda</li>
              <li>• Pastikan semua informasi sudah benar sebelum publikasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
