import React, { useState } from 'react';
import { Plus, Target, Calendar, CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const calibrationRecords = [
  {
    id: 'CAL-2024-001',
    equipmentId: 'BIO-001',
    equipmentName: '5L生物反应器',
    parameter: 'pH传感器',
    status: '已完成',
    lastCalibration: '2024-01-15',
    nextCalibration: '2024-04-15',
    frequency: '3个月',
    technician: '张工程师',
    standardUsed: 'pH 4.00, 7.00, 10.00标准液',
    beforeValues: [4.02, 7.05, 9.98],
    afterValues: [4.00, 7.00, 10.00],
    tolerance: '±0.02',
    result: '合格',
    certificate: 'CAL-CERT-001',
    notes: '校准正常，精度符合要求'
  },
  {
    id: 'CAL-2024-002',
    equipmentId: 'HPLC-001',
    equipmentName: 'SEC-HPLC系统',
    parameter: '流量计',
    status: '即将到期',
    lastCalibration: '2023-10-15',
    nextCalibration: '2024-01-15',
    frequency: '3个月',
    technician: '李分析师',
    standardUsed: '标准流量计',
    beforeValues: [0.98, 1.97, 4.95],
    afterValues: [1.00, 2.00, 5.00],
    tolerance: '±0.05',
    result: '合格',
    certificate: 'CAL-CERT-002',
    notes: '需要重新校准'
  },
  {
    id: 'CAL-2024-003',
    equipmentId: 'SCALE-001',
    equipmentName: '精密天平',
    parameter: '称量精度',
    status: '已过期',
    lastCalibration: '2023-07-15',
    nextCalibration: '2023-10-15',
    frequency: '3个月',
    technician: '王技师',
    standardUsed: '标准砝码 1g, 10g, 100g',
    beforeValues: [1.0001, 10.0005, 100.0008],
    afterValues: [1.0000, 10.0000, 100.0000],
    tolerance: '±0.0001',
    result: '不合格',
    certificate: null,
    notes: '需要专业校准服务'
  },
  {
    id: 'CAL-2024-004',
    equipmentId: 'CHROM-001',
    equipmentName: '层析系统',
    parameter: '压力传感器',
    status: '计划中',
    lastCalibration: '2023-12-15',
    nextCalibration: '2024-03-15',
    frequency: '3个月',
    technician: '赵工程师',
    standardUsed: '标准压力表',
    beforeValues: [],
    afterValues: [],
    tolerance: '±0.01 MPa',
    result: '待校准',
    certificate: null,
    notes: '按计划执行校准'
  },
  {
    id: 'CAL-2024-005',
    equipmentId: 'TEMP-001',
    equipmentName: '培养箱',
    parameter: '温度控制',
    status: '进行中',
    lastCalibration: '2024-01-10',
    nextCalibration: '2024-04-10',
    frequency: '3个月',
    technician: '孙研究员',
    standardUsed: '标准温度计',
    beforeValues: [36.8, 36.9, 37.1],
    afterValues: [37.0, 37.0, 37.0],
    tolerance: '±0.1°C',
    result: '校准中',
    certificate: null,
    notes: '正在进行多点校准'
  }
];

const statusConfig = {
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '计划中': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Calendar },
  '即将到期': { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle },
  '已过期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const resultColors = {
  '合格': 'bg-green-100 text-green-800',
  '不合格': 'bg-red-100 text-red-800',
  '待校准': 'bg-gray-100 text-gray-800',
  '校准中': 'bg-blue-100 text-blue-800'
};

export const EquipmentCalibration: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<typeof calibrationRecords[0] | null>(null);

  const filteredRecords = calibrationRecords.filter(record => {
    return selectedStatus === '' || record.status === selectedStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设备校准</h1>
          <p className="text-gray-600">管理设备校准计划和校准记录</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建校准任务</span>
        </button>
      </div>

      {/* 校准统计 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900">
                {calibrationRecords.filter(r => r.status === '已完成').length}
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
                {calibrationRecords.filter(r => r.status === '进行中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">即将到期</p>
              <p className="text-2xl font-bold text-gray-900">
                {calibrationRecords.filter(r => r.status === '即将到期').length}
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
              <p className="text-sm font-medium text-gray-600">已过期</p>
              <p className="text-2xl font-bold text-gray-900">
                {calibrationRecords.filter(r => r.status === '已过期').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">合格率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((calibrationRecords.filter(r => r.result === '合格').length / calibrationRecords.filter(r => r.result !== '待校准' && r.result !== '校准中').length) * 100)}%
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
              <option value="即将到期">即将到期</option>
              <option value="已过期">已过期</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 校准记录列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">校准记录</h3>
            <div className="space-y-4">
              {filteredRecords.map((record) => {
                const config = statusConfig[record.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedRecord?.id === record.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{record.equipmentName}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>参数: {record.parameter}</div>
                      <div>上次校准: {record.lastCalibration}</div>
                      <div>下次校准: {record.nextCalibration}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${resultColors[record.result as keyof typeof resultColors]}`}>
                        {record.result}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 校准详情 */}
        <div className="lg:col-span-2">
          {selectedRecord ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedRecord.equipmentName}</h3>
                  <p className="text-sm text-gray-600">{selectedRecord.id} - {selectedRecord.parameter}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedRecord.status as keyof typeof statusConfig].bg} ${statusConfig[selectedRecord.status as keyof typeof statusConfig].color}`}>
                    {selectedRecord.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${resultColors[selectedRecord.result as keyof typeof resultColors]}`}>
                    {selectedRecord.result}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">设备编号:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.equipmentId}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">校准参数:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.parameter}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">校准频率:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.frequency}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">技术员:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.technician}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">上次校准:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.lastCalibration}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">下次校准:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.nextCalibration}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">允许误差:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.tolerance}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">校准证书:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedRecord.certificate || '-'}</div>
                  </div>
                </div>
              </div>

              {/* 标准器具 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">使用标准器具</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedRecord.standardUsed}
                </div>
              </div>

              {/* 校准数据 */}
              {selectedRecord.beforeValues.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">校准数据</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">测试点</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">校准前</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">校准后</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">偏差</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedRecord.beforeValues.map((beforeValue, index) => {
                          const afterValue = selectedRecord.afterValues[index];
                          const deviation = afterValue ? Math.abs(afterValue - beforeValue) : 0;
                          
                          return (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-gray-900">点 {index + 1}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">{beforeValue}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">{afterValue || '-'}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {afterValue ? deviation.toFixed(4) : '-'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 备注 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">备注</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedRecord.notes}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                {selectedRecord.status === '计划中' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    开始校准
                  </button>
                )}
                {selectedRecord.status === '进行中' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    完成校准
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  打印证书
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  编辑记录
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个校准记录查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};