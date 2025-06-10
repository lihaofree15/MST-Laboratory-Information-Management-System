import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertTriangle, User, Calendar, Filter } from 'lucide-react';

const tasks = [
  {
    id: 'TASK-2024-001',
    title: '细胞复苏与培养',
    experimentId: 'EXP-2024-001',
    assignee: '李技师',
    status: '已完成',
    priority: '高',
    dueDate: '2024-01-16',
    completedDate: '2024-01-15',
    estimatedHours: 4,
    actualHours: 3.5,
    description: '从液氮中取出CHO-K1细胞，进行复苏和初代培养',
    dependencies: [],
    materials: ['DMEM培养基', 'FBS血清', '细胞冻存管'],
    equipment: ['生物安全柜', '培养箱', '倒置显微镜'],
    notes: '细胞复苏成功，活力95%'
  },
  {
    id: 'TASK-2024-002',
    title: '细胞传代培养',
    experimentId: 'EXP-2024-001',
    assignee: '李技师',
    status: '进行中',
    priority: '高',
    dueDate: '2024-01-18',
    completedDate: null,
    estimatedHours: 2,
    actualHours: 1.5,
    description: '对CHO-K1细胞进行传代培养，扩大培养规模',
    dependencies: ['TASK-2024-001'],
    materials: ['胰蛋白酶', 'DMEM培养基', '培养瓶'],
    equipment: ['生物安全柜', '培养箱'],
    notes: '第2代培养，细胞密度良好'
  },
  {
    id: 'TASK-2024-003',
    title: '培养基配制',
    experimentId: 'EXP-2024-002',
    assignee: '王工程师',
    status: '待开始',
    priority: '中',
    dueDate: '2024-01-17',
    completedDate: null,
    estimatedHours: 3,
    actualHours: 0,
    description: '配制无血清培养基，用于抗体生产',
    dependencies: [],
    materials: ['DMEM粉末', '碳酸氢钠', '注射用水'],
    equipment: ['称量天平', '搅拌器', '过滤器'],
    notes: '等待原料到货'
  },
  {
    id: 'TASK-2024-004',
    title: '蛋白A层析柱装填',
    experimentId: 'EXP-2024-003',
    assignee: '张分析师',
    status: '计划中',
    priority: '中',
    dueDate: '2024-01-20',
    completedDate: null,
    estimatedHours: 6,
    actualHours: 0,
    description: '装填蛋白A亲和层析柱，准备纯化工艺',
    dependencies: ['TASK-2024-002'],
    materials: ['蛋白A介质', '层析柱', '缓冲液'],
    equipment: ['层析系统', '蠕动泵'],
    notes: '需要预先平衡层析柱'
  },
  {
    id: 'TASK-2024-005',
    title: 'HPLC系统校准',
    experimentId: 'EXP-2024-004',
    assignee: '赵分析师',
    status: '延期',
    priority: '低',
    dueDate: '2024-01-15',
    completedDate: null,
    estimatedHours: 2,
    actualHours: 0,
    description: '对HPLC系统进行校准，确保检测准确性',
    dependencies: [],
    materials: ['标准品', '流动相'],
    equipment: ['HPLC系统', 'SEC色谱柱'],
    notes: '等待标准品到货'
  }
];

const statusConfig = {
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '待开始': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  '计划中': { color: 'text-purple-600', bg: 'bg-purple-50', icon: Calendar },
  '延期': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

export const TaskManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');

  const filteredTasks = tasks.filter(task => {
    return (selectedStatus === '' || task.status === selectedStatus) &&
           (selectedAssignee === '' || task.assignee === selectedAssignee);
  });

  const assignees = [...new Set(tasks.map(task => task.assignee))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">工序任务管理</h1>
          <p className="text-gray-600">管理实验工序任务的分配、执行和跟踪</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建任务</span>
        </button>
      </div>

      {/* 任务统计 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === '已完成').length}
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
                {tasks.filter(t => t.status === '进行中').length}
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
                {tasks.filter(t => t.status === '待开始').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">计划中</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === '计划中').length}
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
                {tasks.filter(t => t.status === '延期').length}
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
              <option value="待开始">待开始</option>
              <option value="计划中">计划中</option>
              <option value="延期">延期</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有执行人</option>
              {assignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const config = statusConfig[task.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* 任务头部 */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                    {task.priority}
                  </span>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
              </div>

              {/* 任务信息 */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">实验编号:</span>
                  <span className="text-sm font-medium text-gray-900">{task.experimentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">执行人:</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {task.assignee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">截止日期:</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {task.dueDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">预计工时:</span>
                  <span className="text-sm font-medium text-gray-900">{task.estimatedHours}h</span>
                </div>
                {task.actualHours > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">实际工时:</span>
                    <span className="text-sm font-medium text-gray-900">{task.actualHours}h</span>
                  </div>
                )}
              </div>

              {/* 状态标签 */}
              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                  {task.status}
                </span>
              </div>

              {/* 任务描述 */}
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>

              {/* 依赖关系 */}
              {task.dependencies.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1">依赖任务:</p>
                  <div className="flex flex-wrap gap-1">
                    {task.dependencies.map((dep, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 备注 */}
              {task.notes && (
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1">备注:</p>
                  <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">{task.notes}</p>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  查看详情
                </button>
                {task.status === '待开始' && (
                  <button className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                    开始
                  </button>
                )}
                {task.status === '进行中' && (
                  <button className="px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
                    完成
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