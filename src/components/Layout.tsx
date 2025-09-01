import React from "react";
import { Search, HelpCircle, Bell } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">DemoApp</h1>
      <div className="flex gap-4">
        <button aria-label="Search" className="text-gray-500 hover:text-black">
          <Search className="w-5 h-5" />
        </button>
        <button aria-label="Help" className="text-gray-500 hover:text-black">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          aria-label="Notifications"
          className="text-gray-500 hover:text-black"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
      {/*children start rendering*/}
    <main className="container mx-auto px-2 py-6">{children}</main>
  </div>
);

export default Layout;
