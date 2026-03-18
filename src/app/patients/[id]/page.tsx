import React from 'react';
import { getPatientDetails } from '@/actions/patients';
import { PatientDetailClient } from '@/components/patients/patient-detail-client';
import { notFound } from 'next/navigation';

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await getPatientDetails(id);

  if (!patient) {
    notFound();
  }

  return <PatientDetailClient patient={patient} />;
}
