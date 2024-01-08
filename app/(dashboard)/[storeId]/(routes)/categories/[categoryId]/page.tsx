import { db } from '@/lib/prismadb';

import { CategoryForm } from './components/category-form';

interface CategoryPageProps {
  params: {
    storeId: string;
    categoryId: string;
  };
}

export default async function CategoryPage({ params: { categoryId, storeId } }: CategoryPageProps) {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}
