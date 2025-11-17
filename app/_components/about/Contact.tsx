"use client";

import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: ["info@nusakarya.id", "support@nusakarya.id"],
      description: "Kirim pertanyaan atau dukungan teknis"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Telepon",
      details: ["+62 21 1234 5678", "+62 812 3456 7890"],
      description: "Hubungi kami untuk konsultasi langsung"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Alamat",
      details: ["Jl. Sudirman No. 123", "Jakarta Selatan 12190", "Indonesia"],
      description: "Kantor pusat NusaKarya"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Jam Operasional",
      details: ["Senin - Jumat: 09:00 - 18:00", "Sabtu: 09:00 - 15:00", "Minggu: Tutup"],
      description: "Waktu respons terbaik"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-[var(--color-slate-gray)] max-w-2xl mx-auto">
            Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-8">
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-2">
                      {info.title}
                    </h4>
                    <div className="space-y-1 mb-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-[var(--color-slate-gray)]">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-[var(--color-slate-gray)]/70">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-l from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] bg-clip-text text-transparent mb-8">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-slate-gray)] mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--color-nusa-blue)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent bg-[var(--color-deep-navy)] text-[var(--color-foreground)]"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--color-nusa-blue)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent bg-[var(--color-deep-navy)] text-[var(--color-foreground)]"
                  placeholder="contoh@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--color-nusa-blue)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent bg-[var(--color-deep-navy)] text-[var(--color-foreground)]"
                  placeholder="Apa yang ingin Anda tanyakan?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[var(--color-nusa-blue)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-nusa-blue)] focus:border-transparent bg-[var(--color-deep-navy)] text-[var(--color-foreground)] resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-karya-gold)] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
