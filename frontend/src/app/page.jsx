'use client';

import { useState, useEffect, useRef } from 'react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const cards = [
    { title: 'Send Money', emoji: '💸', color: 'bg-primary' },
    { title: 'Mobile Recharge', emoji: '📱', color: 'bg-secondary' },
    { title: 'Cashout', emoji: '🏧', color: 'bg-accent' },
    { title: 'Make Payment', emoji: '💳', color: 'bg-info' },
    { title: 'Pay Bill', emoji: '🧾', color: 'bg-success' },
    { title: 'Transactions', emoji: '📊', color: 'bg-warning' },
    { title: 'Rewards', emoji: '🎁', color: 'bg-error' },
    { title: 'Support', emoji: '🛎️', color: 'bg-neutral' },
    { title: 'Settings', emoji: '⚙️', color: 'bg-info' },
  ];

  const userBalance = 3450.75;

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-base-100 border-r border-base-300 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-center">eWallet</h2>
          <nav className="flex flex-col gap-4">
            <a href="#" className="btn btn-ghost justify-start">
              Dashboard
            </a>
            <a href="#" className="btn btn-ghost justify-start">
              Profile
            </a>
            <a href="#" className="btn btn-ghost justify-start">
              Transactions
            </a>
            <a href="#" className="btn btn-ghost justify-start">
              Settings
            </a>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-base-100 border-b border-base-300 p-4">
          <button
            aria-label="Toggle sidebar"
            className="btn btn-square btn-ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '⬅️' : '➡️'}
          </button>

          <div className="text-xl font-semibold">Dashboard</div>

          <div className="flex items-center space-x-4">
            <div className="font-semibold">
              Balance: <span className="text-primary">${userBalance.toFixed(2)}</span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn btn-circle btn-ghost text-2xl"
                aria-label="User menu"
              >
                👤
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-40 bg-base-100 border border-base-300 rounded shadow-lg z-10">
                  <a href="#" className="block px-4 py-2 hover:bg-base-200">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-base-200">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-base-200 text-error">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cards Grid */}
        <main className="p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map(({ title, emoji, color }) => (
              <div
                key={title}
                className={`card ${color} shadow-lg text-white hover:scale-105 transform transition-transform cursor-pointer`}
              >
                <div className="card-body flex items-center space-x-4">
                  <div className="text-4xl">{emoji}</div>
                  <h3 className="card-title text-lg font-semibold">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
