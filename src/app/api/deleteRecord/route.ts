import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await db.erro_consultor.delete({
      where: { xata_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
