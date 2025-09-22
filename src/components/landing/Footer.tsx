import { Instagram, Facebook, Twitter, Globe, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = ({ isDarkMode, events }: { isDarkMode: boolean; events: Array<{ id: string; title: string }> }) => (
  <footer className={`${isDarkMode ? "bg-emerald-950 border-emerald-800" : "bg-gray-900"} border-t text-white`}>
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Pacu Jalur
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Festival budaya tradisional Kuantan Singingi yang menampilkan keindahan alam dan kearifan lokal masyarakat Riau.
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-800 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Menu Utama</h4>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#home" className="hover:text-amber-400 transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-amber-400 transition-colors">
                Jadwal Event
              </a>
            </li>
            <li>
              <a href="#lodging" className="hover:text-amber-400 transition-colors">
                Penginapan
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-amber-400 transition-colors">
                Galeri
              </a>
            </li>
            <li>
              <a href="#jalur" className="hover:text-amber-400 transition-colors">
                Jalur
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Event 2025</h4>
          <ul className="space-y-3 text-gray-400">
            {events.map((event) => (
              <li key={event.id}>
                <a href="#events" className="hover:text-amber-400 transition-colors">
                  {event.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Kontak</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-sm">Teluk Kuantan, Kuantan Singingi, Riau</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="text-sm">+62 813-7654-3210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="text-sm">info@pacujalur-kuansing.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm">08:00 - 17:00 WIB</span>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="font-semibold mb-3">Newsletter</h5>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
              />
              <button className="bg-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 Pacu Jalur Kuantan Singingi. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Made with ❤️ for preserving Riau's cultural heritage
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
