import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/globals/layouts/dashboard-layout";

// Interfaces
interface Penginapan {
  id: number;
  nama: string;
  tipe: string;
  harga: number;
  image_url?: string;
  deskripsi?: string;
  rating?: number;
  maps_url?: string;
  fasilitas?: string;
  galeri?: { image_url: string }[];
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
}

const PenginapanPage: React.FC = () => {
  const [penginapanList, setPenginapanList] = useState<Penginapan[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPenginapan, setSelectedPenginapan] = useState<Penginapan | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    tipe: "",
    harga: 0,
    deskripsi: "",
    maps_url: "",
    fasilitas: "",
  });

  const API_URL = "http://localhost:8000"; // Adjust to your API base URL

  // Fetch penginapan list
  useEffect(() => {
    fetchPenginapan();
  }, [currentPage]);

  const fetchPenginapan = async () => {
    try {
      const response = await axios.get(`${API_URL}/penginapan?page=${currentPage}&limit=10`);
      setPenginapanList(response.data.data.data);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching penginapan:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        harga: Number(formData.harga),
        fasilitas: formData.fasilitas
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      };

      if (selectedPenginapan) {
        // Update
        await axios.put(`${API_URL}/penginapan/${selectedPenginapan.id}`, data, {
          headers: { Authorization: "Bearer YOUR_TOKEN" },
        });
      } else {
        // Create
        await axios.post(`${API_URL}/penginapan`, data, {
          headers: { Authorization: "Bearer YOUR_TOKEN" },
        });
      }

      setIsModalOpen(false);
      setSelectedPenginapan(null);
      setFormData({ nama: "", tipe: "", harga: 0, deskripsi: "", maps_url: "", fasilitas: "" });
      fetchPenginapan();
    } catch (error) {
      console.error("Error saving penginapan:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this penginapan?")) {
      try {
        await axios.delete(`${API_URL}/penginapan/${id}`, {
          headers: { Authorization: "Bearer YOUR_TOKEN" },
        });
        fetchPenginapan();
      } catch (error) {
        console.error("Error deleting penginapan:", error);
      }
    }
  };

  // Handle edit
  const handleEdit = (penginapan: Penginapan) => {
    setSelectedPenginapan(penginapan);
    setFormData({
      nama: penginapan.nama,
      tipe: penginapan.tipe,
      harga: penginapan.harga,
      deskripsi: penginapan.deskripsi || "",
      maps_url: penginapan.maps_url || "",
      fasilitas: penginapan.fasilitas || "",
    });
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Penginapan Management</h1>

        {/* Create Button */}
        <Button onClick={() => setIsModalOpen(true)} className="mb-4">
          Add New Penginapan
        </Button>

        {/* Penginapan List */}
        <div className="grid gap-4">
          {penginapanList.map((penginapan) => (
            <Card key={penginapan.id}>
              <CardHeader>
                <CardTitle>{penginapan.nama}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Type: {penginapan.tipe}</p>
                  <p>Price: Rp {penginapan.harga.toLocaleString()}</p>
                  {penginapan.deskripsi && <p>Description: {penginapan.deskripsi}</p>}
                  {penginapan.fasilitas && <p>Facilities: {penginapan.fasilitas}</p>}
                  {penginapan.maps_url && (
                    <a href={penginapan.maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Map
                    </a>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={() => handleEdit(penginapan)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(penginapan.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="mt-4 flex justify-center space-x-2">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </Button>
            <span className="self-center">
              Page {pagination.current_page} of {pagination.total_pages}
            </span>
            <Button variant="outline" disabled={currentPage === pagination.total_pages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </Button>
          </div>
        )}

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPenginapan ? "Edit Penginapan" : "Add Penginapan"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nama">Name</Label>
                <Input id="nama" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="tipe">Type</Label>
                <Input id="tipe" value={formData.tipe} onChange={(e) => setFormData({ ...formData, tipe: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="harga">Price</Label>
                <Input id="harga" type="number" value={formData.harga} onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })} required />
              </div>
              <div>
                <Label htmlFor="deskripsi">Description</Label>
                <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="maps_url">Map URL</Label>
                <Input id="maps_url" value={formData.maps_url} onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="fasilitas">Facilities (comma-separated)</Label>
                <Input id="fasilitas" value={formData.fasilitas} onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })} />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPenginapan(null);
                    setFormData({ nama: "", tipe: "", harga: 0, deskripsi: "", maps_url: "", fasilitas: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PenginapanPage;
