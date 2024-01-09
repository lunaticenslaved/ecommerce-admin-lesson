import { db } from '@/lib/prismadb';

import { ProductForm } from './components/product-form';

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default async function ProductPage({ params: { storeId, productId } }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  const colors = await db.color.findMany({
    where: { storeId },
  });
  const sizes = await db.size.findMany({
    where: { storeId },
  });
  const categories = await db.category.findMany({
    where: { storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} colors={colors} sizes={sizes} categories={categories} />
      </div>
    </div>
  );
}
