import React, { useState } from 'react';
import { 
  Heart, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Menu, 
  X, 
  ShieldCheck, 
  Lock, 
  Clock, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface HeaderProps {
  config: ClinicConfig;
  onOpenBooking: (doctorId?: string, timeSlot?: string) => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenBooking,
  onOpenAdmin,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'dokter', label: 'Profil Dokter' },
    { id: 'jadwal', label: 'Jadwal Dokter' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'lokasi', label: 'Lokasi & Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-800 text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Buka Setiap Hari | UGD 24 Jam</span>
            </span>
            <span className="hidden md:inline text-blue-300">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span className="truncate max-w-xs">{config.address}, {config.city}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${config.emergencyPhone}`} 
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition font-semibold bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30"
            >
              <Phone className="w-3 h-3 animate-pulse" />
              <span>UGD Darurat: {config.emergencyPhone}</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-200 hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition text-xs font-medium cursor-pointer"
              title="Akses Portal Admin"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#beranda" 
          onClick={(e) => { e.preventDefault(); handleNavClick('beranda'); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition duration-300">
            <Heart className="w-6 h-6 fill-white/20 stroke-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 bg-clip-text text-transparent">
                KLINIK MEDIKA
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase border border-emerald-200">
                HARMONY
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Layanan Kesehatan Modern & Terpercaya</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeSection === link.id
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100/80 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappDefaultMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3.5 py-2 rounded-xl text-xs font-semibold transition border border-slate-200 hover:border-emerald-200"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            <span>Chat WA</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Booking Dokter</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="sm:hidden bg-emerald-600 text-white p-2 rounded-xl text-xs font-semibold shadow-xs"
            title="Booking Dokter"
          >
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer border border-slate-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeSection === link.id
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Dokter Online</span>
            </button>

            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 py-2.5 rounded-xl font-semibold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>Hubungi via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-1.5 text-slate-500 py-2 rounded-xl text-xs font-medium hover:bg-slate-100"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Login Admin / Kelola Jadwal Dokter</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
