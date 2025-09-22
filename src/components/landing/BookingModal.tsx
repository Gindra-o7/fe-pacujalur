import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, Star, Bookmark } from "lucide-react";
import { EventType } from "@/interfaces/event";

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
  
  export default BookingModal;