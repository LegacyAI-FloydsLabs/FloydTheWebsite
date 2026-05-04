import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { AppEditForm } from './_components/app-edit-form';

export const dynamic = 'force-dynamic';

async function getApplication(id: string) {
  return prisma.application.findUnique({ where: { id } });
}

export default async function EditAppPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await getApplication(params.id);

  if (!app) {
    notFound();
  }

  return <AppEditForm app={app} />;
}
