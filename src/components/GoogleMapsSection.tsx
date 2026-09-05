import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Car, 
  Train, 
  MessageSquare, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface GoogleMapsSectionProps {
  config: ClinicConfig;
}

export const GoogleMapsSection: React.FC<GoogleMapsSectionProps> = ({ config }) => {
  // Check if clinic is open right now
  const isOpenNow = (): boolean => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const hour = now.getHours();

    if (day >= 1 && day <= 5) {
      return hour >= 7 && hour < 21;
    } else if (day === 6) {
      return hour >= 8 && hour < 18;
    } else {
      return hour >= 8 && hour < 15;
    }
  };

  const openStatus = isOpenNow();

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Lokasi & Jam Operasional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kunjungi Klinik Medika Harmony
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Lokasi strategis di pusat kota dengan akses mudah, area parkir luas, serta fasilitas UGD & Laboratorium 24 Jam.
          </p>
        </div>

        {/* Content Grid: Google Maps + Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Google Maps Interactive Embed Frame */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative min-h-[420px] flex flex-col justify-between">
            <iframe
              title="Google Maps Location Klinik Medika Harmony"
              src={config.googleMapsEmbedUrl}
              className="w-full h-[450px] border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Bottom Overlay Bar */}
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200">{config.address}, {config.city}</span>
              </div>

              <a
                href={config.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Maps)</span>
              </a>
            </div>
          </div>

          {/* Right: Operational Hours & Contact Details */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Live Operational Status Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Jam Operasional Klinik</h3>
                </div>

                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                  openStatus
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {openStatus ? '• Buka Sekarang' : '• Tutup Sekarang (UGD 24 Jam)'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {config.operationalHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-300 py-1 border-b border-slate-800/50">
                    <span className="font-semibold text-slate-200">{item.days}:</span>
                    <span className="font-mono text-emerald-400 font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Layanan UGD & Penanganan Darurat Medis Beroperasi 24 Jam Non-Stop.</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Kontak Resepsionis & Pendaftaran</h3>

              <div className="space-y-3 text-xs">
                <a
                  href={`tel:${config.phone}`}
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Telepon Resepsionis</div>
                      <div className="font-bold text-slate-900">{config.phone}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700">Panggil</span>
                </a>

                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">WhatsApp Hotline</div>
                      <div className="font-bold text-slate-900">+{config.whatsappNumber}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">Chat WA</span>
                </a>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Email Formal</div>
                    <div className="font-bold text-slate-900">{config.email}</div>
                  </div>
                </div>
              </div>

              {/* Transport Guide */}
              <div className="pt-2 border-t border-slate-200 space-y-2 text-[11px] text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-blue-600" />
                  <span>Akses Kendaraan & Transportasi:</span>
                </div>
                <p>• 5 Menit dari Gerbang Tol BSD Timur / Serpong.</p>
                <p>• 10 Menit dari Stasiun KRL Rawa Buntu / Serpong (Tersedia Feeder Shuttle Bus).</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
