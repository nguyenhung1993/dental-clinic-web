'use server';

import prisma from '@/lib/prisma';
import { PaymentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

export async function getInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        patient: {
          select: {
            fullName: true,
            patientCode: true,
          }
        },
        treatmentPlan: true,
        branch: true,
      },
      orderBy: {
        issuedAt: 'desc',
      },
    });
    return { success: true, data: invoices };
  } catch (error) {
    console.error('getInvoices error:', error);
    return { success: false, error: 'Không thể tải danh sách hóa đơn' };
  }
}

export async function getInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        patient: true,
        treatmentPlan: true,
        branch: true,
        items: {
          include: {
            service: true,
          }
        },
        payments: true,
      },
    });
    return { success: true, data: invoice };
  } catch (error) {
    console.error('getInvoiceById error:', error);
    return { success: false, error: 'Không thể tải chi tiết hóa đơn' };
  }
}

export async function updateInvoiceStatus(id: string, status: PaymentStatus) {
  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data: { paymentStatus: status },
    });

    await createAuditLog({
      action: 'UPDATE',
      entity: 'Invoice',
      entityId: invoice.id,
      newData: invoice,
    });

    revalidatePath('/billing');
    return { success: true, data: invoice };
  } catch (error) {
    console.error('updateInvoiceStatus error:', error);
    return { success: false, error: 'Không thể cập nhật trạng thái hóa đơn' };
  }
}
