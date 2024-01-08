import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/prismadb';

interface Path {
  params: {
    storeId: string;
    billboardId: string;
  };
}

export async function PATCH(req: Request, { params: { storeId, billboardId } }: Path) {
  try {
    const { userId } = auth();
    const { label } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboardByUserAndStore = await db.billboard.findFirst({
      where: {
        id: billboardId,
        store: {
          userId,
          id: storeId,
        },
      },
    });

    if (!billboardByUserAndStore) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const billboard = await db.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        label,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error(`[BILLBOARDS_PATCH]:`, error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(_: Request, { params: { storeId, billboardId } }: Path) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const billboard = await db.billboard.delete({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(_: Request, { params: { billboardId } }: Path) {
  try {
    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
