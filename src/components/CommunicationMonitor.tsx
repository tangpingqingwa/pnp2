import React, { useState, useEffect } from 'react';
import { Terminal, Radio, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'mms' | 'goose' | 'sv';
  timestamp: string;
  source: string;
  destination: string;
  content: string;
}

export function CommunicationMonitor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'mms' | 'goose' | 'sv'>('mms');

  useEffect(() => {
    // Simulate receiving messages
    const interval = setInterval(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: ['mms', 'goose', 'sv'][Math.floor(Math.random() * 3)] as 'mms' | 'goose' | 'sv',
        timestamp: new Date().toISOString(),
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        destination: `192.168.1.${Math.floor(Math.random() * 255)}`,
        content: `Sample ${activeTab.toUpperCase()} message content`
      };
      
      setMessages(prev => [newMessage, ...prev].slice(0, 100));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Protocol Tabs */}
      <div className="flex space-x-4 bg-gray-800 p-2 rounded-lg">
        <button
          onClick={() => setActiveTab('mms')}
          className={`flex items-center px-4 py-2 rounded ${
            activeTab === 'mms' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Terminal className="h-4 w-4 mr-2" />
          MMS
        </button>
        <button
          onClick={() => setActiveTab('goose')}
          className={`flex items-center px-4 py-2 rounded ${
            activeTab === 'goose' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Radio className="h-4 w-4 mr-2" />
          GOOSE
        </button>
        <button
          onClick={() => setActiveTab('sv')}
          className={`flex items-center px-4 py-2 rounded ${
            activeTab === 'sv' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Zap className="h-4 w-4 mr-2" />
          SV
        </button>
      </div>

      {/* Message Waterfall */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium">通信监控</h3>
        </div>
        <div className="h-[600px] overflow-y-auto">
          {messages
            .filter(msg => msg.type === activeTab)
            .map((message) => (
              <div
                key={message.id}
                className="p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{message.timestamp}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    message.type === 'mms' ? 'bg-blue-100 text-blue-800' :
                    message.type === 'goose' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {message.type.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <span className="text-xs text-gray-400">Source:</span>
                    <span className="ml-2 text-sm">{message.source}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Destination:</span>
                    <span className="ml-2 text-sm">{message.destination}</span>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-700 rounded font-mono text-sm">
                  {message.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}