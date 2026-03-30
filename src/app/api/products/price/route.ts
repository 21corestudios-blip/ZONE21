import { NextResponse } from 'next/server';
import { getGelatoPrice } from '@/lib/gelato';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get('templateId');

  if (!templateId) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const price = await getGelatoPrice(templateId);
  return NextResponse.json({ price });
}