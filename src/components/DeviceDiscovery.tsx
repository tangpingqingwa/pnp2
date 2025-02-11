import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, Plus, Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// 类型定义
type DeviceStatus = 'online' | 'offline' | 'configuring';
type ProtocolType = 'mms' | 'goose' | 'sv';

interface Device {
  id: string;
  mac: string;
  name: string;
  manufacturer: string;
  model: string;
  type: 'IED' | 'RTU' | 'HMI' | 'Gateway';
  status: DeviceStatus;
  ip: string;
  subnet: string;
  lastSeen: Date;
  protocols: Record<ProtocolType, boolean>;
}

// 模拟设备服务
const mockDeviceService = {
  scanDevices: async (range: string): Promise<Device[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return [...baseDevices, ...(range === '局域网扫描' ? [randomDevice()] : [])];
  },

  deleteDevice: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};

// 生成随机设备
const randomDevice = (): Device => ({
  id: uuidv4(),
  mac: `00:1B:44:11:3A:${Math.floor(Math.random() * 90 + 10)}`,
  name: `IED-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
  manufacturer: ['Siemens', 'ABB', 'GE', 'Schneider'][Math.floor(Math.random() * 4)],
  model: `VER${Math.floor(Math.random() * 5) + 1}.0`,
  type: ['IED', 'RTU', 'HMI', 'Gateway'][Math.floor(Math.random() * 4)] as Device['type'],
  status: Math.random() > 0.2 ? 'online' : 'offline',
  ip: `192.168.1.${Math.floor(Math.random() * 200) + 50}`,
  subnet: '255.255.255.0',
  lastSeen: new Date(),
  protocols: {
    mms: Math.random() > 0.5,
    goose: Math.random() > 0.5,
    sv: Math.random() > 0.5
  }
});

const baseDevices: Device[] = Array.from({ length: 3 }, randomDevice);

export function DeviceDiscovery() {
  // 状态管理
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanRange, setScanRange] = useState('局域网扫描');
  const [devices, setDevices] = useState<Device[]>(baseDevices);
  const [searchQuery, setSearchQuery] = useState('');
  const scanTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scanAnimationFrame = useRef<number>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 过滤后的设备列表
  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.ip.includes(searchQuery)
  );

  // 扫描处理
  const handleScan = useCallback(async () => {
    try {
      setScanState('scanning');
      setScanProgress(0);

      // 进度模拟
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 2, 100));
      }, 50);

      // 执行扫描
      const results = await mockDeviceService.scanDevices(scanRange);

      clearInterval(progressInterval);
      setScanProgress(100);
      setScanState('success');

      // 合并去重
      setDevices(prev => [
        ...prev,
        ...results.filter(newDev =>
          !prev.find(existingDev => existingDev.mac === newDev.mac)
        )
      ]);

      // 自动重置状态
      setTimeout(() => setScanState('idle'), 2000);
    } catch (error) {
      setScanState('error');
      console.error('扫描失败:', error);
    }
  }, [scanRange]);

  // 删除设备
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除该设备吗？')) return;
    const success = await mockDeviceService.deleteDevice(id);
    if (success) {
      setDevices(prev => prev.filter(d => d.id !== id));
    }
  };

  // 扫描动画
  const scanRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scanState === 'scanning' && scanRef.current) {
      let rotation = 0;

      const animate = () => {
        if (!scanRef.current) return;
        rotation = (rotation + 2) % 360;
        scanRef.current.style.transform = `rotate(${rotation}deg)`;
        scanAnimationFrame.current = requestAnimationFrame(animate);
      };

      animate();
      return () => cancelAnimationFrame(scanAnimationFrame.current!);
    }
  }, [scanState]);

  return (
    <div className="device-discovery-container">
      {/* 控制区域 */}
      <div className="control-area">
        <div className="scan-controls">
          <select
            className="scan-range-select"
            value={scanRange}
            onChange={(e) => setScanRange(e.target.value)}
          >
            <option value="局域网扫描">局域网扫描</option>
            <option value="特定 IP 范围">特定 IP 范围</option>
            <option value="自定义 IP">自定义 IP</option>
          </select>

          <button
            className={`scan-button ${scanState === 'scanning' ? 'loading' : ''}`}
            onClick={handleScan}
            disabled={scanState === 'scanning'}
          >
            <RefreshCw className="scan-icon" size={20} />
            {scanState === 'scanning' ? `扫描中 (${scanProgress}%)` : '开始扫描'}
          </button>
        </div>

        <div className="search-controls">
          <button
            className="add-device-button"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Plus className="plus-icon" size={16} />
            手动添加
          </button>

          <div className="search-input">
            <input
              type="text"
              placeholder="搜索设备..."
              className="search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <Search className="search-icon" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 状态指示 */}
      <div className="radar-container">
        <div className={`radar ${scanState === 'scanning' ? 'scanning' : ''}`}>
          <div className="radar-sweep" ref={scanRef} />
          {filteredDevices.map((device, i) => (
            <div
              key={device.id}
              className="radar-blip"
              style={{
                '--angle': `${(i * 72) % 360}deg`,
                '--distance': `${Math.min(80, i * 15)}%`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* 设备列表 */}
      <div className="devices-grid">
        {filteredDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* 空状态 */}
      {filteredDevices.length === 0 && (
        <div className="no-devices-indicator">
          <div className="no-devices-text">未找到设备</div>
          <button className="rescan-button" onClick={handleScan}>
            <RefreshCw className="rescan-icon" size={26} />
            重新扫描
          </button>
        </div>
      )}

      {/* 添加模态框 */}
      <AddDeviceModal
        ref={dialogRef}
        onAdd={(newDev) => setDevices(prev => [...prev, newDev])}
      />
    </div>
  );
}

// 设备卡片组件
const DeviceCard = React.memo(({ device, onDelete }: {
  device: Device;
  onDelete: (id: string) => void;
}) => {
  const statusColor = {
    online: '#10B981',
    offline: '#f43f5e',
    configuring: '#eab308'
  }[device.status];

  return (
    <div className="device-card">
      <div className="device-card-content">
        <div className="device-info">
          <h2 className="device-name">
            {device.name}
            <div className="status-indicator" style={{ backgroundColor: statusColor }}></div>
          </h2>
          <p className="device-details">
            {device.manufacturer} {device.model}
          </p>
          <p className="device-address">
            {device.ip} · {device.mac}
          </p>
        </div>
        <div className="device-actions">
          <div className="device-actions-menu">
            <button>配置协议</button>
            <button>查看日志</button>
          </div>
          <button className="delete-button" onClick={() => onDelete(device.id)}>
            删除设备
          </button>
        </div>
      </div>
      {/* 协议状态 */}
      <div className="protocols-container">
        {Object.entries(device.protocols).map(([proto, active]) => (
          <div
            key={proto}
            className={`protocol-chip ${active ? 'active' : ''}`}
          >
            {proto.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="last-seen-info">
        最后在线: {device.lastSeen.toLocaleString()}
      </div>
    </div>
  );
});

// 添加设备模态框
const AddDeviceModal = React.forwardRef<HTMLDialogElement, {
  onAdd: (device: Device) => void
}>(({ onAdd }, ref) => {
  const [formData, setFormData] = useState({
    ip: '',
    mac: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...randomDevice(),
      ...formData,
      id: uuidv4(),
      status: 'configuring',
      lastSeen: new Date()
    });
    (ref as React.MutableRefObject<HTMLDialogElement>).current?.close();
  };

  return (
    <dialog ref={ref} className="add-device-modal">
      <div className="modal-content">
        <h3 className="modal-title">手动添加设备</h3>

        <form className="add-device-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>设备名称</label>
            <input
              className="input-field"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>IP 地址</label>
            <input
              className="input-field"
              type="text"
              pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
              required
              value={formData.ip}
              onChange={(e) => setFormData(p => ({ ...p, ip: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>MAC 地址</label>
            <input
              className="input-field"
              type="text"
              pattern="([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}"
              required
              value={formData.mac}
              onChange={(e) => setFormData(p => ({ ...p, mac: e.target.value }))}
            />
          </div>
          <div className="modal-actions">
            <button className="cancel-button" type="button" onClick={() => (ref as React.MutableRefObject<HTMLDialogElement>).current?.close()}>
              取消
            </button>
            <button className="submit-button" type="submit">
              添加设备
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});