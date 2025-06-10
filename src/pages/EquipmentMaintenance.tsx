import React, { useState } from 'react';
import { Plus, Wrench, Calendar, CheckCircle, AlertTriangle, Clock, User } from 'lucide-react';

const maintenanceRecords = [
  {
    id: 'MAINT-2024-001',
    equipmentId: 'BIO-001',
    equipmentName: '5L生物反应器',
    type: '预防性维护',
    status: '已完成',
    priority: '中',
    scheduledDate: '2024-01-15',
    completedDate: '2024-01-15',
    technician: '张工程师',
    duration: 4,
    cost: 1200.00,
    description: '更换pH电极，校准温度传感器，清洁搅拌桨',
    parts: ['pH电极', '密封圈', '润滑油'],
    notes: '设备运行正常，所有参数在规格范围内'
  },
  {
    id: 'MAINT-2024-002',
    equipmentId: 'HPLC-001',
    equipmentName: 'SEC-HPLC系统',
    type: '故障维修',
    status: '进行中',
    priority: '高',
    scheduledDate: '2024-01-16',
    completedDate: null,
    technician: '李技师',
    duration: 6,
    cost: 2500.00,
    description: '泵压异常，需要更换泵头密封件',
    parts: ['泵头密封件', '单向阀'],
    notes: '等待备件到货'
  },
  {
    id: 'MAINT-2024-003',
    equipmentId: 'CENT-001',
    equipmentName: '高速离心机',
    type: '定期保养',
    status: '计划中',
    priority: '中',
    scheduledDate: '2024-01-20',
    completedDate: null,
    technician: '王技师',
    duration: 3,
    cost: 800.00,
    description: '转子平衡检查，轴承润滑，安全系统测试',
    parts: ['润滑脂', '密封圈'],
    notes: '按照年度保养计划执行'
  },
  {
    id: 'MAINT-2024-004',
    equipmentId: 'CHROM-001',
    equipmentName: '层析系统',
    type: '校准维护',
    status: '已完成',
    priority: '高',
    scheduledDate: '2024-01-10',
    completedDate: '2024-01-10',
    technician: '赵工程师',
    duration: 2,
    cost: 500.00,
    description: '流量计校准，压力传感器校准',
    parts: ['校准标准品'],
    notes: '校准结果符合要求'
  },
  {
    id: 'MAINT-2024-005',
    equipmentId: 'MICRO-001',
    equipmentName: '倒置显微镜',
    type: '清洁保养',
    status: '延期',
    priority: '低',
    scheduledDate: '2024-01-12',
    completedDate: null,
    technician: '孙研究员',
    duration: 1,
    cost: 200.00,
    description: '镜头清洁，光路调整，载物台润滑',
    parts: ['清洁液', '镜头纸'],
    notes: '因设备使用中延期至下周'
  }
];

const statusConfig = {
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '计划中': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Calendar },
  '延期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

const typeColors = {
  '预防性维护': 'bg-blue-100 text-blue-800',
  '故障维修': 'bg-red-100 text-red-800',
  '定期保养': 'bg-green-100 text-green-800',
  '校准维护': 'bg-purple-100 text-purple-800',
  '清洁保养': 'bg-gray-100 text-gray-800'
};

export const EquipmentMaintenance: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredRecords = maintenanceRecords.filter(record => {
    return (selectedStatus === '' || record.status === selectedStatus) &&
           (selectedType === '' || record.type === selectedType);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设备维保</h1>
          <p className="text-gray-600">管理设备维护保养计划和维修记录</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建维护任务</span>
        </button>
      </div>

      {/* 维护统计 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceRecords.filter(r => r.status === '已完成').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">进行中</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceRecords.filter(r => r.status === '进行中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">计划中</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceRecords.filter(r => r.status === '计划中').length}
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
              <p className="text-sm font-medium text-gray-600">延期</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceRecords.filter(r => r.status === '延期').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Wrench className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总成本</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{maintenanceRecords.reduce((acc, r) => acc + r.cost, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="已完成">已完成</option>
              <option value="进行中">进行中</option>
              <option value="计划中">计划中</option>
              <option value="延期">延期</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有类型</option>
              <option value="预防性维护">预防性维护</option>
              <option value="故障维修">故障维修</option>
              <option value="定期保养">定期保养</option>
              <option value="校准维护">校准维护</option>
              <option value="清洁保养">清洁保养</option>
            </select>
          </div>
        </div>
      </div>

      {/* 维护记录列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  维护任务
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  设备
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  技术员
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  计划日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  成本
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const config = statusConfig[record.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.id}</div>
                        <div className="text-sm text-gray-500">{record.description}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[record.priority as keyof typeof priorityColors]}`}>
                            {record.priority}优先级
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.equipmentName}</div>
                      <div className="text-sm text-gray-500">{record.equipmentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[record.type as keyof typeof typeColors]}`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className={`h-4 w-4 mr-2 ${config.color}`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{record.technician}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.scheduledDate}</div>
                      {record.completedDate && (
                        <div className="text-sm text-gray-500">完成: {record.completedDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">¥{record.cost.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{record.duration}小时</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          查看
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

      {/* 维护详情卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRecords.slice(0, 3).map((record) => {
          const config = statusConfig[record.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <StatusIcon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{record.equipmentName}</h3>
                    <p className="text-sm text-gray-600">{record.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[record.type as keyof typeof typeColors]}`}>
                  {record.type}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">技术员:</span>
                  <span className="text-sm font-medium text-gray-900">{record.technician}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">计划日期:</span>
                  <span className="text-sm font-medium text-gray-900">{record.scheduledDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">预计工时:</span>
                  <span className="text-sm font-medium text-gray-900">{record.duration}小时</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">成本:</span>
                  <span className="text-sm font-medium text-gray-900">¥{record.cost.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">维护内容:</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{record.description}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">所需配件:</p>
                <div className="flex flex-wrap gap-1">
                  {record.parts.map((part, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {part}
                    </span>
                  ))}
                </div>
              </div>

              {record.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">备注:</p>
                  <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">{record.notes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  查看详情
                </button>
                {record.status === '计划中' && (
                  <button className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                    开始
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};