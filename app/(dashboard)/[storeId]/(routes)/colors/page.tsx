import { format } from 'date-fns';

import { db } from '@/lib/prismadb';

import { ColorClient } from './components/client';
import { ColorColumn } from './components/columns';

export default async function ColorsPag({ params }: { params: { storeId: string } }) {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
