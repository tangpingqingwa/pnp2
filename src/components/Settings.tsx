import React from 'react';
import { Shield, Bell, Globe, Users } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium mb-6">系统设置</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-blue-400" />
              <h4 className="text-sm font-medium text-gray-400 uppercase">安全设置</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  加密方式
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500">
                  <option>TLS 1.3</option>
                  <option>TLS 1.2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  证书更新周期（天）
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="30"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-yellow-400" />
              <h4 className="text-sm font-medium text-gray-400 uppercase">通知设置</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                <span className="text-sm">设备离线通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                <span className="text-sm">配置变更通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-green-400" />
              <h4 className="text-sm font-medium text-gray-400 uppercase">系统设置</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  系统语言
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500">
                  <option>简体中文</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  时区设置
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500">
                  <option>(GMT+08:00) 北京</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-purple-400" />
              <h4 className="text-sm font-medium text-gray-400 uppercase">用户管理</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                <div>
                  <p className="text-sm font-medium">管理员</p>
                  <p className="text-xs text-gray-400">完全控制权限</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300">管理</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                <div>
                  <p className="text-sm font-medium">操作员</p>
                  <p className="text-xs text-gray-400">基本操作权限</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300">管理</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}