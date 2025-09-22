import { motion } from "framer-motion";
import pacuJalur1 from "@/assets/pacu-jalur-1.webp";
import pacuJalur9 from "@/assets/pacu-jalur-9.jpeg";
import pacuJalur3 from "@/assets/pacu-jalur-3.jpeg";
import pacuJalur13 from "@/assets/pacu-jalur-13.jpg";

const FeaturedExperienceSection = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section id="jalur" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-stone-50"}`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={pacuJalur1}
                alt="Pacu Jalur Race"
                className="w-full h-48 object-cover rounded-2xl"
              />
              <img
                src={pacuJalur9}
                alt="Traditional Boat"
                className="w-full h-32 object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src={pacuJalur3}
                alt="River Festival"
                className="w-full h-32 object-cover rounded-2xl"
              />
              <img
                src={pacuJalur13}
                alt="Cultural Performance"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pl-8"
        >
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Puluhan Jalur
            <br />
            Ribuan Pendayung
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Satu Sungai Kuantan
            </span>
          </h2>

          <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
            Kenal jalur-jalur legendaris yang menjadi kebanggaan desa-desa di Kuantan Singingi. Setiap jalur memiliki nama unik, cerita, serta semangat masyarakat yang mendayungnya.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
              <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                Jalur Tradisional
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                Pendayung Aktif
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">15km</div>
              <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                Panjang Sungai
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">300+</div>
              <div className={`text-sm ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                Tahun Tradisi
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Meet The Jalur
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FeaturedExperienceSection;
