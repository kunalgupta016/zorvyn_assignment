import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, TrendingDown, PiggyBank, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInsights } from '../utils/helpers';
import InsightCard from '../components/insights/InsightCard';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';

const insightIcons = {
  'Top Spending Category': ShoppingCart,
  'Monthly Spending Trend': TrendingDown,
  'Savings Rate': PiggyBank,
  'Income Diversification': Briefcase,
};

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

export default function Insights() {
  const { transactions } = useApp();
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="page page--insights">
      <motion.div variants={sectionVariants} className="insights-grid">
        {insights.map((insight, i) => (
          <InsightCard
            key={insight.title}
            icon={insightIcons[insight.title] || ShoppingCart}
            title={insight.title}
            value={insight.value}
            detail={insight.detail}
            type={insight.type}
            index={i}
          />
        ))}
      </motion.div>

      <motion.div variants={sectionVariants}>
        <MonthlyComparisonChart />
      </motion.div>
    </motion.div>
  );
}
