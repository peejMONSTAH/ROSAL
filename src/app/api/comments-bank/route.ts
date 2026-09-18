import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { INITIAL_COMMENTS_BANK } from '@/lib/seed-data';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(INITIAL_COMMENTS_BANK);
    }

    const { data, error } = await supabase
      .from('comments_bank')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json(INITIAL_COMMENTS_BANK);
    }

    const mapped = data.map((c: any) => ({
      id: c.id,
      tier: c.tier,
      text: c.text,
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    console.warn('Falling back to INITIAL_COMMENTS_BANK:', err.message);
    return NextResponse.json(INITIAL_COMMENTS_BANK);
  }
}
