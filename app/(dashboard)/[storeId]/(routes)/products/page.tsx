import { format } from 'date-fns';

import { db } from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { ProductClient } from './components/client';
import { ProductColumn } from './components/columns';

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ProductsPage({ params: { storeId } }: ProductsPageProps) {
  const data: ProductColumn[] = await db.product
    .findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then(items =>
      items.map(
        (item): ProductColumn => ({
          id: item.id,
          name: item.name,
          isFeatured: item.isFeatured,
          isArchived: item.isArchived,
          price: formatter.format(item.price.toNumber()),
          category: item.category.name,
          size: item.category.name,
          color: item.color.value,
          createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }),
      ),
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={data} />
      </div>
    </div>
  );
}
