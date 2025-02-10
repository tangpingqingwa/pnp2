import React from 'react';
import { Settings, Save, RotateCw } from 'lucide-react';

export function DeviceConfiguration() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">设备配置</h3>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              保存配置
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              <RotateCw className="h-4 w-4 mr-2" />
              重置
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400 uppercase">基本设置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="IED_PROT_001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备描述
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="保护装置 1 号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  IP 地址
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="192.168.1.100"
                />
              </div>
            </div>
          </div>

          {/* Communication Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400 uppercase">通信设置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  通信协议
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500">
                  <option>MMS</option>
                  <option>GOOSE</option>
                  <option>SMV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  端口号
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="102"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  超时时间 (ms)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                  defaultValue="1000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Model */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-400 uppercase mb-4">数据模型</h4>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">逻辑节点</span>
            </div>
            <div className="space-y-2">
              {['MMXU1', 'PTOC1', 'XCBR1'].map((node, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded">
                  <span className="text-sm">{node}</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300">配置</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}