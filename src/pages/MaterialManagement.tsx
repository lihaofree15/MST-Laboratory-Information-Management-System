import React, { useState } from 'react';
import { Plus, Package, QrCode, Search, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const materials = [
  {
    id: 'MAT-2024-001',
    name: 'DMEM培养基',
    category: '培养基',
    type: '原料',
    supplier: '赛默飞世尔',
    batchNo: 'TF240115001',
    quantity: 50,
    unit: 'L',
    location: 'A区-01-03',
    expiryDate: '2024-12-31',
    status: '在库',
    qrCode: 'QR240115001',
    cost: 2500.00
  },
  {
    id: 'MAT-2024-002',
    name: '蛋白A亲和介质',
    category: '层析介质',
    type: '原料',
    supplier: 'GE Healthcare',
    batchNo: 'GE240110002',
    quantity: 2,
    unit: 'L',
    location: 'B区-02-01',
    expiryDate: '2025-06-30',
    status: '在库',
    qrCode: 'QR240110002',
    cost: 15000.00
  },
  {
    id: 'MAT-2024-003',
    name: '无菌过滤器',
    category: '过滤器',
    type: '耗材',
    supplier: 'Millipore',
    batchNo: 'MP240108003',
    quantity: 100,
    unit: '个',
    location: 'C区-03-02',
    expiryDate: '2026-01-31',
    status: '在库',
    qrCode: 'QR240108003',
    cost: 5000.00
  },
  {
    id: 'MAT-2024-004',
    name: 'PBS缓冲液',
    category: '缓冲液',
    type: '辅料',
    supplier: '生工生物',
    batchNo: 'SG240105004',
    quantity: 20,
    unit: 'L',
    location: 'A区-01-05',
    expiryDate: '2024-07-31',
    status: '即将过期',
    qrCode: 'QR240105004',
    cost: 800.00
  }
];

const statusConfig = {
  '在库': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '即将过期': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '已过期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  '已出库': { color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock }
};

const categoryColors = {
  '培养基': 'bg-blue-100 text-blue-800',
  '层析介质': 'bg-purple-100 text-purple-800',
  '过滤器': 'bg-green-100 text-green-800',
  '缓冲液': 'bg-yellow-100 text-yellow-800',
  '试剂': 'bg-red-100 text-red-800'
};

export const MaterialManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">物料管理</h1>
          <p className="text-gray-600">物料和耗材全生命周期管理，支持二维码追溯</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <QrCode className="h-4 w-4" />
            <span>扫码入库</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>新增物料</span>
          </button>
        </div>
      </div>

      {/* 物料统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">物料总数</p>
              <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">在库物料</p>
              <p className="text-2xl font-bold text-gray-900">
                {materials.filter(m => m.status === '在库').length}
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
              <p className="text-sm font-medium text-gray-600">即将过期</p>
              <p className="text-2xl font-bold text-gray-900">
                {materials.filter(m => m.status === '即将过期').length}
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
                ¥{materials.reduce((acc, m) => acc + m.cost, 0).toLocaleString()}
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
                placeholder="搜索物料名称、批号或供应商..."
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
              <option value="培养基">培养基</option>
              <option value="层析介质">层析介质</option>
              <option value="过滤器">过滤器</option>
              <option value="缓冲液">缓冲液</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {/* 物料列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  物料信息
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
              {materials.map((material) => {
                const config = statusConfig[material.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{material.name}</div>
                        <div className="text-sm text-gray-500">{material.id}</div>
                        <div className="text-xs text-gray-400">批号: {material.batchNo}</div>
                        <div className="text-xs text-gray-400">供应商: {material.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[material.category as keyof typeof categoryColors]}`}>
                        {material.category}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{material.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{material.quantity} {material.unit}</div>
                      <div className="text-xs text-gray-500">¥{material.cost.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{material.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className={`h-4 w-4 mr-2 ${config.color}`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                          {material.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{material.expiryDate}</span>
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
    </div>
  );
};