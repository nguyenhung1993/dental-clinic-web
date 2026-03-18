'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';
import { startOfDay, endOfDay, format } from 'date-fns';

export async function getAppointments(date: Date = new Date()) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        scheduledAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      include: {
        patient: {
          select: { fullName: true, id: true }
        },
        doctor: {
          select: { fullName: true, id: true }
        },
      },
      orderBy: { scheduledAt: 'asc' },
    });

    return appointments;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return [];
  }
}

export async function getAppointmentStats() {
  try {
    const today = new Date();
    const stats = await prisma.appointment.groupBy({
      by: ['status'],
      where: {
        scheduledAt: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
      _count: true,
    });

    const total = stats.reduce((acc, curr) => acc + curr._count, 0);
    const cancelled = stats.find(s => s.status === 'CANCELLED')?._count || 0;
    
    // Giả định loại hình khám (có thể mở rộng schema sau)
    // Tạm thời mockup tỉ lệ vì schema chưa phân tách rõ loại hình khám Online/Offline
    return {
      total,
      direct: Math.floor(total * 0.7),
      online: Math.ceil(total * 0.3),
      cancelled,
    };
  } catch (error) {
    console.error('Failed to fetch appointment stats:', error);
    return { total: 0, direct: 0, online: 0, cancelled: 0 };
  }
}

export async function updateAppointmentStatus(id: string, status: any) {
  try {
    const oldData = await prisma.appointment.findUnique({ where: { id } });
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });

    await createAuditLog({
      action: 'UPDATE',
      entity: 'Appointment',
      entityId: id,
      oldData,
      newData: appointment
    });

    revalidatePath('/appointments');
    return { success: true, data: appointment };
  } catch (error) {
    console.error('Failed to update appointment status:', error);
    return { success: false, error: 'Không thể cập nhật trạng thái lịch hẹn' };
  }
}

export async function createAppointment(data: any) {
  try {
    const appointmentCount = await prisma.appointment.count();
    const appointmentNo = `AP-${format(new Date(), 'yyyyMMdd')}-${(appointmentCount + 1).toString().padStart(3, '0')}`;
    
    const appointment = await prisma.appointment.create({
      data: {
        ...data,
        appointmentNo,
        duration: parseInt(data.duration) || 60,
      }
    });

    await createAuditLog({
      action: 'CREATE',
      entity: 'Appointment',
      entityId: appointment.id,
      newData: appointment
    });

    revalidatePath('/appointments');
    return { success: true, data: appointment };
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return { success: false, error: 'Không thể tạo lịch hẹn' };
  }
}

export async function getDoctors() {
  try {
    return await prisma.staff.findMany({
      where: { role: 'DOCTOR', isActive: true },
      select: { id: true, fullName: true }
    });
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return [];
  }
}

export async function searchPatients(query: string) {
  try {
    return await prisma.patient.findMany({
      where: {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
          { patientCode: { contains: query, mode: 'insensitive' } },
        ]
      },
      select: { id: true, fullName: true, phone: true },
      take: 10
    });
  } catch (error) {
    return [];
  }
}
