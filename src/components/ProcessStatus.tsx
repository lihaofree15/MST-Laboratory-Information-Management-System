import React from 'react';
import { FlaskConical, Beaker, Microscope, Activity } from 'lucide-react';

const processes = [
  { name: '细胞培养', status: 'active', count: 8, icon: Microscope },
  { name: '发酵生产', status: 'active', count: 3, icon: FlaskConical },
  { name: '纯化工艺', status: 'warning', count: 2, icon: Beaker },
  { name: '质量检测', status: 'active', count: 5, icon: Activity },
];

const statusConfig = {
  active: { color: 'text-green-600', bg: 'bg-green-50', label: '正常' },
  warning: { color: 'text-yellow-600', bg: 'bg-yellow-50', label: '注意' },
  error: { color: 'text-red-600', bg: 'bg-red-50', label: '异常' }
};

export const ProcessStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">工艺状态监控</h3>
      
      <div className="space-y-4">
        {processes.map((process, index) => {
          const config = statusConfig[process.status as keyof typeof statusConfig];
          const Icon = process.icon;
          
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{process.name}</p>
                  <p className={`text-xs ${config.color}`}>{config.label}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{process.count}</p>
                <p className="text-xs text-gray-500">进行中</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">总工艺数</span>
          <span className="font-medium">{processes.reduce((acc, p) => acc + p.count, 0)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">正常运行</span>
          <span className="font-medium text-green-600">
            {processes.filter(p => p.status === 'active').reduce((acc, p) => acc + p.count, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};