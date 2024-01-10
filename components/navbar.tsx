import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/main-nav';
import { StoreSwitcher } from '@/components/store-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { db } from '@/lib/prismadb';

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-x-4">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
