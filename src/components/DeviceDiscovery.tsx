import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Search, Wifi, Radio, Zap } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'configuring';
  ip: string;
  lastSeen: string;
  protocols: {
    mms: boolean;
    goose: boolean;
    sv: boolean;
  };
}

export function DeviceDiscovery() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'IED_PROT_001',
      type: 'Protection IED',
      status: 'online',
      ip: '192.168.1.100',
      lastSeen: '2024-03-15 10:30:00',
      protocols: { mms: true, goose: true, sv: false }
    },
    {
      id: '2',
      name: 'IED_CTRL_002',
      type: 'Control IED',
      status: 'online',
      ip: '192.168.1.101',
      lastSeen: '2024-03-15 10:29:55',
      protocols: { mms: true, goose: false, sv: true }
    }
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="space-y-6">
      {/* Radar Scan Visualization */}
      <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-64 h-64 rounded-full border-2 border-blue-400 relative ${
            isScanning ? 'animate-pulse' : ''
          }`}>
            <div className={`absolute top-1/2 left-1/2 w-1 h-1/2 bg-blue-400 origin-bottom ${
              isScanning ? 'animate-spin' : ''
            }`} style={{ 
              transform: 'translate(-50%, -100%) rotate(0deg)',
              animationDuration: '2s' 
            }}></div>
            {devices.map((device, index) => (
              <div
                key={device.id}
                className="absolute w-3 h-3 bg-green-400 rounded-full"
                style={{
                  left: `${50 + Math.cos(index * Math.PI / 3) * 40}%`,
                  top: `${50 + Math.sin(index * Math.PI / 3) * 40}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>
        </div>
        {isScanning && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-200"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleScan}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? '扫描中...' : '扫描设备'}
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
            <Plus className="h-4 w-4 mr-2" />
            手动添加
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索设备..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-100">{device.name}</h3>
                <p className="text-sm text-gray-400">{device.ip}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                device.status === 'online' ? 'bg-green-100 text-green-800' :
                device.status === 'offline' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {device.status}
              </span>
            </div>
            
            {/* Protocol Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Wifi className={`h-4 w-4 mr-2 ${device.protocols.mms ? 'text-green-400' : 'text-gray-500'}`} />
                  <span>MMS</span>
                </div>
                <span className={device.protocols.mms ? 'text-green-400' : 'text-gray-500'}>
                  {device.protocols.mms ? '已连接' : '未连接'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Radio className={`h-4 w-4 mr-2 ${device.protocols.goose ? 'text-green-400' : 'text-gray-500'}`} />
                  <span>GOOSE</span>
                </div>
                <span className={device.protocols.goose ? 'text-green-400' : 'text-gray-500'}>
                  {device.protocols.goose ? '已发布' : '未发布'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Zap className={`h-4 w-4 mr-2 ${device.protocols.sv ? 'text-green-400' : 'text-gray-500'}`} />
                  <span>SV</span>
                </div>
                <span className={device.protocols.sv ? 'text-green-400' : 'text-gray-500'}>
                  {device.protocols.sv ? '已发布' : '未发布'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-end space-x-3">
                <button className="text-sm text-blue-400 hover:text-blue-300">配置</button>
                <button className="text-sm text-red-400 hover:text-red-300">删除</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}