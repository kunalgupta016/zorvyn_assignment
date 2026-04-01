import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CATEGORY_LIST } from '../../data/categories';
import { generateId } from '../../utils/helpers';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
};

export default function TransactionModal({ isOpen, onClose, onSave, transaction }) {
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    date: '',
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        date: transaction.date,
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
      });
    } else {
      setForm({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;

    const data = {
      id: transaction?.id || generateId(),
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
    };

    onSave(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-shell">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="modal-shell__backdrop"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="modal-card"
          >
            <div className="modal-card__header">
              <h2 className="modal-card__title">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
              <button onClick={onClose} className="icon-action" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-card__form">
              <div className="form-group">
                <label htmlFor="modal-description" className="form-label">Description</label>
                <input
                  id="modal-description"
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Grocery Shopping"
                  required
                  className="field__control"
                />
              </div>

              <div className="modal-card__split">
                <div className="form-group">
                  <label htmlFor="modal-amount" className="form-label">Amount ($)</label>
                  <input
                    id="modal-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="0.00"
                    required
                    className="field__control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-date" className="form-label">Date</label>
                  <input
                    id="modal-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="field__control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Type</label>
                <div className="type-toggle">
                  {['expense', 'income'].map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setForm({ ...form, type })}
                      className={`type-toggle__button ${form.type === type ? `is-${type}` : ''}`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-category" className="form-label">Category</label>
                <select
                  id="modal-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="field__control"
                >
                  {CATEGORY_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="modal-card__actions">
                <button type="button" onClick={onClose} className="button button--ghost">
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="button button--primary"
                >
                  {isEdit ? 'Save Changes' : 'Add Transaction'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
