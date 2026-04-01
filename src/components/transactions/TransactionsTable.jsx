import { motion } from 'framer-motion';
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight, Inbox } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CATEGORIES } from '../../data/categories';

const tableVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const rowVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { duration: 0.25, delay: i * 0.03 },
  }),
};

export default function TransactionsTable({ onEdit }) {
  const { filteredTransactions, role, deleteTransaction } = useApp();

  if (filteredTransactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="surface-card empty-state"
      >
        <Inbox size={48} className="empty-state__icon" />
        <h3 className="empty-state__title">No transactions found</h3>
        <p className="empty-state__text">Try adjusting your filters or add a new transaction.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="surface-card table-card"
    >
      <div className="table-card__scroll">
        <table className="table-card__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="is-right">Amount</th>
              {role === 'admin' && <th className="is-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, i) => (
              <motion.tr key={t.id} custom={i} variants={rowVariants} initial="hidden" animate="visible">
                <td className="table-card__muted">{formatDate(t.date)}</td>
                <td>
                  <div className="tx-row__description">
                    <div className={`tx-row__type tx-row__type--${t.type}`}>
                      {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                    <span className="tx-row__name">{t.description}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="tx-badge"
                    style={{ '--category-color': CATEGORIES[t.category]?.color || '#94a3b8' }}
                  >
                    <span className="tx-badge__dot" />
                    {t.category}
                  </span>
                </td>
                <td className="is-right">
                  <span className={`tx-row__amount tx-row__amount--${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="is-right">
                    <div className="tx-row__actions">
                      <button onClick={() => onEdit(t)} className="icon-action icon-action--edit" aria-label="Edit transaction">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteTransaction(t.id)} className="icon-action icon-action--delete" aria-label="Delete transaction">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
