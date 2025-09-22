import { motion } from "framer-motion";
import { Star, ChevronsRight } from "lucide-react";

interface Accommodation {
  name: string;
  image: string;
  type: string;
  rating: number;
  description: string;
  price: string;
  facilities: string[];
}

const AccommodationsSection = ({ isDarkMode, accommodations }: { isDarkMode: boolean; accommodations: Accommodation[] }) => (
  <section id="lodging" className={`py-20 ${isDarkMode ? "bg-emerald-900" : "bg-white"}`}>
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
          Stay Close to the Spirit of Pacu Jalur
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
          Temukan kenyamanan menginap di sekitar arena Pacu Jalur. Pilih dari hotel modern, homestay ramah, hingga penginapan tradisional khas Kuantan Singingi.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {accommodations.map((hotel, index) => (
          <motion.div
            key={index}
            className={`group rounded-3xl shadow-xl overflow-hidden ${
              isDarkMode ? "bg-emerald-800" : "bg-white"
            } hover:shadow-2xl transition-all duration-500`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {hotel.type}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {hotel.rating}
              </div>
            </div>

            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {hotel.name}
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                {hotel.description}
              </p>
              <div className="text-lg font-bold text-emerald-600 mb-4">{hotel.price}</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.facilities.slice(0, 3).map((facility, idx) => (
                  <span
                    key={idx}
                    className={`${
                      isDarkMode
                        ? "bg-emerald-700 text-emerald-200"
                        : "bg-emerald-100 text-emerald-800"
                    } px-2 py-1 rounded-full text-xs`}
                  >
                    {facility}
                  </span>
                ))}
                {hotel.facilities.length > 3 && (
                  <span className="text-emerald-600 text-xs px-2 py-1">
                    +{hotel.facilities.length - 3}
                  </span>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Detail
              </button>
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
);

export default AccommodationsSection;
