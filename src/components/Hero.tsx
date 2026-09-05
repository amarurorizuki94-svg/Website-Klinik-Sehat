import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  Star, 
  ArrowRight, 
  PhoneCall, 
  Heart,
  Award,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { Doctor, SpecialtyCategory } from '../types/clinic';

interface HeroProps {
  doctors: Doctor[];
  onOpenBooking: (doctorId?: string) => void;
  onSelectSpecialty: (specialty: SpecialtyCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  doctors,
  onOpenBooking,
  onSelectSpecialty,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Semua');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoctorId) {
      onOpenBooking(selectedDoctorId);
    } else {
      if (selectedSpecialty !== 'Semua') {
        onSelectSpecialty(selectedSpecialty as SpecialtyCategory);
        const docElem = document.getElementById('dokter');
        if (docElem) docElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        onOpenBooking();
      }
    }
  };

  const filteredDoctors = selectedSpecialty === 'Semua' 
    ? doctors 
    : doctors.filter(d => d.specialtyCategory === selectedSpecialty);

  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fasilitas Kesehatan Modern & Terakreditasi Paripurna</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Layanan Kesehatan <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Modern & Terpercaya</span> Untuk Keluarga Anda
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Klinik Medika Harmony menghadirkan dokter spesialis berpengalaman, fasilitas medis canggih, serta pendaftaran konsultasi online tanpa rasa cemas antre lama.
            </p>

            {/* Quick Search & Booking Form Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 rounded-2xl shadow-2xl max-w-xl">
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Cari Dokter & Konsultasi Langsung</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Select Specialty */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Pilih Poli / Spesialis</label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => {
                        setSelectedSpecialty(e.target.value);
                        setSelectedDoctorId('');
                      }}
                      className="w-full bg-slate-800/90 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      <option value="Semua">Semua Spesialisasi</option>
                      <option value="Poli Umum">Poli Umum</option>
                      <option value="Poli Anak">Poli Anak</option>
                      <option value="Poli Kandungan & Kebidanan">Poli Kandungan</option>
                      <option value="Poli Gigi & Mulut">Poli Gigi & Mulut</option>
                      <option value="Poli Penyakit Dalam">Poli Penyakit Dalam</option>
                      <option value="Poli Bedah Umum">Poli Bedah Umum</option>
                    </select>
                  </div>

                  {/* Select Doctor */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Pilih Dokter (Opsional)</label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full bg-slate-800/90 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      <option value="">Semua Dokter Praktik</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Booking Dokter Sekarang</span>
                  </button>

                  <a
                    href="#jadwal"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Cek Jadwal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            </div>

            {/* Quick Key Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tanpa Antre Panjang</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hasil Lab Cepat</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bisa Konsultasi WA</span>
              </span>
            </div>

          </div>

          {/* Right Visual Image & Floating Badges */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Doctor Image Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-3xl transform rotate-2 scale-95 opacity-50 filter blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=900"
                  alt="Dokter Klinik Medika Harmony"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                
                {/* Doctor Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Tim Dokter Spesialis</h4>
                    <p className="text-[11px] text-slate-300">STR Resmi & Pengalaman &gt; 10 Tahun</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce-slow">
                <div className="bg-amber-400/20 text-amber-300 p-2 rounded-xl">
                  <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-extrabold flex items-center gap-1">
                    <span>4.9 / 5.0</span>
                  </div>
                  <p className="text-[10px] text-slate-300">1.200+ Ulasan Pasien</p>
                </div>
              </div>

              {/* Floating Badge 2: UGD 24 Jam */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="bg-emerald-500/20 text-emerald-300 p-2 rounded-xl">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">UGD 24 Jam Siap</div>
                  <p className="text-[10px] text-emerald-400 font-medium">Tanggap Darurat Medis</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Stats Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-800 pt-8">
          <div className="bg-slate-800/40 border border-slate-800/80 p-4 rounded-2xl text-center hover:border-emerald-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">15+</div>
            <div className="text-xs text-slate-300 font-medium">Dokter Spesialis</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800/80 p-4 rounded-2xl text-center hover:border-emerald-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">10.000+</div>
            <div className="text-xs text-slate-300 font-medium">Pasien Terlayani</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800/80 p-4 rounded-2xl text-center hover:border-emerald-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">98%</div>
            <div className="text-xs text-slate-300 font-medium">Tingkat Kepuasan</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800/80 p-4 rounded-2xl text-center hover:border-emerald-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 mb-1">24 Jam</div>
            <div className="text-xs text-slate-300 font-medium">Layanan UGD & Lab</div>
          </div>
        </div>

      </div>
    </section>
  );
};

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3z" />
    </svg>
  );
}
