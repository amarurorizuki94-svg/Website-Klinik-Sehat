import { 
  Doctor, 
  DoctorSchedule, 
  MedicalService, 
  HealthArticle, 
  Testimonial, 
  ClinicConfig, 
  ConsultationBooking 
} from '../types/clinic';

import { 
  INITIAL_CLINIC_CONFIG, 
  INITIAL_DOCTORS, 
  INITIAL_SCHEDULES, 
  INITIAL_SERVICES, 
  INITIAL_ARTICLES, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BOOKINGS 
} from '../data/initialData';

const KEYS = {
  CONFIG: 'medika_harmony_config',
  DOCTORS: 'medika_harmony_doctors',
  SCHEDULES: 'medika_harmony_schedules',
  SERVICES: 'medika_harmony_services',
  ARTICLES: 'medika_harmony_articles',
  TESTIMONIALS: 'medika_harmony_testimonials',
  BOOKINGS: 'medika_harmony_bookings',
};

// Generic loader
function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error loading localStorage key: ${key}`, err);
    return fallback;
  }
}

// Generic saver
function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving localStorage key: ${key}`, err);
  }
}

export const storage = {
  // Config
  getConfig: (): ClinicConfig => loadStorage(KEYS.CONFIG, INITIAL_CLINIC_CONFIG),
  saveConfig: (config: ClinicConfig): void => saveStorage(KEYS.CONFIG, config),

  // Doctors
  getDoctors: (): Doctor[] => loadStorage(KEYS.DOCTORS, INITIAL_DOCTORS),
  saveDoctors: (doctors: Doctor[]): void => saveStorage(KEYS.DOCTORS, doctors),

  // Schedules
  getSchedules: (): DoctorSchedule[] => loadStorage(KEYS.SCHEDULES, INITIAL_SCHEDULES),
  saveSchedules: (schedules: DoctorSchedule[]): void => saveStorage(KEYS.SCHEDULES, schedules),

  // Services
  getServices: (): MedicalService[] => loadStorage(KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (services: MedicalService[]): void => saveStorage(KEYS.SERVICES, services),

  // Articles
  getArticles: (): HealthArticle[] => loadStorage(KEYS.ARTICLES, INITIAL_ARTICLES),
  saveArticles: (articles: HealthArticle[]): void => saveStorage(KEYS.ARTICLES, articles),

  // Testimonials
  getTestimonials: (): Testimonial[] => loadStorage(KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonials: (testimonials: Testimonial[]): void => saveStorage(KEYS.TESTIMONIALS, testimonials),

  // Bookings
  getBookings: (): ConsultationBooking[] => loadStorage(KEYS.BOOKINGS, INITIAL_BOOKINGS),
  saveBookings: (bookings: ConsultationBooking[]): void => saveStorage(KEYS.BOOKINGS, bookings),

  // Add new booking
  addBooking: (booking: Omit<ConsultationBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>): ConsultationBooking => {
    const bookings = storage.getBookings();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randNum = Math.floor(10 + Math.random() * 90);
    const code = `MH-${dateStr}-${randNum}`;
    
    const newBooking: ConsultationBooking = {
      ...booking,
      id: `bk-${Date.now()}`,
      bookingCode: code,
      status: 'Menunggu Konfirmasi',
      createdAt: now.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    const updated = [newBooking, ...bookings];
    storage.saveBookings(updated);

    // Also update schedule bookedCount if applicable
    const schedules = storage.getSchedules();
    const matchIdx = schedules.findIndex(
      s => s.doctorId === booking.doctorId && s.day === booking.day && s.timeSlot === booking.timeSlot
    );
    if (matchIdx !== -1) {
      schedules[matchIdx].bookedCount += 1;
      if (schedules[matchIdx].bookedCount >= schedules[matchIdx].quota) {
        schedules[matchIdx].status = 'Penuh';
      }
      storage.saveSchedules(schedules);
    }

    return newBooking;
  },

  // Reset to default
  resetAll: (): void => {
    localStorage.removeItem(KEYS.CONFIG);
    localStorage.removeItem(KEYS.DOCTORS);
    localStorage.removeItem(KEYS.SCHEDULES);
    localStorage.removeItem(KEYS.SERVICES);
    localStorage.removeItem(KEYS.ARTICLES);
    localStorage.removeItem(KEYS.TESTIMONIALS);
    localStorage.removeItem(KEYS.BOOKINGS);
  }
};
