import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Lock,
  Sparkles
} from 'lucide-react';
import { DoctorSchedule, DayOfWeek, SpecialtyCategory } from '../types/clinic';

interface ScheduleSectionProps {
  schedules: DoctorSchedule[];
  onOpenBooking: (doctorId?: string, timeSlot?: string, day?: DayOfWeek) => void;
  onOpenAdmin: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  schedules,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua Hari');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const daysList = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const specialtiesList = [
    'Semua',
    'Spesialis Anak',
    'Spesialis Kandungan',
    'Dokter Gigi',
    'Spesialis Penyakit Dalam',
    'Dokter Umum',
    'Spesialis Bedah'
  ];

  const filteredSchedules = schedules.filter((sch) => {
    const matchesDay = selectedDay === 'Semua Hari' || sch.day === selectedDay;
    const matchesSpecialty = selectedSpecialty === 'Semua' || sch.doctorSpecialty === selectedSpecialty;
    const matchesSearch = sch.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sch.doctorSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sch.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSpecialty && matchesSearch;
  });

  const getStatusBadge = (status: DoctorSchedule['status'], quota: number, bookedCount: number) => {
    if (status === 'Praktik') {
      const remaining = quota - bookedCount;
      return (
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Praktik</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-600">
            (Sisa Kuota: <strong className="text-emerald-700">{remaining}</strong>/{quota})
          </span>
        </div>
      );
    } else if (status === 'Penuh') {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          <span>Kuota Penuh</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
          <XCircle className="w-3 h-3 text-slate-400" />
          <span>Cuti / Libur</span>
        </span>
      );
    }
  };

  return (
    <section id="jadwal" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-12 right-0 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-12 left-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jadwal Dokter Real-time</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Jadwal Praktik Dokter Minggu Ini
            </h2>
            <p className="text-slate-400 text-sm">
              Pilih hari dan dokter sesuai kebutuhan Anda. Pendaftaran dilakukan secara online untuk kepastian jam pelayanan.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-2 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin: Ubah Jadwal Dokter</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 mb-8 space-y-4 shadow-xl">
          {/* Day Selector Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Pilih Hari Praktik:</label>
            <div className="flex flex-wrap items-center gap-2">
              {daysList.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Specialty dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-700/60">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama dokter, poli, atau ruangan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                {specialtiesList.map((sp) => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Cards List */}
        {filteredSchedules.length === 0 ? (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <Calendar className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Jadwal Tidak Ditemukan</h3>
            <p className="text-xs">Tidak ada jadwal dokter yang sesuai dengan filter hari atau pencarian Anda.</p>
            <button
              onClick={() => { setSelectedDay('Semua Hari'); setSelectedSpecialty('Semua'); setSearchQuery(''); }}
              className="mt-4 text-emerald-400 hover:underline text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchedules.map((sch) => (
              <div
                key={sch.id}
                className={`bg-slate-800/90 rounded-2xl p-5 border transition duration-300 flex flex-col justify-between ${
                  sch.status === 'Praktik'
                    ? 'border-slate-700 hover:border-emerald-500/50 shadow-md'
                    : 'border-slate-800 opacity-75'
                }`}
              >
                <div>
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={sch.doctorAvatar}
                      alt={sch.doctorName}
                      className="w-12 h-12 rounded-xl object-cover object-top border border-emerald-500/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{sch.doctorName}</h4>
                      <p className="text-[11px] text-emerald-400 font-medium">{sch.doctorSpecialty}</p>
                    </div>
                  </div>

                  {/* Day, Time, Room Details */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50 space-y-2 text-xs mb-4">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 font-bold text-white">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{sch.day}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{sch.timeSlot}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 pt-1 border-t border-slate-800 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{sch.room}</span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mb-5">
                    {getStatusBadge(sch.status, sch.quota, sch.bookedCount)}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onOpenBooking(sch.doctorId, sch.timeSlot, sch.day)}
                  disabled={sch.status !== 'Praktik'}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    sch.status === 'Praktik'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 cursor-pointer'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{sch.status === 'Praktik' ? 'Booking Slot Ini' : 'Tidak Dapat Dibooking'}</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
