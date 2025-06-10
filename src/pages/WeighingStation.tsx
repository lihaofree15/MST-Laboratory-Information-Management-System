import React, { useState } from 'react';
import { Scale, Plus, CheckCircle, Clock, AlertTriangle, QrCode } from 'lucide-react';

const weighingTasks = [
  {
    id: 'WGH-2024-001',
    formula: 'DMEM培养基配制',
    batchNo: 'BATCH-001',
    operator: '李技师',
    status: '进行中',
    progress: 65,
    startTime: '2024-01-16 09:00',
    materials: [
      { name: 'DMEM粉末', target: 13.4, actual: 13.38, unit: 'g', tolerance: '±0.1g' },
      { name: '碳酸氢钠', target: 3.7, actual: 3.72, unit: 'g', tolerance: '±0.05g' },
      { name: '注射用水', target: 1000, actual: 0, unit: 'mL', tolerance: '±10mL' }
    ]
  },
  {
    id: 'WGH-2024-002',
    formula: 'PBS缓冲液配制',
    batchNo: 'BATCH-002',
    operator: '王研究员',
    status: '已完成',
    progress: 100,
    startTime: '2024-01-16 08:30',
    materials: [
      { name: 'NaCl', target: 8.0, actual: 8.02, unit: 'g', tolerance: '±0.1g' },
      { name: 'KCl', target: 0.2, actual: 0.19, unit: 'g', tolerance: '±0.02g' },
      { name: 'Na2HPO4', target: 1.44, actual: 1.43, unit: 'g', tolerance: '±0.05g' }
    ]
  }
];

const scales = [
  {
    id: 'SCALE-001',
    name: '精密天平-1',
    model: 'Mettler XS205',
    location: '称量间-A',
    status: '在线',
    capacity: '220g',
    readability: '0.1mg',
    lastCalibration: '2024-01-01',
    nextCalibration: '2024-07-01'
  },
  {
    id: 'SCALE-002',
    name: '分析天平-1',
    model: 'Sartorius BSA224S',
    location: '称量间-B',
    status: '在线',
    capacity: '220g',
    readability: '0.1mg',
    lastCalibration: '2024-01-15',
    nextCalibration: '2024-07-15'
  }
];

const statusConfig = {
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '异常': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

export const WeighingStation: React.FC = () => {
  const [activeTask, setActiveTask] = useState(weighingTasks[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">称量配料站管理</h1>
          <p className="text-gray-600">高效、可追踪的称量过程管理，支持电子秤集成</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建称量任务</span>
        </button>
      </div>

      {/* 称量统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Scale className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">今日任务</p>
              <p className="text-2xl font-bold text-gray-900">{weighingTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900">
                {weighingTasks.filter(t => t.status === '已完成').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">进行中</p>
              <p className="text-2xl font-bold text-gray-900">
                {weighingTasks.filter(t => t.status === '进行中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Scale className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">在线天平</p>
              <p className="text-2xl font-bold text-gray-900">
                {scales.filter(s => s.status === '在线').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 称量任务列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">称量任务</h3>
            <div className="space-y-4">
              {weighingTasks.map((task) => {
                const config = statusConfig[task.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={task.id}
                    onClick={() => setActiveTask(task)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      activeTask.id === task.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{task.formula}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>批次: {task.batchNo}</div>
                      <div>操作员: {task.operator}</div>
                      <div>开始时间: {task.startTime}</div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>进度</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 称量详情 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{activeTask.formula}</h3>
                <p className="text-sm text-gray-600">批次: {activeTask.batchNo}</p>
              </div>
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">扫码称量</span>
              </div>
            </div>

            {/* 称量进度 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>总体进度</span>
                <span>{activeTask.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${activeTask.progress}%` }}
                ></div>
              </div>
            </div>

            {/* 物料称量列表 */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">物料称量</h4>
              {activeTask.materials.map((material, index) => {
                const isCompleted = material.actual > 0;
                const isWithinTolerance = isCompleted && Math.abs(material.actual - material.target) <= parseFloat(material.tolerance.replace(/[^\d.]/g, ''));

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{material.name}</h5>
                        <p className="text-xs text-gray-600">允差: {material.tolerance}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isCompleted ? (
                          isWithinTolerance ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">目标值:</span>
                        <div className="font-medium">{material.target} {material.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">实际值:</span>
                        <div className={`font-medium ${
                          isCompleted ? (isWithinTolerance ? 'text-green-600' : 'text-red-600') : 'text-gray-400'
                        }`}>
                          {material.actual > 0 ? `${material.actual} ${material.unit}` : '待称量'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">偏差:</span>
                        <div className={`font-medium ${
                          isCompleted ? (isWithinTolerance ? 'text-green-600' : 'text-red-600') : 'text-gray-400'
                        }`}>
                          {isCompleted ? `${(material.actual - material.target).toFixed(2)} ${material.unit}` : '-'}
                        </div>
                      </div>
                    </div>

                    {!isCompleted && (
                      <div className="mt-3">
                        <button className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                          开始称量
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 天平状态 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">天平设备状态</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scales.map((scale) => (
            <div key={scale.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Scale className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{scale.name}</h4>
                    <p className="text-xs text-gray-600">{scale.model}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {scale.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">位置:</span>
                  <div className="font-medium">{scale.location}</div>
                </div>
                <div>
                  <span className="text-gray-600">量程:</span>
                  <div className="font-medium">{scale.capacity}</div>
                </div>
                <div>
                  <span className="text-gray-600">精度:</span>
                  <div className="font-medium">{scale.readability}</div>
                </div>
                <div>
                  <span className="text-gray-600">下次校准:</span>
                  <div className="font-medium">{scale.nextCalibration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};