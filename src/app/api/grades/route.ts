import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { INITIAL_TERM1_GRADES } from '@/lib/seed-data';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(INITIAL_TERM1_GRADES);
    }

    const { data, error } = await supabase
      .from('term_grades')
      .select('*, learners!inner(name, lrn, sex)')
      .eq('term', 1);

    if (error || !data || data.length === 0) {
      return NextResponse.json(INITIAL_TERM1_GRADES);
    }

    const mapped = data.map((g: any) => ({
      learnerId: g.learner_id,
      lrn: g.learners?.lrn || '',
      name: g.learners?.name || '',
      sex: g.learners?.sex || 'M',
      grades: {
        filipino: g.filipino,
        english: g.english,
        math: g.math,
        science: g.science,
        ap: g.ap,
        values: g.values_grade,
        tle: g.tle,
        music_arts: g.music_arts,
        pe_health: g.pe_health,
        mapeh: g.mapeh,
      },
      average: Number(g.average),
      rank: g.rank,
      descriptor: g.descriptor,
      honors: g.honors,
      comment: g.comment,
      coreValues: g.core_values || {}
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    console.warn('Falling back to INITIAL_TERM1_GRADES:', err.message);
    return NextResponse.json(INITIAL_TERM1_GRADES);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { learnerId, term = 1, grades, average, rank, descriptor, honors, comment, coreValues } = body;

    const { data, error } = await supabase
      .from('term_grades')
      .upsert({
        id: `grade-${learnerId}-t${term}`,
        learner_id: learnerId,
        term,
        filipino: grades.filipino,
        english: grades.english,
        math: grades.math,
        science: grades.science,
        ap: grades.ap,
        values_grade: grades.values,
        tle: grades.tle,
        music_arts: grades.music_arts,
        pe_health: grades.pe_health,
        mapeh: grades.mapeh,
        average,
        rank,
        descriptor,
        honors,
        comment,
        core_values: coreValues || {},
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
