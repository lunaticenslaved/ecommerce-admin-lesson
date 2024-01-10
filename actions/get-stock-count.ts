import { db } from '@/lib/prismadb';

export async function getStockCount(storeId: string) {
  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
}
