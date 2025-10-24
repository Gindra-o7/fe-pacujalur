import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image, X, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/globals/layouts/dashboard-layout";
import APIAdmin from "@/services/api/admin/api.service";
import { Galeri, Jalur, Medsos } from "@/interfaces/service/api/admin";
import { toast } from "sonner";

const JalurAdminPage: React.FC = () => {
  const [jalurs, setJalurs] = useState<Jalur[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentJalur, setCurrentJalur] = useState<Jalur>({
    nama: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    deskripsi: "",
    medsos: [],
    galeri: [],
  });

  useEffect(() => {
    getAllJalur();
  }, []);

  const getAllJalur = async () => {
    setLoading(true);
    try {
      const data = await APIAdmin.getAllJalur();
      setJalurs(data);
    } catch {
      toast.error("Gagal memuat data jalur");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = editMode && currentJalur.id
        ? await APIAdmin.updateJalur(currentJalur.id, currentJalur)
        : await APIAdmin.createJalur(currentJalur);

      if (result.success) {
        toast.success(editMode ? "Jalur berhasil diperbarui" : "Jalur berhasil ditambahkan");
        setShowModal(false);
        getAllJalur();
        resetForm();
      } else {
        toast.error(result.message || "Terjadi kesalahan");
      }
    } catch {
      toast.error("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id: number) => {
  //   if (!confirm("Yakin ingin menghapus jalur ini?")) return;

  //   setLoading(true);
  //   try {
  //     const result = await APIAdmin.deleteJalur(id);

  //     if (result.success) {
  //       toast.success("Jalur berhasil dihapus");
  //       getAllJalur();
  //     } else {
  //       toast.error(result.message || "Gagal menghapus jalur");
  //     }
  //   } catch (err) {
  //     toast.error("Gagal menghapus jalur");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEdit = (jalur: Jalur) => {
    setCurrentJalur({ ...jalur });
    setEditMode(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentJalur({
      nama: "",
      desa: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      deskripsi: "",
      medsos: [],
      galeri: [],
    });
  };

  const addMedsos = () => {
    setCurrentJalur({
      ...currentJalur,
      medsos: [...currentJalur.medsos, { media: "INSTAGRAM", link: "" }],
    });
  };

  const removeMedsos = (index: number) => {
    setCurrentJalur({
      ...currentJalur,
      medsos: currentJalur.medsos.filter((_, i) => i !== index),
    });
  };

  const updateMedsos = (index: number, field: keyof Medsos, value: string) => {
    const newMedsos = [...currentJalur.medsos];
    newMedsos[index] = { ...newMedsos[index], [field]: value };
    setCurrentJalur({ ...currentJalur, medsos: newMedsos });
  };

  const addGaleri = () => {
    setCurrentJalur({
      ...currentJalur,
      galeri: [...currentJalur.galeri, { image_url: "", judul: "", caption: "" }],
    });
  };

  const removeGaleri = (index: number) => {
    setCurrentJalur({
      ...currentJalur,
      galeri: currentJalur.galeri.filter((_, i) => i !== index),
    });
  };

  const updateGaleri = (index: number, field: keyof Galeri, value: string) => {
    const newGaleri = [...currentJalur.galeri];
    newGaleri[index] = { ...newGaleri[index], [field]: value };
    setCurrentJalur({ ...currentJalur, galeri: newGaleri });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl">Kelola Jalur</CardTitle>
                  <CardDescription>Manajemen data jalur pendakian</CardDescription>
                </div>
                <Button onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Jalur
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="p-0">
              {loading && !showModal ? (
                <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
              ) : jalurs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Belum ada data jalur</div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nama</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Lokasi</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Deskripsi</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Media Sosial</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Galeri</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jalurs.map((jalur) => (
                        <tr key={jalur.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{jalur.nama}</td>
                          <td className="p-4 align-middle">
                            <div className="text-sm">
                              <div>
                                {jalur.desa}, {jalur.kecamatan}
                              </div>
                              <div className="text-muted-foreground">
                                {jalur.kabupaten}, {jalur.provinsi}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle max-w-xs">
                            <div className="truncate text-sm text-muted-foreground">{jalur.deskripsi || "-"}</div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant="secondary">{jalur.medsos?.length || 0} akun</Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                              {jalur.galeri?.length || 0} foto
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(jalur)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                              variant="ghost" size="sm" 
                              // onClick={() => jalur.id && handleDelete(jalur.id)} 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{editMode ? "Edit Jalur" : "Tambah Jalur Baru"}</DialogTitle>
                <DialogDescription>{editMode ? "Perbarui informasi jalur pendakian" : "Tambahkan jalur pendakian baru"}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informasi Dasar</h3>

                  <div className="space-y-2">
                    <Label htmlFor="nama">
                      Nama Jalur <span className="text-red-500">*</span>
                    </Label>
                    <Input id="nama" required value={currentJalur.nama} onChange={(e) => setCurrentJalur({ ...currentJalur, nama: e.target.value })} placeholder="Nama jalur pendakian" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="desa">
                        Desa <span className="text-red-500">*</span>
                      </Label>
                      <Input id="desa" required value={currentJalur.desa} onChange={(e) => setCurrentJalur({ ...currentJalur, desa: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kecamatan">
                        Kecamatan <span className="text-red-500">*</span>
                      </Label>
                      <Input id="kecamatan" required value={currentJalur.kecamatan} onChange={(e) => setCurrentJalur({ ...currentJalur, kecamatan: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kabupaten">
                        Kabupaten <span className="text-red-500">*</span>
                      </Label>
                      <Input id="kabupaten" required value={currentJalur.kabupaten} onChange={(e) => setCurrentJalur({ ...currentJalur, kabupaten: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provinsi">
                        Provinsi <span className="text-red-500">*</span>
                      </Label>
                      <Input id="provinsi" required value={currentJalur.provinsi} onChange={(e) => setCurrentJalur({ ...currentJalur, provinsi: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea id="deskripsi" value={currentJalur.deskripsi} onChange={(e) => setCurrentJalur({ ...currentJalur, deskripsi: e.target.value })} rows={3} placeholder="Deskripsi singkat tentang jalur" />
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Media Sosial</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addMedsos}>
                      <Plus className="mr-1 h-4 w-4" /> Tambah
                    </Button>
                  </div>

                  {currentJalur.medsos.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Belum ada media sosial</p>
                  ) : (
                    <div className="space-y-3">
                      {currentJalur.medsos.map((medsos, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <Select value={medsos.media} onValueChange={(value) => updateMedsos(index, "media", value)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FACEBOOK">Facebook</SelectItem>
                              <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                              <SelectItem value="TWITTER">Twitter</SelectItem>
                              <SelectItem value="TIKTOK">TikTok</SelectItem>
                              <SelectItem value="YOUTUBE">YouTube</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="url" value={medsos.link} onChange={(e) => updateMedsos(index, "link", e.target.value)} placeholder="https://..." className="flex-1" />
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeMedsos(index)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Galeri</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addGaleri}>
                      <Plus className="mr-1 h-4 w-4" /> Tambah
                    </Button>
                  </div>

                  {currentJalur.galeri.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Belum ada foto galeri</p>
                  ) : (
                    <div className="space-y-4">
                      {currentJalur.galeri.map((galeri, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6 space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Image className="h-4 w-4" />
                                Foto {index + 1}
                              </div>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeGaleri(index)} className="text-red-600 hover:text-red-700">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <Input type="url" value={galeri.image_url} onChange={(e) => updateGaleri(index, "image_url", e.target.value)} placeholder="URL gambar" />

                            <Input type="text" value={galeri.judul || ""} onChange={(e) => updateGaleri(index, "judul", e.target.value)} placeholder="Judul (opsional)" />

                            <Input type="text" value={galeri.caption || ""} onChange={(e) => updateGaleri(index, "caption", e.target.value)} placeholder="Caption (opsional)" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JalurAdminPage;
