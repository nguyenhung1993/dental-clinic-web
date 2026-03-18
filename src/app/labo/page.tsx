import { getLaboOrders } from '@/actions/labo';
import LaboClient from './LaboClient';

export default async function LaboPage() {
  const result = await getLaboOrders();
  const orders = result.success ? result.data : [];

  return <LaboClient initialOrders={orders} />;
}
