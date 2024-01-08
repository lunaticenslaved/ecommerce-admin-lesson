import { format } from 'date-fns';

import { db } from '@/lib/prismadb';

import { CategoryClient } from './components/client';
import { CategoryColumn } from './components/columns';

interface CategoriesPageProps {
  params: {
    storeId: string;
  };
}

export default async function CategoriesPage({ params: { storeId } }: CategoriesPageProps) {
  const categories: CategoryColumn[] = await db.category
    .findMany({
      where: {
        storeId,
      },
      include: {
        billboard: {
          select: {
            label: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then(items =>
      items.map(
        (item): CategoryColumn => ({
          id: item.id,
          name: item.name,
          billboardLabel: item.billboard.label,
          createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }),
      ),
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={categories} />
      </div>
    </div>
  );
}
