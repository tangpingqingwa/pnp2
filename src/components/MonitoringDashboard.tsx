import React from 'react';
import { Activity, Battery, Cpu, Thermometer } from 'lucide-react';

export function MonitoringDashboard() {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-400" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">设备在线率</h3>
              <p className="text-2xl font-semibold text-gray-100">98.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <Battery className="h-8 w-8 text-green-400" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">系统负载</h3>
              <p className="text-2xl font-semibold text-gray-100">65%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <Cpu className="h-8 w-8 text-yellow-400" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">活跃设备</h3>
              <p className="text-2xl font-semibold text-gray-100">24</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <Thermometer className="h-8 w-8 text-red-400" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">告警数量</h3>
              <p className="text-2xl font-semibold text-gray-100">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-4">设备状态监控</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-md">
                <div>
                  <p className="font-medium">IED_PROT_00{i}</p>
                  <p className="text-sm text-gray-400">192.168.1.10{i}</p>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm">正常运行</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-4">最近事件</h3>
          <div className="space-y-4">
            {[
              { time: '10:30:00', event: '设备 IED_PROT_001 配置更新成功', type: 'success' },
              { time: '10:25:15', event: '新设备接入: IED_CTRL_003', type: 'info' },
              { time: '10:20:00', event: '设备 IED_PROT_002 通信中断', type: 'error' },
            ].map((event, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className={`h-2 w-2 mt-2 rounded-full ${
                  event.type === 'success' ? 'bg-green-400' :
                  event.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-400">{event.time}</p>
                  <p className="text-sm">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}