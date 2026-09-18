import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { INITIAL_LEARNERS } from '@/lib/seed-data';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(INITIAL_LEARNERS);
    }

    const { data, error } = await supabase
      .from('learners')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json(INITIAL_LEARNERS);
    }

    const mapped = data.map((l: any) => ({
      id: l.id,
      lrn: l.lrn,
      name: l.name,
      lastName: l.last_name,
      firstName: l.first_name,
      middleName: l.middle_name,
      extensionName: l.extension_name,
      sex: l.sex,
      birthdate: l.birthdate,
      age: l.age,
      motherTongue: l.mother_tongue,
      religion: l.religion,
      street: l.street,
      barangay: l.barangay,
      city: l.city,
      province: l.province,
      fatherName: l.father_name,
      motherName: l.mother_name,
      guardianName: l.guardian_name,
      guardianRelationship: l.guardian_relationship,
      contactNumber: l.contact_number,
      learningModality: l.learning_modality,
      remarks: l.remarks
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    console.warn('Falling back to INITIAL_LEARNERS:', err.message);
    return NextResponse.json(INITIAL_LEARNERS);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || `learner-${Date.now()}`;

    const { data, error } = await supabase
      .from('learners')
      .insert({
        id,
        lrn: body.lrn,
        name: body.name,
        last_name: body.lastName,
        first_name: body.firstName,
        middle_name: body.middleName || '',
        extension_name: body.extensionName || '',
        sex: body.sex,
        birthdate: body.birthdate,
        age: body.age,
        mother_tongue: body.motherTongue || 'Hiligaynon',
        religion: body.religion || 'Christianity',
        street: body.street || '',
        barangay: body.barangay,
        city: body.city || 'City of Koronadal',
        province: body.province || 'South Cotabato',
        father_name: body.fatherName || '',
        mother_name: body.motherName || '',
        guardian_name: body.guardianName || '',
        guardian_relationship: body.guardianRelationship || '',
        contact_number: body.contactNumber || '',
        learning_modality: body.learningModality || 'Face to Face',
        remarks: body.remarks || ''
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
