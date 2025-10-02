import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2, MapPin } from "lucide-react";

// Define a type for the gallery item
interface GalleryItem {
  id: number;
  image_url: string;
  judul: string;
  caption: string;
  kategori: "jalur" | "acara";
  jalur_id?: string;
  jalur_nama?: string;
  desa?: string;
  kecamatan?: string;
  acara_nama?: string;
}

// Sample data - replace with actual API call
const galleryData: GalleryItem[] = [
  {
    id: 1,
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    judul: "Pacu Jalur Sungai Kampar",
    caption: "Momen seru balapan jalur tradisional",
    jalur_id: "jalur-1",
    jalur_nama: "Jalur Merah",
    desa: "Teluk Kuantan",
    kecamatan: "Kuantan Tengah",
    kategori: "jalur",
  },
  {
    id: 2,
    image_url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca",
    judul: "Festival Pembukaan",
    caption: "Upacara adat pembukaan festival",
    jalur_id: "jalur-2",
    jalur_nama: "Jalur Biru",
    desa: "Baserah",
    kecamatan: "Sentajo Raya",
    kategori: "jalur",
  },
  {
    id: 3,
    image_url: "https://images.unsplash.com/photo-1504870712357-65ea720d6078",
    judul: "Peserta Meriah",
    caption: "Kemeriahan peserta di tribun",
    acara_nama: "Festival Pacu Jalur 2024",
    kategori: "acara",
  },
  {
    id: 4,
    image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    judul: "Persiapan Jalur",
    caption: "Tim mempersiapkan jalur untuk kompetisi",
    jalur_id: "jalur-3",
    jalur_nama: "Jalur Kuning",
    desa: "Lubuk Jambi",
    kecamatan: "Kuantan Mudik",
    kategori: "jalur",
  },
  {
    id: 5,
    image_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    judul: "Sunset di Sungai",
    caption: "Matahari terbenam di lokasi festival",
    jalur_id: "jalur-1",
    jalur_nama: "Jalur Merah",
    desa: "Teluk Kuantan",
    kecamatan: "Kuantan Tengah",
    kategori: "jalur",
  },
  {
    id: 6,
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    judul: "Acara Malam",
    caption: "Pertunjukan budaya malam hari",
    acara_nama: "Malam Kebudayaan",
    kategori: "acara",
  },
  {
    id: 7,
    image_url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca",
    judul: "Penonton Antusias",
    caption: "Antusiasme penonton dari berbagai daerah",
    acara_nama: "Festival Pacu Jalur 2024",
    kategori: "acara",
  },
  {
    id: 8,
    image_url: "https://images.unsplash.com/photo-1504870712357-65ea720d6078",
    judul: "Jalur Hijau",
    caption: "Jalur hijau siap bertanding",
    jalur_id: "jalur-4",
    jalur_nama: "Jalur Hijau",
    desa: "Sungai Jering",
    kecamatan: "Benai",
    kategori: "jalur",
  },
];

const GalleryPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "jalur" | "acara">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>(galleryData);

  useEffect(() => {
    let filtered: GalleryItem[] = galleryData;

    if (filter !== "all") {
      filtered = filtered.filter((item) => item.kategori === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) => item.judul.toLowerCase().includes(searchTerm.toLowerCase()) || item.caption.toLowerCase().includes(searchTerm.toLowerCase()) || (item.jalur_nama && item.jalur_nama.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredGallery(filtered);
  }, [filter, searchTerm]);

  const openLightbox = (image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex: number = (currentImageIndex + 1) % filteredGallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredGallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex: number = (currentImageIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredGallery[prevIndex]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    prevImage();
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    nextImage();
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const filters = [
    { value: "all" as const, label: "Semua", icon: "🎨" },
    { value: "jalur" as const, label: "Jalur", icon: "🚣" },
    { value: "acara" as const, label: "Acara", icon: "🎪" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900" : "bg-gradient-to-br from-stone-50 via-emerald-50 to-teal-50"}`}>
      {/* Header */}
      <motion.header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${isDarkMode ? "bg-emerald-950/80 border-emerald-800/30" : "bg-white/80 border-emerald-200/50"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400" : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"}`}>
                Galeri Pacu Jalur
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-stone-400" : "text-gray-600"}`}>{filteredGallery.length} foto tersedia</p>
            </motion.div>

            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? "bg-emerald-900 text-yellow-400 hover:bg-emerald-800" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari foto berdasarkan judul, caption, atau nama jalur..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                isDarkMode ? "bg-emerald-900/50 border-emerald-700 text-white placeholder-stone-400 focus:border-emerald-500" : "bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
              } focus:outline-none focus:ring-4 focus:ring-emerald-500/20`}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                🔍
              </motion.div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filterItem) => (
              <motion.button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === filterItem.value
                    ? isDarkMode
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                    : isDarkMode
                    ? "bg-emerald-900/50 text-stone-300 hover:bg-emerald-800/50"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border-2 border-emerald-200"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{filterItem.icon}</span>
                {filterItem.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group relative">
                <motion.div
                  className={`relative overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all duration-500 ${isDarkMode ? "bg-emerald-900" : "bg-white"}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => openLightbox(item, index)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image_url} alt={item.judul} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{item.judul}</h3>
                      <p className="text-stone-300 text-sm mb-2">{item.caption}</p>
                      {item.kategori === "jalur" && (
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          <MapPin size={12} />
                          <span>
                            {item.jalur_nama} • {item.desa}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <ZoomIn className="text-white" size={20} />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${item.kategori === "jalur" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}`}>
                    {item.kategori === "jalur" ? "🚣 Jalur" : "🎪 Acara"}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Tidak Ada Hasil</h3>
            <p className={isDarkMode ? "text-stone-400" : "text-gray-600"}>Coba ubah filter atau kata kunci pencarian</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeLightbox}>
            {/* Close Button */}
            <motion.button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all" onClick={closeLightbox} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <X size={24} />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all" onClick={handlePrevClick} whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={32} />
            </motion.button>

            <motion.button className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all" onClick={handleNextClick} whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={32} />
            </motion.button>

            {/* Image Container */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="max-w-6xl max-h-[90vh] mx-4" onClick={handleContainerClick}>
              <img src={selectedImage.image_url} alt={selectedImage.judul} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />

              {/* Image Info */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h2 className="text-white text-2xl font-bold mb-2">{selectedImage.judul}</h2>
                <p className="text-stone-300 mb-4">{selectedImage.caption}</p>

                {selectedImage.kategori === "jalur" && (
                  <div className="flex flex-wrap gap-4 text-sm text-stone-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{selectedImage.jalur_nama}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      📍{" "}
                      <span>
                        {selectedImage.desa}, {selectedImage.kecamatan}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <motion.button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Download size={18} />
                    <span>Download</span>
                  </motion.button>

                  <motion.button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Share2 size={18} />
                    <span>Bagikan</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Image Counter */}
              <div className="text-center text-white/60 mt-4 text-sm">
                {currentImageIndex + 1} / {filteredGallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
