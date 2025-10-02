import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Heart, Share2, Clock, Filter, Search, ArrowLeft, Zap, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface EventType {
  id: string;
  title: string;
  locate: string;
  image: string;
  description: string;
  date: string;
  price: string;
  duration: string;
  startDate: Date;
  endDate: Date;
}

// Sample data with realistic dates
const sampleEvents: EventType[] = [
  {
    id: '1',
    title: 'Festival Pacuan Kuda Teluk Kuantan',
    locate: 'Teluk Kuantan, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800',
    description: 'Event pacuan kuda terbesar dengan hadiah jutaan rupiah',
    date: '15-17 Nov 2025',
    price: 'Rp 50.000',
    duration: '3 Hari',
    startDate: new Date('2025-10-02'),
    endDate: new Date('2025-11-17')
  },
  {
    id: '2',
    title: 'Pacuan Kuda Cerenti',
    locate: 'Cerenti, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1567428485548-95b19fd4c089?w=800',
    description: 'Lomba pacuan kuda tradisional dengan budaya lokal',
    date: '20-22 Sep 2025',
    price: 'Rp 35.000',
    duration: '3 Hari',
    startDate: new Date('2025-09-20'),
    endDate: new Date('2025-09-22')
  },
  {
    id: '3',
    title: 'Pacuan Kuda Sentajo',
    locate: 'Sentajo Raya, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800',
    description: 'Festival budaya dengan atraksi pacuan kuda spektakuler',
    date: '1-3 Des 2025',
    price: 'Rp 45.000',
    duration: '3 Hari',
    startDate: new Date('2025-12-01'),
    endDate: new Date('2025-12-03')
  },
  {
    id: '4',
    title: 'Grand Prix Pacuan Kuansing',
    locate: 'Kota Kuantan, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1598524722899-01e9729d1b12?w=800',
    description: 'Kompetisi akbar pacuan kuda tingkat regional',
    date: '10-12 Okt 2025',
    price: 'Rp 75.000',
    duration: '3 Hari',
    startDate: new Date('2025-10-10'),
    endDate: new Date('2025-10-12')
  },
  {
    id: '5',
    title: 'Pacuan Kuda Benai',
    locate: 'Benai, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
    description: 'Event komunitas dengan suasana kekeluargaan',
    date: '5-7 Agu 2025',
    price: 'Rp 30.000',
    duration: '3 Hari',
    startDate: new Date('2025-08-05'),
    endDate: new Date('2025-08-07')
  },
  {
    id: '6',
    title: 'Festival Pacuan Logas',
    locate: 'Logas Tanah Darat, Kuantan Singingi',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    description: 'Perayaan tradisi dengan lomba pacuan kuda',
    date: '25-27 Jan 2026',
    price: 'Rp 40.000',
    duration: '3 Hari',
    startDate: new Date('2026-01-25'),
    endDate: new Date('2026-01-27')
  }
];

type EventStatus = 'upcoming' | 'ongoing' | 'past';

const EventsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<EventStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const currentDate = new Date('2025-10-02'); // Using the current date from context

  const getEventStatus = (event: EventType): EventStatus => {
    if (currentDate < event.startDate) return 'upcoming';
    if (currentDate >= event.startDate && currentDate <= event.endDate) return 'ongoing';
    return 'past';
  };

  const filteredEvents = useMemo(() => {
    const filtered = sampleEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.locate.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedFilter === 'all') return matchesSearch;
      return matchesSearch && getEventStatus(event) === selectedFilter;
    });

    // Sort: ongoing first, then upcoming, then past
    return filtered.sort((a, b) => {
      const statusOrder = { ongoing: 0, upcoming: 1, past: 2 };
      const statusA = getEventStatus(a);
      const statusB = getEventStatus(b);
      
      if (statusOrder[statusA] !== statusOrder[statusB]) {
        return statusOrder[statusA] - statusOrder[statusB];
      }
      
      return a.startDate.getTime() - b.startDate.getTime();
    });
  }, [searchQuery, selectedFilter]);

  const eventCounts = useMemo(() => {
    return {
      all: sampleEvents.length,
      upcoming: sampleEvents.filter(e => getEventStatus(e) === 'upcoming').length,
      ongoing: sampleEvents.filter(e => getEventStatus(e) === 'ongoing').length,
      past: sampleEvents.filter(e => getEventStatus(e) === 'past').length
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'ongoing':
        return {
          label: 'SEDANG BERLANGSUNG',
          bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
          icon: <Zap className="w-4 h-4" />,
          animation: 'animate-pulse'
        };
      case 'upcoming':
        return {
          label: 'AKAN DATANG',
          bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          icon: <Clock className="w-4 h-4" />,
          animation: ''
        };
      case 'past':
        return {
          label: 'SUDAH LEWAT',
          bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
          icon: <CheckCircle className="w-4 h-4" />,
          animation: ''
        };
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-emerald-950' : 'bg-gradient-to-br from-stone-100 to-emerald-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-emerald-900' : 'bg-white'} shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => window.history.back()}
              className={`flex items-center gap-2 ${isDarkMode ? 'text-white hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Kembali</span>
            </motion.button>

            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-emerald-800 text-white' : 'bg-gray-200 text-gray-800'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>

          <motion.h1
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Semua Event Pacuan Kuda
          </motion.h1>
          <p className={`text-lg ${isDarkMode ? 'text-stone-300' : 'text-gray-600'}`}>
            Jelajahi {filteredEvents.length} event pacuan kuda di Kuantan Singingi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-stone-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Cari event atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl ${
                isDarkMode ? 'bg-emerald-900 text-white border-emerald-800' : 'bg-white text-gray-800 border-gray-200'
              } border-2 focus:outline-none focus:border-emerald-500 transition-all text-lg`}
            />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <FilterButton
              active={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
              isDarkMode={isDarkMode}
              count={eventCounts.all}
            >
              <Filter className="w-4 h-4" />
              Semua
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'ongoing'}
              onClick={() => setSelectedFilter('ongoing')}
              isDarkMode={isDarkMode}
              count={eventCounts.ongoing}
              color="green"
            >
              <Zap className="w-4 h-4" />
              Sedang Berlangsung
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'upcoming'}
              onClick={() => setSelectedFilter('upcoming')}
              isDarkMode={isDarkMode}
              count={eventCounts.upcoming}
              color="blue"
            >
              <Clock className="w-4 h-4" />
              Akan Datang
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'past'}
              onClick={() => setSelectedFilter('past')}
              isDarkMode={isDarkMode}
              count={eventCounts.past}
              color="gray"
            >
              <CheckCircle className="w-4 h-4" />
              Sudah Lewat
            </FilterButton>
          </motion.div>
        </div>

        {/* Events Grid */}
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`text-center py-20 ${isDarkMode ? 'text-stone-300' : 'text-gray-600'}`}
            >
              <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Tidak ada event yang ditemukan</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => {
                const status = getEventStatus(event);
                const badge = getStatusBadge(status);
                const isFavorite = favorites.has(event.id);
                
                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group ${
                      isDarkMode ? 'bg-emerald-900' : 'bg-white'
                    } rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                      status === 'past' ? 'opacity-75' : ''
                    }`}
                    whileHover={{ y: -8 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          status === 'past' ? 'grayscale group-hover:grayscale-0' : 'group-hover:scale-110'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Status Badge */}
                      <motion.div
                        className={`absolute top-4 left-4 flex items-center gap-2 ${badge.bgColor} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg ${badge.animation}`}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        {badge.icon}
                        {badge.label}
                      </motion.div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {event.price}
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        onClick={() => toggleFavorite(event.id)}
                        className={`absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-red-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </motion.button>

                      {/* Duration Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-semibold">
                        <Users className="w-4 h-4" />
                        {event.duration}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} line-clamp-2 min-h-[3.5rem]`}>
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <p className={`${isDarkMode ? 'text-stone-300' : 'text-gray-600'} line-clamp-1`}>
                            {event.locate}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <p className={`${isDarkMode ? 'text-stone-300' : 'text-gray-600'}`}>
                            {event.date}
                          </p>
                        </div>
                      </div>

                      <p className={`text-sm mb-6 line-clamp-2 ${isDarkMode ? 'text-stone-400' : 'text-gray-600'}`}>
                        {event.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                            status === 'past'
                              ? isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg'
                          }`}
                          whileHover={status !== 'past' ? { scale: 1.02 } : {}}
                          whileTap={status !== 'past' ? { scale: 0.98 } : {}}
                          disabled={status === 'past'}
                        >
                          {status === 'past' ? 'Event Selesai' : 'Lihat Detail'}
                        </motion.button>
                        
                        <motion.button
                          className={`p-3 rounded-xl transition-all duration-300 ${
                            isDarkMode ? 'bg-emerald-800/50 hover:bg-emerald-700/50 border border-emerald-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                          }`}
                          whileHover={{ scale: 1.05, rotate: 15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Share2 className={`w-5 h-5 ${isDarkMode ? 'text-stone-300' : 'text-gray-600'}`} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Statistics Section */}
        {filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mt-12 p-8 rounded-3xl ${
              isDarkMode ? 'bg-emerald-900' : 'bg-white'
            } shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Statistik Event
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                label="Total Event"
                value={eventCounts.all}
                color="emerald"
                isDarkMode={isDarkMode}
              />
              <StatCard
                label="Sedang Berlangsung"
                value={eventCounts.ongoing}
                color="green"
                isDarkMode={isDarkMode}
              />
              <StatCard
                label="Akan Datang"
                value={eventCounts.upcoming}
                color="blue"
                isDarkMode={isDarkMode}
              />
              <StatCard
                label="Sudah Selesai"
                value={eventCounts.past}
                color="gray"
                isDarkMode={isDarkMode}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ 
  active, 
  onClick, 
  isDarkMode, 
  children, 
  count,
  color = 'emerald'
}: { 
  active: boolean; 
  onClick: () => void; 
  isDarkMode: boolean; 
  children: React.ReactNode;
  count: number;
  color?: string;
}) => {
  const colorClasses = {
    emerald: active ? 'from-emerald-600 to-teal-600' : '',
    green: active ? 'from-green-600 to-emerald-600' : '',
    blue: active ? 'from-blue-600 to-cyan-600' : '',
    gray: active ? 'from-gray-600 to-gray-700' : ''
  };

  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
        active
          ? `bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white shadow-lg`
          : isDarkMode
          ? 'bg-emerald-800 text-stone-300 hover:bg-emerald-700'
          : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
        active ? 'bg-white/20' : isDarkMode ? 'bg-emerald-700' : 'bg-gray-200'
      }`}>
        {count}
      </span>
    </motion.button>
  );
};

// Stat Card Component
const StatCard = ({ 
  label, 
  value, 
  color, 
  isDarkMode 
}: { 
  label: string; 
  value: number; 
  color: string; 
  isDarkMode: boolean;
}) => {
  const colorClasses = {
    emerald: 'from-emerald-500 to-teal-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    gray: 'from-gray-400 to-gray-500'
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl ${isDarkMode ? 'bg-emerald-800/50' : 'bg-gradient-to-br from-gray-50 to-white'} border ${
        isDarkMode ? 'border-emerald-700' : 'border-gray-200'
      }`}
      whileHover={{ y: -5 }}
    >
      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className={`text-sm ${isDarkMode ? 'text-stone-400' : 'text-gray-600'}`}>
        {label}
      </div>
    </motion.div>
  );
};

export default EventsPage;