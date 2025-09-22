import { motion } from "framer-motion";
import FocusCards from "@/components/aceternity/focus-card";

interface GallerySectionProps {
  isDarkMode: boolean;
  galleryImages: string[];
}

const GallerySection = ({ isDarkMode, galleryImages }: GallerySectionProps) => (
  <section id="gallery" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"}`}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode
              ? "text-white"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          }`}
        >
          Galeri Momen
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
          Koleksi foto dan video terbaik dari festival Pacu Jalur yang telah berlangsung
        </p>
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

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Lihat Semua Foto
        </button>
      </motion.div>
    </div>
  </section>
);

export default GallerySection;
