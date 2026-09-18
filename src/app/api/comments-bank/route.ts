import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('comments_bank')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    const mapped = data.map((c: any) => ({
      id: c.id,
      tier: c.tier,
      text: c.text,
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
