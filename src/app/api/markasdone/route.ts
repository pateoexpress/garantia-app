// app/api/markasdone/route.ts
import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await db.erro_consultor.update({
      where: { xata_id: id },
      data: { status: true },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}
