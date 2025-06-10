import React, { useState } from 'react';
import { Plus, Package, Search, Filter, CheckCircle, AlertTriangle, Clock, Activity } from 'lucide-react';

const columns = [
  {
    id: 'COL-2024-001',
    name: 'Protein A Sepharose 4 Fast Flow',
    type: '蛋白A亲和柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap Protein A HP',
    serialNumber: 'PA240115001',
    columnSize: '5mL',
    particleSize: '34μm',
    status: '使用中',
    location: '层析系统CHROM-001',
    installDate: '2024-01-10',
    lastUse: '2024-01-16',
    cycleCount: 25,
    maxCycles: 200,
    pressure: '0.3 MPa',
    flowRate: '5 mL/min',
    bufferSystem: 'PBS/柠檬酸',
    notes: '运行正常，压力稳定',
    maintenanceHistory: [
      { date: '2024-01-15', action: '清洗再生', operator: '张工程师' },
      { date: '2024-01-10', action: '安装调试', operator: '李技师' }
    ]
  },
  {
    id: 'COL-2024-002',
    name: 'SP Sepharose Fast Flow',
    type: '阳离子交换柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap SP HP',
    serialNumber: 'SP240112002',
    columnSize: '5mL',
    particleSize: '34μm',
    status: '空闲',
    location: '层析系统CHROM-002',
    installDate: '2024-01-12',
    lastUse: '2024-01-14',
    cycleCount: 15,
    maxCycles: 150,
    pressure: '0.2 MPa',
    flowRate: '3 mL/min',
    bufferSystem: '醋酸钠/NaCl',
    notes: '已清洗，待下次使用',
    maintenanceHistory: [
      { date: '2024-01-14', action: '清洗保存', operator: '王分析师' },
      { date: '2024-01-12', action: '安装调试', operator: '李技师' }
    ]
  },
  {
    id: 'COL-2024-003',
    name: 'Q Sepharose Fast Flow',
    type: '阴离子交换柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap Q HP',
    serialNumber: 'Q240108003',
    columnSize: '5mL',
    particleSize: '34μm',
    status: '维护中',
    location: '维护间',
    installDate: '2024-01-08',
    lastUse: '2024-01-15',
    cycleCount: 45,
    maxCycles: 150,
    pressure: '0.4 MPa',
    flowRate: '4 mL/min',
    bufferSystem: 'Tris-HCl/NaCl',
    notes: '压力异常，正在检查',
    maintenanceHistory: [
      { date: '2024-01-16', action: '压力检查', operator: '赵工程师' },
      { date: '2024-01-15', action: '异常停机', operator: '张工程师' }
    ]
  },
  {
    id: 'COL-2024-004',
    name: 'Superdex 200 Increase',
    type: '分子筛柱',
    manufacturer: 'Cytiva',
    model: 'HiLoad 16/600',
    serialNumber: 'SD240105004',
    columnSize: '120mL',
    particleSize: '13μm',
    status: '使用中',
    location: '层析系统CHROM-003',
    installDate: '2024-01-05',
    lastUse: '2024-01-16',
    cycleCount: 35,
    maxCycles: 100,
    pressure: '0.5 MPa',
    flowRate: '1 mL/min',
    bufferSystem: 'PBS',
    notes: '分离效果良好',
    maintenanceHistory: [
      { date: '2024-01-10', action: '清洗维护', operator: '孙分析师' },
      { date: '2024-01-05', action: '安装调试', operator: '李技师' }
    ]
  },
  {
    id: 'COL-2024-005',
    name: 'Phenyl Sepharose 6 Fast Flow',
    type: '疏水相互作用柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap Phenyl HP',
    serialNumber: 'PH240103005',
    columnSize: '5mL',
    particleSize: '34μm',
    status: '库存',
    location: '色谱柱储存柜',
    installDate: null,
    lastUse: null,
    cycleCount: 0,
    maxCycles: 120,
    pressure: null,
    flowRate: null,
    bufferSystem: null,
    notes: '新柱，未使用',
    maintenanceHistory: [
      { date: '2024-01-03', action: '入库验收', operator: '库管员' }
    ]
  }
];

const statusConfig = {
  '使用中': { color: 'text-green-600', bg: 'bg-green-50', icon: Activity },
  '空闲': { color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
  '维护中': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '库存': { color: 'text-gray-600', bg: 'bg-gray-50', icon: Package },
  '报废': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const typeColors = {
  '蛋白A亲和柱': 'bg-purple-100 text-purple-800',
  '阳离子交换柱': 'bg-blue-100 text-blue-800',
  '阴离子交换柱': 'bg-green-100 text-green-800',
  '分子筛柱': 'bg-orange-100 text-orange-800',
  '疏水相互作用柱': 'bg-pink-100 text-pink-800'
};

export const ChromatographyColumnManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<typeof columns[0] | null>(null);

  const filteredColumns = columns.filter(column => {
    return (searchTerm === '' || column.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            column.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedType === '' || column.type === selectedType);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">色谱柱管理</h1>
          <p className="text-gray-600">管理层析色谱柱的使用、维护和生命周期</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新增色谱柱</span>
        </button>
      </div>

      {/* 色谱柱统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">色谱柱总数</p>
              <p className="text-2xl font-bold text-gray-900">{columns.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">使用中</p>
              <p className="text-2xl font-bold text-gray-900">
                {columns.filter(c => c.status === '使用中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">维护中</p>
              <p className="text-2xl font-bold text-gray-900">
                {columns.filter(c => c.status === '维护中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均使用率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(columns.reduce((acc, c) => acc + (c.cycleCount / c.maxCycles * 100), 0) / columns.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索色谱柱名称或序列号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有类型</option>
              <option value="蛋白A亲和柱">蛋白A亲和柱</option>
              <option value="阳离子交换柱">阳离子交换柱</option>
              <option value="阴离子交换柱">阴离子交换柱</option>
              <option value="分子筛柱">分子筛柱</option>
              <option value="疏水相互作用柱">疏水相互作用柱</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 色谱柱列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">色谱柱列表</h3>
            <div className="space-y-4">
              {filteredColumns.map((column) => {
                const config = statusConfig[column.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                const usagePercentage = (column.cycleCount / column.maxCycles) * 100;

                return (
                  <div
                    key={column.id}
                    onClick={() => setSelectedColumn(column)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedColumn?.id === column.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{column.name}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>序列号: {column.serialNumber}</div>
                      <div>类型: {column.type}</div>
                      <div>使用次数: {column.cycleCount}/{column.maxCycles}</div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>使用率</span>
                        <span>{Math.round(usagePercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            usagePercentage > 80 ? 'bg-red-600' : 
                            usagePercentage > 60 ? 'bg-yellow-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 色谱柱详情 */}
        <div className="lg:col-span-2">
          {selectedColumn ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedColumn.name}</h3>
                  <p className="text-sm text-gray-600">{selectedColumn.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[selectedColumn.type as keyof typeof typeColors]}`}>
                    {selectedColumn.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedColumn.status as keyof typeof statusConfig].bg} ${statusConfig[selectedColumn.status as keyof typeof statusConfig].color}`}>
                    {selectedColumn.status}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">制造商:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.manufacturer}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">型号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.model}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">序列号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.serialNumber}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">柱体积:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.columnSize}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">粒径:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.particleSize}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">位置:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.location}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">安装日期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.installDate || '-'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">最后使用:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.lastUse || '-'}</div>
                  </div>
                </div>
              </div>

              {/* 使用情况 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">使用情况</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">使用次数</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedColumn.cycleCount}</div>
                    <div className="text-xs text-gray-500">/ {selectedColumn.maxCycles} 次</div>
                  </div>
                  {selectedColumn.pressure && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600">当前压力</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedColumn.pressure}</div>
                    </div>
                  )}
                  {selectedColumn.flowRate && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600">流速</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedColumn.flowRate}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 缓冲液系统 */}
              {selectedColumn.bufferSystem && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">缓冲液系统</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedColumn.bufferSystem}
                  </div>
                </div>
              )}

              {/* 备注 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">备注</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedColumn.notes}
                </div>
              </div>

              {/* 维护历史 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">维护历史</h4>
                <div className="space-y-2">
                  {selectedColumn.maintenanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.action}</div>
                        <div className="text-xs text-gray-600">操作员: {record.operator}</div>
                      </div>
                      <div className="text-xs text-gray-500">{record.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                {selectedColumn.status === '空闲' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    开始使用
                  </button>
                )}
                {selectedColumn.status === '使用中' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    停止使用
                  </button>
                )}
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  维护记录
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个色谱柱查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};