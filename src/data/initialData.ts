import { 
  Doctor, 
  DoctorSchedule, 
  MedicalService, 
  HealthArticle, 
  Testimonial, 
  ClinicConfig, 
  ConsultationBooking 
} from '../types/clinic';

export const INITIAL_CLINIC_CONFIG: ClinicConfig = {
  name: "Klinik Medika Harmony",
  tagline: "Layanan Kesehatan Modern, Ramah, & Terpercaya untuk Keluarga Anda",
  address: "Jl. Harmony Boulevard No. 88, Sektor 7 BSD City",
  district: "Serpong",
  city: "Tangerang Selatan, Banten 15322",
  phone: "(021) 555-8899",
  emergencyPhone: "0811-9988-7711",
  whatsappNumber: "6281288997700",
  whatsappDefaultMsg: "Halo Admin Klinik Medika Harmony, saya ingin bertanya mengenai jadwal dokter / booking konsultasi.",
  email: "info@medikaharmony.co.id",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.723149172151!2d106.6508933!3d-6.3000678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb385a4918e7%3A0xc0c6f5d81f1b2123!2sBSD%20Green%20Office%20Park!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  googleMapsShareUrl: "https://maps.google.com/?q=BSD+Green+Office+Park",
  operationalHours: [
    { days: "Senin - Jumat", hours: "07:00 - 21:00 WIB", isOpen: true },
    { days: "Sabtu", hours: "08:00 - 18:00 WIB", isOpen: true },
    { days: "Minggu / Libur Nasional", hours: "08:00 - 15:00 WIB (UGD 24 Jam)", isOpen: true }
  ]
};

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "dr. Amanda Putri, Sp.A",
    title: "Dokter Spesialis Anak",
    specialtyCategory: "Poli Anak",
    avatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600",
    experienceYears: 11,
    education: "Universitas Indonesia (Spesialis Anak)",
    strNumber: "31.1.1.100.2.18.123456",
    languages: ["Indonesia", "Inggris"],
    bio: "dr. Amanda merupakan dokter spesialis anak yang sangat sabar dan berpengalaman dalam menangani tumbuh kembang anak, imunisasi, serta penyakit anak umum hingga alergi.",
    rating: 4.9,
    reviewCount: 142,
    isAvailable: true
  },
  {
    id: "doc-2",
    name: "dr. Rizky Pratama, Sp.OG",
    title: "Dokter Spesialis Kebidanan & Kandungan",
    specialtyCategory: "Poli Kandungan & Kebidanan",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    experienceYears: 14,
    education: "Universitas Gadjah Mada (Sp.OG)",
    strNumber: "33.1.2.200.3.16.654321",
    languages: ["Indonesia", "Inggris"],
    bio: "Pakar kesehatan reproduksi wanita, pemeriksaan kehamilan USG 4D, program hamil, serta persalinan dengan teknik modern yang aman dan nyaman.",
    rating: 4.9,
    reviewCount: 198,
    isAvailable: true
  },
  {
    id: "doc-3",
    name: "drg. Maya Salsabila, Sp.KG",
    title: "Dokter Gigi Spesialis Konservasi Gigi",
    specialtyCategory: "Poli Gigi & Mulut",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    experienceYears: 8,
    education: "Universitas Airlangga (Sp.KG)",
    strNumber: "35.2.1.300.1.20.987654",
    languages: ["Indonesia"],
    bio: "Fokus pada perawatan saluran akar, estetika penambalan gigi, veneer, scaling profesional, dan perbaikan mahkota gigi tanpa rasa sakit.",
    rating: 4.8,
    reviewCount: 115,
    isAvailable: true
  },
  {
    id: "doc-4",
    name: "dr. Hendra Wijaya, Sp.PD",
    title: "Dokter Spesialis Penyakit Dalam",
    specialtyCategory: "Poli Penyakit Dalam",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    experienceYears: 16,
    education: "Universitas Indonesia (Sp.PD)",
    strNumber: "31.1.1.400.4.14.112233",
    languages: ["Indonesia", "Inggris", "Mandarin"],
    bio: "Berpengalaman menangani hipertensi, diabetes melitus, gangguan pencernaan, penyakit jantung koroner, dan pengelolaan metabolisme tubuh.",
    rating: 4.9,
    reviewCount: 167,
    isAvailable: true
  },
  {
    id: "doc-5",
    name: "dr. Budi Santoso",
    title: "Dokter Umum & Konsultan Kesehatan",
    specialtyCategory: "Poli Umum",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    experienceYears: 9,
    education: "Universitas Padjadjaran (dr.)",
    strNumber: "32.1.1.500.2.19.445566",
    languages: ["Indonesia"],
    bio: "Melayani pemeriksaan fisik menyeluruh, pengobatan ISPA, flu, luka ringan, konsultasi gaya hidup sehat, dan rujukan spesialis tepat sasaran.",
    rating: 4.8,
    reviewCount: 89,
    isAvailable: true
  },
  {
    id: "doc-6",
    name: "dr. Citra Dewi, Sp.B",
    title: "Dokter Spesialis Bedah Umum",
    specialtyCategory: "Poli Bedah Umum",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    experienceYears: 12,
    education: "Universitas Diponegoro (Sp.B)",
    strNumber: "33.1.2.600.3.17.778899",
    languages: ["Indonesia", "Inggris"],
    bio: "Spesialis bedah minor dan mayor, perawatan luka diabetes, bedah usus buntu, kista, dan tumor jinak dengan prosedur minimal invasif.",
    rating: 4.9,
    reviewCount: 94,
    isAvailable: true
  }
];

export const INITIAL_SCHEDULES: DoctorSchedule[] = [
  // dr. Amanda
  { id: "sch-1", doctorId: "doc-1", doctorName: "dr. Amanda Putri, Sp.A", doctorSpecialty: "Spesialis Anak", doctorAvatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600", day: "Senin", timeSlot: "09:00 - 12:00 WIB", room: "Poli Anak A (R. 102)", quota: 15, bookedCount: 8, status: "Praktik" },
  { id: "sch-2", doctorId: "doc-1", doctorName: "dr. Amanda Putri, Sp.A", doctorSpecialty: "Spesialis Anak", doctorAvatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600", day: "Rabu", timeSlot: "16:00 - 19:00 WIB", room: "Poli Anak A (R. 102)", quota: 15, bookedCount: 15, status: "Penuh" },
  { id: "sch-3", doctorId: "doc-1", doctorName: "dr. Amanda Putri, Sp.A", doctorSpecialty: "Spesialis Anak", doctorAvatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600", day: "Jumat", timeSlot: "09:00 - 12:00 WIB", room: "Poli Anak A (R. 102)", quota: 15, bookedCount: 5, status: "Praktik" },
  { id: "sch-4", doctorId: "doc-1", doctorName: "dr. Amanda Putri, Sp.A", doctorSpecialty: "Spesialis Anak", doctorAvatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600", day: "Sabtu", timeSlot: "08:00 - 11:00 WIB", room: "Poli Anak A (R. 102)", quota: 12, bookedCount: 9, status: "Praktik" },

  // dr. Rizky
  { id: "sch-5", doctorId: "doc-2", doctorName: "dr. Rizky Pratama, Sp.OG", doctorSpecialty: "Spesialis Kandungan", doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600", day: "Senin", timeSlot: "13:00 - 17:00 WIB", room: "Poli Kandungan (R. 105)", quota: 12, bookedCount: 6, status: "Praktik" },
  { id: "sch-6", doctorId: "doc-2", doctorName: "dr. Rizky Pratama, Sp.OG", doctorSpecialty: "Spesialis Kandungan", doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600", day: "Selasa", timeSlot: "09:00 - 13:00 WIB", room: "Poli Kandungan (R. 105)", quota: 12, bookedCount: 10, status: "Praktik" },
  { id: "sch-7", doctorId: "doc-2", doctorName: "dr. Rizky Pratama, Sp.OG", doctorSpecialty: "Spesialis Kandungan", doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600", day: "Kamis", timeSlot: "13:00 - 17:00 WIB", room: "Poli Kandungan (R. 105)", quota: 12, bookedCount: 0, status: "Cuti" },
  { id: "sch-8", doctorId: "doc-2", doctorName: "dr. Rizky Pratama, Sp.OG", doctorSpecialty: "Spesialis Kandungan", doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600", day: "Sabtu", timeSlot: "13:00 - 16:00 WIB", room: "Poli Kandungan (R. 105)", quota: 10, bookedCount: 4, status: "Praktik" },

  // drg. Maya
  { id: "sch-9", doctorId: "doc-3", doctorName: "drg. Maya Salsabila, Sp.KG", doctorSpecialty: "Dokter Gigi", doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600", day: "Selasa", timeSlot: "14:00 - 18:00 WIB", room: "Poli Gigi (R. 201)", quota: 10, bookedCount: 7, status: "Praktik" },
  { id: "sch-10", doctorId: "doc-3", doctorName: "drg. Maya Salsabila, Sp.KG", doctorSpecialty: "Dokter Gigi", doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600", day: "Rabu", timeSlot: "09:00 - 13:00 WIB", room: "Poli Gigi (R. 201)", quota: 10, bookedCount: 3, status: "Praktik" },
  { id: "sch-11", doctorId: "doc-3", doctorName: "drg. Maya Salsabila, Sp.KG", doctorSpecialty: "Dokter Gigi", doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600", day: "Jumat", timeSlot: "14:00 - 18:00 WIB", room: "Poli Gigi (R. 201)", quota: 10, bookedCount: 8, status: "Praktik" },

  // dr. Hendra
  { id: "sch-12", doctorId: "doc-4", doctorName: "dr. Hendra Wijaya, Sp.PD", doctorSpecialty: "Spesialis Penyakit Dalam", doctorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600", day: "Senin", timeSlot: "17:00 - 20:00 WIB", room: "Poli Dalam (R. 101)", quota: 15, bookedCount: 11, status: "Praktik" },
  { id: "sch-13", doctorId: "doc-4", doctorName: "dr. Hendra Wijaya, Sp.PD", doctorSpecialty: "Spesialis Penyakit Dalam", doctorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600", day: "Kamis", timeSlot: "09:00 - 13:00 WIB", room: "Poli Dalam (R. 101)", quota: 15, bookedCount: 6, status: "Praktik" },
  { id: "sch-14", doctorId: "doc-4", doctorName: "dr. Hendra Wijaya, Sp.PD", doctorSpecialty: "Spesialis Penyakit Dalam", doctorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600", day: "Sabtu", timeSlot: "10:00 - 14:00 WIB", room: "Poli Dalam (R. 101)", quota: 15, bookedCount: 14, status: "Praktik" },

  // dr. Budi
  { id: "sch-15", doctorId: "doc-5", doctorName: "dr. Budi Santoso", doctorSpecialty: "Dokter Umum", doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600", day: "Senin", timeSlot: "08:00 - 15:00 WIB", room: "Poli Umum (R. 103)", quota: 25, bookedCount: 12, status: "Praktik" },
  { id: "sch-16", doctorId: "doc-5", doctorName: "dr. Budi Santoso", doctorSpecialty: "Dokter Umum", doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600", day: "Selasa", timeSlot: "08:00 - 15:00 WIB", room: "Poli Umum (R. 103)", quota: 25, bookedCount: 18, status: "Praktik" },
  { id: "sch-17", doctorId: "doc-5", doctorName: "dr. Budi Santoso", doctorSpecialty: "Dokter Umum", doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600", day: "Rabu", timeSlot: "08:00 - 15:00 WIB", room: "Poli Umum (R. 103)", quota: 25, bookedCount: 9, status: "Praktik" },
  { id: "sch-18", doctorId: "doc-5", doctorName: "dr. Budi Santoso", doctorSpecialty: "Dokter Umum", doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600", day: "Kamis", timeSlot: "08:00 - 15:00 WIB", room: "Poli Umum (R. 103)", quota: 25, bookedCount: 15, status: "Praktik" },
  { id: "sch-19", doctorId: "doc-5", doctorName: "dr. Budi Santoso", doctorSpecialty: "Dokter Umum", doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600", day: "Jumat", timeSlot: "08:00 - 15:00 WIB", room: "Poli Umum (R. 103)", quota: 25, bookedCount: 20, status: "Praktik" },

  // dr. Citra
  { id: "sch-20", doctorId: "doc-6", doctorName: "dr. Citra Dewi, Sp.B", doctorSpecialty: "Spesialis Bedah", doctorAvatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600", day: "Selasa", timeSlot: "16:00 - 19:00 WIB", room: "Poli Bedah (R. 106)", quota: 8, bookedCount: 5, status: "Praktik" },
  { id: "sch-21", doctorId: "doc-6", doctorName: "dr. Citra Dewi, Sp.B", doctorSpecialty: "Spesialis Bedah", doctorAvatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600", day: "Jumat", timeSlot: "16:00 - 19:00 WIB", room: "Poli Bedah (R. 106)", quota: 8, bookedCount: 3, status: "Praktik" }
];

export const INITIAL_SERVICES: MedicalService[] = [
  {
    id: "srv-1",
    name: "Poli Umum & Konsultasi Sehat",
    category: "Layanan Utama",
    iconName: "Stethoscope",
    shortDesc: "Pemeriksaan kesehatan rutin, pengobatan penyakit umum, dan rujukan spesialis.",
    fullDesc: "Layanan konsultasi kesehatan umum komprehensif bagi dewasa maupun anak-anak. Meliputi pemeriksaan tekanan darah, gula darah sewaktu, konsultasi riwayat penyakit, serta penanganan keluhan seperti flu, demam, maag, dan hipertensi.",
    priceEst: "Rp 100.000 - Rp 150.000",
    duration: "20 - 30 Menit",
    highlights: ["Pemeriksaan TTV Lengkap", "Resep Obat Apotek Resmi", "Surat Keterangan Sehat", "Tanpa Antre Panjang"]
  },
  {
    id: "srv-2",
    name: "Poli Spesialis Anak & Imunisasi",
    category: "Layanan Spesialis",
    iconName: "Baby",
    shortDesc: "Pemantauan tumbuh kembang anak, vaksinasi lengkap, dan pengobatan penyakit anak.",
    fullDesc: "Pengawasan tumbuh kembang balita dengan kurva KMS/WHO, pemberian vaksinasi wajib & tambahan sesuai standar IDAI, serta konsultasi nutrisi & gizi anak oleh dr. Spesialis Anak.",
    priceEst: "Rp 250.000 - Rp 350.000",
    duration: "30 - 45 Menit",
    highlights: ["Ruang Tunggu Anak Ramah", "Vaksin Imunisasi IDAI", "Pemeriksaan Tumbuh Kembang", "Konsultasi Alergi Anak"]
  },
  {
    id: "srv-3",
    name: "Poli Kebidanan & USG 4D",
    category: "Layanan Spesialis",
    iconName: "HeartPulse",
    shortDesc: "Pemeriksaan kehamilan, USG 4D HD-Live, program hamil, dan konsultasi kontrasepsi.",
    fullDesc: "Dilengkapi perangkat USG 4D resolusi tinggi untuk memantau janin secara detail dan akurat. Menyediakan pula pemeriksaan Pap Smear, papsmear HPV, program kehamilan, hingga KB.",
    priceEst: "Rp 300.000 - Rp 500.000",
    duration: "30 - 45 Menit",
    highlights: ["Cetak Foto USG 4D", "Rekaman Video Janin", "Konsultasi Promil", "Skrining Kelainan Janin"]
  },
  {
    id: "srv-4",
    name: "Poli Gigi & Perawatan Estetika",
    category: "Layanan Spesialis",
    iconName: "Smile",
    shortDesc: "Scaling pembersihan karang gigi, penambalan komposit estetis, dan perawatan saluran akar.",
    fullDesc: "Fasilitas perawatan gigi modern dengan unit dental steril tinggi. Melayani pembersihan karang gigi ultrasonic, veneer gigi, penambalan gigi berlubang, pencabutan tanpa nyeri, hingga bleaching gigi.",
    priceEst: "Rp 200.000 - Rp 600.000",
    duration: "45 - 60 Menit",
    highlights: ["Ultrasonic Scaling Clean", "Bahan Tambal Estetis", "Alat Steril Autoclave Class B", "Prosedur Tanpa Rasa Sakit"]
  },
  {
    id: "srv-5",
    name: "Medical Check-Up (MCU) Paketan",
    category: "Pemeriksaan Khusus",
    iconName: "Activity",
    shortDesc: "Paket tes kesehatan berkala untuk karyawan, pra-nikah, lansia, dan umum.",
    fullDesc: "Paket MCU komprehensif melingkupi pemeriksaan laboratorium (Kolesterol, Trigliserida, Asam Urat, Fungsi Hati/Ginjal, Urin Lengkap), EKG Jantung, Rontgen Dada, dan konsultasi hasil dengan Dokter Spesialis Penyakit Dalam.",
    priceEst: "Rp 450.000 - Rp 1.200.000",
    duration: "60 - 90 Menit",
    highlights: ["Hasil Laboratorium Cepat (Same Day)", "Laporan MCU Cetak & PDF", "Konsultasi Dokter Gratis", "Diskon Paket Keluarga"]
  },
  {
    id: "srv-6",
    name: "Layanan Laboratorium & Swab",
    category: "Penunjang Medis",
    iconName: "TestTube",
    shortDesc: "Pemeriksaan darah lengkap, tes gula darah, tes imunologi, dan swab tes.",
    fullDesc: "Fasilitas lab terakreditasi dengan hasil yang presisi dan cepat. Pengambilan sampel darah yang lembut oleh tenaga analis medis berpengalaman.",
    priceEst: "Rp 80.000 - Rp 350.000",
    duration: "15 - 30 Menit",
    highlights: ["Analis Profesional", "Hasil via WhatsApp/Email", "Sampling Ramah Anak", "Peralatan Otomatis Modern"]
  }
];

export const INITIAL_ARTICLES: HealthArticle[] = [
  {
    id: "art-1",
    title: "5 Panduan Lengkap Menjaga Kesehatan Imunitas Anak di Musim Hujan",
    category: "Ibu & Anak",
    excerpt: "Musim pancaroba sering membuat balita rentan demam dan batuk. Simak tips praktis pencegahan dari dokter spesialis anak.",
    content: `Perubahan cuaca yang drastis di musim hujan membuat sistem kekebalan tubuh anak-anak bekerja ekstra keras. Menurut **dr. Amanda Putri, Sp.A**, dokter spesialis anak Klinik Medika Harmony, ada beberapa langkah penting yang wajib diperhatikan para orang tua:

1. **Cukupi Asupan Asupan Vitamin C & D**: Berikan buah-buahan segar seperti jeruk, pepaya, dan kiwi. Suplementasi dapat diberikan setelah konsultasi dengan dokter.
2. **Jaga Kebersihan Tangan**: Ajarkan anak mencuci tangan dengan sabun air mengalir minimal 20 detik setelah beraktivitas di luar rumah.
3. **Pemberian Imunisasi Rutin**: Pastikan jadwal imunisasi flu tahunan dan imunisasi dasar anak tidak terlewat.
4. **Waktu Tidur yang Cukup**: Anak usia balita membutuhkan tidur 10–12 jam per hari untuk regenerasi sel tubuh dan penguatan imun.
5. **Hidrasi Cairan Cukup**: Berikan air putih hangat secukupnya untuk menjaga kelembapan tenggorokan dan mukosa hidung.

Jika anak mengalami demam tinggi lebih dari 2 hari atau tampak lemas berlebihan, segera jadwalkan pemeriksaan di Poli Anak Klinik Medika Harmony.`,
    authorName: "dr. Amanda Putri, Sp.A",
    authorRole: "Dokter Spesialis Anak",
    authorAvatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600",
    date: "02 September 2026",
    readTime: "4 min baca",
    imageUrl: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=800",
    tags: ["Kesehatan Anak", "Imunisasi", "Tips Musim Hujan", "Parenting"],
    views: 342
  },
  {
    id: "art-2",
    title: "Pentingnya Pemeriksaan USG 4D untuk Memantau Perkembangan Janin",
    category: "Ibu & Anak",
    excerpt: "Mengapa calon ibu disarankan melakukan USG 4D pada usia kehamilan 24–28 minggu? Berikut penjelasannya.",
    content: `USG 4D bukan sekadar sarana melihat wajah menggemaskan sang buah hati di dalam kandungan, melainkan alat medis diagnostik yang krusial.

**dr. Rizky Pratama, Sp.OG** menjelaskan bahwa USG 4D memungkinkan dokter memeriksa:
- Struktur organ dalam bayi secara visual real-time 3 dimensi bergerak.
- Mendeteksi adanya kelainan fisik seperti sumbing bibir atau cacat pembuluh darah lebih dini.
- Memeriksa volume air ketuban dan posisi plasenta secara lebih presisi.

Usia kehamilan ideal untuk USG 4D adalah antara **minggu ke-24 hingga ke-28**, di mana jumlah air ketuban masih cukup banyak dan fitur wajah janin sudah terbentuk sempurna.`,
    authorName: "dr. Rizky Pratama, Sp.OG",
    authorRole: "Spesialis Kebidanan & Kandungan",
    authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    date: "28 Agustus 2026",
    readTime: "5 min baca",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    tags: ["Kehamilan", "USG 4D", "Kesehatan Ibu", "Promil"],
    views: 521
  },
  {
    id: "art-3",
    title: "Mengenal Karang Gigi: Bahaya Mencegah Sebelum Terjadi Periodontitis",
    category: "Gigi & Mulut",
    excerpt: "Mengapa sikat gigi saja tidak cukup menghilangkan karang gigi? Ketahui pentingnya scaling berkala setiap 6 bulan.",
    content: `Plak gigi yang menumpuk dari sisa makanan dan mineral ludah akan mengeras menjadi **karang gigi (tartar)** dalam waktu kurang dari 48 jam jika tidak dibersihkan dengan benar.

Menurut **drg. Maya Salsabila, Sp.KG**, karang gigi tidak bisa hilang hanya dengan menyikat gigi biasa. Karang gigi yang dibiarkan menumpuk dapat menyebabkan:
1. Gusi berdarah dan bengkak (Gingivitis).
2. Bau mulut tidak sedap (Halitosis).
3. Kerusakan tulang penyangga gigi (Periodontitis) yang berisiko membuat gigi goyang dan tanggal.

Disarankan melalukan **Scaling Gigi** di Klinik Medika Harmony setiap 6 bulan sekali demi menjaga kesehatan gusi dan kebersihan gigi optimal.`,
    authorName: "drg. Maya Salsabila, Sp.KG",
    authorRole: "Dokter Gigi Spesialis Konservasi Gigi",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    date: "20 Agustus 2026",
    readTime: "3 min baca",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    tags: ["Scaling Gigi", "Gigi Sehat", "Bau Mulut", "Kesehatan Gusi"],
    views: 289
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "tst-1",
    patientName: "Bunda Rina Marlina",
    patientCity: "BSD City",
    patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Pelayanan di Klinik Medika Harmony sangat profesional. dr. Amanda ramah banget sama si kecil, ruang tunggunya bersih dan ada playground kecil jadi anak tidak rewel saat antre imunisasi.",
    doctorName: "dr. Amanda Putri, Sp.A",
    serviceName: "Poli Spesialis Anak",
    date: "1 September 2026",
    verified: true
  },
  {
    id: "tst-2",
    patientName: "Bapak Hendro Setyawan",
    patientCity: "Gading Serpong",
    patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Fitur booking online-nya sangat membantu! Datang sesuai jam yang ditentukan, langsung masuk tanpa perlu nunggu berjam-jam. dr. Hendra penjelasannya detail sekali soal tensi dan kolesterol.",
    doctorName: "dr. Hendra Wijaya, Sp.PD",
    serviceName: "Poli Penyakit Dalam",
    date: "29 Agustus 2026",
    verified: true
  },
  {
    id: "tst-3",
    patientName: "Ibu Anita & Suami",
    patientCity: "Alam Sutera",
    patientAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Pengalaman USG 4D bersama dr. Rizky sangat berkesan. Foto janinnya jernih banget, penjelasannya tenang dan menenangkan hati calon orang tua baru. Sangat direkomendasikan!",
    doctorName: "dr. Rizky Pratama, Sp.OG",
    serviceName: "Poli Kebidanan & USG 4D",
    date: "25 Agustus 2026",
    verified: true
  },
  {
    id: "tst-4",
    patientName: "Dion Prasetyo",
    patientCity: "Tangerang",
    patientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Scaling gigi sama drg. Maya hasilnya bersih maksimal, tidak ngilu sama sekali. Klinik sangat harum, bersih, dan staf resepsionisnya sigap melayani.",
    doctorName: "drg. Maya Salsabila, Sp.KG",
    serviceName: "Poli Gigi & Mulut",
    date: "18 Agustus 2026",
    verified: true
  }
];

export const INITIAL_BOOKINGS: ConsultationBooking[] = [
  {
    id: "bk-1001",
    bookingCode: "MH-20260904-01",
    patientName: "Dewi Anggraini",
    patientPhone: "081298765432",
    patientEmail: "dewi.anggraini@gmail.com",
    patientAge: 29,
    patientGender: "Wanita",
    isNewPatient: false,
    doctorId: "doc-2",
    doctorName: "dr. Rizky Pratama, Sp.OG",
    doctorSpecialty: "Spesialis Kandungan",
    serviceName: "Poli Kebidanan & USG 4D",
    date: "2026-09-07",
    day: "Senin",
    timeSlot: "13:00 - 17:00 WIB",
    complaint: "Kontrol kehamilan rutin bulan ke-6 dan USG 4D",
    status: "Dikonfirmasi",
    createdAt: "2026-09-04 14:30"
  },
  {
    id: "bk-1002",
    bookingCode: "MH-20260904-02",
    patientName: "Agus Pratama (Anak: Kenzo)",
    patientPhone: "085612348765",
    patientEmail: "agus.p@yahoo.com",
    patientAge: 4,
    patientGender: "Pria",
    isNewPatient: true,
    doctorId: "doc-1",
    doctorName: "dr. Amanda Putri, Sp.A",
    doctorSpecialty: "Spesialis Anak",
    serviceName: "Poli Spesialis Anak & Imunisasi",
    date: "2026-09-07",
    day: "Senin",
    timeSlot: "09:00 - 12:00 WIB",
    complaint: "Vaksin DPT lanjutan dan konsultasi batuk ringan 2 hari",
    status: "Menunggu Konfirmasi",
    createdAt: "2026-09-04 16:15"
  }
];
