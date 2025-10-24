import { motion } from "framer-motion";
import { Ship, Users, Calendar, Award, Megaphone, Navigation, PersonStanding } from "lucide-react";

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
  {
    icon: <Users className="w-8 h-8" />,
    title: "Pendayung (Anak Pacu)",
    description: "Tenaga utama yang menggerakkan perahu dengan dayung, memastikan kecepatan dan kekuatan jalur.",
  },
  {
    icon: <Navigation className="w-8 h-8" />,
    title: "Tukang Onjai",
    description: "Berada di bagian belakang jalur, bertugas sebagai penunjuk arah dan pemberi semangat kepada pendayung.",
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Timbo Ruang",
    description: "Berada di tengah perahu, bertugas sebagai pemberi komando untuk mengatur tempo dan ritme dayungan.",
  },
  {
    icon: <PersonStanding className="w-8 h-8" />,
    title: "Togak Luan (Tukang Tari)",
    description: "Berdiri di ujung depan perahu, menari saat timnya unggul sebagai simbol kegembiraan dan semangat.",
  },
];

const CulturalFactsSection = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className={`py-20 ${isDarkMode ? "bg-emerald-900" : "bg-stone-100"} `}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className={`text-2xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"}`}>Fakta Budaya</h2>
        <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>Kenali lebih dalam tentang tradisi Pacu Jalur yang mempesona</p>
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
);

export default CulturalFactsSection;
