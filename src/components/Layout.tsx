import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">DemoApp</h1>
      <div className="flex gap-4">
        {/* Replace with Lucide icons */}
        <button aria-label="Search" className="text-gray-500 hover:text-black">
          <span>🔍</span>
        </button>
        <button aria-label="Help" className="text-gray-500 hover:text-black">
          <span>❓</span>
        </button>
        <button
          aria-label="Notifications"
          className="text-gray-500 hover:text-black"
        >
          <span>🔔</span>
        </button>
      </div>
    </header>
    <main className="container mx-auto px-2 py-6">{children}</main>
  </div>
);

export default Layout;
