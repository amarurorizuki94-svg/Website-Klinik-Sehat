import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  PlusCircle, 
  X, 
  Sparkles, 
  ThumbsUp, 
  UserCheck 
} from 'lucide-react';
import { Testimonial } from '../types/clinic';
import { storage } from '../utils/storage';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>('');
  const [patientCity, setPatientCity] = useState<string>('BSD City');
  const [rating, setRating] = useState<number>(5);
  const [serviceName, setServiceName] = useState<string>('Poli Umum');
  const [comment, setComment] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !comment.trim()) return;

    const newTestimonial: Testimonial = {
      id: `tst-${Date.now()}`,
      patientName: patientName.trim(),
      patientCity: patientCity.trim() || 'Tangerang',
      patientAvatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 100)}?auto=format&fit=crop&q=80&w=200`,
      rating,
      comment: comment.trim(),
      serviceName,
      date: 'Baru saja',
      verified: true
    };

    const currentList = storage.getTestimonials();
    storage.saveTestimonials([newTestimonial, ...currentList]);
    onAddTestimonial();

    // Reset & Close
    setPatientName('');
    setComment('');
    setShowAddModal(false);
  };

  return (
    <section id="testimoni" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pengalaman Pasien</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kisah & Testimoni Pasien Klinik Medika Harmony
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kepuasan dan kesembuhan pasien adalah kebanggaan terbesar kami. Simak penuturan asli dari pasien yang telah mempercayakan kesehatannya pada kami.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Tulis Ulasan Pasien</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition duration-300 relative flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'fill-amber-400 stroke-amber-400'
                            : 'fill-slate-200 stroke-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {t.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Pasien Terverifikasi</span>
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.patientAvatar}
                    alt={t.patientName}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.patientName}</h4>
                    <p className="text-[10px] text-slate-500">{t.patientCity} • {t.serviceName}</p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-medium">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Tulis Ulasan Anda</h3>
            <p className="text-xs text-slate-500 mb-4">Bagikan pengalaman pelayanan kesehatan Anda di Klinik Medika Harmony.</p>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Nama Pasien / Inisial *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Rina M."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Kota Asal</label>
                  <input
                    type="text"
                    placeholder="BSD / Tangerang"
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Rating Bintang</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 cursor-pointer text-slate-800 font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Sempurna)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Sangat Bagus)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Cukup)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Layanan yang Diterima</label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 cursor-pointer text-slate-800"
                >
                  <option value="Poli Umum">Poli Umum</option>
                  <option value="Poli Spesialis Anak">Poli Spesialis Anak</option>
                  <option value="Poli Kebidanan & USG 4D">Poli Kebidanan & USG 4D</option>
                  <option value="Poli Gigi & Mulut">Poli Gigi & Mulut</option>
                  <option value="Poli Penyakit Dalam">Poli Penyakit Dalam</option>
                  <option value="Medical Check-Up (MCU)">Medical Check-Up (MCU)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Pesan Ulasan & Pengalaman *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan kepuasan Anda mengenai pelayanan dokter dan kenyamanan klinik..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 text-slate-800"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md cursor-pointer"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
};
