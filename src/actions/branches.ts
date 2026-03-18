'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getBranches() {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        _count: {
          select: {
            patients: true,
            staff: true,
            appointments: true,
          }
        }
      },
      orderBy: {
        name: 'asc',
      },
    });
    return { success: true, data: branches };
  } catch (error) {
    console.error('getBranches error:', error);
    return { success: false, error: 'Không thể tải danh sách chi nhánh' };
  }
}

export async function getBranchStats() {
  try {
    const branches = await prisma.branch.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            patients: true,
            staff: true,
          }
        }
      }
    });

    const totalStats = {
      totalBranches: branches.length,
      totalPatients: branches.reduce((sum, b) => sum + b._count.patients, 0),
      totalStaff: branches.reduce((sum, b) => sum + b._count.staff, 0),
    };

    return { success: true, data: { branches, totalStats } };
  } catch (error) {
    console.error('getBranchStats error:', error);
    return { success: false, error: 'Không thể tải thống kê chi nhánh' };
  }
}
