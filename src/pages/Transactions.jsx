import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportToCSV } from '../utils/helpers';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionsTable from '../components/transactions/TransactionsTable';
import TransactionModal from '../components/transactions/TransactionModal';

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

export default function Transactions() {
  const { role, filteredTransactions, addTransaction, updateTransaction } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const handleAdd = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingTx) {
      updateTransaction(editingTx.id, data);
    } else {
      addTransaction(data);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="page page--transactions">
      <motion.div variants={sectionVariants} className="transactions-header">
        <div className="transactions-header__copy">
          <p className="transactions-header__meta">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="transactions-header__actions">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exportToCSV(filteredTransactions)}
            className="button button--ghost"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </motion.button>

          {role === 'admin' && (
            <motion.button
              id="add-transaction-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="button button--primary"
            >
              <Plus size={16} />
              <span>Add Transaction</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <TransactionFilters />
      <TransactionsTable onEdit={handleEdit} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTx(null);
        }}
        onSave={handleSave}
        transaction={editingTx}
      />
    </motion.div>
  );
}
