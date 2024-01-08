import { PropsWithChildren } from 'react';

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navbar';
import { db } from '@/lib/prismadb';

interface DashboardLayoutProps extends PropsWithChildren {
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout({
  children,
  params: { storeId },
}: DashboardLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
