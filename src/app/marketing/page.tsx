import { getCampaigns, getMarketingStats } from '@/actions/marketing';
import { getLoyaltySummary } from '@/actions/loyalty';
import MarketingClient from './MarketingClient';

export default async function MarketingGrowthPage() {
  const [campaignsRes, statsRes, loyaltyRes] = await Promise.all([
    getCampaigns(),
    getMarketingStats(),
    getLoyaltySummary()
  ]);

  const campaigns = (campaignsRes.success ? campaignsRes.data : []) as any[];
  const stats = (statsRes.success && statsRes.data) ? statsRes.data : {
    cac: 0,
    ltv: 0,
    totalReach: 0,
    totalLeads: 0,
    referralRate: 0
  };
  const loyalty = (loyaltyRes.success && loyaltyRes.data) ? loyaltyRes.data : {
    SILVER: 0,
    GOLD: 0,
    DIAMOND: 0
  };

  return <MarketingClient initialCampaigns={campaigns} stats={stats} loyaltySummary={loyalty} />;
}
