import { db } from '@/lib/prismadb';

import { BillboardForm } from './components/billboard-form';

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

export default async function BillboardPage({ params: { billboardId } }: BillboardPageProps) {
  const billboard = await db.billboard.findUnique({
    where: { id: billboardId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
