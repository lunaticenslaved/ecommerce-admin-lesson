'use client';

import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface BillboardClientProps {
  data: Billboard[];
}

export function BillboardClient({ data }: BillboardClientProps) {
  const { storeId } = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
}
