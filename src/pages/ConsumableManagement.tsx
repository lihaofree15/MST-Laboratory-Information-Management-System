import React, { useState } from 'react';
import { Plus, Package, Search, Filter, AlertTriangle, CheckCircle, Clock, QrCode } from 'lucide-react';

const consumables = [
  {
    id: 'CON-2024-001',
    name: '无菌移液管 (10mL)',
    category: '移液器具',
    type: '一次性耗材',
    supplier: 'Corning',
    batchNo: 'COR240115001',
    quantity: 500,
    unit: '支',
    location: 'A区-耗材-01-01',
    expiryDate: '2026-12-31',
    status: '在库',
    qrCode: 'QR240115001',
    cost: 1250.00,
    minStock: 100,
    maxStock: 1000,
    specification: '10mL，聚苯乙烯材质，无菌包装'
  },
  {
    id: 'CON-2024-002',
    name: '细胞培养皿 (100mm)',
    category: '培养器具',
    type: '一次性耗材',
    supplier: 'Falcon',
    batchNo: 'FAL240110002',
    quantity: 200,
    unit: '个',
    location: 'A区-耗材-01-02',
    expiryDate: '2027-06-30',
    status: '在库',
    qrCode: 'QR240110002',
    cost: 800.00,
    minStock: 50,
    maxStock: 500,
    specification: '100mm直径，TC处理表面，无菌'
  },
  {
    id: 'CON-2024-003',
    name: '0.22μm过滤器',
    category: '过滤器具',
    type: '一次性耗材',
    supplier: 'Millipore',
    batchNo: 'MIL240108003',
    quantity: 50,
    unit: '个',
    location: 'B区-耗材-02-01',
    expiryDate: '2025-12-31',
    status: '库存不足',
    qrCode: 'QR240108003',
    cost: 2500.00,
    minStock: 20,
    maxStock: 200,
    specification: '0.22μm孔径，PVDF膜，33mm直径'
  },
  {
    id: 'CON-2024-004',
    name: '细胞冻存管 (2mL)',
    category: '冻存器具',
    type: '一次性耗材',
    supplier: 'Nunc',
    batchNo: 'NUN240105004',
    quantity: 1000,
    unit: '支',
    location: 'C区-耗材-03-01',
    expiryDate: '2028-01-31',
    status: '在库',
    qrCode: 'QR240105004',
    cost: 3000.00,
    minStock: 200,
    maxStock: 2000,
    specification: '2mL容量，聚丙烯材质，可耐-196°C'
  },
  {
    id: 'CON-2024-005',
    name: '96孔细胞培养板',
    category: '培养器具',
    type: '一次性耗材',
    supplier: 'Costar',
    batchNo: 'COS240103005',
    quantity: 25,
    unit: '块',
    location: 'A区-耗材-01-03',
    expiryDate: '2026-08-31',
    status: '即将过期',
    qrCode: 'QR240103005',
    cost: 1500.00,
    minStock: 10,
    maxStock: 100,
    specification: '96孔平底，TC处理，透明聚苯乙烯'
  },
  {
    id: 'CON-2024-006',
    name: '无菌注射器 (50mL)',
    category: '注射器具',
    type: '一次性耗材',
    supplier: 'BD',
    batchNo: 'BD240101006',
    quantity: 100,
    unit: '支',
    location: 'B区-耗材-02-02',
    expiryDate: '2025-06-30',
    status: '在库',
    qrCode: 'QR240101006',
    cost: 500.00,
    minStock: 20,
    maxStock: 200,
    specification: '50mL容量，Luer-Lok接头，无菌包装'
  }
];

const statusConfig = {
  '在库': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '库存不足': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '即将过期': { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle },
  '已过期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  '已出库': { color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock }
};

const categoryColors = {
  '移液器具': 'bg-blue-100 text-blue-800',
  '培养器具': 'bg-green-100 text-green-800',
  '过滤器具': 'bg-purple-100 text-purple-800',
  '冻存器具': 'bg-indigo-100 text-indigo-800',
  '注射器具': 'bg-pink-100 text-pink-800'
};

export const ConsumableManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">实验耗材管理</h1>
          <p className="text-gray-600">管理实验室一次性耗材的库存和使用情况</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <QrCode className="h-4 w-4" />
            <span>扫码入库</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>新增耗材</span>
          </button>
        </div>
      </div>

      {/* 耗材统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">耗材种类</p>
              <p className="text-2xl font-bold text-gray-900">{consumables.length}</p>
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
                {consumables.filter(c => c.status === '在库').length}
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
              <p className="text-sm font-medium text-gray-600">库存不足</p>
              <p className="text-2xl font-bold text-gray-900">
                {consumables.filter(c => c.status === '库存不足').length}
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
                ¥{consumables.reduce((acc, c) => acc + c.cost, 0).toLocaleString()}
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
                placeholder="搜索耗材名称、批号或供应商..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有分类</option>
              <option value="移液器具">移液器具</option>
              <option value="培养器具">培养器具</option>
              <option value="过滤器具">过滤器具</option>
              <option value="冻存器具">冻存器具</option>
              <option value="注射器具">注射器具</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {/* 耗材列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  耗材信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  库存
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  位置
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  有效期
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consumables.map((consumable) => {
                const config = statusConfig[consumable.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                const isLowStock = consumable.quantity <= consumable.minStock;

                return (
                  <tr key={consumable.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{consumable.name}</div>
                        <div className="text-sm text-gray-500">{consumable.id}</div>
                        <div className="text-xs text-gray-400">批号: {consumable.batchNo}</div>
                        <div className="text-xs text-gray-400">供应商: {consumable.supplier}</div>
                        <div className="text-xs text-gray-400 mt-1">{consumable.specification}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[consumable.category as keyof typeof categoryColors]}`}>
                        {consumable.category}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{consumable.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {consumable.quantity} {consumable.unit}
                      </div>
                      <div className="text-xs text-gray-500">
                        最小库存: {consumable.minStock} {consumable.unit}
                      </div>
                      {isLowStock && (
                        <div className="text-xs text-red-600 font-medium">库存不足</div>
                      )}
                      <div className="text-xs text-gray-500">¥{consumable.cost.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{consumable.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className={`h-4 w-4 mr-2 ${config.color}`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                          {consumable.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{consumable.expiryDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <QrCode className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          出库
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          编辑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 库存预警 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">库存预警</h3>
        <div className="space-y-3">
          {consumables.filter(c => c.quantity <= c.minStock || c.status === '即将过期').map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity <= item.minStock ? `库存不足: ${item.quantity}${item.unit}` : '即将过期'}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 transition-colors">
                {item.quantity <= item.minStock ? '补充库存' : '处理'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};