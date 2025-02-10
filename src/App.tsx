import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DeviceDiscovery } from './components/DeviceDiscovery';
import { SCLConfiguration } from './components/SCLConfiguration';
import { CommunicationMonitor } from './components/CommunicationMonitor';
import { Settings } from './components/Settings';
import { Activity, FileCode, Radio, Settings2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('discovery');

  const navigation = [
    { id: 'discovery', name: '设备发现', icon: Activity },
    { id: 'scl', name: 'SCL配置', icon: FileCode },
    { id: 'monitor', name: '通信监控', icon: Radio },
    { id: 'settings', name: '系统设置', icon: Settings2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'discovery':
        return <DeviceDiscovery />;
      case 'scl':
        return <SCLConfiguration />;
      case 'monitor':
        return <CommunicationMonitor />;
      case 'settings':
        return <Settings />;
      default:
        return <DeviceDiscovery />;
    }
  };

  return (
    <Layout 
      navigation={navigation} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;