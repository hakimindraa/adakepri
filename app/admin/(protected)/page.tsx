import { getAdminStats, getAllUsersAdmin, getAllUMKMsAdmin, getAllFreelancersAdmin } from "@/lib/actions/admin";
import AdminClient from "./AdminClient";

export const metadata = {
  title: "Dasbor Admin | Ada Kepri",
};

export default async function AdminPage() {
  const stats = await getAdminStats();
  const users = await getAllUsersAdmin();
  const umkms = await getAllUMKMsAdmin();
  const freelancers = await getAllFreelancersAdmin();

  return (
    <AdminClient 
      stats={stats} 
      users={users} 
      umkms={umkms} 
      freelancers={freelancers} 
    />
  );
}
