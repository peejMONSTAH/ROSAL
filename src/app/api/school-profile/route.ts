import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('school_profiles')
      .select('*')
      .eq('id', 'primary')
      .single();

    if (error) throw error;

    const mapped = {
      schoolName: data.school_name,
      schoolId: data.school_id,
      region: data.region,
      division: data.division,
      district: data.district,
      schoolYear: data.school_year,
      gradeLevel: data.grade_level,
      section: data.section,
      adviserName: data.adviser_name,
      adviserTitle: data.adviser_title,
      schoolHeadName: data.school_head_name,
      schoolHeadTitle: data.school_head_title,
      departmentHeadName: data.department_head_name,
      departmentHeadTitle: data.department_head_title,
      schoolAddress: data.school_address,
    };

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from('school_profiles')
      .upsert({
        id: 'primary',
        school_name: body.schoolName,
        school_id: body.schoolId,
        region: body.region,
        division: body.division,
        district: body.district,
        school_year: body.schoolYear,
        grade_level: body.gradeLevel,
        section: body.section,
        adviser_name: body.adviserName,
        adviser_title: body.adviserTitle,
        school_head_name: body.schoolHeadName,
        school_head_title: body.schoolHeadTitle,
        department_head_name: body.departmentHeadName,
        department_head_title: body.departmentHeadTitle,
        school_address: body.schoolAddress,
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
