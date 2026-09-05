export type SpecialtyCategory = 
  | 'Semua'
  | 'Poli Umum'
  | 'Poli Anak'
  | 'Poli Kandungan & Kebidanan'
  | 'Poli Gigi & Mulut'
  | 'Poli Penyakit Dalam'
  | 'Poli Bedah Umum';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialtyCategory: SpecialtyCategory;
  avatar: string;
  experienceYears: number;
  education: string;
  strNumber: string;
  languages: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
}

export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  day: DayOfWeek;
  timeSlot: string; // e.g. "08:00 - 12:00"
  room: string;
  quota: number;
  bookedCount: number;
  status: 'Praktik' | 'Cuti' | 'Penuh';
}

export interface MedicalService {
  id: string;
  name: string;
  category: string;
  iconName: string; // lucide icon name
  shortDesc: string;
  fullDesc: string;
  priceEst: string;
  duration: string;
  highlights: string[];
}

export type BookingStatus = 'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Selesai' | 'Dibatalkan';

export interface ConsultationBooking {
  id: string;
  bookingCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge?: number;
  patientGender?: 'Pria' | 'Wanita';
  isNewPatient: boolean;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  serviceId?: string;
  serviceName?: string;
  date: string; // YYYY-MM-DD
  day: DayOfWeek;
  timeSlot: string;
  complaint: string;
  status: BookingStatus;
  createdAt: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  views: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientCity: string;
  patientAvatar: string;
  rating: number;
  comment: string;
  doctorName?: string;
  serviceName: string;
  date: string;
  verified: boolean;
}

export interface OperationalHour {
  days: string;
  hours: string;
  isOpen: boolean;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  whatsappNumber: string;
  whatsappDefaultMsg: string;
  email: string;
  googleMapsEmbedUrl: string;
  googleMapsShareUrl: string;
  operationalHours: OperationalHour[];
}
