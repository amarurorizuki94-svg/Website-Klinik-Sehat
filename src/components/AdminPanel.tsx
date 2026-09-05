import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  UserCheck, 
  Search, 
  RotateCcw, 
  Save, 
  MessageSquare, 
  Phone, 
  Sparkles,
  Users,
  Settings
} from 'lucide-react';
import { 
  Doctor, 
  DoctorSchedule, 
  ConsultationBooking, 
  ClinicConfig, 
  DayOfWeek, 
  SpecialtyCategory 
} from '../types/clinic';
import { storage } from '../utils/storage';

interface AdminPanelProps {
  doctors: Doctor[];
  schedules: DoctorSchedule[];
  bookings: ConsultationBooking[];
  config: ClinicConfig;
  onClose: () => void;
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  doctors,
  schedules,
  bookings,
  config,
  onClose,
  onRefreshData,
}) => {
  // Auth state
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab: 'jadwal' | 'dokter' | 'booking' | 'pengaturan'
  const [activeTab, setActiveTab] = useState<'jadwal' | 'dokter' | 'booking' | 'pengaturan'>('jadwal');

  // Schedule Filter State
  const [scheduleFilterDay, setScheduleFilterDay] = useState<string>('Semua');
  const [scheduleFilterDoc, setScheduleFilterDoc] = useState<string>('Semua');

  // Schedule Edit Modal State
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [isAddingSchedule, setIsAddingSchedule] = useState<boolean>(false);

  // Form state for schedule adding/editing
  const [schDoctorId, setSchDoctorId] = useState<string>(doctors[0]?.id || '');
  const [schDay, setSchDay] = useState<DayOfWeek>('Senin');
  const [schTimeSlot, setSchTimeSlot] = useState<string>('09:00 - 12:00 WIB');
  const [schRoom, setSchRoom] = useState<string>('Poli 101');
  const [schQuota, setSchQuota] = useState<number>(15);
  const [schStatus, setSchStatus] = useState<'Praktik' | 'Cuti' | 'Penuh'>('Praktik');

  // Booking Search Filter
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('Semua');

  // Clinic Config Form State
  const [cfgPhone, setCfgPhone] = useState<string>(config.phone);
  const [cfgEmergency, setCfgEmergency] = useState<string>(config.emergencyPhone);
  const [cfgWa, setCfgWa] = useState<string>(config.whatsappNumber);
  const [cfgSavedMsg, setCfgSavedMsg] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.trim() === 'admin' || pinInput.trim() === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('PIN Salah. Gunakan PIN default: 1234 atau klik Buka Demo.');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  // --- Schedule Management Handlers ---
  const handleOpenAddSchedule = () => {
    setEditingSchedule(null);
    setSchDoctorId(doctors[0]?.id || '');
    setSchDay('Senin');
    setSchTimeSlot('09:00 - 12:00 WIB');
    setSchRoom('Poli 101');
    setSchQuota(15);
    setSchStatus('Praktik');
    setIsAddingSchedule(true);
  };

  const handleOpenEditSchedule = (sch: DoctorSchedule) => {
    setEditingSchedule(sch);
    setSchDoctorId(sch.doctorId);
    setSchDay(sch.day);
    setSchTimeSlot(sch.timeSlot);
    setSchRoom(sch.room);
    setSchQuota(sch.quota);
    setSchStatus(sch.status);
    setIsAddingSchedule(true);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const docObj = doctors.find(d => d.id === schDoctorId) || doctors[0];
    const currentSchedules = storage.getSchedules();

    if (editingSchedule) {
      // Update existing
      const updated = currentSchedules.map(s => {
        if (s.id === editingSchedule.id) {
          return {
            ...s,
            doctorId: docObj.id,
            doctorName: docObj.name,
            doctorSpecialty: docObj.title,
            doctorAvatar: docObj.avatar,
            day: schDay,
            timeSlot: schTimeSlot,
            room: schRoom,
            quota: schQuota,
            status: schStatus,
          };
        }
        return s;
      });
      storage.saveSchedules(updated);
    } else {
      // Add new
      const newSch: DoctorSchedule = {
        id: `sch-${Date.now()}`,
        doctorId: docObj.id,
        doctorName: docObj.name,
        doctorSpecialty: docObj.title,
        doctorAvatar: docObj.avatar,
        day: schDay,
        timeSlot: schTimeSlot,
        room: schRoom,
        quota: schQuota,
        bookedCount: 0,
        status: schStatus,
      };
      storage.saveSchedules([newSch, ...currentSchedules]);
    }

    setIsAddingSchedule(false);
    setEditingSchedule(null);
    onRefreshData();
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm('Hapus jadwal praktik ini?')) {
      const current = storage.getSchedules();
      const updated = current.filter(s => s.id !== id);
      storage.saveSchedules(updated);
      onRefreshData();
    }
  };

  const handleQuickToggleScheduleStatus = (sch: DoctorSchedule) => {
    const nextStatus: DoctorSchedule['status'] = sch.status === 'Praktik' ? 'Cuti' : sch.status === 'Cuti' ? 'Penuh' : 'Praktik';
    const current = storage.getSchedules();
    const updated = current.map(s => s.id === sch.id ? { ...s, status: nextStatus } : s);
    storage.saveSchedules(updated);
    onRefreshData();
  };

  // --- Booking Status Handler ---
  const handleChangeBookingStatus = (bookingId: string, newStatus: ConsultationBooking['status']) => {
    const currentBookings = storage.getBookings();
    const updated = currentBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    storage.saveBookings(updated);
    onRefreshData();
  };

  // --- Clinic Config Save Handler ---
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const currentConfig = storage.getConfig();
    const updatedConfig: ClinicConfig = {
      ...currentConfig,
      phone: cfgPhone,
      emergencyPhone: cfgEmergency,
      whatsappNumber: cfgWa,
    };
    storage.saveConfig(updatedConfig);
    setCfgSavedMsg('Pengaturan kontak klinik berhasil diperbarui!');
    setTimeout(() => setCfgSavedMsg(''), 3000);
    onRefreshData();
  };

  // Reset All
  const handleResetData = () => {
    if (window.confirm('Kembalikan seluruh jadwal & data ke pengaturan awal?')) {
      storage.resetAll();
      onRefreshData();
    }
  };

  const filteredSchedules = schedules.filter(s => {
    const matchesDay = scheduleFilterDay === 'Semua' || s.day === scheduleFilterDay;
    const matchesDoc = scheduleFilterDoc === 'Semua' || s.doctorId === scheduleFilterDoc;
    return matchesDay && matchesDoc;
  });

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.patientName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.bookingCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.doctorName.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'Semua' || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-5 sm:p-8 relative shadow-2xl my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Portal Pengelola Klinik</h3>
              <p className="text-xs text-slate-500 mt-1">
                Akses khusus staf resepsionis/admin untuk mengubah jadwal dokter & kelola pendaftaran pasien.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Masukkan PIN Admin (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-center text-lg font-bold tracking-widest text-slate-900 rounded-2xl py-3 focus:outline-none focus:border-blue-600"
                />
              </div>

              {authError && <p className="text-xs text-rose-600 font-semibold">{authError}</p>}

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 rounded-2xl shadow-md text-xs cursor-pointer"
              >
                Masuk Admin Portal
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleQuickDemoLogin}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-emerald-600" />
                <span>Buka Akses Demo Langsung (1-Klik)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Header Title & Tabs */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    ADMINISTRATOR PANEL
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">Kelola Klinik & Jadwal Dokter</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetData}
                    className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                    title="Kembalikan data ke awal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>

                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Kunci Kembali
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-1">
                <button
                  onClick={() => setActiveTab('jadwal')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'jadwal'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwal Dokter ({schedules.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('booking')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'booking'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Booking Pasien ({bookings.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('dokter')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'dokter'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Daftar Dokter ({doctors.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('pengaturan')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'pengaturan'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Kontak Klinik</span>
                </button>
              </div>
            </div>

            {/* TAB 1: KELOLA JADWAL DOKTER */}
            {activeTab === 'jadwal' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                
                {/* Header Filter & Add Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <select
                      value={scheduleFilterDay}
                      onChange={(e) => setScheduleFilterDay(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <option value="Semua">Semua Hari</option>
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </select>

                    <select
                      value={scheduleFilterDoc}
                      onChange={(e) => setScheduleFilterDoc(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <option value="Semua">Semua Dokter</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleOpenAddSchedule}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Jadwal Baru</span>
                  </button>
                </div>

                {/* Schedules Table / Grid */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Dokter & Spesialis</th>
                        <th className="p-3">Hari & Waktu</th>
                        <th className="p-3">Ruangan</th>
                        <th className="p-3">Kuota Pasien</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredSchedules.map((sch) => (
                        <tr key={sch.id} className="hover:bg-slate-50 transition">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={sch.doctorAvatar}
                                alt={sch.doctorName}
                                className="w-8 h-8 rounded-lg object-cover object-top border"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{sch.doctorName}</div>
                                <div className="text-[10px] text-blue-700">{sch.doctorSpecialty}</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-800">{sch.day}</div>
                            <div className="text-[10px] text-slate-500">{sch.timeSlot}</div>
                          </td>

                          <td className="p-3 font-medium text-slate-700">{sch.room}</td>

                          <td className="p-3">
                            <span className="font-bold text-slate-900">{sch.bookedCount}</span> / {sch.quota} Terisi
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => handleQuickToggleScheduleStatus(sch)}
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] cursor-pointer transition flex items-center gap-1 ${
                                sch.status === 'Praktik'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : sch.status === 'Penuh'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                              title="Klik untuk ubah status cepat"
                            >
                              <span>{sch.status}</span>
                            </button>
                          </td>

                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => handleOpenEditSchedule(sch)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                              title="Edit Jadwal"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteSchedule(sch.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                              title="Hapus Jadwal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 2: KELOLA BOOKING PASIEN */}
            {activeTab === 'booking' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                
                {/* Search & Status Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Cari kode booking, nama pasien..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <select
                    value={bookingStatusFilter}
                    onChange={(e) => setBookingStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                    <option value="Dikonfirmasi">Dikonfirmasi</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                {/* Booking List */}
                <div className="space-y-3">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {b.bookingCode}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            b.status === 'Dikonfirmasi'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Menunggu Konfirmasi'
                              ? 'bg-amber-100 text-amber-800'
                              : b.status === 'Selesai'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <div className="font-bold text-slate-900 text-sm">{b.patientName} ({b.patientPhone})</div>
                        <div className="text-[11px] text-slate-600">
                          Dokter: <strong className="text-blue-900">{b.doctorName}</strong> • Tanggal: <strong>{b.date} ({b.timeSlot})</strong>
                        </div>
                        <div className="text-[11px] text-slate-500 italic">Catatan: "{b.complaint}"</div>
                      </div>

                      {/* Booking Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${b.patientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Halo Kak ${b.patientName}, kami dari Klinik Medika Harmony mengonfirmasi pendaftaran booking Anda (${b.bookingCode}) pada tanggal ${b.date} jam ${b.timeSlot} bersama ${b.doctorName}. Terima kasih!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat WA Pasien</span>
                        </a>

                        <button
                          onClick={() => handleChangeBookingStatus(b.id, 'Dikonfirmasi')}
                          className="bg-blue-900 text-white font-semibold py-1.5 px-3 rounded-xl text-[11px] cursor-pointer"
                        >
                          Konfirmasi
                        </button>

                        <button
                          onClick={() => handleChangeBookingStatus(b.id, 'Selesai')}
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold py-1.5 px-3 rounded-xl text-[11px] cursor-pointer"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 3: KELOLA DOKTER */}
            {activeTab === 'dokter' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctors.map((doc) => (
                    <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
                      <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{doc.name}</div>
                        <div className="text-[11px] text-emerald-700">{doc.title}</div>
                        <div className="text-[10px] text-slate-500"> Pengalaman: {doc.experienceYears} Tahun</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PENGATURAN KONTAK KLINIK */}
            {activeTab === 'pengaturan' && (
              <form onSubmit={handleSaveConfig} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs max-w-lg">
                {cfgSavedMsg && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl font-bold">
                    {cfgSavedMsg}
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Nomor Telepon Resepsionis:</label>
                  <input
                    type="text"
                    value={cfgPhone}
                    onChange={(e) => setCfgPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Nomor UGD Darurat (24 Jam):</label>
                  <input
                    type="text"
                    value={cfgEmergency}
                    onChange={(e) => setCfgEmergency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-rose-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Nomor WhatsApp Klinik (Tanpa +):</label>
                  <input
                    type="text"
                    value={cfgWa}
                    onChange={(e) => setCfgWa(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Kontak</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* Modal Sub-Form: Tambah / Edit Jadwal Dokter */}
        {isAddingSchedule && (
          <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setIsAddingSchedule(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-lg font-extrabold text-slate-900 mb-4">
                {editingSchedule ? 'Edit Jadwal Dokter' : 'Tambah Jadwal Dokter Baru'}
              </h4>

              <form onSubmit={handleSaveSchedule} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Pilih Dokter</label>
                  <select
                    value={schDoctorId}
                    onChange={(e) => setSchDoctorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold cursor-pointer"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Hari Praktik</label>
                    <select
                      value={schDay}
                      onChange={(e) => setSchDay(e.target.value as DayOfWeek)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 cursor-pointer"
                    >
                      {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Status Ketersediaan</label>
                    <select
                      value={schStatus}
                      onChange={(e) => setSchStatus(e.target.value as 'Praktik' | 'Cuti' | 'Penuh')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold cursor-pointer"
                    >
                      <option value="Praktik">Praktik (Aktif)</option>
                      <option value="Penuh">Penuh</option>
                      <option value="Cuti">Cuti / Libur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Sesi Jam Praktik</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 09:00 - 12:00 WIB"
                    value={schTimeSlot}
                    onChange={(e) => setSchTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Ruangan / Poli</label>
                    <input
                      type="text"
                      required
                      placeholder="Poli 101"
                      value={schRoom}
                      onChange={(e) => setSchRoom(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Maks. Kuota Pasien</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={schQuota}
                      onChange={(e) => setSchQuota(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-center"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingSchedule(false)}
                    className="bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl cursor-pointer shadow-md"
                  >
                    Simpan Jadwal
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
