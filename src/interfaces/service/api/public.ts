export interface LandingPageData {
  stats: Stats;
  jadwal_terdekat: JadwalTerdekat[];
  galeri_acak: GaleriAcak[];
  penginapan_terbaik: PenginapanTerbaik[];
  foto_pacu_jalur: FotoPacuJalur[];
}

export interface Stats {
  event_rayon: number;
  kursi_tersedia: number;
  tim_peserta: string;
  periode: string;
}

export interface JadwalTerdekat {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string;
  tgl_mulai: string;
}

export interface GaleriAcak {
  id: string;
  image_url: string;
  judul: string;
}

export interface PenginapanTerbaik {
  id: string;
  nama: string;
  tipe: string;
  harga: string;
  image_url: string;
  rating: string;
}

export interface FotoPacuJalur {
  id: string;
  image_url: string;
  judul: string;
  nama_jalur: string;
}