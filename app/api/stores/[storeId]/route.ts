import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        userId,
        id: storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', storeId);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(_: Request, { params: { storeId } }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        userId,
        id: storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', storeId);
    return new NextResponse('Internal error', { status: 500 });
  }
}
