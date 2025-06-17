import React, { useState } from 'react';
import { Plus, Beaker, Search, Filter, CheckCircle, AlertTriangle, Clock, Activity, Wrench, Calendar, BarChart3, Download, Upload } from 'lucide-react';

const chromatographyResins = [
  {
    id: 'CHR-2024-001',
    name: 'Protein A Sepharose 4 Fast Flow',
    type: '蛋白A亲和树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap Protein A HP',
    serialNumber: 'PA240115001',
    resinVolume: '5mL',
    particleSize: '34μm',
    status: '使用中',
    location: '层析系统CHROM-001',
    installDate: '2024-01-10',
    lastUse: '2024-01-16',
    cycleCount: 25,
    maxCycles: 200,
    bindingCapacity: '35 mg/mL',
    workingPH: '7.0-8.5',
    storageCondition: '2-8°C, 20% 乙醇',
    notes: '运行正常，结合容量稳定',
    project: 'PRJ-2024-001',
    operator: '张工程师',
    efficiency: 95,
    maintenanceHistory: [
      { date: '2024-01-15', action: '清洗再生', operator: '张工程师', result: '正常' },
      { date: '2024-01-10', action: '安装调试', operator: '李技师', result: '正常' }
    ]
  },
  {
    id: 'CHR-2024-002',
    name: 'SP Sepharose Fast Flow',
    type: '阳离子交换树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap SP HP',
    serialNumber: 'SP240112002',
    resinVolume: '5mL',
    particleSize: '34μm',
    status: '空闲',
    location: '层析系统CHROM-002',
    installDate: '2024-01-12',
    lastUse: '2024-01-14',
    cycleCount: 15,
    maxCycles: 150,
    bindingCapacity: '120 mg/mL',
    workingPH: '4.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
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
    id: 'CHR-2024-003',
    name: 'Q Sepharose Fast Flow',
    type: '阴离子交换树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap Q HP',
    serialNumber: 'Q240108003',
    resinVolume: '5mL',
    particleSize: '34μm',
    status: '维护中',
    location: '维护间',
    installDate: '2024-01-08',
    lastUse: '2024-01-15',
    cycleCount: 45,
    maxCycles: 150,
    bindingCapacity: '140 mg/mL',
    workingPH: '6.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
    notes: '结合容量下降，正在检查',
    project: 'PRJ-2024-003',
    operator: '张工程师',
    efficiency: 78,
    maintenanceHistory: [
      { date: '2024-01-16', action: '容量检测', operator: '赵工程师', result: '异常' },
      { date: '2024-01-15', action: '异常停机', operator: '张工程师', result: '异常' }
    ]
  },
  {
    id: 'CHR-2024-004',
    name: 'Superdex 200 Increase',
    type: '分子筛树脂',
    manufacturer: 'Cytiva',
    model: 'HiLoad 16/600',
    serialNumber: 'SD240105004',
    resinVolume: '120mL',
    particleSize: '13μm',
    status: '使用中',
    location: '层析系统CHROM-003',
    installDate: '2024-01-05',
    lastUse: '2024-01-16',
    cycleCount: 35,
    maxCycles: 100,
    bindingCapacity: 'N/A',
    workingPH: '3.0-12.0',
    storageCondition: '2-8°C, 20% 乙醇',
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
    id: 'CHR-2024-005',
    name: 'Phenyl Sepharose 6 Fast Flow',
    type: '疏水相互作用树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap Phenyl HP',
    serialNumber: 'PH240103005',
    resinVolume: '5mL',
    particleSize: '34μm',
    status: '库存',
    location: '层析树脂储存柜',
    installDate: null,
    lastUse: null,
    cycleCount: 0,
    maxCycles: 120,
    bindingCapacity: '20-40 mg/mL',
    workingPH: '5.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
    notes: '新树脂，未使用',
    project: null,
    operator: null,
    efficiency: null,
    maintenanceHistory: [
      { date: '2024-01-03', action: '入库验收', operator: '库管员', result: '正常' }
    ]
  },
  {
    id: 'CHR-2024-006',
    name: 'CM Sepharose Fast Flow',
    type: '阳离子交换树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap CM FF',
    serialNumber: 'CM240118006',
    resinVolume: '5mL',
    particleSize: '90μm',
    status: '使用中',
    location: '层析系统CHROM-004',
    installDate: '2024-01-18',
    lastUse: '2024-01-18',
    cycleCount: 8,
    maxCycles: 180,
    bindingCapacity: '100 mg/mL',
    workingPH: '4.0-8.0',
    storageCondition: '2-8°C, 20% 乙醇',
    notes: '新安装，运行良好',
    project: 'PRJ-2024-004',
    operator: '陈技师',
    efficiency: 94,
    maintenanceHistory: [
      { date: '2024-01-18', action: '安装调试', operator: '李技师', result: '正常' }
    ]
  },
  {
    id: 'CHR-2024-007',
    name: 'DEAE Sepharose Fast Flow',
    type: '阴离子交换树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap DEAE FF',
    serialNumber: 'DE240120007',
    resinVolume: '5mL',
    particleSize: '90μm',
    status: '空闲',
    location: '层析系统CHROM-005',
    installDate: '2024-01-20',
    lastUse: '2024-01-20',
    cycleCount: 3,
    maxCycles: 160,
    bindingCapacity: '130 mg/mL',
    workingPH: '6.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
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
    id: 'CHR-2024-008',
    name: 'Ni Sepharose 6 Fast Flow',
    type: '金属螯合树脂',
    manufacturer: 'Cytiva',
    model: 'HiTrap Ni FF',
    serialNumber: 'NI240122008',
    resinVolume: '5mL',
    particleSize: '90μm',
    status: '报废',
    location: '报废区',
    installDate: '2023-10-15',
    lastUse: '2024-01-10',
    cycleCount: 118,
    maxCycles: 120,
    bindingCapacity: '40 mg/mL',
    workingPH: '4.0-8.0',
    storageCondition: null,
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
  '库存': { color: 'text-gray-600', bg: 'bg-gray-50', icon: Beaker },
  '报废': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const typeColors = {
  '蛋白A亲和树脂': 'bg-purple-100 text-purple-800',
  '阳离子交换树脂': 'bg-blue-100 text-blue-800',
  '阴离子交换树脂': 'bg-green-100 text-green-800',
  '分子筛树脂': 'bg-orange-100 text-orange-800',
  '疏水相互作用树脂': 'bg-pink-100 text-pink-800',
  '金属螯合树脂': 'bg-indigo-100 text-indigo-800'
};

export const ChromatographyResins: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedResin, setSelectedResin] = useState<typeof chromatographyResins[0] | null>(null);
  const [showNewResinModal, setShowNewResinModal] = useState(false);

  const filteredResins = chromatographyResins.filter(resin => {
    return (searchTerm === '' || resin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            resin.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedType === '' || resin.type === selectedType) &&
           (selectedStatus === '' || resin.status === selectedStatus);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">层析柱管理</h1>
          <p className="text-gray-600">管理层析柱树脂的使用、维护和生命周期追踪</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </button>
          <button 
            onClick={() => setShowNewResinModal(true)}
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
              <Beaker className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">层析柱总数</p>
              <p className="text-2xl font-bold text-gray-900">{chromatographyResins.length}</p>
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
                {chromatographyResins.filter(c => c.status === '使用中').length}
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
                {chromatographyResins.filter(c => c.status === '维护中').length}
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
                {Math.round(chromatographyResins.filter(c => c.cycleCount > 0).reduce((acc, c) => acc + (c.cycleCount / c.maxCycles * 100), 0) / chromatographyResins.filter(c => c.cycleCount > 0).length)}%
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
                {chromatographyResins.filter(c => c.status === '维护中' || (c.cycleCount / c.maxCycles) > 0.8).length}
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
              <option value="蛋白A亲和树脂">蛋白A亲和树脂</option>
              <option value="阳离子交换树脂">阳离子交换树脂</option>
              <option value="阴离子交换树脂">阴离子交换树脂</option>
              <option value="分子筛树脂">分子筛树脂</option>
              <option value="疏水相互作用树脂">疏水相互作用树脂</option>
              <option value="金属螯合树脂">金属螯合树脂</option>
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
              {filteredResins.map((resin) => {
                const config = statusConfig[resin.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                const usagePercentage = resin.cycleCount > 0 ? (resin.cycleCount / resin.maxCycles) * 100 : 0;

                return (
                  <div
                    key={resin.id}
                    onClick={() => setSelectedResin(resin)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedResin?.id === resin.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{resin.name}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color} flex-shrink-0`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>序列号: {resin.serialNumber}</div>
                      <div>类型: {resin.type}</div>
                      <div>使用次数: {resin.cycleCount}/{resin.maxCycles}</div>
                      {resin.project && <div>项目: {resin.project}</div>}
                    </div>
                    {resin.cycleCount > 0 && (
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
          {selectedResin ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedResin.name}</h3>
                  <p className="text-sm text-gray-600">{selectedResin.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[selectedResin.type as keyof typeof typeColors]}`}>
                    {selectedResin.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedResin.status as keyof typeof statusConfig].bg} ${statusConfig[selectedResin.status as keyof typeof statusConfig].color}`}>
                    {selectedResin.status}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">制造商:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.manufacturer}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">型号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.model}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">序列号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.serialNumber}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">树脂体积:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.resinVolume}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">粒径:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.particleSize}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">位置:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.location}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">安装日期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.installDate || '-'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">最后使用:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.lastUse || '-'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">关联项目:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.project || '-'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">当前操作员:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.operator || '-'}</div>
                  </div>
                </div>
              </div>

              {/* 使用情况 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">使用情况</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">使用次数</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedResin.cycleCount}</div>
                    <div className="text-xs text-gray-500">/ {selectedResin.maxCycles} 次</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">结合容量</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedResin.bindingCapacity}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">工作pH</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedResin.workingPH}</div>
                  </div>
                  {selectedResin.efficiency && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600">分离效率</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedResin.efficiency}%</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 储存条件 */}
              {selectedResin.storageCondition && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">储存条件</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedResin.storageCondition}
                  </div>
                </div>
              )}

              {/* 备注 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">备注</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedResin.notes}
                </div>
              </div>

              {/* 维护历史 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">维护历史</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedResin.maintenanceHistory.map((record, index) => (
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
                {selectedResin.status === '空闲' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    开始使用
                  </button>
                )}
                {selectedResin.status === '使用中' && (
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
              <Beaker className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个层析柱查看详情</p>
            </div>
          )}
        </div>
      </div>

      {/* 新增层析柱模态框 */}
      {showNewResinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">新增层析柱</h2>
              <button 
                onClick={() => setShowNewResinModal(false)}
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
                    树脂类型 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择类型</option>
                    <option value="蛋白A亲和树脂">蛋白A亲和树脂</option>
                    <option value="阳离子交换树脂">阳离子交换树脂</option>
                    <option value="阴离子交换树脂">阴离子交换树脂</option>
                    <option value="分子筛树脂">分子筛树脂</option>
                    <option value="疏水相互作用树脂">疏水相互作用树脂</option>
                    <option value="金属螯合树脂">金属螯合树脂</option>
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
                    树脂体积
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
                    结合容量
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="如：35 mg/mL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    工作pH范围
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="如：7.0-8.5"
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
                  储存条件
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="如：2-8°C, 20% 乙醇"
                />
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
                  onClick={() => setShowNewResinModal(false)}
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