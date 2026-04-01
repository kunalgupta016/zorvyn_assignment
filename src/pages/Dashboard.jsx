import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceChart from '../components/dashboard/BalanceChart';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard() {
  const { totals } = useApp();

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="page page--dashboard">
      <motion.div variants={sectionVariants} className="dashboard-summary-grid">
        <SummaryCard
          icon={Wallet}
          label="Total Balance"
          value={formatCurrency(totals.balance)}
          variant="default"
          trendLabel="Current net balance"
          index={0}
        />
        <SummaryCard
          icon={TrendingUp}
          label="Total Income"
          value={formatCurrency(totals.income)}
          variant="income"
          trendLabel="All time income"
          index={1}
        />
        <SummaryCard
          icon={TrendingDown}
          label="Total Expenses"
          value={formatCurrency(totals.expenses)}
          variant="expense"
          trendLabel="All time spending"
          index={2}
        />
      </motion.div>

      <motion.div variants={sectionVariants} className="dashboard-charts-grid">
        <div className="dashboard-charts-grid__main">
          <BalanceChart />
        </div>
        <div className="dashboard-charts-grid__side">
          <SpendingPieChart />
        </div>
      </motion.div>
    </motion.div>
  );
}
