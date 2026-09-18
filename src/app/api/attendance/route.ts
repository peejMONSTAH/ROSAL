import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { INITIAL_ATTENDANCE } from '@/lib/seed-data';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(INITIAL_ATTENDANCE);
    }

    const { data, error } = await supabase
      .from('attendances')
      .select('*, learners!inner(name, lrn, sex)');

    if (error || !data || data.length === 0) {
      return NextResponse.json(INITIAL_ATTENDANCE);
    }

    const mapped = data.map((a: any) => {
      const monthly = a.monthly || {};
      const t1Abs = (monthly['june']?.absent || 0) + (monthly['july']?.absent || 0) + (monthly['aug']?.absent || 0) + (monthly['sept']?.absent || 0);
      const t2Abs = (monthly['oct']?.absent || 0) + (monthly['nov']?.absent || 0) + (monthly['dec']?.absent || 0);
      const t3Abs = (monthly['jan']?.absent || 0) + (monthly['feb']?.absent || 0) + (monthly['mar']?.absent || 0) + (monthly['apr']?.absent || 0);

      return {
        learnerId: a.learner_id,
        lrn: a.learners?.lrn || '',
        name: a.learners?.name || '',
        sex: a.learners?.sex || 'M',
        monthly,
        totalSchoolDays: a.total_school_days,
        totalPresent: a.total_present,
        totalAbsent: a.total_absent,
        consecutiveAbsences: a.consecutive_absences || 0,
        interventionNeeded: a.intervention_needed || false,
        perfectAttendance: {
          term1: t1Abs === 0,
          term2: t2Abs === 0,
          term3: t3Abs === 0,
        }
      };
    });

    return NextResponse.json(mapped);
  } catch (err: any) {
    console.warn('Falling back to INITIAL_ATTENDANCE:', err.message);
    return NextResponse.json(INITIAL_ATTENDANCE);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { learnerId, monthly, totalSchoolDays, totalPresent, totalAbsent, consecutiveAbsences, interventionNeeded } = body;

    const { data, error } = await supabase
      .from('attendances')
      .upsert({
        id: `att-${learnerId}`,
        learner_id: learnerId,
        monthly,
        total_school_days: totalSchoolDays,
        total_present: totalPresent,
        total_absent: totalAbsent,
        consecutive_absences: consecutiveAbsences || 0,
        intervention_needed: interventionNeeded || false,
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
