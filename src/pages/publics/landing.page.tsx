import { useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Star, Phone, Mail, Instagram, Facebook, Twitter, Menu, X, ChevronRight, Play, Heart, Share2, Award, Clock, Ship, Waves, Sun, Moon, ArrowUp, Globe, Bookmark, ChevronsRight } from "lucide-react";
import { Link } from "react-scroll";
import iconJalur from "@/assets/sampan.png";

import pacuJalur1 from "@/assets/pacu-jalur-1.webp";
import pacuJalur2 from "@/assets/pacu-jalur-2.png";
import pacuJalur3 from "@/assets/pacu-jalur-3.jpeg";
import pacuJalur4 from "@/assets/pacu-jalur-4.jpeg";
import pacuJalur5 from "@/assets/pacu-jalur-5.jpeg";
import pacuJalur6 from "@/assets/pacu-jalur-6.jpeg";
import pacuJalur7 from "@/assets/pacu-jalur-7.jpeg";
import pacuJalur8 from "@/assets/pacu-jalur-8.jpeg";
import pacuJalur9 from "@/assets/pacu-jalur-9.jpeg";
import pacuJalur10 from "@/assets/pacu-jalur-10.jpeg";
import pacuJalur11 from "@/assets/pacu-jalur-11.jpeg";
import pacuJalur12 from "@/assets/pacu-jalur-12.jpg";
import pacuJalur13 from "@/assets/pacu-jalur-13.jpg";

import penginapan1 from "@/assets/penginapan-1.webp";
import penginapan2 from "@/assets/penginapan-2.webp";
import penginapan3 from "@/assets/penginapan-3.webp";
import FocusCards from "@/components/aceternity/focus-card";

type EventType = {
  id: number;
  title: string;
  locate: string;
  date: string;
  duration: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
};

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
    features: ["Live Commentary", "Traditional Music", "Local Cuisine", "Photo Session"],
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
    features: ["Mountain View", "Cultural Workshop", "Traditional Dance", "Hiking Tour"],
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
    features: ["River Festival", "Local Market", "Art Exhibition", "Night Performance"],
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
    features: ["VIP Experience", "Private Guide", "Exclusive Access", "Professional Photography"],
  },
];

const galleryImages = [pacuJalur1, pacuJalur11, pacuJalur12, pacuJalur3, pacuJalur4, pacuJalur5, pacuJalur6, pacuJalur7];

const culturalFacts = [
  {
    icon: <Ship className="w-8 h-8" />,
    title: "50+ Perahu Tradisional",
    description: "Setiap perahu dibuat dengan teknik tradisional turun temurun",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "1000+ Pendayung",
    description: "Para pendayung terbaik dari seluruh desa di Kuantan Singingi",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Tradisi 300+ Tahun",
    description: "Warisan budaya yang telah dilestarikan berabad-abad",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Event Berstandar Nasional",
    description: "Diakui sebagai warisan budaya tak benda Indonesia",
  },
];

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

const BookingModal = memo(({ show, event, onClose, isDarkMode }: { show: boolean; event: EventType | null; onClose: () => void; isDarkMode: boolean }) => (
  <AnimatePresence>
    {show && event && (
      <motion.div key={event.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className={`
            ${isDarkMode ? "bg-emerald-900 text-stone-100" : "bg-white"} 
            rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto
          `}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{event.title}</h2>
            <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-emerald-800" : "hover:bg-gray-100"}`}>
              <X className={`w-6 h-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
            </button>
          </div>

          <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-2xl mb-6" />

          <div>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Detail Event</h3>
            <div className={`space-y-3 ${isDarkMode ? "text-stone-300" : "text-gray-700"}`}>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>{event.locate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-amber-500" />
                <span>{event.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-2xl text-amber-500">{event.price}</span>
              </div>
            </div>

            <h4 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>VIP Benefit:</h4>
            <div className="flex flex-wrap gap-2">
              {event.features.map((feature, index) => (
                <span key={index} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-800"}`}>
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                alert("Booking berhasil! Tim kami akan segera menghubungi Anda.");
                onClose();
              }}
            >
              Book Sekarang - {event.price}
            </button>
            <button className={`px-6 py-4 rounded-xl transition-colors ${isDarkMode ? "bg-emerald-800 hover:bg-emerald-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={onClose}>
              <Bookmark className={`w-5 h-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));

const PacuJalurTourism = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Filter functions
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase() || event.locate.toLowerCase();
    return matchesSearch;
  });

  // Scroll functions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Booking modal handlers
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

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"} transition-colors duration-300`}>
      <BookingModal show={showBookingModal} event={selectedEvent} onClose={handleCloseModal} isDarkMode={isDarkMode} />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out
  ${
    isScrolled ? `${isDarkMode ? "bg-emerald-950/85" : "bg-white/85"} backdrop-blur-xl border-b ${isDarkMode ? "border-emerald-700/50" : "border-gray-200/50"} shadow-2xl shadow-emerald-500/10` : "bg-transparent border-b border-transparent"
  }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section with Enhanced Animation */}
            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="relative">
                <img src={iconJalur} alt="Logo" className="w-12 h-12 drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  Pacu Jalur
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Desktop Menu with Staggered Animation */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { to: "home", label: "Beranda", delay: 0.1 },
                { to: "events", label: "Jadwal", delay: 0.15 },
                { to: "gallery", label: "Galeri", delay: 0.2 },
                { to: "lodging", label: "Penginapan", delay: 0.25 },
                { to: "jalur", label: "Jalur", delay: 0.3 },
              ].map((item) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: item.delay }}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={item.to === "home" ? -100 : -80}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group
              ${isDarkMode ? "text-stone-300 hover:text-amber-400" : isScrolled ? "text-gray-700 hover:text-amber-600" : "text-white hover:text-amber-300"}`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Hover Background Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${isDarkMode ? "bg-emerald-800/30" : "bg-gray-100/80"} opacity-0 group-hover:opacity-100`}
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Hover Underline Effect */}
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500" initial={{ width: "0%" }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle with Animation */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative p-3 rounded-full ml-6 ${isDarkMode ? "bg-emerald-800/50" : "bg-gray-100/80"} backdrop-blur-sm transition-all duration-300 group overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  key={isDarkMode ? "sun" : "moon"}
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  className={isDarkMode ? "text-amber-400" : "text-gray-600"}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0.5, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.button>

              {/* CTA Button with Pulse Animation */}
              <motion.button
                className="relative ml-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold overflow-hidden group shadow-lg"
                whileHover={{ scale: 1.05, shadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="relative z-10">Beli Tiket</span>

                {/* Animated Background */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.5 }} />

                {/* Shimmer Effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full" transition={{ duration: 0.6 }} />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle with Animation */}
            <motion.button className="md:hidden p-2 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMenuOpen ? (
                  <X className={`w-6 h-6 transition-colors ${isDarkMode ? "text-white" : isScrolled ? "text-black" : "text-white"}`} />
                ) : (
                  <Menu className={`w-6 h-6 transition-colors ${isDarkMode ? "text-white" : isScrolled ? "text-black" : "text-white"}`} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Enhanced Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`md:hidden ${isDarkMode ? "bg-emerald-950/95" : "bg-white/95"} backdrop-blur-xl border-t ${isDarkMode ? "border-emerald-700/50" : "border-gray-200/50"} shadow-2xl`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div className="px-6 py-6 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                {[
                  { to: "home", label: "Beranda", delay: 0.1 },
                  { to: "events", label: "Jadwal", delay: 0.15 },
                  { to: "gallery", label: "Galeri", delay: 0.2 },
                  { to: "lodging", label: "Penginapan", delay: 0.25 },
                  { to: "jalur", label: "Jalur", delay: 0.3 },
                ].map((item) => (
                  <motion.div key={item.to} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: item.delay }}>
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      offset={item.to === "home" ? -100 : -80}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                        isDarkMode ? "text-stone-300 hover:text-amber-400 hover:bg-emerald-800/30" : "text-gray-700 hover:text-amber-600 hover:bg-gray-100/50"
                      }`}
                    >
                      <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}

                <motion.button
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-semibold relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <span className="relative z-10">Beli Tiket</span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 opacity-0 group-hover:opacity-100" initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ duration: 0.3 }} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDarkMode ? "bg-emerald-900" : "bg-stone-100"}`}>
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]}
              alt="Pacu Jalur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80`} />
        </motion.div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-8">
            <motion.div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/30" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
              <Waves className="w-5 h-5" />
              Festival Budaya Kuantan Singingi
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-200 bg-clip-text text-transparent">Pacu Jalur</span>
            </h1>

            <motion.p className="text-xl md:text-2xl mb-8 font-light max-w-4xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Saksikan Pacu Jalur, tradisi megah masyarakat Riau, ketika perahu panjang beradu cepat di sungai, menyuguhkan keindahan budaya, sportivitas, dan daya tarik wisata mendunia.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => window.open("https://www.youtube.com/@KoleksiPacuJalur", "_blank")}
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Lihat Video Highlight
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="events" smooth={true} duration={500}>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Jadwal Event 2025
              </button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <motion.div className="text-3xl font-bold" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring" }}>
                4
              </motion.div>
              <div className="text-sm opacity-80">Event Rayon</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <motion.div className="text-3xl font-bold" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring" }}>
                120
              </motion.div>
              <div className="text-sm opacity-80">Kursi Tersedia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <motion.div className="text-3xl font-bold" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: "spring" }}>
                50+
              </motion.div>
              <div className="text-sm opacity-80">Tim Peserta</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <motion.div className="text-3xl font-bold" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, type: "spring" }}>
                Jun-Jul
              </motion.div>
              <div className="text-sm opacity-80">2025</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cultural Facts Section */}
      <section className={`py-20  ${isDarkMode ? "bg-emerald-900" : "bg-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Fakta Budaya</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Kenali lebih dalam tentang tradisi Pacu Jalur yang mempesona</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturalFacts.map((fact, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-3xl ${isDarkMode ? "bg-emerald-800" : "bg-gradient-to-br from-white to-stone-100"} hover:shadow-xl transition-all duration-500`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div className="text-amber-500 mb-4 flex justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                  {fact.icon}
                </motion.div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{fact.title}</h3>
                <p className={`${isDarkMode ? "text-stone-300" : "text-gray-600"} leading-relaxed`}>{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Schedule */}
      <section id="events" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-gradient-to-br from-stone-100 to-emerald-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Jadwal Pacuan</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Bergabunglah dalam festival budaya yang menakjubkan di berbagai lokasi indah di Kuantan Singingi</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`group ${isDarkMode ? "bg-emerald-900" : "bg-gradient-to-br from-white to-gray-50"} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    isDarkMode ? "border border-emerald-800" : "border border-gray-100"
                  }`}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Floating Date Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center gap-1 text-xs bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-gray-800 font-medium">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                    </div>

                    {/* Heart Button */}
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg text-gray-700 hover:bg-white hover:text-red-500 transition-all duration-300">
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-sm font-bold">{event.price}</div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400 inline-block mb-1" />
                          <p className={`mb-1 ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>{event.locate}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className={`${isDarkMode ? "bg-emerald-800 text-emerald-300" : "bg-emerald-100 text-emerald-800"} px-2 py-1 rounded-full text-xs`}>
                          {feature}
                        </span>
                      ))}
                      {event.features.length > 3 && <span className="text-emerald-600 text-xs px-2 py-1">+{event.features.length - 3} lainnya</span>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBookEvent(event)}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Lihat Detail
                      </button>
                      <button className={`p-3 rounded-xl transition-colors ${isDarkMode ? "bg-emerald-800 hover:bg-emerald-700" : "bg-gray-100 hover:bg-gray-200"}`}>
                        <Share2 className={`w-5 h-5 ${isDarkMode ? "text-stone-300" : "text-gray-600"}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">Lihat Semua Event ({events.length})</button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Galeri Momen</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Koleksi foto dan video terbaik dari festival Pacu Jalur yang telah berlangsung</p>
          </motion.div>

          <div className="mb-16">
            <FocusCards
              cards={galleryImages.map((image, index) => ({
                src: image,
                title: `Pacu Jalur ${index + 1}`,
                description: "Festival Pacu Jalur Kuantan Singingi",
              }))}
            />
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">Lihat Semua Foto</button>
          </motion.div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section id="lodging" className={`py-20 ${isDarkMode ? "bg-emerald-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Stay Close to the Spirit of Pacu Jalur</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
              Temukan kenyamanan menginap di sekitar arena Pacu Jalur. Pilih dari hotel modern, homestay ramah, hingga penginapan tradisional khas Kuantan Singingi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {accommodations.map((hotel, index) => (
              <motion.div
                key={index}
                className={`group rounded-3xl shadow-xl overflow-hidden ${isDarkMode ? "bg-emerald-800" : "bg-white"} hover:shadow-2xl transition-all duration-500`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">{hotel.type}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{hotel.name}</h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>{hotel.description}</p>
                  <div className="text-lg font-bold text-emerald-600 mb-4">{hotel.price}</div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.facilities.slice(0, 3).map((facility, idx) => (
                      <span key={idx} className={`${isDarkMode ? "bg-emerald-700 text-emerald-200" : "bg-emerald-100 text-emerald-800"} px-2 py-1 rounded-full text-xs`}>
                        {facility}
                      </span>
                    ))}
                    {hotel.facilities.length > 3 && <span className="text-emerald-600 text-xs px-2 py-1">+{hotel.facilities.length - 3}</span>}
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">Detail</button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Lihat Pilihan Penginapan Lainnya
              <ChevronsRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Experience Section */}
      <section id="jalur" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={pacuJalur1} alt="Pacu Jalur Race" className="w-full h-48 object-cover rounded-2xl" />
                  <img src={pacuJalur9} alt="Traditional Boat" className="w-full h-32 object-cover rounded-2xl" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src={pacuJalur3} alt="River Festival" className="w-full h-32 object-cover rounded-2xl" />
                  <img src={pacuJalur13} alt="Cultural Performance" className="w-full h-48 object-cover rounded-2xl" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pl-8">
              <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Puluhan Jalur
                <br />
                Ribuan Pendayung
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Satu Sungai Kuantan</span>
              </h2>

              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                Kenal jalur-jalur legendaris yang menjadi kebanggaan desa-desa di Kuantan Singingi. Setiap jalur memiliki nama unik, cerita, serta semangat masyarakat yang mendayungnya.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
                  <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Jalur Tradisional</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">1000+</div>
                  <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Pendayung Aktif</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">15km</div>
                  <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Panjang Sungai</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">300+</div>
                  <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Tahun Tradisi</div>
                </div>
              </div>

              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">Meet The Jalur</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? "bg-emerald-950 border-emerald-800" : "bg-gray-900"} border-t text-white`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">Pacu Jalur</div>
              <p className="text-gray-400 mb-6 leading-relaxed">Festival budaya tradisional Kuantan Singingi yang menampilkan keindahan alam dan kearifan lokal masyarakat Riau.</p>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Menu Utama</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-amber-400 transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#events" className="hover:text-amber-400 transition-colors">
                    Jadwal Event
                  </a>
                </li>
                <li>
                  <a href="#lodging" className="hover:text-amber-400 transition-colors">
                    Penginapan
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-amber-400 transition-colors">
                    Galeri
                  </a>
                </li>
                <li>
                  <a href="#jalur" className="hover:text-amber-400 transition-colors">
                    Jalur
                  </a>
                </li>
              </ul>
            </div>

            {/* Events */}
            <div>
              <h4 className="text-lg font-bold mb-6">Event 2025</h4>
              <ul className="space-y-3 text-gray-400">
                {events.map((event) => (
                  <li key={event.id}>
                    <a href="#events" className="hover:text-amber-400 transition-colors">
                      {event.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Kontak</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">Teluk Kuantan, Kuantan Singingi, Riau</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">+62 813-7654-3210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">info@pacujalur-kuansing.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">08:00 - 17:00 WIB</span>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold mb-3">Newsletter</h5>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email Anda" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-amber-500 focus:outline-none" />
                  <button className="bg-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">© 2025 Pacu Jalur Kuantan Singingi. All rights reserved.</div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">Made with ❤️ for preserving Riau's cultural heritage</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PacuJalurTourism;
