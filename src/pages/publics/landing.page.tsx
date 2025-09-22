import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

import pacuJalur1 from "@/assets/pacu-jalur-1.webp";
import pacuJalur2 from "@/assets/pacu-jalur-2.png";
import pacuJalur3 from "@/assets/pacu-jalur-3.jpeg";
import pacuJalur4 from "@/assets/pacu-jalur-4.jpeg";
import pacuJalur5 from "@/assets/pacu-jalur-5.jpeg";
import pacuJalur6 from "@/assets/pacu-jalur-6.jpeg";
import pacuJalur7 from "@/assets/pacu-jalur-7.jpeg";
import pacuJalur8 from "@/assets/pacu-jalur-8.jpeg";
// import pacuJalur9 from "@/assets/pacu-jalur-9.jpeg";
import pacuJalur10 from "@/assets/pacu-jalur-10.jpeg";
import pacuJalur11 from "@/assets/pacu-jalur-11.jpeg";
import pacuJalur12 from "@/assets/pacu-jalur-12.jpg";
import pacuJalur13 from "@/assets/pacu-jalur-13.jpg";

import penginapan1 from "@/assets/penginapan-1.webp";
import penginapan2 from "@/assets/penginapan-2.webp";
import penginapan3 from "@/assets/penginapan-3.webp";

import { EventType } from "@/interfaces/event";
import BookingModal from "@/components/landing/BookingModal";
import Navigation from "@/components/landing/NavigationBar";
import HeroSection from "@/components/landing/Hero";
import CulturalFactsSection from "@/components/landing/Facts";
import EventsSchedule from "@/components/landing/EventSchedule";
import GallerySection from "@/components/landing/Gallery";
import AccommodationsSection from "@/components/landing/Accomodation";
import FeaturedExperienceSection from "@/components/landing/FeatureExperience";
import Footer from "@/components/landing/Footer";
import ScrollToTopButton from "@/components/landing/ScrollToTopButton";

const events: EventType[] = [
  {
    id: 1,
    title: "Pacu Jalur Rayon 1",
    locate: "Tepian Nyiur Melambai, Cerenti",
    date: "13 - 15 Juni 2025",
    duration: "30 Kursi Tersedia",
    price: "Rp 250.000",
    image: pacuJalur10,
    gallery: [pacuJalur1, pacuJalur2, pacuJalur3],
    description: "Saksikan pertarungan perahu tradisional di sungai yang indah dengan pemandangan alam yang menakjubkan.",
  },
  {
    id: 2,
    title: "Pacu Jalur Rayon 2",
    locate: "Tepian Gunung Pulau Gubah, Hulu Kuantan",
    date: "20 - 22 Juni 2025",
    duration: "30 Kursi Tersedia",
    price: "Rp 300.000",
    image: pacuJalur12,
    gallery: [pacuJalur4, pacuJalur1, pacuJalur2],
    description: "Nikmati festival budaya dengan latar belakang gunung yang spektakuler dan tradisi yang autentik.",
  },
  {
    id: 3,
    title: "Pacu Jalur Rayon 3",
    locate: "Tepian Rajo, Pangean",
    date: "4 - 6 Juli 2025",
    duration: "30 Kursi Tersedia",
    price: "Rp 275.000",
    image: pacuJalur13,
    gallery: [pacuJalur1, pacuJalur2, pacuJalur3],
    description: "Bergabunglah dalam perayaan budaya yang meriah di tepi sungai dengan suasana yang tak terlupakan.",
  },
  {
    id: 4,
    title: "Pacu Jalur Rayon 4",
    locate: "Tepian Datoak Bandaro Lelo Budi, Desa Kari",
    date: "18 - 20 Juli 2025",
    duration: "30 Kursi Tersedia",
    price: "Rp 325.000",
    image: pacuJalur8,
    gallery: [pacuJalur12, pacuJalur8, pacuJalur4],
    description: "Rasakan pengalaman budaya yang mendalam dengan pertunjukan tradisional yang memukau.",
  },
];

const galleryImages = [pacuJalur1, pacuJalur11, pacuJalur12, pacuJalur3, pacuJalur4, pacuJalur5, pacuJalur6, pacuJalur7];

const accommodations = [
  {
    name: "Pondok Homestay Kuantan",
    rating: 4.8,
    price: "Rp200.000-Rp400.000 / malam",
    image: penginapan1,
    description: "Homestay tradisional dengan pemandangan sungai yang indah dan fasilitas lengkap.",
    facilities: ["WiFi Gratis", "AC", "Kamar Mandi Dalam", "Sarapan", "Parkir"],
    type: "Homestay",
  },
  {
    name: "Wisma Elvano",
    rating: 4.6,
    price: "Rp150.000-Rp300.000 / malam",
    image: penginapan2,
    description: "Penginapan nyaman dengan akses mudah ke lokasi event dan fasilitas modern.",
    facilities: ["WiFi", "TV", "Kulkas", "Laundry", "24 Jam"],
    type: "Guest House",
  },
  {
    name: "Wisma Jalur",
    rating: 4.7,
    price: "Rp250.000-Rp500.000 / malam",
    image: penginapan3,
    description: "Wisma mewah dengan pemandangan alam yang spektakuler dan layanan premium.",
    facilities: ["Swimming Pool", "Restaurant", "Spa", "Gym", "Concierge"],
    type: "Resort",
  },
];


const PacuJalurTourism = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleBookEvent = (event: EventType) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-emerald-900" : "bg-stone-100"} transition-colors duration-300`}>
      <BookingModal show={showBookingModal} event={selectedEvent} onClose={handleCloseModal} isDarkMode={isDarkMode} />
      <ScrollToTopButton />
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <HeroSection y={y} opacity={opacity} currentImageIndex={currentImageIndex} galleryImages={galleryImages} />
      <CulturalFactsSection isDarkMode={isDarkMode} />
      <EventsSchedule isDarkMode={isDarkMode} events={events} handleBookEvent={handleBookEvent} />
      <GallerySection isDarkMode={isDarkMode} galleryImages={galleryImages} />
      <AccommodationsSection isDarkMode={isDarkMode} accommodations={accommodations} />
      <FeaturedExperienceSection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} events={events.map(event => ({ ...event, id: event.id.toString() }))} />
    </div>
  );
};

export default PacuJalurTourism;
