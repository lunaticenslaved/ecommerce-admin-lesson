import { format } from 'date-fns';

import { db } from '@/lib/prismadb';

import { SizeClient } from './components/client';
import { SizeColumn } from './components/columns';

interface SizesPageProps {
  params: {
    storeId: string;
  };
}

export default async function SizesPage({ params: { storeId } }: SizesPageProps) {
  const data: SizeColumn[] = await db.size
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
        (item): SizeColumn => ({
          id: item.id,
          name: item.name,
          createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }),
      ),
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={data} />
      </div>
    </div>
  );
}
