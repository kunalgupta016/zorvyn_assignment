import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="app-scroll">
          <div className="app-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
