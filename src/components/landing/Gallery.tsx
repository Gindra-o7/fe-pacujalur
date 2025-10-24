import { motion } from "framer-motion";
import FocusCards from "@/components/aceternity/focus-card";
import { useNavigate } from "react-router-dom";

interface GallerySectionProps {
  isDarkMode: boolean;
  galleryImages: string[];
}

const GallerySection = ({ isDarkMode, galleryImages }: GallerySectionProps) => {
  const navigate = useNavigate();

  const handleGalleryPage = () => {
    navigate("/gallery");
  };

  // Daftar nama-nama jalur asli untuk galeri
  const jalurNames = [
    "Siposan Rimbo RAPP",
    "Toduang Biso Rimbo Piako",
    "Rajo Bujang",
    "Bintang Emas Cahaya Intan",
    "Ular Sawa",
    "Panglimo Olang Putie",
    "Meriam Onggang Parau",
    "Putri Kayangan Danau Buayo",
    "Tuah Koghi Dubalang Rajo",
    // Tambahkan nama lain jika diperlukan
  ];

  return (
    <section id="gallery" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Galeri Momen</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Koleksi foto dan video terbaik dari festival Pacu Jalur yang telah berlangsung</p>
        </motion.div>

        <div className="mb-16 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-10 left-10 w-32 h-32 rounded-full opacity-10 ${isDarkMode ? "bg-emerald-400" : "bg-emerald-600"}`} />
            <div className={`absolute bottom-20 right-16 w-24 h-24 rounded-full opacity-10 ${isDarkMode ? "bg-teal-400" : "bg-teal-600"}`} />
            <div className={`absolute top-1/2 right-1/4 w-16 h-16 rounded-full opacity-10 ${isDarkMode ? "bg-emerald-300" : "bg-emerald-500"}`} />
          </div>

          <motion.div className="relative z-10" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="gallery-wrapper relative">
              <div className={`absolute -top-4 -left-4 w-full h-full border-2 border-dashed rounded-2xl opacity-30 ${isDarkMode ? "border-emerald-400" : "border-emerald-600"}`} />

              <div className="relative p-6 rounded-2xl backdrop-blur-sm bg-opacity-50 border border-opacity-20 shadow-xl">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5 ${isDarkMode ? "from-emerald-400 via-teal-400 to-emerald-600" : "from-emerald-100 via-teal-100 to-emerald-200"}`} />

                <div className="relative z-10">
                  <FocusCards
                    cards={galleryImages.map((image, index) => ({
                      src: image,
                      // Menggunakan nama jalur dari array, atau fallback jika tidak ada
                      title: jalurNames[index] || `Momen Pacu Jalur ${index + 1}`,
                      description: "Festival Pacu Jalur Kuantan Singingi",
                    }))}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`absolute -top-8 -right-8 w-20 h-20 rounded-xl shadow-lg hidden md:block ${isDarkMode ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-emerald-200 to-teal-300"}`}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className={`absolute -bottom-6 -left-6 w-16 h-16 rounded-full shadow-lg hidden lg:block ${isDarkMode ? "bg-gradient-to-br from-teal-600 to-emerald-700" : "bg-gradient-to-br from-teal-200 to-emerald-300"}`}
            animate={{
              y: [0, 8, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <motion.div className="text-center mt-12 relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full opacity-20 blur-xl" />
          </div>

          <motion.button
            className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            whileHover={{
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGalleryPage()}
          >
            <span className="relative z-10">Lihat Semua Foto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .gallery-wrapper {
          position: relative;
          overflow: visible;
        }
        
        .gallery-wrapper::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, 
            ${isDarkMode ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)"}, 
            ${isDarkMode ? "rgba(20, 184, 166, 0.1)" : "rgba(20, 184, 166, 0.05)"}
          );
          border-radius: 20px;
          z-index: -1;
          filter: blur(20px);
        }
      `}</style>
    </section>
  );
};
export default GallerySection;
