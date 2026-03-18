'use server';

import prisma from '@/lib/prisma';
import { LoyaltyTier } from '@prisma/client';

export async function getLoyaltySummary() {
  try {
    const tiers = await prisma.patientLoyalty.groupBy({
      by: ['tier'],
      _count: {
        id: true,
      },
    });

    const summary = {
      SILVER: 0,
      GOLD: 0,
      DIAMOND: 0,
    };

    tiers.forEach((item) => {
      summary[item.tier as keyof typeof summary] = item._count.id;
    });

    // Nếu db trống, trả về mock data để demo giao diện đẹp
    const hasData = Object.values(summary).some(val => val > 0);
    if (!hasData) {
      return {
        success: true,
        data: {
          SILVER: 1240,
          GOLD: 840,
          DIAMOND: 124,
          isMock: true
        }
      };
    }

    return { success: true, data: summary };
  } catch (error) {
    console.error('getLoyaltySummary error:', error);
    return { success: false, error: 'Không thể tải thống kê Loyalty' };
  }
}
