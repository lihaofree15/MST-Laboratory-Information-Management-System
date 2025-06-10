import React from 'react';
import { Plus, Microscope, Thermometer, Droplets, Calendar } from 'lucide-react';

const cellLines = [
  {
    id: 'CHO-001',
    name: 'CHO-K1-Anti-CD20',
    parentLine: 'CHO-K1',
    antibody: 'Anti-CD20 mAb',
    status: '稳定表达',
    passage: 'P25',
    viability: 95.2,
    density: '2.1×10⁶',
    lastPassage: '2024-01-15',
    freezeStock: 15,
    notes: '高产量稳定细胞株，适合大规模生产'
  },
  {
    id: 'CHO-002',
    name: 'CHO-S-Anti-PD1',
    parentLine: 'CHO-S',
    antibody: 'Anti-PD1 mAb',
    status: '筛选中',
    passage: 'P8',
    viability: 88.7,
    density: '1.8×10⁶',
    lastPassage: '2024-01-14',
    freezeStock: 8,
    notes: '正在进行单克隆筛选和扩增'
  },
  {
    id: 'HEK-001',
    name: 'HEK293-Anti-HER2',
    parentLine: 'HEK293',
    antibody: 'Anti-HER2 ADC',
    status: '转染验证',
    passage: 'P3',
    viability: 92.1,
    density: '1.5×10⁶',
    lastPassage: '2024-01-13',
    freezeStock: 3,
    notes: '瞬时转染验证表达水平'
  }
];

const statusConfig = {
  '稳定表达': { color: 'text-green-600', bg: 'bg-green-50', label: '稳定表达' },
  '筛选中': { color: 'text-yellow-600', bg: 'bg-yellow-50', label: '筛选中' },
  '转染验证': { color: 'text-blue-600', bg: 'bg-blue-50', label: '转染验证' },
  '冻存': { color: 'text-gray-600', bg: 'bg-gray-50', label: '冻存' }
};

export const CellLineManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">细胞株管理</h1>
          <p className="text-gray-600">管理抗体表达细胞株的培养、传代和冻存</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建细胞株</span>
        </button>
      </div>

      {/* Cell Line Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cellLines.map((cellLine) => {
          const config = statusConfig[cellLine.status as keyof typeof statusConfig];

          return (
            <div key={cellLine.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Microscope className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cellLine.name}</h3>
                    <p className="text-sm text-gray-600">{cellLine.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">亲本细胞株</p>
                  <p className="text-sm font-medium text-gray-900">{cellLine.parentLine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">表达抗体</p>
                  <p className="text-sm font-medium text-gray-900">{cellLine.antibody}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">传代数</p>
                  <p className="text-sm font-medium text-gray-900">{cellLine.passage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">冻存管数</p>
                  <p className="text-sm font-medium text-gray-900">{cellLine.freezeStock} 管</p>
                </div>
              </div>

              {/* Culture Parameters */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">活力</p>
                  <p className="text-sm font-semibold text-gray-900">{cellLine.viability}%</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Thermometer className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">密度</p>
                  <p className="text-sm font-semibold text-gray-900">{cellLine.density}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">上次传代</p>
                  <p className="text-sm font-semibold text-gray-900">{cellLine.lastPassage}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">备注</p>
                <p className="text-sm text-gray-700">{cellLine.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  培养记录
                </button>
                <button className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                  传代
                </button>
                <button className="px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
                  冻存
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {cellLines.length}
          </div>
          <div className="text-sm text-gray-600">活跃细胞株</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {cellLines.filter(c => c.status === '稳定表达').length}
          </div>
          <div className="text-sm text-gray-600">稳定表达株</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {cellLines.reduce((acc, c) => acc + c.freezeStock, 0)}
          </div>
          <div className="text-sm text-gray-600">冻存管总数</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            {Math.round(cellLines.reduce((acc, c) => acc + c.viability, 0) / cellLines.length)}%
          </div>
          <div className="text-sm text-gray-600">平均活力</div>
        </div>
      </div>
    </div>
  );
};