import React, { useState } from 'react';
import { FolderTree, FlipHorizontal as DragDropHorizontal, Settings2 } from 'lucide-react';

interface SCLNode {
  id: string;
  name: string;
  type: 'IED' | 'LDevice' | 'LN' | 'DO';
  children?: SCLNode[];
  expanded?: boolean;
}

export function SCLConfiguration() {
  const [sclData, setSclData] = useState<SCLNode[]>([
    {
      id: '1',
      name: 'IED_PROT_001',
      type: 'IED',
      expanded: true,
      children: [
        {
          id: '1-1',
          name: 'PROT',
          type: 'LDevice',
          expanded: true,
          children: [
            {
              id: '1-1-1',
              name: 'MMXU1',
              type: 'LN',
              children: [
                { id: '1-1-1-1', name: 'Amp', type: 'DO' },
                { id: '1-1-1-2', name: 'Vol', type: 'DO' },
              ]
            },
            {
              id: '1-1-2',
              name: 'PTOC1',
              type: 'LN',
              children: [
                { id: '1-1-2-1', name: 'Str', type: 'DO' },
                { id: '1-1-2-2', name: 'Op', type: 'DO' },
              ]
            }
          ]
        }
      ]
    }
  ]);

  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setSclData(prev => {
      const updateNode = (nodes: SCLNode[]): SCLNode[] => {
        return nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, expanded: !node.expanded };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prev);
    });
  };

  const renderNode = (node: SCLNode, level: number = 0) => {
    const TypeIcon = node.type === 'IED' ? Settings2 :
                    node.type === 'LDevice' ? FolderTree :
                    node.type === 'LN' ? DragDropHorizontal : 
                    Settings2;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer ${
            draggedNode === node.id ? 'opacity-50' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          draggable={node.type === 'LN'}
          onDragStart={() => setDraggedNode(node.id)}
          onDragEnd={() => setDraggedNode(null)}
          onClick={() => node.children && toggleNode(node.id)}
        >
          <TypeIcon className="h-4 w-4 mr-2 text-blue-400" />
          <span className="text-sm">{node.name}</span>
          {node.type === 'LN' && (
            <span className="ml-2 text-xs text-gray-400">{node.type}</span>
          )}
        </div>
        {node.children && node.expanded && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* SCL Tree */}
      <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium mb-4">SCL 配置树</h3>
        <div className="space-y-1">
          {sclData.map(node => renderNode(node))}
        </div>
      </div>

      {/* Mapping Area */}
      <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium mb-4">数据映射</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h4 className="text-sm font-medium text-gray-400 mb-2">源数据对象</h4>
            <div className="min-h-[200px] border-2 border-dashed border-gray-600 rounded p-4">
              <p className="text-sm text-gray-400">拖拽逻辑节点到此处...</p>
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h4 className="text-sm font-medium text-gray-400 mb-2">目标数据对象</h4>
            <div className="min-h-[200px] border-2 border-dashed border-gray-600 rounded p-4">
              <p className="text-sm text-gray-400">拖拽逻辑节点到此处...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}