import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/prismadb';

export async function POST(req: Request, { params: { storeId } }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const { label } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error(`[BILLBOARDS_POST]:`, error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(_: Request, { params: { storeId } }: { params: { storeId: string } }) {
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: { storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error(`[BILLBOARDS_GET]:`, error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
