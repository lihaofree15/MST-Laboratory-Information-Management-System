import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, TestTube, Snowflake, Thermometer } from 'lucide-react';

const samples = [
  {
    id: 'SAM-2024-001',
    name: 'Anti-CD20抗体样品',
    type: '抗体样品',
    status: '待检测',
    priority: '高',
    submittedBy: '张博士',
    submittedDate: '2024-01-15',
    description: '第5批次Anti-CD20单克隆抗体，需进行纯度和活性检测',
    batchNo: 'BATCH-CD20-005',
    concentration: '5.2 mg/mL',
    volume: '10 mL',
    storageCondition: '2-8°C',
    location: 'A区-冷藏-01-03'
  },
  {
    id: 'SAM-2024-002',
    name: 'CHO细胞培养上清',
    type: '细胞培养样品',
    status: '检测中',
    priority: '中',
    submittedBy: '李研究员',
    submittedDate: '2024-01-14',
    description: 'CHO-K1细胞培养第7天上清液，用于抗体效价检测',
    batchNo: 'BATCH-CHO-007',
    concentration: '2.8 g/L',
    volume: '50 mL',
    storageCondition: '-20°C',
    location: 'B区-冷冻-02-05'
  },
  {
    id: 'SAM-2024-003',
    name: '纯化中间体样品',
    type: '工艺样品',
    status: '已完成',
    priority: '高',
    submittedBy: '王工程师',
    submittedDate: '2024-01-12',
    description: '蛋白A亲和层析洗脱液，需检测纯度和内毒素',
    batchNo: 'BATCH-PUR-003',
    concentration: '8.5 mg/mL',
    volume: '25 mL',
    storageCondition: '2-8°C',
    location: 'A区-冷藏-01-08'
  },
  {
    id: 'SAM-2024-004',
    name: '稳定性研究样品',
    type: '稳定性样品',
    status: '储存中',
    priority: '中',
    submittedBy: '赵分析师',
    submittedDate: '2024-01-10',
    description: '25°C/60%RH条件下储存3个月的抗体样品',
    batchNo: 'BATCH-STB-001',
    concentration: '10.0 mg/mL',
    volume: '5 mL',
    storageCondition: '25°C/60%RH',
    location: 'C区-稳定性-03-01'
  }
];

const statusColors = {
  '待检测': 'bg-yellow-100 text-yellow-800',
  '检测中': 'bg-blue-100 text-blue-800',
  '已完成': 'bg-green-100 text-green-800',
  '储存中': 'bg-purple-100 text-purple-800',
  '异常': 'bg-red-100 text-red-800'
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

const typeColors = {
  '抗体样品': 'bg-blue-100 text-blue-800',
  '细胞培养样品': 'bg-green-100 text-green-800',
  '工艺样品': 'bg-purple-100 text-purple-800',
  '稳定性样品': 'bg-orange-100 text-orange-800'
};

export const SampleManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">样本管理</h1>
          <p className="text-gray-600">管理生物工艺实验样本的登记、跟踪和状态更新</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新增样本</span>
        </button>
      </div>

      {/* 样本统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TestTube className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">样本总数</p>
              <p className="text-2xl font-bold text-gray-900">{samples.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <TestTube className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">待检测</p>
              <p className="text-2xl font-bold text-gray-900">
                {samples.filter(s => s.status === '待检测').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <TestTube className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">检测中</p>
              <p className="text-2xl font-bold text-gray-900">
                {samples.filter(s => s.status === '检测中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Snowflake className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">储存中</p>
              <p className="text-2xl font-bold text-gray-900">
                {samples.filter(s => s.status === '储存中').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索样本编号、名称或批号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="待检测">待检测</option>
              <option value="检测中">检测中</option>
              <option value="已完成">已完成</option>
              <option value="储存中">储存中</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {/* Sample Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {samples.map((sample) => (
          <div key={sample.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <TestTube className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{sample.name}</h3>
                  <p className="text-sm text-gray-600">{sample.id}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[sample.type as keyof typeof typeColors]}`}>
                {sample.type}
              </span>
              <div className="flex space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[sample.status as keyof typeof statusColors]}`}>
                  {sample.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[sample.priority as keyof typeof priorityColors]}`}>
                  {sample.priority}优先级
                </span>
              </div>
            </div>

            {/* Sample Details */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">批号:</span>
                <span className="text-sm font-medium text-gray-900">{sample.batchNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">浓度:</span>
                <span className="text-sm font-medium text-gray-900">{sample.concentration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">体积:</span>
                <span className="text-sm font-medium text-gray-900">{sample.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">储存条件:</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Thermometer className="h-3 w-3 mr-1" />
                  {sample.storageCondition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">位置:</span>
                <span className="text-sm font-medium text-gray-900">{sample.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">提交者:</span>
                <span className="text-sm font-medium text-gray-900">{sample.submittedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">提交日期:</span>
                <span className="text-sm font-medium text-gray-900">{sample.submittedDate}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{sample.description}</p>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                查看详情
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                编辑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};