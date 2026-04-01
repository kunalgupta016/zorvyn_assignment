import { useApp } from '../../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ isOpen, onClose }) {
  const { activePage, setActivePage } = useApp();

  const handleNav = (id) => {
    setActivePage(id);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-row">
            <div className="sidebar__logo">
              <span>Z</span>
            </div>
            <span className="sidebar__title">Zorvyn</span>
          </div>
          <button onClick={onClose} className="sidebar__close" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`sidebar__link ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__copyright">© 2026 Zorvyn</p>
        </div>
      </aside>
    </>
  );
}
