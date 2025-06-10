import React, { useState } from 'react';
import { Plus, Package, Search, Filter, CheckCircle, AlertTriangle, Clock, Beaker } from 'lucide-react';

const resins = [
  {
    id: 'RES-2024-001',
    name: 'Protein A Sepharose 4 Fast Flow',
    type: '蛋白A亲和介质',
    manufacturer: 'Cytiva',
    batchNo: 'PA240115001',
    quantity: 500,
    unit: 'mL',
    concentration: '50% slurry',
    location: '介质储存柜-A区',
    expiryDate: '2025-12-31',
    status: '在库',
    cost: 25000.00,
    minStock: 100,
    maxStock: 1000,
    bindingCapacity: '35 mg/mL',
    workingPH: '7.0-8.5',
    storageCondition: '2-8°C, 20% 乙醇',
    applications: ['抗体纯化', 'Fc融合蛋白纯化'],
    specifications: {
      particleSize: '45-165 μm',
      flowRate: '300 cm/h',
      pressure: '0.3 MPa',
      chemicalStability: 'pH 2-13'
    }
  },
  {
    id: 'RES-2024-002',
    name: 'SP Sepharose Fast Flow',
    type: '阳离子交换介质',
    manufacturer: 'Cytiva',
    batchNo: 'SP240112002',
    quantity: 250,
    unit: 'mL',
    concentration: '50% slurry',
    location: '介质储存柜-A区',
    expiryDate: '2026-06-30',
    status: '在库',
    cost: 8000.00,
    minStock: 50,
    maxStock: 500,
    bindingCapacity: '120 mg/mL',
    workingPH: '4.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
    applications: ['蛋白质纯化', '多肽分离'],
    specifications: {
      particleSize: '45-165 μm',
      flowRate: '300 cm/h',
      pressure: '0.3 MPa',
      chemicalStability: 'pH 2-14'
    }
  },
  {
    id: 'RES-2024-003',
    name: 'Q Sepharose Fast Flow',
    type: '阴离子交换介质',
    manufacturer: 'Cytiva',
    batchNo: 'Q240108003',
    quantity: 150,
    unit: 'mL',
    concentration: '50% slurry',
    location: '介质储存柜-A区',
    expiryDate: '2026-03-31',
    status: '库存不足',
    cost: 7500.00,
    minStock: 50,
    maxStock: 500,
    bindingCapacity: '140 mg/mL',
    workingPH: '6.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
    applications: ['蛋白质纯化', '核酸分离'],
    specifications: {
      particleSize: '45-165 μm',
      flowRate: '300 cm/h',
      pressure: '0.3 MPa',
      chemicalStability: 'pH 2-12'
    }
  },
  {
    id: 'RES-2024-004',
    name: 'Superdex 200 prep grade',
    type: '分子筛介质',
    manufacturer: 'Cytiva',
    batchNo: 'SD240105004',
    quantity: 100,
    unit: 'mL',
    concentration: 'dry powder',
    location: '介质储存柜-B区',
    expiryDate: '2027-01-31',
    status: '在库',
    cost: 15000.00,
    minStock: 20,
    maxStock: 200,
    bindingCapacity: 'N/A',
    workingPH: '3.0-12.0',
    storageCondition: '室温，干燥',
    applications: ['蛋白质脱盐', '分子量分离'],
    specifications: {
      particleSize: '25-75 μm',
      flowRate: '150 cm/h',
      pressure: '0.15 MPa',
      chemicalStability: 'pH 3-12'
    }
  },
  {
    id: 'RES-2024-005',
    name: 'Phenyl Sepharose 6 Fast Flow',
    type: '疏水相互作用介质',
    manufacturer: 'Cytiva',
    batchNo: 'PH240103005',
    quantity: 200,
    unit: 'mL',
    concentration: '50% slurry',
    location: '介质储存柜-B区',
    expiryDate: '2025-08-31',
    status: '即将过期',
    cost: 9000.00,
    minStock: 50,
    maxStock: 400,
    bindingCapacity: '20-40 mg/mL',
    workingPH: '5.0-9.0',
    storageCondition: '2-8°C, 20% 乙醇',
    applications: ['蛋白质纯化', '疏水性分离'],
    specifications: {
      particleSize: '45-165 μm',
      flowRate: '300 cm/h',
      pressure: '0.3 MPa',
      chemicalStability: 'pH 3-13'
    }
  },
  {
    id: 'RES-2024-006',
    name: 'Ni Sepharose 6 Fast Flow',
    type: '金属螯合介质',
    manufacturer: 'Cytiva',
    batchNo: 'NI240101006',
    quantity: 100,
    unit: 'mL',
    concentration: '50% slurry',
    location: '介质储存柜-C区',
    expiryDate: '2026-12-31',
    status: '在库',
    cost: 12000.00,
    minStock: 25,
    maxStock: 200,
    bindingCapacity: '40 mg/mL',
    workingPH: '4.0-8.0',
    storageCondition: '2-8°C, 20% 乙醇',
    applications: ['His标签蛋白纯化', '金属结合蛋白分离'],
    specifications: {
      particleSize: '45-165 μm',
      flowRate: '300 cm/h',
      pressure: '0.3 MPa',
      chemicalStability: 'pH 3-14'
    }
  }
];

const statusConfig = {
  '在库': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '库存不足': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '即将过期': { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle },
  '已过期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  '已出库': { color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock }
};

const typeColors = {
  '蛋白A亲和介质': 'bg-purple-100 text-purple-800',
  '阳离子交换介质': 'bg-blue-100 text-blue-800',
  '阴离子交换介质': 'bg-green-100 text-green-800',
  '分子筛介质': 'bg-orange-100 text-orange-800',
  '疏水相互作用介质': 'bg-pink-100 text-pink-800',
  '金属螯合介质': 'bg-indigo-100 text-indigo-800'
};

export const ResinManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedResin, setSelectedResin] = useState<typeof resins[0] | null>(null);

  const filteredResins = resins.filter(resin => {
    return (searchTerm === '' || resin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            resin.batchNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedType === '' || resin.type === selectedType);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">层析介质管理</h1>
          <p className="text-gray-600">管理各类层析介质的库存、性能参数和使用情况</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新增介质</span>
        </button>
      </div>

      {/* 介质统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Beaker className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">介质种类</p>
              <p className="text-2xl font-bold text-gray-900">{resins.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">库存正常</p>
              <p className="text-2xl font-bold text-gray-900">
                {resins.filter(r => r.status === '在库').length}
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
              <p className="text-sm font-medium text-gray-600">需要补充</p>
              <p className="text-2xl font-bold text-gray-900">
                {resins.filter(r => r.status === '库存不足' || r.status === '即将过期').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总价值</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{resins.reduce((acc, r) => acc + r.cost, 0).toLocaleString()}
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
                placeholder="搜索介质名称或批号..."
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
              <option value="蛋白A亲和介质">蛋白A亲和介质</option>
              <option value="阳离子交换介质">阳离子交换介质</option>
              <option value="阴离子交换介质">阴离子交换介质</option>
              <option value="分子筛介质">分子筛介质</option>
              <option value="疏水相互作用介质">疏水相互作用介质</option>
              <option value="金属螯合介质">金属螯合介质</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 介质列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">介质列表</h3>
            <div className="space-y-4">
              {filteredResins.map((resin) => {
                const config = statusConfig[resin.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                const isLowStock = resin.quantity <= resin.minStock;

                return (
                  <div
                    key={resin.id}
                    onClick={() => setSelectedResin(resin)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedResin?.id === resin.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{resin.name}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>批号: {resin.batchNo}</div>
                      <div>库存: {resin.quantity} {resin.unit}</div>
                      <div>类型: {resin.type}</div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[resin.type as keyof typeof typeColors]}`}>
                        {resin.type}
                      </span>
                      {isLowStock && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          库存不足
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 介质详情 */}
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
                    <span className="text-sm text-gray-600">批号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.batchNo}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">库存量:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.quantity} {selectedResin.unit}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">浓度:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.concentration}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">位置:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.location}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">有效期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.expiryDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">储存条件:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.storageCondition}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">成本:</span>
                    <div className="text-sm font-medium text-gray-900">¥{selectedResin.cost.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* 性能参数 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">性能参数</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">结合容量</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedResin.bindingCapacity}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">工作pH</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedResin.workingPH}</div>
                  </div>
                </div>
              </div>

              {/* 技术规格 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">技术规格</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-600">粒径:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.specifications.particleSize}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">流速:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.specifications.flowRate}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">最大压力:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.specifications.pressure}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">化学稳定性:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedResin.specifications.chemicalStability}</div>
                  </div>
                </div>
              </div>

              {/* 应用领域 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">应用领域</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResin.applications.map((app, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* 库存状态 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">库存状态</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">当前库存</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedResin.quantity} {selectedResin.unit}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">最小库存</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedResin.minStock} {selectedResin.unit}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600">最大库存</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedResin.maxStock} {selectedResin.unit}</div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  出库使用
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  补充库存
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  查看使用记录
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Beaker className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个介质查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};