'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

export async function getDentalChart(patientId: string) {
  try {
    const chart = await prisma.dentalChart.findUnique({
      where: { patientId },
      include: { teeth: true }
    });
    return { success: true, data: chart };
  } catch (error) {
    console.error('Failed to fetch dental chart:', error);
    return { success: false, error: 'Không thể tải sơ đồ răng' };
  }
}

export async function saveToothRecord(patientId: string, toothNumber: number, condition: any, notes?: string) {
  try {
    let chart = await prisma.dentalChart.findUnique({
      where: { patientId }
    });

    if (!chart) {
      chart = await prisma.dentalChart.create({
        data: { patientId }
      });
    }

    const toothRecord = await prisma.toothRecord.upsert({
      where: {
        dentalChartId_toothNumber: {
          dentalChartId: chart.id,
          toothNumber
        }
      },
      update: { condition, notes },
      create: {
        dentalChartId: chart.id,
        toothNumber,
        condition,
        notes
      }
    });

    await createAuditLog({
      action: 'UPDATE',
      entity: 'DentalChart',
      entityId: chart.id,
      newData: toothRecord
    });

    revalidatePath(`/patients/${patientId}`);
    return { success: true, data: toothRecord };
  } catch (error) {
    console.error('Failed to save tooth record:', error);
    return { success: false, error: 'Không thể lưu thông tin răng' };
  }
}
