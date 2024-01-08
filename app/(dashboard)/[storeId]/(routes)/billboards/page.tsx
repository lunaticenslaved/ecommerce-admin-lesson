import { format } from 'date-fns';

import { db } from '@/lib/prismadb';

import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

export default async function BillboardsPage({ params: { storeId } }: BillboardsPageProps) {
  const billboards: BillboardColumn[] = await db.billboard
    .findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then(items =>
      items.map(
        (item): BillboardColumn => ({
          id: item.id,
          label: item.label,
          createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }),
      ),
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
}
