import React, { useState } from 'react';
import { 
  UserCheck, 
  Star, 
  Award, 
  GraduationCap, 
  Calendar, 
  Globe, 
  FileText, 
  X, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Doctor, SpecialtyCategory } from '../types/clinic';

interface DoctorProfileSectionProps {
  doctors: Doctor[];
  selectedSpecialty: SpecialtyCategory;
  onSelectSpecialty: (specialty: SpecialtyCategory) => void;
  onOpenBooking: (doctorId: string) => void;
}

export const DoctorProfileSection: React.FC<DoctorProfileSectionProps> = ({
  doctors,
  selectedSpecialty,
  onSelectSpecialty,
  onOpenBooking,
}) => {
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<Doctor | null>(null);

  const specialties: SpecialtyCategory[] = [
    'Semua',
    'Poli Umum',
    'Poli Anak',
    'Poli Kandungan & Kebidanan',
    'Poli Gigi & Mulut',
    'Poli Penyakit Dalam',
    'Poli Bedah Umum'
  ];

  const filteredDoctors = selectedSpecialty === 'Semua'
    ? doctors
    : doctors.filter(d => d.specialtyCategory === selectedSpecialty);

  return (
    <section id="dokter" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Profil Tim Medis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dokter Spesialis Berpengalaman & Didedikasikan Untuk Anda
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Seluruh dokter kami telah terregistrasi resmi STR dan berkomitmen memberikan penanganan medis yang ramah, cermat, serta profesional.
          </p>

          {/* Specialty Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => onSelectSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Image Header */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Experience Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doc.experienceYears} Tahun Pengalaman</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-slate-900" />
                    <span>{doc.rating} ({doc.reviewCount})</span>
                  </div>

                  {/* Specialty Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-white/20">
                      {doc.specialtyCategory}
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-1 drop-shadow-md">
                      {doc.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{doc.education}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>STR: {doc.strNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedDoctorModal(doc)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer text-center"
                >
                  Profil Lengkap
                </button>

                <button
                  onClick={() => onOpenBooking(doc.id)}
                  className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Buat Janji</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedDoctorModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-6 border-b border-slate-100 pb-6">
              <img
                src={selectedDoctorModal.avatar}
                alt={selectedDoctorModal.name}
                className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-emerald-500 shadow-md"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  {selectedDoctorModal.specialtyCategory}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedDoctorModal.name}</h3>
                <p className="text-xs font-semibold text-blue-700">{selectedDoctorModal.title}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <strong className="text-slate-900">{selectedDoctorModal.rating}</strong> ({selectedDoctorModal.reviewCount} ulasan)
                  </span>
                  <span>•</span>
                  <span><strong>{selectedDoctorModal.experienceYears} Tahun</strong> Pengalaman</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 mb-6 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Tentang Dokter</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {selectedDoctorModal.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>Pendidikan</span>
                  </div>
                  <p className="text-slate-600">{selectedDoctorModal.education}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Bahasa Dilayani</span>
                  </div>
                  <p className="text-slate-600">{selectedDoctorModal.languages.join(', ')}</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Nomor Registrasi STR Resmi</div>
                  <div className="text-emerald-700 font-mono text-[11px]">{selectedDoctorModal.strNumber}</div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-xs transition cursor-pointer"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const docId = selectedDoctorModal.id;
                  setSelectedDoctorModal(null);
                  onOpenBooking(docId);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Buat Janji Konsultasi</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
