'use server';

import prisma from '@/lib/prisma';
import { LaboStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

export async function getLaboOrders() {
  try {
    const orders = await prisma.laboOrder.findMany({
      include: {
        patient: {
          select: {
            fullName: true,
            patientCode: true,
          }
        },
        doctor: {
          select: {
            fullName: true,
          }
        },
        branch: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error('getLaboOrders error:', error);
    return { success: false, error: 'Không thể tải danh sách đơn hàng Labo' };
  }
}

export async function createLaboOrder(data: any) {
  try {
    const order = await prisma.laboOrder.create({
      data,
    });
    
    await createAuditLog({
      action: 'CREATE',
      entity: 'LaboOrder',
      entityId: order.id,
      newData: order,
    });

    revalidatePath('/labo');
    return { success: true, data: order };
  } catch (error) {
    console.error('createLaboOrder error:', error);
    return { success: false, error: 'Không thể tạo đơn hàng Labo' };
  }
}

export async function updateLaboStatus(id: string, status: LaboStatus) {
  try {
    const order = await prisma.laboOrder.update({
      where: { id },
      data: { status },
    });

    await createAuditLog({
      action: 'UPDATE',
      entity: 'LaboOrder',
      entityId: order.id,
      newData: order,
    });

    revalidatePath('/labo');
    return { success: true, data: order };
  } catch (error) {
    console.error('updateLaboStatus error:', error);
    return { success: false, error: 'Không thể cập nhật trạng thái Labo' };
  }
}
