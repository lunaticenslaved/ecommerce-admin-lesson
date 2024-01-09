import { format } from 'date-fns';

import { db } from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params: { storeId } }: OrdersPageProps) {
  const orders: OrderColumn[] = await db.order
    .findMany({
      where: {
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then(items =>
      items.map(
        (item): OrderColumn => ({
          id: item.id,
          phone: item.phone,
          address: item.address,
          products: item.orderItems.map(({ product }) => product.name).join(', '),
          totalPrice: formatter.format(
            item.orderItems.reduce((acc, { product }) => acc + product.price.toNumber(), 0),
          ),
          isPaid: item.isPaid,
          createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }),
      ),
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={orders} />
      </div>
    </div>
  );
}
