import React from 'react';
import { Heart, Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface FooterProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                KLINIK MEDIKA <span className="text-emerald-400">HARMONY</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              {config.tagline}. Menghadirkan dokter spesialis profesional, standar kebersihan tinggi, serta fasilitas laboratorium & UGD 24 Jam.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Terakreditasi Paripurna Kemenkes RI</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2">
              <li><a href="#beranda" className="hover:text-emerald-400 transition">Beranda</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition">Layanan Medis</a></li>
              <li><a href="#dokter" className="hover:text-emerald-400 transition">Profil Dokter</a></li>
              <li><a href="#jadwal" className="hover:text-emerald-400 transition">Jadwal Praktik</a></li>
              <li><a href="#artikel" className="hover:text-emerald-400 transition">Artikel Kesehatan</a></li>
              <li><a href="#testimoni" className="hover:text-emerald-400 transition">Testimoni Pasien</a></li>
            </ul>
          </div>

          {/* Column 3: Layanan Spesialis */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan Spesialis</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Poli Spesialis Anak & Imunisasi</li>
              <li>Poli Kebidanan & USG 4D</li>
              <li>Poli Gigi & Perawatan Estetis</li>
              <li>Poli Penyakit Dalam</li>
              <li>Poli Bedah Umum</li>
              <li>Medical Check-Up (MCU)</li>
              <li>Laboratorium & Swab 24 Jam</li>
            </ul>
          </div>

          {/* Column 4: Kontak & Darurat */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak & UGD</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{config.address}, {config.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Resepsionis: {config.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Phone className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                <span>UGD 24 Jam: {config.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{config.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs hover:shadow-lg transition cursor-pointer"
              >
                Booking Konsultasi
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Trigger */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 {config.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              Login Pengelola (Admin)
            </button>

            <span>•</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition cursor-pointer bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
