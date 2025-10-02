import DashboardLayout from "@/components/globals/layouts/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ImageIcon, DollarSign, BedDouble } from "lucide-react";

interface Booking {
  id: string;
  user: string;
  item: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  amount: number;
}

const AdminDashboard = () => {
  const summaryData = {
    totalEvents: 12,
    totalAccommodations: 25,
    totalBookings: 152,
    galleryImages: 88,
  };

  const recentBookings: Booking[] = [];

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>

        {/* Bagian Ringkasan Statistik */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jadwal Event</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Jumlah event yang akan datang</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Akomodasi</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalAccommodations}</div>
              <p className="text-xs text-muted-foreground">Jumlah penginapan terdaftar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalBookings}</div>
              <p className="text-xs text-muted-foreground">Pesanan tiket & akomodasi</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Foto di Galeri</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.galleryImages}</div>
              <p className="text-xs text-muted-foreground">Jumlah foto yang ditampilkan</p>
            </CardContent>
          </Card>
        </div>

        {/* Bagian Pesanan Terbaru */}
        <div className="grid gap-4 md:grid-cols-1">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Pesanan Terbaru</CardTitle>
              <CardDescription>Berikut adalah daftar pesanan yang baru masuk.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pesanan</TableHead>
                    <TableHead>Pemesan</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.item}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "Confirmed" ? "default" : booking.status === "Pending" ? "secondary" : "destructive"}>{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(booking.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
