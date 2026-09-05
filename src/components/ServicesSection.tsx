import React, { useState } from 'react';
import { 
  Stethoscope, 
  Baby, 
  HeartPulse, 
  Smile, 
  Activity, 
  TestTube, 
  Clock, 
  Tag, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { MedicalService } from '../types/clinic';

interface ServicesSectionProps {
  services: MedicalService[];
  onOpenBooking: (doctorId?: string, timeSlot?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedDetailService, setSelectedDetailService] = useState<MedicalService | null>(null);

  const categories = ['Semua', 'Layanan Utama', 'Layanan Spesialis', 'Pemeriksaan Khusus', 'Penunjang Medis'];

  const filteredServices = activeCategory === 'Semua'
    ? services
    : services.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-emerald-600" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-teal-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-amber-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-indigo-600" />;
      case 'TestTube': return <TestTube className="w-6 h-6 text-rose-600" />;
      default: return <Stethoscope className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Layanan Medis Terpadu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perawatan Kesehatan Lengkap Untuk Seluruh Anggota Keluarga
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Diperkuat dengan dokter spesialis profesional, standar kebersihan tinggi, serta peralatan diagnostik modern.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Info Pills */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Perkiraan Biaya:</span>
                    <span>{service.priceEst}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Durasi Sesi:</span>
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedDetailService(service)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-xl text-xs transition cursor-pointer text-center"
                >
                  Detail Layanan
                </button>

                <button
                  onClick={() => onOpenBooking()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1 shadow-xs transition cursor-pointer"
                >
                  <span>Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedDetailService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {getServiceIcon(selectedDetailService.iconName)}
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  {selectedDetailService.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedDetailService.name}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedDetailService.fullDesc}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Keunggulan Layanan Ini:</h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedDetailService.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-6 flex justify-between items-center text-xs">
              <div>
                <div className="text-emerald-900 font-bold">Perkiraan Biaya Konsultasi</div>
                <div className="text-emerald-700 font-semibold">{selectedDetailService.priceEst}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-500 font-medium">Estimasi Durasi</div>
                <div className="text-slate-800 font-bold">{selectedDetailService.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedDetailService(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-xs transition cursor-pointer"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  setSelectedDetailService(null);
                  onOpenBooking();
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Booking Layanan Ini</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
