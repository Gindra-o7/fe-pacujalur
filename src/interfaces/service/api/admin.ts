export interface DashboardData {
  totalEvents: number;
  totalAccommodations: number;
  totalBookings: number;
  galleryImages: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface Medsos {
  id?: number;
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
}

export interface Galeri {
  id?: number;
  image_url: string;
  judul?: string;
  caption?: string;
}

export interface Jalur {
  id?: number;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi?: string;
  medsos: Medsos[];
  galeri: Galeri[];
}

export interface Acara {
  id: number;
  nama: string;
  lokasi: string;
  image_url?: string;
  deskripsi?: string;
  tgl_mulai: string;
  tgl_selesai: string;
  image_base64?: string;
}