import { CATEGORIES } from '../data/categories';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getMonthlyData(transactions) {
  const monthMap = {};

  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  sorted.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    if (!monthMap[key]) {
      monthMap[key] = { month: label, income: 0, expenses: 0, balance: 0 };
    }

    if (t.type === 'income') {
      monthMap[key].income += t.amount;
    } else {
      monthMap[key].expenses += t.amount;
    }
    monthMap[key].balance = monthMap[key].income - monthMap[key].expenses;
  });

  const months = Object.keys(monthMap).sort();
  let cumulative = 0;
  return months.map((key) => {
    cumulative += monthMap[key].balance;
    return { ...monthMap[key], cumulativeBalance: cumulative };
  });
}

export function getCategoryData(transactions) {
  const catMap = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      if (!catMap[t.category]) {
        catMap[t.category] = 0;
      }
      catMap[t.category] += t.amount;
    });

  return Object.entries(catMap)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      color: CATEGORIES[name]?.color || '#9ca3af',
    }))
    .sort((a, b) => b.value - a.value);
}

export function getInsights(transactions) {
  const categoryData = getCategoryData(transactions);
  const monthlyData = getMonthlyData(transactions);
  const insights = [];

  if (categoryData.length > 0) {
    insights.push({
      title: 'Top Spending Category',
      value: categoryData[0].name,
      detail: `You spent ${formatCurrency(categoryData[0].value)} on ${categoryData[0].name}`,
      type: 'warning',
    });
  }

  if (monthlyData.length >= 2) {
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const expDiff = current.expenses - previous.expenses;
    const pct = previous.expenses > 0 ? ((expDiff / previous.expenses) * 100).toFixed(1) : 0;

    insights.push({
      title: 'Monthly Spending Trend',
      value: expDiff > 0 ? `+${pct}%` : `${pct}%`,
      detail: expDiff > 0
        ? `Spending increased by ${formatCurrency(Math.abs(expDiff))} vs last month`
        : `Spending decreased by ${formatCurrency(Math.abs(expDiff))} vs last month`,
      type: expDiff > 0 ? 'danger' : 'success',
    });
  }

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  if (totalIncome > 0) {
    const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
    insights.push({
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      detail: `You've saved ${formatCurrency(totalIncome - totalExpenses)} out of ${formatCurrency(totalIncome)} earned`,
      type: Number(savingsRate) >= 20 ? 'success' : 'warning',
    });
  }

  const incomeSources = transactions.filter((t) => t.type === 'income');
  const salaryIncome = incomeSources.filter((t) => t.category === 'Salary').reduce((s, t) => s + t.amount, 0);
  const freelanceIncome = incomeSources.filter((t) => t.category === 'Freelance').reduce((s, t) => s + t.amount, 0);

  if (freelanceIncome > 0 && salaryIncome > 0) {
    const freelancePct = ((freelanceIncome / (salaryIncome + freelanceIncome)) * 100).toFixed(0);
    insights.push({
      title: 'Income Diversification',
      value: `${freelancePct}% freelance`,
      detail: `Freelance contributes ${formatCurrency(freelanceIncome)} alongside your salary`,
      type: 'info',
    });
  }

  return insights;
}

export function exportToCSV(transactions) {
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
  const rows = transactions.map((t) => [t.date, t.description, t.amount, t.category, t.type]);
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateId() {
  return Date.now() + Math.random();
}
