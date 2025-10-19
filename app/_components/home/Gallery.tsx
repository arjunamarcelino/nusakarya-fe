export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-[var(--color-ivory-white)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-navy)] mb-6">
            Karya Terdaftar
          </h2>
          <p className="text-lg text-[var(--color-slate-gray)]">
            Jelajahi koleksi karya digital yang telah terdaftar di NusaKarya
          </p>
        </div>
        
        {/* Placeholder for gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)] mb-2">
                Sample Karya {item}
              </h3>
              <p className="text-[var(--color-slate-gray)] text-sm mb-4">
                Deskripsi karya digital yang telah terdaftar
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--color-slate-gray)]">
                <span>📅 2024</span>
                <span>👤 Kreator</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
