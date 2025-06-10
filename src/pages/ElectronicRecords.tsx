import React, { useState } from 'react';
import { Plus, FileText, Search, Filter, Calendar, User, CheckCircle, Clock, AlertTriangle, Edit, Eye, Copy, Download } from 'lucide-react';

const experimentRecords = [
  {
    id: 'EXP-2024-001',
    title: 'CHO-K1细胞培养实验',
    template: '细胞培养记录',
    templateId: 'TPL-001',
    templateVersion: 'v1.2',
    operator: '李技师',
    status: '已完成',
    createdDate: '2024-01-15',
    lastModified: '2024-01-16',
    project: 'PRJ-2024-001',
    projectName: 'Anti-CD20单抗工艺开发',
    batchNo: 'BATCH-001',
    progress: 100,
    description: '使用CHO-K1细胞株进行单抗表达的培养实验',
    category: '上游工艺',
    priority: '高',
    reviewer: '张博士',
    approver: '王主管'
  },
  {
    id: 'EXP-2024-002',
    title: '培养基配制实验',
    template: '物料称量记录',
    templateId: 'TPL-002',
    templateVersion: 'v2.0',
    operator: '王研究员',
    status: '进行中',
    createdDate: '2024-01-16',
    lastModified: '2024-01-16',
    project: 'PRJ-2024-001',
    projectName: 'Anti-CD20单抗工艺开发',
    batchNo: 'BATCH-002',
    progress: 65,
    description: '配制无血清培养基，用于细胞培养实验',
    category: '上游工艺',
    priority: '中',
    reviewer: '李技师',
    approver: '张博士'
  },
  {
    id: 'EXP-2024-003',
    title: '蛋白A纯化实验',
    template: '纯化工艺记录',
    templateId: 'TPL-003',
    templateVersion: 'v1.5',
    operator: '张分析师',
    status: '待审核',
    createdDate: '2024-01-14',
    lastModified: '2024-01-15',
    project: 'PRJ-2024-003',
    projectName: '纯化工艺优化项目',
    batchNo: 'BATCH-003',
    progress: 100,
    description: '使用蛋白A亲和层析纯化单克隆抗体',
    category: '下游工艺',
    priority: '高',
    reviewer: '孙研究员',
    approver: '王教授'
  },
  {
    id: 'EXP-2024-004',
    title: 'HPLC纯度分析',
    template: '分析检测记录',
    templateId: 'TPL-004',
    templateVersion: 'v1.0',
    operator: '刘分析师',
    status: '已完成',
    createdDate: '2024-01-12',
    lastModified: '2024-01-13',
    project: 'PRJ-2024-002',
    projectName: 'CHO细胞株稳定性验证',
    batchNo: 'BATCH-004',
    progress: 100,
    description: '使用HPLC检测抗体纯度和相关杂质',
    category: '质量研究',
    priority: '中',
    reviewer: '周分析师',
    approver: '李主管'
  },
  {
    id: 'EXP-2024-005',
    title: '细胞库种子复苏',
    template: '种子复苏记录',
    templateId: 'TPL-005',
    templateVersion: 'v1.1',
    operator: '陈技师',
    status: '进行中',
    createdDate: '2024-01-17',
    lastModified: '2024-01-17',
    project: 'PRJ-2024-004',
    projectName: '新型ADC抗体开发',
    batchNo: 'BATCH-005',
    progress: 30,
    description: '从液氮中复苏CHO细胞株，用于后续培养',
    category: '上游工艺',
    priority: '高',
    reviewer: '赵博士',
    approver: '钱研究员'
  }
];

const statusConfig = {
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '待审核': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '已驳回': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

const categoryColors = {
  '上游工艺': 'bg-blue-100 text-blue-800',
  '下游工艺': 'bg-green-100 text-green-800',
  '质量研究': 'bg-purple-100 text-purple-800',
  '研发分析': 'bg-orange-100 text-orange-800'
};

export const ElectronicRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);

  const filteredRecords = experimentRecords.filter(record => {
    return (searchTerm === '' || 
            record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.operator.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedStatus === '' || record.status === selectedStatus) &&
           (selectedCategory === '' || record.category === selectedCategory);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">实验记录</h1>
          <p className="text-gray-600">管理和追踪所有实验记录，确保数据完整性和可追溯性</p>
        </div>
        <button 
          onClick={() => setShowNewRecordModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>新建实验记录</span>
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总记录数</p>
              <p className="text-2xl font-bold text-gray-900">{experimentRecords.length}</p>
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
                {experimentRecords.filter(r => r.status === '已完成').length}
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
                {experimentRecords.filter(r => r.status === '进行中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">待审核</p>
              <p className="text-2xl font-bold text-gray-900">
                {experimentRecords.filter(r => r.status === '待审核').length}
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
                placeholder="搜索实验记录..."
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
              <option value="已完成">已完成</option>
              <option value="进行中">进行中</option>
              <option value="待审核">待审核</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有类别</option>
              <option value="上游工艺">上游工艺</option>
              <option value="下游工艺">下游工艺</option>
              <option value="质量研究">质量研究</option>
              <option value="研发分析">研发分析</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {/* 实验记录列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  实验记录
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  使用模板
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  关联项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作员
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类别
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  进度
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
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
                        <div className="text-sm font-medium text-gray-900">{record.title}</div>
                        <div className="text-sm text-gray-500">{record.id}</div>
                        <div className="text-xs text-gray-400">批次: {record.batchNo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{record.template}</div>
                        <div className="text-xs text-gray-500">{record.templateVersion}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{record.projectName}</div>
                        <div className="text-xs text-gray-500">{record.project}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{record.operator}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[record.category as keyof typeof categoryColors]}`}>
                        {record.category}
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
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{record.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{record.createdDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="查看">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="编辑">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="复制">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="下载">
                          <Download className="h-4 w-4" />
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

      {/* 新建实验记录模态框 */}
      {showNewRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">新建实验记录</h2>
              <button 
                onClick={() => setShowNewRecordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    实验记录标题 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入实验记录标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    选择模板 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择实验模板</option>
                    <option value="TPL-001">细胞培养记录 (v1.2)</option>
                    <option value="TPL-002">物料称量记录 (v2.0)</option>
                    <option value="TPL-003">纯化工艺记录 (v1.5)</option>
                    <option value="TPL-004">分析检测记录 (v1.0)</option>
                    <option value="TPL-005">种子复苏记录 (v1.1)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    关联项目 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择关联项目</option>
                    <option value="PRJ-2024-001">Anti-CD20单抗工艺开发</option>
                    <option value="PRJ-2024-002">CHO细胞株稳定性验证</option>
                    <option value="PRJ-2024-003">纯化工艺优化项目</option>
                    <option value="PRJ-2024-004">新型ADC抗体开发</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    实验类别 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择实验类别</option>
                    <option value="上游工艺">上游工艺</option>
                    <option value="下游工艺">下游工艺</option>
                    <option value="质量研究">质量研究</option>
                    <option value="研发分析">研发分析</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    批次号
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入批次号"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    优先级
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="中">中</option>
                    <option value="高">高</option>
                    <option value="低">低</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  实验描述
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入实验描述"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRecordModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  创建记录
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};