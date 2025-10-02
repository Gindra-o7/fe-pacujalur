import DashboardLayout from "@/components/globals/layouts/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ImageIcon, DollarSign, BedDouble } from "lucide-react";
import APIAdmin from "@/services/api/admin/api.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Booking {
  id: string;
  user: string;
  item: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  amount: number;
}

const AdminDashboard = () => {
  const {
    data: summaryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: APIAdmin.getDashboardData,
  });

  const recentBookings: Booking[] = [];

  if (isError) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-10">
          <Alert variant="destructive">
            <AlertTitle>Gagal Memuat Data!</AlertTitle>
            <AlertDescription>
              Terjadi kesalahan saat mengambil data dasbor. Silakan coba lagi nanti.
              <br />
              <span className="text-xs">Detail: {error.message}</span>
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jadwal Event</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{summaryData?.totalEvents ?? 0}</div>}
              <p className="text-xs text-muted-foreground">Jumlah event yang akan datang</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Akomodasi</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{summaryData?.totalAccommodations ?? 0}</div>}
              <p className="text-xs text-muted-foreground">Jumlah penginapan terdaftar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{summaryData?.totalBookings ?? 0}</div>}
              <p className="text-xs text-muted-foreground">Pesanan tiket & akomodasi</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Foto di Galeri</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{summaryData?.galleryImages ?? 0}</div>}
              <p className="text-xs text-muted-foreground">Jumlah foto yang ditampilkan</p>
            </CardContent>
          </Card>
        </div>

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
                  {recentBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Belum ada pesanan terbaru.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.item}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "Confirmed" ? "default" : booking.status === "Pending" ? "secondary" : "destructive"}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(booking.amount)}</TableCell>
                      </TableRow>
                    ))
                  )}
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
