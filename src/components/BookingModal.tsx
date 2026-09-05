import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  Printer, 
  Sparkles, 
  UserCheck, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Doctor, DoctorSchedule, MedicalService, ConsultationBooking, DayOfWeek } from '../types/clinic';
import { storage } from '../utils/storage';

interface BookingModalProps {
  doctors: Doctor[];
  schedules: DoctorSchedule[];
  services: MedicalService[];
  initialDoctorId?: string;
  initialTimeSlot?: string;
  initialDay?: DayOfWeek;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  doctors,
  schedules,
  services,
  initialDoctorId,
  initialTimeSlot,
  initialDay,
  onClose,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId || (doctors[0]?.id || ''));
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(initialTimeSlot || '09:00 - 12:00 WIB');
  
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('30');
  const [patientGender, setPatientGender] = useState<'Pria' | 'Wanita'>('Pria');
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);
  const [complaint, setComplaint] = useState<string>('');

  const [createdBooking, setCreatedBooking] = useState<ConsultationBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  // Helper to derive Indonesian day name from YYYY-MM-DD
  const getDayOfWeekName = (dateString: string): DayOfWeek => {
    const days: DayOfWeek[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const d = new Date(dateString);
    return days[d.getDay()];
  };

  const currentDayName = getDayOfWeekName(bookingDate);

  // Doctor's schedules for selected day
  const doctorSchedulesForDay = schedules.filter(
    s => s.doctorId === selectedDoctorId && (s.day === currentDayName || s.day === initialDay)
  );

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Mohon isi nama lengkap pasien.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 9) {
      setErrorMsg('Mohon masukkan nomor WhatsApp yang aktif.');
      return;
    }

    setErrorMsg('');

    try {
      const newBooking = storage.addBooking({
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim(),
        patientAge: parseInt(patientAge, 10) || 25,
        patientGender,
        isNewPatient,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.title,
        serviceId: selectedService?.id,
        serviceName: selectedService?.name,
        date: bookingDate,
        day: currentDayName,
        timeSlot: selectedTimeSlot,
        complaint: complaint.trim() || 'Konsultasi kesehatan rutin',
      });

      setCreatedBooking(newBooking);
      setStep(4); // Go to Ticket / Confirmation Screen
      onBookingSuccess();
    } catch (err) {
      console.error(err);
      setErrorMsg('Gagal membuat booking. Silakan coba kembali.');
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 relative shadow-2xl my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Form Booking Konsultasi Online</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {step === 4 ? 'Bukti Pendaftaran Konsultasi' : 'Buat Janji Temu Dokter'}
          </h3>
          <p className="text-xs text-slate-500">
            {step === 4 
              ? 'Pendaftaran Anda berhasil! Simpan bukti ini atau tunjukkan saat tiba di klinik.' 
              : 'Lengkapi data pendaftaran dalam kurun waktu 1 menit untuk kepastian antrean.'
            }
          </p>

          {/* Stepper progress bar */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-4">
              <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
              <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
              <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Pilih Dokter & Layanan */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            {/* Dokter Select */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Pilih Dokter Spesialis:</label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-1">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      selectedDoctorId === doc.id
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-emerald-700 font-medium">{doc.title}</div>
                      </div>
                    </div>
                    {selectedDoctorId === doc.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Select */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Pilih Layanan / Konsultasi:</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name} ({srv.priceEst})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Lanjut: Tanggal & Jam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Tanggal & Waktu */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
              <img
                src={selectedDoctor.avatar}
                alt={selectedDoctor.name}
                className="w-10 h-10 rounded-xl object-cover object-top"
              />
              <div>
                <div className="font-bold text-slate-900">{selectedDoctor.name}</div>
                <div className="text-[11px] text-blue-700 font-medium">{selectedDoctor.title}</div>
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Pilih Tanggal Kedatangan:</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl p-3 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Hari: <strong className="text-slate-800">{currentDayName}</strong></p>
            </div>

            {/* Slot Time Select */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Pilih Sesi Jam Praktik:</label>
              {doctorSchedulesForDay.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doctorSchedulesForDay.map((sch) => (
                    <button
                      key={sch.id}
                      type="button"
                      onClick={() => setSelectedTimeSlot(sch.timeSlot)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                        selectedTimeSlot === sch.timeSlot
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{sch.timeSlot}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">{sch.room}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-800">
                  <p className="font-semibold mb-1">Dokter tidak ada jadwal praktik reguler pada hari {currentDayName}.</p>
                  <p className="text-[11px]">Anda tetap dapat memilih sesi perkiraan di bawah ini, admin akan mengonfirmasi ketersediaan via WA:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['09:00 - 12:00 WIB', '13:00 - 16:00 WIB', '16:00 - 19:00 WIB'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2 rounded-lg border text-center font-bold text-[11px] ${
                          selectedTimeSlot === slot ? 'bg-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-slate-100 text-slate-700 font-semibold py-3 px-5 rounded-xl cursor-pointer"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Lanjut: Data Pasien</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Form Pasien */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama Lengkap Pasien *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">No. WhatsApp Active *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Email (Opsional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Usia Pasien</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-blue-500 text-center font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Jenis Kelamin</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as 'Pria' | 'Wanita')}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Status Pasien</label>
                <select
                  value={isNewPatient ? 'baru' : 'lama'}
                  onChange={(e) => setIsNewPatient(e.target.value === 'baru')}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="baru">Pasien Baru</option>
                  <option value="lama">Pasien Lama</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Keluhan Ringkas / Catatan Medis</label>
              <textarea
                rows={2}
                placeholder="Tuliskan keluhan kesehatan atau alasan konsultasi..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-slate-100 text-slate-700 font-semibold py-3 px-5 rounded-xl cursor-pointer"
              >
                Kembali
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Konfirmasi Booking</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Ticket Card */}
        {step === 4 && createdBooking && (
          <div className="space-y-4 text-xs">
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-2xl border border-blue-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-xl"></div>

              <div className="flex justify-between items-start border-b border-blue-800/80 pb-4 mb-4">
                <div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    BUKTI BOOKING RESMI
                  </span>
                  <h4 className="text-xl font-black text-white mt-1 font-mono tracking-wide">
                    {createdBooking.bookingCode}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {createdBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-200 mb-4">
                <div>
                  <div className="text-[10px] text-slate-400">Nama Pasien:</div>
                  <div className="font-bold text-white text-sm">{createdBooking.patientName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">No. WhatsApp:</div>
                  <div className="font-bold text-white">{createdBooking.patientPhone}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Dokter Tujuan:</div>
                  <div className="font-bold text-emerald-300">{createdBooking.doctorName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Tanggal & Jam:</div>
                  <div className="font-bold text-white">{createdBooking.date} ({createdBooking.timeSlot})</div>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-800/80 flex items-center justify-between text-[11px] text-slate-300">
                <span>Lokasi: Klinik Medika Harmony</span>
                <span>Tunjukkan tiket ini di resepsionis</span>
              </div>
            </div>

            {/* Actions for Ticket */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={`https://wa.me/6281288997700?text=${encodeURIComponent(
                  `Halo Admin Klinik Medika Harmony, saya telah mendaftar booking online:\n\n*Kode Booking:* ${createdBooking.bookingCode}\n*Nama:* ${createdBooking.patientName}\n*Dokter:* ${createdBooking.doctorName}\n*Tanggal:* ${createdBooking.date}\n*Jam:* ${createdBooking.timeSlot}\n\nMohon konfirmasinya. Terima kasih!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Kirim Bukti ke WhatsApp</span>
              </a>

              <button
                onClick={handlePrintTicket}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Tiket</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl cursor-pointer"
            >
              Selesai & Tutup
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
