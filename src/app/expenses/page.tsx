import { getExpenses, getFinancialSummary } from '@/actions/expenses';
import ExpensesClient from './ExpensesClient';

export default async function ExpensesPage() {
  const [expensesRes, summaryRes] = await Promise.all([
    getExpenses(),
    getFinancialSummary()
  ]);

  const expenses = expensesRes.success ? expensesRes.data : [];
  const summary = (summaryRes.success && summaryRes.data) ? summaryRes.data : {
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0
  };

  return <ExpensesClient initialExpenses={expenses} summary={summary} />;
}
