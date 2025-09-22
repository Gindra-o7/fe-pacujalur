import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Waves, Play, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-scroll";

interface HeroProps {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  currentImageIndex: number;
  galleryImages: string[];
}

const Hero: React.FC<HeroProps> = ({ y, opacity, currentImageIndex, galleryImages }) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
    </motion.div>

    <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/30"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Waves className="w-5 h-5" />
          Festival Budaya Kuantan Singingi
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-200 bg-clip-text text-transparent">
            Pacu Jalur
          </span>
        </h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 font-light max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Saksikan Pacu Jalur, tradisi megah masyarakat Riau, ketika perahu panjang beradu cepat di sungai, menyuguhkan keindahan budaya, sportivitas, dan daya tarik wisata mendunia.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
      >
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <motion.div
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            4
          </motion.div>
          <div className="text-sm opacity-80">Event Rayon</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <motion.div
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            120
          </motion.div>
          <div className="text-sm opacity-80">Kursi Tersedia</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <motion.div
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: "spring" }}
          >
            50+
          </motion.div>
          <div className="text-sm opacity-80">Tim Peserta</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <motion.div
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
          >
            Jun-Jul
          </motion.div>
          <div className="text-sm opacity-80">2025</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
