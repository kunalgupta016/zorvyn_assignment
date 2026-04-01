import { useApp } from '../../context/AppContext';
import { Menu, Moon, Sun, ChevronDown } from 'lucide-react';

const pageTitles = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Topbar({ onMenuClick }) {
  const { role, setRole, theme, toggleTheme, activePage } = useApp();

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="topbar__group">
          <button onClick={onMenuClick} className="topbar__icon-button topbar__menu" aria-label="Toggle menu">
            <Menu size={20} />
          </button>
          <h1 className="topbar__title">{pageTitles[activePage] || 'Dashboard'}</h1>
        </div>

        <div className="topbar__group">
          <button onClick={toggleTheme} className="topbar__icon-button" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="topbar__role">
            <div className={`topbar__role-dot ${role === 'admin' ? 'is-admin' : 'is-viewer'}`} />
            <div className="topbar__role-field">
              <select
                id="role-switcher"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="topbar__select"
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown size={14} className="topbar__select-icon" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
