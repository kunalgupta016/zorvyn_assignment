import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function InsightCard({ icon: Icon, title, value, detail, type = 'info', index = 0 }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.08)' }}
      className={`surface-card insight-card insight-card--${type}`}
    >
      <div className="insight-card__body">
        <div className="insight-card__icon">
          <Icon size={20} />
        </div>
        <div className="insight-card__copy">
          <p className="insight-card__title">{title}</p>
          <p className="insight-card__value">{value}</p>
          <p className="insight-card__detail">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}
