'use server';

import prisma from '@/lib/prisma';
import { CampaignStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

export async function getCampaigns() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: campaigns };
  } catch (error) {
    console.error('getCampaigns error:', error);
    return { success: false, error: 'Không thể tải danh sách chiến dịch' };
  }
}

export async function createCampaign(data: any) {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    await createAuditLog({
      action: 'CREATE',
      entity: 'Campaign',
      entityId: campaign.id,
      newData: campaign,
    });

    revalidatePath('/marketing');
    return { success: true, data: campaign };
  } catch (error) {
    console.error('createCampaign error:', error);
    return { success: false, error: 'Không thể tạo chiến dịch mới' };
  }
}

export async function getMarketingStats() {
  try {
    const campaigns = await prisma.campaign.findMany();
    
    // Tính toán sơ bộ từ dữ liệu thực tế
    const totalReach = campaigns.reduce((sum, c) => sum + c.actualReach, 0);
    const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    
    // CAC = Tổng ngân sách / Tổng Leads (giả định lead = khách hàng mới cho đơn giản)
    const cac = totalLeads > 0 ? totalBudget / totalLeads : 0;
    
    // LTV: Lấy trung bình doanh thu trên mỗi bệnh nhân từ Invoice
    const invoiceStats = await prisma.invoice.aggregate({
      _avg: {
        totalAmount: true
      }
    });
    const avgLtv = invoiceStats._avg.totalAmount || 0;

    return {
      success: true,
      data: {
        cac,
        ltv: avgLtv,
        totalReach,
        totalLeads,
        referralRate: 1.4, // Mock vì chưa có quan hệ referral trong DB
      }
    };
  } catch (error) {
    console.error('getMarketingStats error:', error);
    return { success: false, error: 'Không thể tính toán chỉ số Marketing' };
  }
}
