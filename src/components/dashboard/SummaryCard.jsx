import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SummaryCard({ icon: Icon, label, value, trend, trendLabel, variant = 'default', index = 0 }) {
  const trendClass = trend > 0 ? 'is-positive' : trend < 0 ? 'is-negative' : 'is-neutral';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.08)' }}
      className={`surface-card summary-card summary-card--${variant}`}
    >
      <div className="summary-card__header">
        <div className="summary-card__icon">
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`summary-card__trend ${trendClass}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>

      <p className="summary-card__label">{label}</p>
      <p className="summary-card__value">{value}</p>

      {trendLabel && <p className="summary-card__meta">{trendLabel}</p>}
    </motion.div>
  );
}
