import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Settings, Calendar, Wrench, Activity, Thermometer } from 'lucide-react';

const equipment = [
  {
    id: 'BIO-001',
    name: '5L生物反应器',
    model: 'Sartorius BIOSTAT B-5L',
    manufacturer: 'Sartorius',
    status: 'running',
    utilization: 85,
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-03-01',
    location: '发酵车间-A区',
    technician: '张工程师',
    currentBatch: 'BATCH-001',
    temperature: '37.0°C',
    pH: '7.2',
    DO: '45%'
  },
  {
    id: 'HPLC-001',
    name: 'SEC-HPLC系统',
    model: 'Agilent 1260 Infinity',
    manufacturer: 'Agilent',
    status: 'running',
    utilization: 72,
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-02-15',
    location: '分析实验室-B区',
    technician: '李分析师',
    currentBatch: 'QC-2024-005',
    temperature: '25.0°C',
    pH: '-',
    DO: '-'
  },
  {
    id: 'CENT-001',
    name: '高速离心机',
    model: 'Beckman Avanti J-26S XP',
    manufacturer: 'Beckman Coulter',
    status: 'maintenance',
    utilization: 0,
    lastMaintenance: '2024-01-14',
    nextMaintenance: '2024-04-14',
    location: '纯化车间-C区',
    technician: '王技师',
    currentBatch: '-',
    temperature: '4.0°C',
    pH: '-',
    DO: '-'
  },
  {
    id: 'CHROM-001',
    name: '层析系统',
    model: 'AKTA pure 25',
    manufacturer: 'Cytiva',
    status: 'running',
    utilization: 68,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    location: '纯化车间-D区',
    technician: '赵工程师',
    currentBatch: 'PUR-2024-003',
    temperature: '4.0°C',
    pH: '7.4',
    DO: '-'
  },
  {
    id: 'MICRO-001',
    name: '倒置显微镜',
    model: 'Olympus CKX53',
    manufacturer: 'Olympus',
    status: 'idle',
    utilization: 25,
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
    location: '细胞培养室-E区',
    technician: '孙研究员',
    currentBatch: '-',
    temperature: '室温',
    pH: '-',
    DO: '-'
  },
  {
    id: 'FLOW-001',
    name: '流式细胞仪',
    model: 'BD FACSCanto II',
    manufacturer: 'BD Biosciences',
    status: 'error',
    utilization: 0,
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-07-12',
    location: '分析实验室-F区',
    technician: '周分析师',
    currentBatch: '-',
    temperature: '室温',
    pH: '-',
    DO: '-'
  }
];

const statusConfig = {
  running: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: '运行中' },
  maintenance: { icon: Settings, color: 'text-yellow-600', bg: 'bg-yellow-50', label: '维护中' },
  error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: '故障' },
  idle: { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', label: '空闲' }
};

export const EquipmentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">设备管理</h1>
        <p className="text-gray-600">监控和管理生物工艺设备的运行状态和维护计划</p>
      </div>

      {/* Equipment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">运行中设备</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipment.filter(e => e.status === 'running').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Settings className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">维护中设备</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipment.filter(e => e.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">故障设备</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipment.filter(e => e.status === 'error').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均利用率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(equipment.reduce((acc, e) => acc + e.utilization, 0) / equipment.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {equipment.map((item) => {
          const config = statusConfig[item.status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
              </div>

              {/* Current Operation */}
              {item.currentBatch !== '-' && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">当前运行</span>
                  </div>
                  <p className="text-sm text-blue-700">批次: {item.currentBatch}</p>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    {item.temperature !== '-' && (
                      <div className="flex items-center">
                        <Thermometer className="h-3 w-3 mr-1 text-blue-600" />
                        <span>{item.temperature}</span>
                      </div>
                    )}
                    {item.pH !== '-' && (
                      <div>
                        <span className="text-blue-600">pH:</span> {item.pH}
                      </div>
                    )}
                    {item.DO !== '-' && (
                      <div>
                        <span className="text-blue-600">DO:</span> {item.DO}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Utilization */}
              {item.status === 'running' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>设备利用率</span>
                    <span>{item.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.utilization}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">型号:</span>
                  <span className="text-sm font-medium text-gray-900">{item.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">制造商:</span>
                  <span className="text-sm font-medium text-gray-900">{item.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">位置:</span>
                  <span className="text-sm font-medium text-gray-900">{item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">负责人:</span>
                  <span className="text-sm font-medium text-gray-900">{item.technician}</span>
                </div>
              </div>

              {/* Maintenance Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">上次维护</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.lastMaintenance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wrench className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">下次维护</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.nextMaintenance}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  查看详情
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  维护记录
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};