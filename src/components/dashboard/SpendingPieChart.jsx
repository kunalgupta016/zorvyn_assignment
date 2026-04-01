import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryData, formatCurrency } from '../../utils/helpers';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__title">{d.name}</p>
      <p className="chart-tooltip__value">{formatCurrency(d.value)}</p>
    </div>
  );
}

export default function SpendingPieChart() {
  const { transactions } = useApp();
  const data = useMemo(() => getCategoryData(transactions), [transactions]);
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="surface-card chart-card"
    >
      <h3 className="chart-card__title">Spending by Category</h3>
      <p className="chart-card__subtitle">Expense distribution</p>

      <div className="pie-card__layout">
        <div className="pie-card__chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-card__legend">
          {data.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              className="pie-card__legend-item"
            >
              <div className="pie-card__legend-dot" style={{ '--legend-color': item.color }} />
              <div className="pie-card__legend-copy">
                <p className="pie-card__legend-name">{item.name}</p>
                <p className="pie-card__legend-value">
                  {((item.value / total) * 100).toFixed(0)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
