import React, { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, Clock, User, Calendar, FileText, Search, Filter } from 'lucide-react';

const deviations = [
  {
    id: 'DEV-2024-001',
    title: 'pH值超出规格范围',
    category: '工艺偏差',
    severity: '严重',
    status: '调查中',
    reportedBy: '李技师',
    reportedDate: '2024-01-15',
    description: '细胞培养过程中pH值降至6.5，低于规格要求的7.0-7.4范围',
    affectedBatch: 'BATCH-CHO-001',
    investigator: '张博士',
    dueDate: '2024-01-25',
    rootCause: '',
    correctiveActions: [],
    preventiveActions: [],
    attachments: ['pH_trend_chart.pdf', 'batch_record.pdf']
  },
  {
    id: 'DEV-2024-002',
    title: '层析压力异常升高',
    category: '设备偏差',
    severity: '中等',
    status: '已关闭',
    reportedBy: '王工程师',
    reportedDate: '2024-01-12',
    description: '蛋白A层析过程中系统压力升至0.5MPa，超过正常范围',
    affectedBatch: 'BATCH-PUR-003',
    investigator: '赵工程师',
    dueDate: '2024-01-22',
    rootCause: '层析柱堵塞，介质老化导致',
    correctiveActions: ['更换层析柱', '重新进行纯化'],
    preventiveActions: ['建立层析柱使用记录', '定期检查压力趋势'],
    attachments: ['pressure_log.xlsx']
  },
  {
    id: 'DEV-2024-003',
    title: '细胞活力低于预期',
    category: '质量偏差',
    severity: '轻微',
    status: '待分配',
    reportedBy: '孙研究员',
    reportedDate: '2024-01-16',
    description: 'CHO细胞复苏后活力仅为85%，低于预期的95%',
    affectedBatch: 'BATCH-CELL-002',
    investigator: '',
    dueDate: '2024-01-26',
    rootCause: '',
    correctiveActions: [],
    preventiveActions: [],
    attachments: ['cell_count_data.xlsx']
  }
];

const statusConfig = {
  '待分配': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  '调查中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: AlertTriangle },
  '待审核': { color: 'text-purple-600', bg: 'bg-purple-50', icon: FileText },
  '已关闭': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle }
};

const severityColors = {
  '严重': 'bg-red-100 text-red-800',
  '中等': 'bg-yellow-100 text-yellow-800',
  '轻微': 'bg-green-100 text-green-800'
};

const categoryColors = {
  '工艺偏差': 'bg-blue-100 text-blue-800',
  '设备偏差': 'bg-purple-100 text-purple-800',
  '质量偏差': 'bg-orange-100 text-orange-800',
  '文件偏差': 'bg-gray-100 text-gray-800'
};

export const DeviationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDeviation, setSelectedDeviation] = useState<typeof deviations[0] | null>(null);

  const filteredDeviations = deviations.filter(deviation => {
    return (searchTerm === '' || 
            deviation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deviation.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedStatus === '' || deviation.status === selectedStatus);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">偏差管理</h1>
          <p className="text-gray-600">记录、调查和处理生产过程中的偏差事件</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>记录偏差</span>
        </button>
      </div>

      {/* 偏差统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总偏差数</p>
              <p className="text-2xl font-bold text-gray-900">{deviations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">调查中</p>
              <p className="text-2xl font-bold text-gray-900">
                {deviations.filter(d => d.status === '调查中').length}
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
              <p className="text-sm font-medium text-gray-600">待处理</p>
              <p className="text-2xl font-bold text-gray-900">
                {deviations.filter(d => d.status === '待分配' || d.status === '待审核').length}
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
              <p className="text-sm font-medium text-gray-600">已关闭</p>
              <p className="text-2xl font-bold text-gray-900">
                {deviations.filter(d => d.status === '已关闭').length}
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
                placeholder="搜索偏差标题或编号..."
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
              <option value="待分配">待分配</option>
              <option value="调查中">调查中</option>
              <option value="待审核">待审核</option>
              <option value="已关闭">已关闭</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 偏差列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">偏差列表</h3>
            <div className="space-y-4">
              {filteredDeviations.map((deviation) => {
                const config = statusConfig[deviation.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={deviation.id}
                    onClick={() => setSelectedDeviation(deviation)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDeviation?.id === deviation.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{deviation.title}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>编号: {deviation.id}</div>
                      <div>报告人: {deviation.reportedBy}</div>
                      <div>报告日期: {deviation.reportedDate}</div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[deviation.category as keyof typeof categoryColors]}`}>
                        {deviation.category}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${severityColors[deviation.severity as keyof typeof severityColors]}`}>
                        {deviation.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 偏差详情 */}
        <div className="lg:col-span-2">
          {selectedDeviation ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedDeviation.title}</h3>
                  <p className="text-sm text-gray-600">{selectedDeviation.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[selectedDeviation.category as keyof typeof categoryColors]}`}>
                    {selectedDeviation.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityColors[selectedDeviation.severity as keyof typeof severityColors]}`}>
                    {selectedDeviation.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedDeviation.status as keyof typeof statusConfig].bg} ${statusConfig[selectedDeviation.status as keyof typeof statusConfig].color}`}>
                    {selectedDeviation.status}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">报告人:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedDeviation.reportedBy}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">报告日期:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedDeviation.reportedDate}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">影响批次:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedDeviation.affectedBatch}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">调查员:</span>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedDeviation.investigator || '待分配'}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">截止日期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedDeviation.dueDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">附件:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedDeviation.attachments.length} 个文件</div>
                  </div>
                </div>
              </div>

              {/* 偏差描述 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">偏差描述</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedDeviation.description}
                </div>
              </div>

              {/* 根本原因 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">根本原因</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedDeviation.rootCause || '待调查确定'}
                </div>
              </div>

              {/* 纠正措施 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">纠正措施</h4>
                {selectedDeviation.correctiveActions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDeviation.correctiveActions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">暂无纠正措施</div>
                )}
              </div>

              {/* 预防措施 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">预防措施</h4>
                {selectedDeviation.preventiveActions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDeviation.preventiveActions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">暂无预防措施</div>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                {selectedDeviation.status === '待分配' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    分配调查员
                  </button>
                )}
                {selectedDeviation.status === '调查中' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    提交调查结果
                  </button>
                )}
                {selectedDeviation.status === '待审核' && (
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    审核关闭
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  编辑偏差
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  生成报告
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个偏差查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};