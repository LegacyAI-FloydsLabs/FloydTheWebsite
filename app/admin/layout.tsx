import type { Metadata } from 'next';
import { AdminLayoutClient } from './_components/admin-layout-client';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Floyd Labs',
  description: 'Floyd Labs Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
