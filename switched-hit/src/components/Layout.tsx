import React from 'react';

const Sidebar = () => (
  <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
    <h2 className="text-lg font-semibold mb-4">SwitchedHit</h2>
    <nav>
      <ul>
        <li><a href="/" className="block py-2">Dashboard</a></li>
        <li><a href="/team" className="block py-2">Team</a></li>
        <li><a href="/training" className="block py-2">Training</a></li>
        <li><a href="/league" className="block py-2">League</a></li>
      </ul>
    </nav>
  </aside>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;