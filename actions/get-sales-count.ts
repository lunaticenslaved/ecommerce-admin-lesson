import { db } from '@/lib/prismadb';

export async function getSalesCount(storeId: string) {
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
}
