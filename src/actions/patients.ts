'use server';

import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';
import prisma from '@/lib/prisma';

export async function getPatients(query?: string) {
  try {
    console.log("[getPatients] Query:", query);
    const patients = await prisma.patient.findMany({
      where: query ? {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { patientCode: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } }
        ]
      } : {},
      include: {
        appointments: {
          orderBy: { scheduledAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log("[getPatients] Found:", patients.length, "patients");

    return patients.map((p: any) => ({
      ...p,
      lastVisit: p.appointments[0]?.scheduledAt || 'Chưa có',
      status: p.isActive ? 'ACTIVE' : 'INACTIVE'
    }));
  } catch (error) {
    console.error('[getPatients] Error:', error);
    return [];
  }
}

export async function createPatient(data: any) {
  try {
    const patientCount = await prisma.patient.count();
    const patientCode = `BN-${(patientCount + 1).toString().padStart(4, '0')}`;
    
    const patient = await prisma.patient.create({
      data: {
        ...data,
        patientCode
      }
    });

    /* Temporarily disabled AuditLog for production debugging
    await createAuditLog({
      action: 'CREATE',
      entity: 'Patient',
      entityId: patient.id,
      newData: patient
    });
    */

    revalidatePath('/patients');
    return { success: true, data: patient };
  } catch (error) {
    console.error('Failed to create patient:', error);
    return { success: false, error: 'Không thể tạo bệnh nhân' };
  }
}

export async function updatePatient(id: string, data: any) {
  try {
    const oldData = await prisma.patient.findUnique({ where: { id } });
    const patient = await prisma.patient.update({
      where: { id },
      data
    });

    /* Temporarily disabled AuditLog for production debugging
    await createAuditLog({
      action: 'UPDATE',
      entity: 'Patient',
      entityId: id,
      oldData: oldData,
      newData: patient
    });
    */

    revalidatePath('/patients');
    revalidatePath(`/patients/${id}`);
    return { success: true, data: patient };
  } catch (error) {
    console.error('Failed to update patient:', error);
    return { success: false, error: 'Không thể cập nhật bệnh nhân' };
  }
}

export async function getPatientDetails(id: string) {
  try {
    return await prisma.patient.findUnique({
      where: { id },
      include: {
        treatmentPlans: {
          include: { items: { include: { service: true } } }
        },
        appointments: {
          orderBy: { scheduledAt: 'desc' }
        },
        invoices: true,
        xrays: true
      }
    });
  } catch (error) {
    console.error('Failed to fetch patient details:', error);
    return null;
  }
}
