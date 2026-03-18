import { getBranches } from '@/actions/branches';
import BranchesClient from './BranchesClient';

export default async function BranchesPage() {
  const result = await getBranches();
  const branches = result.success ? (result.data ?? []) : [];

  return <BranchesClient initialBranches={branches} />;
}
