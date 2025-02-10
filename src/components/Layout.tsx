import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface LayoutProps {
  children: React.ReactNode;
  navigation: NavigationItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, navigation, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <h1 className="text-xl font-bold text-blue-400">IEC 61850</h1>
            <p className="text-sm text-gray-400">即插即用配置系统</p>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {navigation.find(item => item.id === activeTab)?.name}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">系统状态: 正常</span>
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}