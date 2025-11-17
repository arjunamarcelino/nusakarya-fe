"use client";

import { useState } from "react";

interface MetadataFormProps {
  onMetadataChange: (metadata: WorkMetadata) => void;
  metadata: WorkMetadata;
}

export interface WorkMetadata {
  title: string;
  description: string;
  workType: string;
  category: string;
  tags: string[];
}

const workTypes = [
  { value: "music", label: "Musik", icon: "🎵" },
  { value: "design", label: "Desain", icon: "🎨" },
  { value: "photo", label: "Foto", icon: "📸" },
  { value: "video", label: "Video", icon: "🎬" },
  { value: "writing", label: "Tulisan", icon: "✍️" },
  { value: "other", label: "Lainnya", icon: "📄" }
];

const categories = {
  music: [
    "Pop", "Rock", "Jazz", "Classical", "Electronic", "Hip-Hop", "R&B", "Country", "Folk", "Blues"
  ],
  design: [
    "Logo", "Poster", "Illustration", "UI/UX", "Branding", "Typography", "Web Design", "Print Design"
  ],
  photo: [
    "Portrait", "Landscape", "Street", "Nature", "Architecture", "Fashion", "Documentary", "Art"
  ],
  video: [
    "Short Film", "Documentary", "Music Video", "Animation", "Commercial", "Tutorial", "Vlog", "Cinematic"
  ],
  writing: [
    "Fiction", "Non-Fiction", "Poetry", "Article", "Blog", "Script", "Technical", "Academic"
  ],
  other: [
    "Software", "Game", "3D Model", "Animation", "Podcast", "Presentation", "Template", "Other"
  ]
};

export function MetadataForm({ onMetadataChange, metadata }: MetadataFormProps) {
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: keyof WorkMetadata, value: string) => {
    const newMetadata = { ...metadata, [field]: value };
    onMetadataChange(newMetadata);
  };

  const handleWorkTypeChange = (workType: string) => {
    const newMetadata = { 
      ...metadata, 
      workType,
      category: "" // Reset category when work type changes
    };
    onMetadataChange(newMetadata);
  };

  const handleCategoryChange = (category: string) => {
    const newMetadata = { ...metadata, category };
    onMetadataChange(newMetadata);
  };

  const addTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      const newTags = [...metadata.tags, tagInput.trim()];
      onMetadataChange({ ...metadata, tags: newTags });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = metadata.tags.filter(tag => tag !== tagToRemove);
    onMetadataChange({ ...metadata, tags: newTags });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[var(--color-deep-navy)]">
        Informasi Karya
      </h3>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
          Judul Karya *
        </label>
        <input
          type="text"
          value={metadata.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Masukkan judul karya digitalmu"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent transition-all duration-200 text-[var(--color-deep-navy)] placeholder:text-gray-400 bg-white"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
          Deskripsi *
        </label>
        <textarea
          value={metadata.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Jelaskan karya digitalmu secara detail..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent transition-all duration-200 resize-none text-[var(--color-deep-navy)] placeholder:text-gray-400 bg-white"
          required
        />
      </div>

      {/* Work Type */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-3">
          Jenis Karya *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleWorkTypeChange(type.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                metadata.workType === type.value
                  ? "border-[var(--color-nusa-blue)] bg-[var(--color-nusa-blue)]/5"
                  : "border-gray-200 hover:border-[var(--color-nusa-blue)]/50"
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-medium text-[var(--color-deep-navy)]">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      {metadata.workType && (
        <div>
          <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
            Kategori
          </label>
          <select
            value={metadata.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent transition-all duration-200 text-[var(--color-deep-navy)] bg-white"
          >
            <option value="">Pilih kategori</option>
            {categories[metadata.workType as keyof typeof categories]?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-deep-navy)] mb-2">
          Tag Kategori
        </label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Masukkan tag (tekan Enter untuk menambah)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent transition-all duration-200 text-[var(--color-deep-navy)] placeholder:text-gray-400 bg-white"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-[var(--color-nusa-blue)] text-white rounded-lg hover:bg-[var(--color-deep-navy)] transition-colors duration-200"
          >
            Tambah
          </button>
        </div>
        
        {metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-[var(--color-nusa-blue)]/10 text-[var(--color-nusa-blue)] rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-[var(--color-nusa-blue)] hover:text-[var(--color-deep-navy)]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
