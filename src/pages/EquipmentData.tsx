import React, { useState } from 'react';
import { Activity, Download, TrendingUp, AlertTriangle, Database, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const equipmentData = [
  {
    id: 'BIO-001',
    name: '5L生物反应器',
    status: '在线',
    lastUpdate: '2024-01-16 14:30:15',
    parameters: [
      { name: '温度', value: 37.0, unit: '°C', min: 36.5, max: 37.5, status: '正常' },
      { name: 'pH', value: 7.2, unit: '', min: 7.0, max: 7.4, status: '正常' },
      { name: '溶氧', value: 45, unit: '%', min: 40, max: 60, status: '正常' },
      { name: '搅拌速度', value: 150, unit: 'rpm', min: 100, max: 200, status: '正常' },
      { name: '压力', value: 0.15, unit: 'bar', min: 0.1, max: 0.2, status: '正常' }
    ],
    trends: [
      { time: '14:00', 温度: 37.0, pH: 7.2, 溶氧: 45 },
      { time: '14:05', 温度: 37.1, pH: 7.2, 溶氧: 44 },
      { time: '14:10', 温度: 37.0, pH: 7.1, 溶氧: 46 },
      { time: '14:15', 温度: 36.9, pH: 7.2, 溶氧: 45 },
      { time: '14:20', 温度: 37.0, pH: 7.2, 溶氧: 45 },
      { time: '14:25', 温度: 37.1, pH: 7.3, 溶氧: 44 },
      { time: '14:30', 温度: 37.0, pH: 7.2, 溶氧: 45 }
    ]
  },
  {
    id: 'HPLC-001',
    name: 'SEC-HPLC系统',
    status: '在线',
    lastUpdate: '2024-01-16 14:28:42',
    parameters: [
      { name: '流速', value: 1.0, unit: 'mL/min', min: 0.8, max: 1.2, status: '正常' },
      { name: '压力', value: 85, unit: 'bar', min: 80, max: 120, status: '正常' },
      { name: '柱温', value: 25.0, unit: '°C', min: 24, max: 26, status: '正常' },
      { name: 'UV检测器', value: 0.025, unit: 'AU', min: 0, max: 2, status: '正常' }
    ],
    trends: [
      { time: '14:00', 流速: 1.0, 压力: 85, 柱温: 25.0 },
      { time: '14:05', 流速: 1.0, 压力: 86, 柱温: 25.1 },
      { time: '14:10', 流速: 1.0, 压力: 84, 柱温: 25.0 },
      { time: '14:15', 流速: 1.0, 压力: 85, 柱温: 24.9 },
      { time: '14:20', 流速: 1.0, 压力: 85, 柱温: 25.0 },
      { time: '14:25', 流速: 1.0, 压力: 86, 柱温: 25.1 },
      { time: '14:30', 流速: 1.0, 压力: 85, 柱温: 25.0 }
    ]
  },
  {
    id: 'CHROM-001',
    name: '层析系统',
    status: '离线',
    lastUpdate: '2024-01-16 12:15:30',
    parameters: [
      { name: '流速', value: 0, unit: 'mL/min', min: 0, max: 10, status: '停止' },
      { name: '压力', value: 0, unit: 'bar', min: 0, max: 5, status: '停止' },
      { name: '温度', value: 22.5, unit: '°C', min: 20, max: 25, status: '正常' }
    ],
    trends: []
  }
];

const alarms = [
  {
    id: 'ALM-2024-001',
    equipmentId: 'BIO-001',
    equipmentName: '5L生物反应器',
    parameter: 'pH',
    message: 'pH值超出设定范围',
    severity: '警告',
    timestamp: '2024-01-16 13:45:22',
    status: '已处理'
  },
  {
    id: 'ALM-2024-002',
    equipmentId: 'HPLC-001',
    equipmentName: 'SEC-HPLC系统',
    parameter: '压力',
    message: '系统压力异常升高',
    severity: '严重',
    timestamp: '2024-01-16 11:20:15',
    status: '处理中'
  }
];

const statusConfig = {
  '在线': { color: 'text-green-600', bg: 'bg-green-50', icon: Wifi },
  '离线': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const parameterStatusColors = {
  '正常': 'text-green-600',
  '警告': 'text-yellow-600',
  '异常': 'text-red-600',
  '停止': 'text-gray-600'
};

export const EquipmentData: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(equipmentData[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设备数据读写</h1>
          <p className="text-gray-600">实时监控设备运行参数和数据采集</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>导出数据</span>
        </button>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Wifi className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">在线设备</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentData.filter(e => e.status === '在线').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">数据点</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentData.reduce((acc, e) => acc + e.parameters.length, 0)}
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
              <p className="text-sm font-medium text-gray-600">活跃报警</p>
              <p className="text-2xl font-bold text-gray-900">
                {alarms.filter(a => a.status === '处理中').length}
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
              <p className="text-sm font-medium text-gray-600">数据采集率</p>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 设备列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">设备列表</h3>
            <div className="space-y-4">
              {equipmentData.map((equipment) => {
                const config = statusConfig[equipment.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={equipment.id}
                    onClick={() => setSelectedEquipment(equipment)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedEquipment.id === equipment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{equipment.name}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>设备ID: {equipment.id}</div>
                      <div>最后更新: {equipment.lastUpdate}</div>
                      <div>参数数量: {equipment.parameters.length}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                        {equipment.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 设备详情和趋势 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 实时参数 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedEquipment.name}</h3>
                <p className="text-sm text-gray-600">最后更新: {selectedEquipment.lastUpdate}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedEquipment.status as keyof typeof statusConfig].bg} ${statusConfig[selectedEquipment.status as keyof typeof statusConfig].color}`}>
                {selectedEquipment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEquipment.parameters.map((param, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{param.name}</span>
                    <span className={`text-xs font-medium ${parameterStatusColors[param.status as keyof typeof parameterStatusColors]}`}>
                      {param.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {param.value} {param.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    范围: {param.min} - {param.max} {param.unit}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          param.status === '正常' ? 'bg-green-500' :
                          param.status === '警告' ? 'bg-yellow-500' :
                          param.status === '异常' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{
                          width: param.max > 0 ? `${Math.min((param.value / param.max) * 100, 100)}%` : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 趋势图表 */}
          {selectedEquipment.trends.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">参数趋势</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedEquipment.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    {selectedEquipment.id === 'BIO-001' && (
                      <>
                        <Line type="monotone\" dataKey="温度\" stroke="#dc2626\" strokeWidth={2} name="温度 (°C)" />
                        <Line type="monotone" dataKey="pH" stroke="#059669" strokeWidth={2} name="pH" />
                        <Line type="monotone" dataKey="溶氧" stroke="#0284c7" strokeWidth={2} name="溶氧 (%)" />
                      </>
                    )}
                    {selectedEquipment.id === 'HPLC-001' && (
                      <>
                        <Line type="monotone" dataKey="流速" stroke="#dc2626" strokeWidth={2} name="流速 (mL/min)" />
                        <Line type="monotone" dataKey="压力" stroke="#059669" strokeWidth={2} name="压力 (bar)" />
                        <Line type="monotone" dataKey="柱温" stroke="#0284c7" strokeWidth={2} name="柱温 (°C)" />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 报警记录 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">报警记录</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  报警信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  设备
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  参数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  严重程度
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alarms.map((alarm) => (
                <tr key={alarm.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alarm.id}</div>
                      <div className="text-sm text-gray-500">{alarm.message}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{alarm.equipmentName}</div>
                    <div className="text-sm text-gray-500">{alarm.equipmentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alarm.parameter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      alarm.severity === '严重' ? 'bg-red-100 text-red-800' :
                      alarm.severity === '警告' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alarm.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alarm.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      alarm.status === '已处理' ? 'bg-green-100 text-green-800' :
                      alarm.status === '处理中' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {alarm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};