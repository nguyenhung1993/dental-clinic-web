'use server';

import prisma from '@/lib/prisma';
import { ExpenseCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        branch: {
          select: { name: true }
        },
        staff: {
          select: { fullName: true }
        }
      },
      orderBy: {
        date: 'desc',
      },
    });
    return { success: true, data: expenses };
  } catch (error) {
    console.error('getExpenses error:', error);
    return { success: false, error: 'Không thể tải danh sách chi phí' };
  }
}

export async function createExpense(data: any) {
  try {
    const expense = await prisma.expense.create({
      data,
    });
    await createAuditLog({
      action: 'CREATE',
      entity: 'Expense',
      entityId: expense.id,
      newData: expense,
    });
    
    revalidatePath('/expenses');
    revalidatePath('/analytics'); // Chi phí ảnh hưởng đến P&L trong analytics
    return { success: true, data: expense };
  } catch (error) {
    console.error('createExpense error:', error);
    return { success: false, error: 'Không thể tạo phiếu chi' };
  }
}

export async function getFinancialSummary() {
  try {
    // Giả định doanh thu từ Invoice
    const revenueResult = await prisma.invoice.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentStatus: 'PAID', // Chỉ tính doanh thu đã thu thực tế? Hoặc tất cả?
      }
    });

    const expenseResult = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      }
    });

    const totalRevenue = revenueResult._sum.totalAmount || 0;
    const totalExpenses = expenseResult._sum.amount || 0;
    const netProfit = totalRevenue - totalExpenses;

    return {
      success: true,
      data: {
        totalRevenue,
        totalExpenses,
        netProfit,
        profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
      }
    };
  } catch (error) {
    console.error('getFinancialSummary error:', error);
    return { success: false, error: 'Không thể tải tóm tắt tài chính' };
  }
}
