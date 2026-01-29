import React from 'react';
import { Users, ClipboardList, Trophy, Settings, PlayCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isDark }) => {
  const tabs = [
    { id: 'players', label: 'Jogadores', icon: Users },
    { id: 'attendance', label: 'Presença', icon: ClipboardList },
    { id: 'match', label: 'Partida', icon: PlayCircle },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col h-full">
        {/* Header */}
        <header className="bg-pitch-600 dark:bg-pitch-800 text-white p-4 shadow-lg sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center gap-2">
              ⚽ FutManager Pro
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 pb-24">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe z-50">
          <div className="max-w-5xl mx-auto flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-3 w-full transition-colors ${
                    isActive
                      ? 'text-pitch-600 dark:text-pitch-400 font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs mt-1">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};