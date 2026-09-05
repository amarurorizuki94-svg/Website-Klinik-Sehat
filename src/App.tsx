import React, { useState, useEffect } from 'react';
import { 
  Doctor, 
  DoctorSchedule, 
  MedicalService, 
  HealthArticle, 
  Testimonial, 
  ConsultationBooking, 
  ClinicConfig, 
  SpecialtyCategory, 
  DayOfWeek 
} from './types/clinic';
import { storage } from './utils/storage';

import { SEOHead } from './components/SEOHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DoctorProfileSection } from './components/DoctorProfileSection';
import { ScheduleSection } from './components/ScheduleSection';
import { ArticlesSection } from './components/ArticlesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [config, setConfig] = useState<ClinicConfig>(() => storage.getConfig());
  const [doctors, setDoctors] = useState<Doctor[]>(() => storage.getDoctors());
  const [schedules, setSchedules] = useState<DoctorSchedule[]>(() => storage.getSchedules());
  const [services, setServices] = useState<MedicalService[]>(() => storage.getServices());
  const [articles, setArticles] = useState<HealthArticle[]>(() => storage.getArticles());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => storage.getTestimonials());
  const [bookings, setBookings] = useState<ConsultationBooking[]>(() => storage.getBookings());

  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyCategory>('Semua');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>();
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string | undefined>();
  const [bookingDay, setBookingDay] = useState<DayOfWeek | undefined>();

  // Admin Panel State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Refresh data from storage
  const handleRefreshData = () => {
    setConfig(storage.getConfig());
    setDoctors(storage.getDoctors());
    setSchedules(storage.getSchedules());
    setServices(storage.getServices());
    setArticles(storage.getArticles());
    setTestimonials(storage.getTestimonials());
    setBookings(storage.getBookings());
  };

  const handleOpenBooking = (doctorId?: string, timeSlot?: string, day?: DayOfWeek) => {
    setBookingDoctorId(doctorId);
    setBookingTimeSlot(timeSlot);
    setBookingDay(day);
    setIsBookingOpen(true);
  };

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['beranda', 'layanan', 'dokter', 'jadwal', 'artikel', 'testimoni', 'lokasi'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
      {/* SEO Structured Data */}
      <SEOHead config={config} />

      {/* Header Navbar */}
      <Header
        config={config}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          doctors={doctors}
          onOpenBooking={handleOpenBooking}
          onSelectSpecialty={(spec) => {
            setSelectedSpecialty(spec);
          }}
        />

        <ServicesSection
          services={services}
          onOpenBooking={handleOpenBooking}
        />

        <DoctorProfileSection
          doctors={doctors}
          selectedSpecialty={selectedSpecialty}
          onSelectSpecialty={setSelectedSpecialty}
          onOpenBooking={(docId) => handleOpenBooking(docId)}
        />

        <ScheduleSection
          schedules={schedules}
          onOpenBooking={(docId, timeSlot, day) => handleOpenBooking(docId, timeSlot, day)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        <ArticlesSection articles={articles} />

        <TestimonialsSection
          testimonials={testimonials}
          onAddTestimonial={handleRefreshData}
        />

        <GoogleMapsSection config={config} />
      </main>

      {/* Floating WhatsApp Chat */}
      <WhatsAppButton config={config} />

      {/* Footer */}
      <Footer
        config={config}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Booking Consultation Modal */}
      {isBookingOpen && (
        <BookingModal
          doctors={doctors}
          schedules={schedules}
          services={services}
          initialDoctorId={bookingDoctorId}
          initialTimeSlot={bookingTimeSlot}
          initialDay={bookingDay}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={handleRefreshData}
        />
      )}

      {/* Admin Schedule & Clinic Management Panel */}
      {isAdminOpen && (
        <AdminPanel
          doctors={doctors}
          schedules={schedules}
          bookings={bookings}
          config={config}
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={handleRefreshData}
        />
      )}
    </div>
  );
}
