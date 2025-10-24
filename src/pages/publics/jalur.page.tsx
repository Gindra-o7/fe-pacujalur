import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Sparkles, Moon, Sun, ChevronRight, ArrowLeft } from "lucide-react";
import pacuJalur5 from "@/assets/pacu-jalur-5.jpeg";
import pacuJalur6 from "@/assets/pacu-jalur-6.jpeg";
import pacuJalur7 from "@/assets/pacu-jalur-7.jpeg";
import pacuJalur8 from "@/assets/pacu-jalur-8.jpeg";
import pacuJalur9 from "@/assets/pacu-jalur-9.jpeg";

// Types
interface Jalur {
  id: number;
  namaJalur: string;
  namaDesa: string;
  kecamatan: string;
  thumbnail: string;
  description: string;
}

// Sample Data
const jalurData: Jalur[] = [
  {
    id: 1,
    namaJalur: "Sumber Makmur",
    namaDesa: "Pangkalan Indarung",
    kecamatan: "Kuantan Tengah",
    thumbnail: pacuJalur5,
    description: "Jalur tradisional dengan prestasi gemilang",
  },
  {
    id: 2,
    namaJalur: "Cahaya Bersama",
    namaDesa: "Baserah",
    kecamatan: "Kuantan Mudik",
    thumbnail: pacuJalur6,
    description: "Tim solid dengan anggota berpengalaman",
  },
  {
    id: 3,
    namaJalur: "Karya Muda",
    namaDesa: "Lubuk Jambi",
    kecamatan: "Kuantan Hilir",
    thumbnail: pacuJalur6,
    description: "Generasi muda yang inovatif",
  },
  {
    id: 4,
    namaJalur: "Harapan Jaya",
    namaDesa: "Sungai Jering",
    kecamatan: "Kuantan Tengah",
    thumbnail: pacuJalur7,
    description: "Mempertahankan tradisi leluhur",
  },
  {
    id: 5,
    namaJalur: "Bintang Timur",
    namaDesa: "Pangkalan Indarung",
    kecamatan: "Kuantan Tengah",
    thumbnail: pacuJalur8,
    description: "Jalur dengan semangat juang tinggi",
  },
  {
    id: 6,
    namaJalur: "Tuah Sakti",
    namaDesa: "Baserah",
    kecamatan: "Kuantan Mudik",
    thumbnail: pacuJalur9,
    description: "Warisan budaya yang lestari",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PageJalurDesa = () => {
  const [searchDesa, setSearchDesa] = useState("");
  const [searchJalur, setSearchJalur] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter jalur based on search inputs
  const filteredJalur = useMemo(() => {
    return jalurData.filter((jalur) => {
      const matchesDesa = jalur.namaDesa.toLowerCase().includes(searchDesa.toLowerCase());
      const matchesJalur = jalur.namaJalur.toLowerCase().includes(searchJalur.toLowerCase());
      return matchesDesa && matchesJalur;
    });
  }, [searchDesa, searchJalur]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" : "bg-gradient-to-br from-gray-50 via-white to-gray-50"}`}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500" : "bg-blue-300"}`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500" : "bg-purple-300"}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Dark Mode Toggle */}
        {/* Top Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center mb-6">
          {/* Back Button di ujung kiri */}
          <button
            onClick={() => window.history.back()}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700" : "bg-white hover:bg-gray-100 text-gray-700 shadow-md border border-gray-200"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Dark Mode Toggle di ujung kanan */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-yellow-400" : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.header variants={headerVariants} initial="hidden" animate="visible" className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className={`w-6 h-6 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
            <h1 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Jalur Desa</h1>
          </div>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Temukan informasi lengkap jalur pacu jalur di berbagai desa di Kuantan Singingi</p>
        </motion.header>

        {/* Search Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Search Desa */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Cari desa..."
                value={searchDesa}
                onChange={(e) => setSearchDesa(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all duration-300 text-base ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 shadow-sm hover:shadow-md"
                } focus:ring-4 focus:ring-blue-500/10 focus:outline-none`}
              />
            </div>

            {/* Search Nama Jalur */}
            <div className="relative">
              <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Cari nama jalur..."
                value={searchJalur}
                onChange={(e) => setSearchJalur(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all duration-300 text-base ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 shadow-sm hover:shadow-md"
                } focus:ring-4 focus:ring-blue-500/10 focus:outline-none`}
              />
            </div>
          </div>

          {/* Result Count */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-4">
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Menampilkan <span className="font-semibold">{filteredJalur.length}</span> dari <span className="font-semibold">{jalurData.length}</span> jalur
            </p>
          </motion.div>
        </motion.div>

        {/* Jalur Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredJalur.length > 0 ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJalur.map((jalur) => (
                <motion.div
                  key={jalur.id}
                  variants={itemVariants}
                  layout
                  exit="exit"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isDarkMode ? "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:shadow-2xl hover:shadow-blue-500/10" : "bg-white border border-gray-100 shadow-md hover:shadow-2xl"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img src={jalur.thumbnail} alt={jalur.namaJalur} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{jalur.namaJalur}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {jalur.namaDesa}, {jalur.kecamatan}
                      </p>
                    </div>

                    <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{jalur.description}</p>

                    {/* Detail Button */}
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-all duration-300 ${
                        isDarkMode ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30" : "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md"
                      }`}
                    >
                      Lihat Detail
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Tidak Ada Hasil</h3>
              <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Coba ubah kata kunci pencarian Anda</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageJalurDesa;
