import React, { useState } from 'react';
import { Play, Pause, CheckCircle, Clock, AlertTriangle, FileText, User, Calendar } from 'lucide-react';

const experiments = [
  {
    id: 'EXP-2024-001',
    title: 'Anti-CD20细胞培养实验',
    projectId: 'PRJ-2024-001',
    protocol: 'CHO-K1细胞培养标准操作程序',
    status: '进行中',
    progress: 65,
    operator: '李技师',
    startDate: '2024-01-15',
    estimatedEnd: '2024-01-20',
    currentStep: '细胞传代培养',
    totalSteps: 8,
    completedSteps: 5,
    priority: '高',
    equipment: ['生物反应器BR-001', '倒置显微镜MIC-001'],
    materials: ['DMEM培养基', 'FBS血清', '胰蛋白酶'],
    notes: '细胞生长状态良好，密度达到预期'
  },
  {
    id: 'EXP-2024-002',
    title: '蛋白A亲和层析纯化',
    projectId: 'PRJ-2024-001',
    protocol: '蛋白A亲和层析标准操作程序',
    status: '已完成',
    progress: 100,
    operator: '王工程师',
    startDate: '2024-01-12',
    estimatedEnd: '2024-01-14',
    currentStep: '实验完成',
    totalSteps: 6,
    completedSteps: 6,
    priority: '高',
    equipment: ['层析系统CHROM-001'],
    materials: ['蛋白A介质', '结合缓冲液', '洗脱缓冲液'],
    notes: '纯化效果良好，纯度达到98.5%'
  },
  {
    id: 'EXP-2024-003',
    title: 'SEC-HPLC纯度检测',
    projectId: 'PRJ-2024-002',
    protocol: 'SEC-HPLC检测标准操作程序',
    status: '待开始',
    progress: 0,
    operator: '张分析师',
    startDate: '2024-01-17',
    estimatedEnd: '2024-01-17',
    currentStep: '样品准备',
    totalSteps: 4,
    completedSteps: 0,
    priority: '中',
    equipment: ['HPLC系统HPLC-001'],
    materials: ['样品缓冲液', 'SEC色谱柱'],
    notes: '等待样品到达'
  },
  {
    id: 'EXP-2024-004',
    title: '细胞冻存实验',
    projectId: 'PRJ-2024-003',
    protocol: '细胞冻存标准操作程序',
    status: '进行中',
    progress: 30,
    operator: '赵研究员',
    startDate: '2024-01-16',
    estimatedEnd: '2024-01-18',
    currentStep: '冻存保护剂添加',
    totalSteps: 5,
    completedSteps: 2,
    priority: '中',
    equipment: ['程序降温仪', '液氮罐'],
    materials: ['DMSO', '冻存管', '冻存培养基'],
    notes: '细胞活力良好，准备冻存'
  },
  {
    id: 'EXP-2024-005',
    title: '抗体效价检测',
    projectId: 'PRJ-2024-001',
    protocol: 'ELISA抗体效价检测程序',
    status: '待开始',
    progress: 0,
    operator: '孙分析师',
    startDate: '2024-01-18',
    estimatedEnd: '2024-01-19',
    currentStep: '样品稀释',
    totalSteps: 6,
    completedSteps: 0,
    priority: '高',
    equipment: ['酶标仪', '洗板机'],
    materials: ['ELISA试剂盒', '稀释缓冲液'],
    notes: '等待上游纯化完成'
  }
];

const statusConfig = {
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Play },
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '待开始': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  '暂停': { color: 'text-orange-600', bg: 'bg-orange-50', icon: Pause },
  '异常': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

export const ExperimentExecution: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(experiments[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">实验执行</h1>
        <p className="text-gray-600">实时跟踪和管理实验执行过程</p>
      </div>

      {/* 实验统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">进行中实验</p>
              <p className="text-2xl font-bold text-gray-900">
                {experiments.filter(e => e.status === '进行中').length}
              </p>
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
                {experiments.filter(e => e.status === '已完成').length}
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
              <p className="text-sm font-medium text-gray-600">待开始</p>
              <p className="text-2xl font-bold text-gray-900">
                {experiments.filter(e => e.status === '待开始').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均进度</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(experiments.reduce((acc, e) => acc + e.progress, 0) / experiments.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 实验列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">实验列表</h3>
            <div className="space-y-4">
              {experiments.map((experiment) => {
                const config = statusConfig[experiment.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={experiment.id}
                    onClick={() => setSelectedExperiment(experiment)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedExperiment.id === experiment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{experiment.title}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>编号: {experiment.id}</div>
                      <div>操作员: {experiment.operator}</div>
                      <div>步骤: {experiment.completedSteps}/{experiment.totalSteps}</div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>进度</span>
                        <span>{experiment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${experiment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 实验详情 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedExperiment.title}</h3>
                <p className="text-sm text-gray-600">{selectedExperiment.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedExperiment.priority as keyof typeof priorityColors]}`}>
                  {selectedExperiment.priority}优先级
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedExperiment.status as keyof typeof statusConfig].bg} ${statusConfig[selectedExperiment.status as keyof typeof statusConfig].color}`}>
                  {selectedExperiment.status}
                </span>
              </div>
            </div>

            {/* 实验进度 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>实验进度</span>
                <span>{selectedExperiment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${selectedExperiment.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>步骤 {selectedExperiment.completedSteps}/{selectedExperiment.totalSteps}</span>
                <span>当前: {selectedExperiment.currentStep}</span>
              </div>
            </div>

            {/* 实验信息 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">项目编号:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedExperiment.projectId}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">操作规程:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedExperiment.protocol}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">操作员:</span>
                  <div className="text-sm font-medium text-gray-900 flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {selectedExperiment.operator}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">开始日期:</span>
                  <div className="text-sm font-medium text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedExperiment.startDate}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">预计完成:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedExperiment.estimatedEnd}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">当前步骤:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedExperiment.currentStep}</div>
                </div>
              </div>
            </div>

            {/* 设备和物料 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">使用设备</h4>
                <div className="space-y-1">
                  {selectedExperiment.equipment.map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">使用物料</h4>
                <div className="space-y-1">
                  {selectedExperiment.materials.map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 备注 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">实验备注</h4>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {selectedExperiment.notes}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-3">
              {selectedExperiment.status === '待开始' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  开始实验
                </button>
              )}
              {selectedExperiment.status === '进行中' && (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    记录数据
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    暂停实验
                  </button>
                </>
              )}
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                查看记录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};