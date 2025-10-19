export function UploadForm() {
  return (
    <section id="upload-form" className="py-20 bg-[var(--color-ivory-white)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-navy)] mb-6">
          Daftarkan Karya Digitalmu
        </h2>
        <p className="text-lg text-[var(--color-slate-gray)] mb-12">
          Upload karya digitalmu dan dapatkan sertifikat NFT untuk melindungi hak cipta
        </p>
        
        {/* Placeholder for upload form */}
        <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-[var(--color-slate-gray)]/30">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-[var(--color-deep-navy)] mb-2">
            Upload Form Coming Soon
          </h3>
          <p className="text-[var(--color-slate-gray)]">
            Form upload karya akan segera tersedia
          </p>
        </div>
      </div>
    </section>
  );
}
