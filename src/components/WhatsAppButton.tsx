import React, { useState } from 'react';
import { MessageSquare, X, Send, Calendar, HelpCircle, PhoneCall, Heart } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface WhatsAppButtonProps {
  config: ClinicConfig;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const quickMessages = [
    'Halo, saya mau tanya jadwal dokter hari ini.',
    'Halo, saya mau mendaftar sebagai pasien baru.',
    'Halo, berapa biaya konsultasi poli dokter spesialis?',
    'Halo, apakah layanan UGD & Laboratorium buka saat ini?'
  ];

  const handleSendCustomMsg = (textToSend?: string) => {
    const text = textToSend || userMsg || config.whatsappDefaultMsg;
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden mb-4 animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Resepsionis Klinik Medika</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Online - Balas Cepat</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Messages */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs max-h-72 overflow-y-auto">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <p className="font-bold text-slate-800">Halo! 👋</p>
              <p className="text-slate-600 leading-relaxed">
                Ada yang bisa kami bantu mengenai jadwal dokter, booking konsultasi, atau fasilitas di Klinik Medika Harmony?
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pesan Cepat:</span>
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendCustomMsg(msg)}
                  className="w-full text-left bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 p-2.5 rounded-xl font-medium transition text-[11px] cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">{msg}</span>
                  <Send className="w-3 h-3 text-emerald-700 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pesan Anda..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendCustomMsg(); }}
              className="flex-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={() => handleSendCustomMsg()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-110 transition duration-300 flex items-center gap-2.5 cursor-pointer border-2 border-white group"
        aria-label="WhatsApp Chat"
      >
        <MessageSquare className="w-6 h-6 fill-white/20" />
        <span className="hidden sm:inline font-bold text-xs pr-1">Chat WhatsApp</span>
        <span className="relative flex h-3 w-3 sm:hidden">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
      </button>
    </div>
  );
};
