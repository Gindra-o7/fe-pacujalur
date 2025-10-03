import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Calendar, MapPin, Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/globals/layouts/dashboard-layout";

interface Acara {
  id: number;
  nama: string;
  lokasi: string;
  image_url?: string;
  deskripsi?: string;
  tgl_mulai: string;
  tgl_selesai: string;
}

interface AcaraResponse {
  terdekat: Acara[];
  lainnya: Acara[];
}

const API_BASE_URL = "http://localhost:8000";

const AdminPacuJalur = () => {
  const [acaraTerdekat, setAcaraTerdekat] = useState<Acara[]>([]);
  const [acaraLainnya, setAcaraLainnya] = useState<Acara[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAcara, setEditingAcara] = useState<Acara | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    deskripsi: "",
    tgl_mulai: "",
    tgl_selesai: "",
    image_base64: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchAcara();
  }, []);

  const fetchAcara = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/acara`);
      const result = await response.json();

      if (result.success) {
        setAcaraTerdekat(result.data.terdekat);
        setAcaraLainnya(result.data.lainnya);
      }
    } catch (error) {
      showAlert("error", "Gagal memuat data acara");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert("error", "Ukuran gambar tidak boleh lebih dari 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, image_base64: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      lokasi: "",
      deskripsi: "",
      tgl_mulai: "",
      tgl_selesai: "",
      image_base64: "",
    });
    setImagePreview("");
    setEditingAcara(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      const url = editingAcara ? `${API_BASE_URL}/acara/${editingAcara.id}` : `${API_BASE_URL}/acara`;

      const method = editingAcara ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showAlert("success", result.message || "Berhasil menyimpan data");
        setIsDialogOpen(false);
        resetForm();
        fetchAcara();
      } else {
        showAlert("error", result.message || "Gagal menyimpan data");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (acara: Acara) => {
    setEditingAcara(acara);
    setFormData({
      nama: acara.nama,
      lokasi: acara.lokasi,
      deskripsi: acara.deskripsi || "",
      tgl_mulai: acara.tgl_mulai,
      tgl_selesai: acara.tgl_selesai,
      image_base64: "",
    });
    setImagePreview(acara.image_url || "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus acara ini?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/acara/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        showAlert("success", "Acara berhasil dihapus");
        fetchAcara();
      } else {
        showAlert("error", "Gagal menghapus acara");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat menghapus acara");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const AcaraCard = ({ acara }: { acara: Acara }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {acara.image_url && <img src={acara.image_url} alt={acara.nama} className="w-full h-48 object-cover rounded-md mb-4" />}
        <h3 className="font-bold text-lg mb-2">{acara.nama}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{acara.lokasi}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(acara.tgl_mulai)} - {formatDate(acara.tgl_selesai)}
            </span>
          </div>
        </div>
        {acara.deskripsi && <p className="text-sm text-gray-700 mb-4 line-clamp-3">{acara.deskripsi}</p>}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(acara)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(acara.id)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Event Pacu Jalur</h1>
              <p className="text-gray-600 mt-1">Kelola event lomba perahu pacu jalur</p>
            </div>

            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingAcara ? "Edit Event" : "Tambah Event Baru"}</DialogTitle>
                  <DialogDescription>Lengkapi informasi event pacu jalur di bawah ini</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nama">Nama Event *</Label>
                    <Input id="nama" value={formData.nama} onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))} placeholder="Contoh: Lomba Pacu Jalur Tradisional 2025" required />
                  </div>

                  <div>
                    <Label htmlFor="lokasi">Lokasi *</Label>
                    <Input id="lokasi" value={formData.lokasi} onChange={(e) => setFormData((prev) => ({ ...prev, lokasi: e.target.value }))} placeholder="Contoh: Sungai Siak, Pekanbaru" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tgl_mulai">Tanggal Mulai *</Label>
                      <Input id="tgl_mulai" type="date" value={formData.tgl_mulai} onChange={(e) => setFormData((prev) => ({ ...prev, tgl_mulai: e.target.value }))} required />
                    </div>
                    <div>
                      <Label htmlFor="tgl_selesai">Tanggal Selesai *</Label>
                      <Input id="tgl_selesai" type="date" value={formData.tgl_selesai} onChange={(e) => setFormData((prev) => ({ ...prev, tgl_selesai: e.target.value }))} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))} placeholder="Deskripsikan event ini..." rows={4} />
                  </div>

                  <div>
                    <Label htmlFor="image">Gambar Event</Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                    <p className="text-xs text-gray-500 mt-1">Maksimal 5MB</p>

                    {imagePreview && (
                      <div className="mt-4">
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                    >
                      Batal
                    </Button>
                    <Button onClick={handleSubmit}>{editingAcara ? "Update" : "Simpan"}</Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {alert && (
            <Alert className={`mb-6 ${alert.type === "error" ? "border-red-500" : "border-green-500"}`}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Memuat data...</p>
            </div>
          ) : (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Event Mendatang</CardTitle>
                  <CardDescription>Event yang akan berlangsung ({acaraTerdekat.length} event)</CardDescription>
                </CardHeader>
                <CardContent>
                  {acaraTerdekat.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Belum ada event mendatang</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {acaraTerdekat.map((acara) => (
                        <AcaraCard key={acara.id} acara={acara} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Sebelumnya</CardTitle>
                  <CardDescription>Event yang telah berlangsung ({acaraLainnya.length} event)</CardDescription>
                </CardHeader>
                <CardContent>
                  {acaraLainnya.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Belum ada event sebelumnya</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {acaraLainnya.map((acara) => (
                        <AcaraCard key={acara.id} acara={acara} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPacuJalur;
