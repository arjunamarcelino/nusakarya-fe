"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { DigitalWork, LicenseFormData } from "./types";

interface LicenseFormProps {
  work: DigitalWork;
  onSubmit: (formData: LicenseFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LicenseForm({ work, onSubmit, onCancel, isLoading = false }: LicenseFormProps) {
  const [formData, setFormData] = useState<LicenseFormData>({
    workId: work.id,
    licenseType: 'non-commercial',
    price: 0,
    priceUnit: 'ETH',
    duration: 1,
    durationUnit: 'months',
    description: '',
    terms: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.price <= 0) {
      newErrors.price = 'Harga harus lebih dari 0';
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter';
    }

    if (formData.terms.trim().length < 10) {
      newErrors.terms = 'Syarat dan ketentuan minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof LicenseFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getLicenseTypeDescription = (type: string) => {
    const descriptions = {
      'commercial': 'Lisensi komersial - dapat digunakan untuk tujuan komersial',
      'non-commercial': 'Lisensi non-komersial - hanya untuk penggunaan pribadi',
      'event-based': 'Lisensi berbasis event - untuk penggunaan dalam event tertentu'
    };
    return descriptions[type as keyof typeof descriptions] || '';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-2">
          Buat Lisensi Digital
        </h3>
        <p className="text-[var(--color-slate-gray)]">
          Konfigurasi lisensi untuk karya: <strong>{work.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* License Type */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
            Jenis Lisensi *
          </label>
          <div className="space-y-2">
            {[
              { value: 'commercial', label: 'Komersial', icon: '💼' },
              { value: 'non-commercial', label: 'Non-Komersial', icon: '🏠' },
              { value: 'event-based', label: 'Event-based', icon: '🎪' }
            ].map((type) => (
              <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="licenseType"
                  value={type.value}
                  checked={formData.licenseType === type.value}
                  onChange={(e) => handleInputChange('licenseType', e.target.value)}
                  className="w-4 h-4 text-[var(--color-nusa-blue)]"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="text-sm text-[var(--color-slate-gray)] mt-1">
            {getLicenseTypeDescription(formData.licenseType)}
          </p>
        </div>

        {/* Price Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
              Harga *
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                step="0.001"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.001"
              />
              <select
                value={formData.priceUnit}
                onChange={(e) => handleInputChange('priceUnit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
              Durasi Lisensi *
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent"
              />
              <select
                value={formData.durationUnit}
                onChange={(e) => handleInputChange('durationUnit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent"
              >
                <option value="days">Hari</option>
                <option value="months">Bulan</option>
                <option value="years">Tahun</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
            Deskripsi Lisensi *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Jelaskan apa yang boleh dan tidak boleh dilakukan dengan lisensi ini..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-sm text-[var(--color-slate-gray)] mt-1">
            {formData.description.length}/500 karakter
          </p>
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
            Syarat dan Ketentuan *
          </label>
          <textarea
            value={formData.terms}
            onChange={(e) => handleInputChange('terms', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent ${
              errors.terms ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tuliskan syarat dan ketentuan penggunaan lisensi ini..."
          />
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}
          <p className="text-sm text-[var(--color-slate-gray)] mt-1">
            {formData.terms.length}/1000 karakter
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[var(--color-karya-gold)] hover:bg-[var(--color-karya-gold)]/90 text-[var(--color-deep-navy)] font-semibold"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Membuat...' : '📜 Buat Lisensi'}
          </Button>
        </div>
      </form>
    </div>
  );
}
