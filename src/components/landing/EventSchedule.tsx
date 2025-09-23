import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Heart, Share2, Star, Clock, Zap, Award } from "lucide-react";
import { EventType } from "@/interfaces/event";

interface EventsScheduleProps {
  isDarkMode: boolean;
  events: EventType[];
  handleBookEvent: (event: EventType) => void;
}

const EventsSchedule = ({ isDarkMode, events, handleBookEvent }: EventsScheduleProps) => {
  const nextEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <section id="events" className={`py-20 ${isDarkMode ? "bg-emerald-950" : "bg-gradient-to-br from-stone-100 to-emerald-50"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode
                ? "text-white"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            }`}
          >
            Jadwal Pacuan
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
            Bergabunglah dalam festival budaya yang menakjubkan di berbagai lokasi indah di Kuantan Singingi
          </p>
        </motion.div>

        {/* Main Event Section with Left-Right Layout */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* Featured Next Event - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 4px 20px rgba(245, 158, 11, 0.3)", "0 8px 30px rgba(245, 158, 11, 0.5)", "0 4px 20px rgba(245, 158, 11, 0.3)"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-5 h-5" />
                Event Terdekat
                <Star className="w-5 h-5" />
              </motion.div>
            </div>

            <motion.div
              className={`relative group ${
                isDarkMode ? "bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" : "bg-gradient-to-br from-white via-emerald-50 to-teal-50"
              } rounded-3xl shadow-2xl overflow-hidden border-4 ${isDarkMode ? "border-amber-500/30" : "border-amber-400/30"}`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl opacity-75 animate-pulse" />
              <div className={`absolute inset-1 ${isDarkMode ? "bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" : "bg-gradient-to-br from-white via-emerald-50 to-teal-50"} rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={nextEvent.image}
                    alt={nextEvent.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 font-bold shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Clock className="w-4 h-4 text-amber-500" />
                    {nextEvent.date}
                  </motion.div>
                  
                  <motion.button 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:bg-white hover:text-red-500 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>

                  <div className="absolute bottom-4 right-4">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {nextEvent.price}
                    </motion.div>
                  </div>

                  {/* Live Badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    SEGERA HADIR
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-6 h-6 text-amber-500" />
                    <span className={`text-sm font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                      SEGERA
                    </span>
                  </div>

                  <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {nextEvent.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-lg mb-4">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <p className={`${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                      {nextEvent.locate}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-lg mb-6">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className={`${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                      {nextEvent.duration}
                    </span>
                  </div>

                  <p className={`text-base mb-6 leading-relaxed ${isDarkMode ? "text-stone-300" : "text-gray-600"}`}>
                    {nextEvent.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => handleBookEvent(nextEvent)}
                      className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-bold text-base shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Booking Sekarang!</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                    
                    <motion.button
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        isDarkMode ? "bg-emerald-800/50 hover:bg-emerald-700/50 border border-emerald-700" : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                      }`}
                      whileHover={{ scale: 1.05, rotate: 15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className={`w-5 h-5 ${isDarkMode ? "text-stone-300" : "text-gray-600"}`} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full blur-xl" />
            </motion.div>
          </motion.div>

          {/* Other Events - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Event Mendatang
              </h3>
              <motion.button
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Semua ({events.length})
              </motion.button>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {otherEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className={`group ${
                      isDarkMode ? "bg-emerald-900" : "bg-gradient-to-br from-white to-gray-50"
                    } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                      isDarkMode ? "border border-emerald-800" : "border border-gray-100"
                    } flex`}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <div className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">{event.price}</div>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"} line-clamp-1`}>
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className={`${isDarkMode ? "text-stone-300" : "text-gray-600"} line-clamp-1`}>{event.locate}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <p className={`${isDarkMode ? "text-stone-300" : "text-gray-600"} line-clamp-1`}>{event.date}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleBookEvent(event)}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-1.5 px-4 rounded-lg text-xs font-semibold hover:shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventsSchedule;