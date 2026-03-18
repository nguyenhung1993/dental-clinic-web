import { getInvoices } from '@/actions/billing';
import BillingClient from './BillingClient';

export default async function BillingPage() {
  const result = await getInvoices();
  const invoices = result.success ? result.data : [];

  return <BillingClient initialInvoices={invoices} />;
}
