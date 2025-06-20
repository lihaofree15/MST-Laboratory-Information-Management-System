import React, { useState } from 'react';
import { Plus, Package, Search, Filter, CheckCircle, AlertTriangle, Clock, Activity, Wrench, Calendar, BarChart3, Download, Upload } from 'lucide-react';

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
    project: 'PRJ-2024-001',
    operator: '张工程师',
    efficiency: 95,
    maintenanceHistory: [
      { date: '2024-01-15', action: '清洗再生', operator: '张工程师', result: '正常' },
      { date: '2024-01-10', action: '安装调试', operator: '李技师', result: '正常' }
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
    project: 'PRJ-2024-002',
    operator: '王分析师',
    efficiency: 92,
    maintenanceHistory: [
      { date: '2024-01-14', action: '清洗保存', operator: '王分析师', result: '正常' },
      { date: '2024-01-12', action: '安装调试', operator: '李技师', result: '正常' }
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
    project: 'PRJ-2024-003',
    operator: '张工程师',
    efficiency: 78,
    maintenanceHistory: [
      { date: '2024-01-16', action: '压力检查', operator: '赵工程师', result: '异常' },
      { date: '2024-01-15', action: '异常停机', operator: '张工程师', result: '异常' }
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
    project: 'PRJ-2024-001',
    operator: '孙分析师',
    efficiency: 96,
    maintenanceHistory: [
      { date: '2024-01-10', action: '清洗维护', operator: '孙分析师', result: '正常' },
      { date: '2024-01-05', action: '安装调试', operator: '李技师', result: '正常' }
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
    project: null,
    operator: null,
    efficiency: null,
    maintenanceHistory: [
      { date: '2024-01-03', action: '入库验收', operator: '库管员', result: '正常' }
    ]
  },
  {
    id: 'COL-2024-006',
    name: 'CM Sepharose Fast Flow',
    type: '阳离子交换柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap CM FF',
    serialNumber: 'CM240118006',
    columnSize: '5mL',
    particleSize: '90μm',
    status: '使用中',
    location: '层析系统CHROM-004',
    installDate: '2024-01-18',
    lastUse: '2024-01-18',
    cycleCount: 8,
    maxCycles: 180,
    pressure: '0.25 MPa',
    flowRate: '4 mL/min',
    bufferSystem: '磷酸钠/NaCl',
    notes: '新安装，运行良好',
    project: 'PRJ-2024-004',
    operator: '陈技师',
    efficiency: 94,
    maintenanceHistory: [
      { date: '2024-01-18', action: '安装调试', operator: '李技师', result: '正常' }
    ]
  },
  {
    id: 'COL-2024-007',
    name: 'DEAE Sepharose Fast Flow',
    type: '阴离子交换柱',
    manufacturer: 'Cytiva',
    model: 'HiTrap DEAE FF',
    serialNumber: 'DE240120007',
    columnSize: '5mL',
    particleSize: '90μm',
    status: '空闲',
    location: '层析系统CHROM-005',
    installDate: '2024-01-20',
    lastUse: '2024-01-20',
    cycleCount: 3,
    maxCycles: 160,
    pressure: '0.18 MPa',
    flowRate: '3.5 mL/min',
    bufferSystem: 'Tris-HCl',
    notes: '测试完成，待正式使用',
    project: 'PRJ-2024-005',
    operator: '刘分析师',
    efficiency: 91,
    maintenanceHistory: [
      { date: '2024-01-20', action: '性能测试', operator: '刘分析师', result: '正常' },
      { date: '2024-01-20', action: '安装调试', operator: '李技师', result: '正常' }
    ]
  },
  {
    id: 'COL-2024-008',
    name: 'Superdex 75 Increase',
    type: '分子筛柱',
    manufacturer: 'Cytiva',
    model: 'HiLoad 16/600',
    serialNumber: 'S75240122008',
    columnSize: '120mL',
    particleSize: '13μm',
    status: '报废',
    location: '报废区',
    installDate: '2023-10-15',
    lastUse: '2024-01-10',
    cycleCount: 98,
    maxCycles: 100,
    pressure: null,
    flowRate: null,
    bufferSystem: null,
    notes: '使用寿命到期，已报废',
    project: null,
    operator: null,
    efficiency: null,
    maintenanceHistory: [
      { date: '2024-01-22', action: '报废处理', operator: '设备管理员', result: '已报废' },
      { date: '2024-01-10', action: '最后使用', operator: '周分析师', result: '性能下降' }
    ]
  }
];

const statusConfig = {
  '使用中': { color: 'text-green-600', bg: 'bg-green-50', icon: Activity },
  '空闲': { color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
  '维护中': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Wrench },
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
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<typeof columns[0] | null>(null);
  const [showNewColumnModal, setShowNewColumnModal] = useState(false);

  const filteredColumns = columns.filter(column => {
    return (searchTerm === '' || column.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            column.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedType === '' || column.type === selectedType) &&
           (selectedStatus === '' || column.status === selectedStatus);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">层析柱管理</h1>
          <p className="text-gray-600">管理层析色谱柱的使用、维护和生命周期追踪</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </button>
          <button 
            onClick={() => setShowNewColumnModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>新增层析柱</span>
          </button>
        </div>
      </div>

      {/* 层析柱统计 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">层析柱总数</p>
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
              <Wrench className="h-6 w-6 text-yellow-600" />
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
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均使用率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(columns.filter(c => c.cycleCount > 0).reduce((acc, c) => acc + (c.cycleCount / c.maxCycles * 100), 0) / columns.filter(c => c.cycleCount > 0).length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">需要关注</p>
              <p className="text-2xl font-bold text-gray-900">
                {columns.filter(c => c.status === '维护中' || (c.cycleCount / c.maxCycles) > 0.8).length}
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
                placeholder="搜索层析柱名称或序列号..."
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
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="使用中">使用中</option>
              <option value="空闲">空闲</option>
              <option value="维护中">维护中</option>
              <option value="库存">库存</option>
              <option value="报废">报废</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 层析柱列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">层析柱列表</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredColumns.map((column) => {
                const config = statusConfig[column.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                const usagePercentage = column.cycleCount > 0 ? (column.cycleCount / column.maxCycles) * 100 : 0;

                return (
                  <div
                    key={column.id}
                    onClick={() => setSelectedColumn(column)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedColumn?.id === column.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{column.name}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color} flex-shrink-0`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>序列号: {column.serialNumber}</div>
                      <div>类型: {column.type}</div>
                      <div>使用次数: {column.cycleCount}/{column.maxCycles}</div>
                      {column.project && <div>项目: {column.project}</div>}
                    </div>
                    {column.cycleCount > 0 && (
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 层析柱详情 */}
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
                  <div>
                    <span className="text-sm text-gray-600">粒径:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.particleSize}</div>
                  </div>
                </div>
                <div className="space-y-3">
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
                  <div>
                    <span className="text-sm text-gray-600">关联项目:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.project || '-'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">当前操作员:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedColumn.operator || '-'}</div>
                  </div>
                </div>
              </div>

              {/* 使用情况 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">使用情况</h4>
                <div className="grid grid-cols-4 gap-4">
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
                  {selectedColumn.efficiency && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600">分离效率</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedColumn.efficiency}%</div>
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
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedColumn.maintenanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.action}</div>
                        <div className="text-xs text-gray-600">操作员: {record.operator} | 结果: {record.result}</div>
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
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  性能测试
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  生成报告
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个层析柱查看详情</p>
            </div>
          )}
        </div>
      </div>

      {/* 新增层析柱模态框 */}
      {showNewColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">新增层析柱</h2>
              <button 
                onClick={() => setShowNewColumnModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    层析柱名称 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入层析柱名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    层析柱类型 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择类型</option>
                    <option value="蛋白A亲和柱">蛋白A亲和柱</option>
                    <option value="阳离子交换柱">阳离子交换柱</option>
                    <option value="阴离子交换柱">阴离子交换柱</option>
                    <option value="分子筛柱">分子筛柱</option>
                    <option value="疏水相互作用柱">疏水相互作用柱</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    制造商 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入制造商"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    型号 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入型号"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    序列号 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入序列号"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    柱体积
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="如：5mL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    粒径
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="如：34μm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    最大使用次数
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入最大使用次数"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    存放位置
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入存放位置"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    关联项目
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择关联项目</option>
                    <option value="PRJ-2024-001">Anti-CD20单抗工艺开发</option>
                    <option value="PRJ-2024-002">CHO细胞株稳定性验证</option>
                    <option value="PRJ-2024-003">纯化工艺优化项目</option>
                    <option value="PRJ-2024-004">新型ADC抗体开发</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  备注
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入备注信息"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewColumnModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加层析柱
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};