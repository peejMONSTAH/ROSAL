import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updatePayload: any = {};
    if (body.lrn !== undefined) updatePayload.lrn = body.lrn;
    if (body.name !== undefined) updatePayload.name = body.name;
    if (body.lastName !== undefined) updatePayload.last_name = body.lastName;
    if (body.firstName !== undefined) updatePayload.first_name = body.firstName;
    if (body.middleName !== undefined) updatePayload.middle_name = body.middleName;
    if (body.extensionName !== undefined) updatePayload.extension_name = body.extensionName;
    if (body.sex !== undefined) updatePayload.sex = body.sex;
    if (body.birthdate !== undefined) updatePayload.birthdate = body.birthdate;
    if (body.age !== undefined) updatePayload.age = body.age;
    if (body.motherTongue !== undefined) updatePayload.mother_tongue = body.motherTongue;
    if (body.religion !== undefined) updatePayload.religion = body.religion;
    if (body.street !== undefined) updatePayload.street = body.street;
    if (body.barangay !== undefined) updatePayload.barangay = body.barangay;
    if (body.city !== undefined) updatePayload.city = body.city;
    if (body.province !== undefined) updatePayload.province = body.province;
    if (body.fatherName !== undefined) updatePayload.father_name = body.fatherName;
    if (body.motherName !== undefined) updatePayload.mother_name = body.motherName;
    if (body.guardianName !== undefined) updatePayload.guardian_name = body.guardianName;
    if (body.guardianRelationship !== undefined) updatePayload.guardian_relationship = body.guardianRelationship;
    if (body.contactNumber !== undefined) updatePayload.contact_number = body.contactNumber;
    if (body.learningModality !== undefined) updatePayload.learning_modality = body.learningModality;
    if (body.remarks !== undefined) updatePayload.remarks = body.remarks;
    updatePayload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('learners')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { error } = await supabase
      .from('learners')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
