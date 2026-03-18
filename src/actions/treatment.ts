'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';
import { format } from 'date-fns';

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

export async function createTreatmentPlan(patientId: string, data: any) {
  if (!patientId) {
    return { success: false, error: 'Thiếu mã bệnh nhân' };
  }
  try {
    const planCount = await prisma.treatmentPlan.count();
    const planNo = `TP-${format(new Date(), 'yyyyMMdd')}-${(planCount + 1).toString().padStart(3, '0')}`;

    const plan = await prisma.treatmentPlan.create({
      data: {
        planNo,
        patientId,
        title: data.title || 'Phác đồ điều trị mới',
        description: data.description,
        totalAmount: data.totalAmount,
        status: 'PLANNED',
        items: {
          create: data.items.map((item: any) => ({
            serviceId: item.serviceId,
            toothNumber: item.tooth ? parseInt(item.tooth) : null,
            quantity: 1,
            unitPrice: item.price,
            discount: item.discount,
            totalPrice: item.price - item.discount,
            status: 'PLANNED'
          }))
        }
      },
      include: { items: true }
    });

    await createAuditLog({
      action: 'CREATE',
      entity: 'TreatmentPlan',
      entityId: plan.id,
      newData: plan
    });

    revalidatePath(`/patients/${patientId}`);
    return { success: true, data: plan };
  } catch (error) {
    console.error('Failed to create treatment plan:', error);
    return { success: false, error: 'Không thể tạo phác đồ điều trị' };
  }
}
