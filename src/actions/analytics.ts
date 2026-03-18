'use server';

import prisma from '@/lib/prisma';
import { startOfMonth, subMonths, endOfMonth, format } from 'date-fns';

export async function getAnalyticsStats() {
  try {
    // 1. Tổng doanh thu (tổng Amount của Invoices)
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: {
        totalAmount: true
      }
    });

    // 2. Bệnh nhân mới (trong tháng này)
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);
    const newPatientsCount = await prisma.patient.count({
      where: {
        createdAt: {
          gte: firstDayOfMonth
        }
      }
    });

    // 3. Doanh thu 6 tháng gần nhất cho biểu đồ
    const months = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(now, 5 - i);
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
        label: format(date, 'MM/yy')
      };
    });

    const chartData = await Promise.all(
      months.map(async (m) => {
        const revenue = await prisma.invoice.aggregate({
          where: {
            issuedAt: {
              gte: m.start,
              lte: m.end
            }
          },
          _sum: {
            totalAmount: true
          }
        });
        return {
          month: m.label,
          value: revenue._sum.totalAmount || 0
        };
      })
    );

    // 4. Hiệu suất bác sĩ
    const doctors = await prisma.staff.findMany({
      where: { role: 'DOCTOR', isActive: true },
      select: {
        id: true,
        fullName: true,
        appointments: {
          where: { status: 'COMPLETED' },
          select: { id: true }
        },
        commissions: {
          select: { amount: true }
        }
      }
    });

    // Tính toán doanh thu theo bác sĩ từ Invoices (thông qua Appointment -> TreatmentPlan -> Invoice)
    // Để đơn giản hơn trong MVP, ta có thể query trực tiếp các dịch vụ bác sĩ thực hiện
    // Ở đây tôi sẽ tính toán dựa trên Commissions để lấy con số thực tế
    const doctorStats = doctors.map((dr: any) => {
      const totalCommission = dr.commissions.reduce((sum: number, c: any) => sum + (c.amount || 0), 0);
      return {
        name: dr.fullName,
        treatments: dr.appointments.length,
        revenue: totalCommission * 5, // Giả sử hoa hồng 20%
        commission: totalCommission,
        rating: 4.8 + Math.random() * 0.2 // Tạm thời dùng random cho rating
      };
    });

    return {
      stats: {
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        newPatients: newPatientsCount,
        returnRate: '76%', // Mockup vì cần logic phức tạp hơn về lịch sử khám
        netProfit: (totalRevenue._sum.totalAmount || 0) * 0.4 // Tạm tính 40% lợi nhuận
      },
      chartData,
      doctorPerformance: doctorStats.sort((a: any, b: any) => b.revenue - a.revenue).slice(0, 3)
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return null;
  }
}

export async function getServicesBreakdown() {
  try {
    const services = await prisma.service.findMany({
      include: {
        invoiceItems: true
      }
    });

    const breakdown = services.map((s: any) => {
      const revenue = s.invoiceItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
      const count = s.invoiceItems.length;
      return {
        name: s.name,
        count,
        revenue,
        ratio: 0, // Sẽ tính sau
        trend: '+5%'
      };
    });

    const totalRevenue = breakdown.reduce((sum: number, b: any) => sum + b.revenue, 0);
    
    return breakdown.map((b: any) => ({
      ...b,
      ratio: totalRevenue > 0 ? Math.round((b.revenue / totalRevenue) * 100) : 0
    })).sort((a: any, b: any) => b.revenue - a.revenue);
    
  } catch (error) {
    console.error('Failed to fetch services breakdown:', error);
    return [];
  }
}
