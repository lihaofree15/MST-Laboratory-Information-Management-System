import React, { useState } from 'react';
import { Plus, ClipboardCheck, Search, Filter, User, Calendar, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const approvals = [
  {
    id: 'AP-2024-001',
    title: 'Anti-CD20工艺变更申请',
    type: '工艺变更',
    category: '生产工艺',
    submitter: '张博士',
    submitterDept: '抗体开发部',
    submitDate: '2024-01-14',
    status: 'pending',
    currentApprover: '李主管',
    approverRole: '部门主管',
    priority: '高',
    description: '优化细胞培养条件，提高抗体产量。将培养温度从36.5°C调整至37.0°C，CO2浓度从5%调整至6%',
    reason: '根据实验数据显示，调整后的培养条件可提高抗体产量15%',
    impact: '影响批次：BATCH-CD20-005及后续批次',
    attachments: ['工艺变更申请表.pdf', '实验数据报告.xlsx', '风险评估报告.pdf'],
    approvalHistory: [
      { step: 1, approver: '张博士', role: '申请人', action: '提交申请', date: '2024-01-14', status: 'approved' },
      { step: 2, approver: '李主管', role: '部门主管', action: '部门审批', date: '', status: 'pending' }
    ],
    dueDate: '2024-01-24',
    estimatedDays: 10
  },
  {
    id: 'AP-2024-002',
    title: '新设备采购申请',
    type: '设备采购',
    category: '资产管理',
    submitter: '王工程师',
    submitterDept: '设备管理部',
    submitDate: '2024-01-13',
    status: 'approved',
    currentApprover: '',
    approverRole: '',
    priority: '中',
    description: '采购新型生物反应器用于扩大生产规模，型号：Sartorius BIOSTAT STR 50L',
    reason: '现有设备产能不足，需要扩大生产规模以满足市场需求',
    impact: '预计投资金额：150万元，预期提升产能30%',
    attachments: ['设备采购申请.pdf', '技术规格书.pdf', '供应商报价单.pdf', '预算分析.xlsx'],
    approvalHistory: [
      { step: 1, approver: '王工程师', role: '申请人', action: '提交申请', date: '2024-01-13', status: 'approved' },
      { step: 2, approver: '赵主管', role: '部门主管', action: '部门审批', date: '2024-01-14', status: 'approved' },
      { step: 3, approver: '刘总监', role: '技术总监', action: '技术审批', date: '2024-01-15', status: 'approved' },
      { step: 4, approver: '陈总经理', role: '总经理', action: '最终审批', date: '2024-01-16', status: 'approved' }
    ],
    dueDate: '2024-01-23',
    estimatedDays: 10
  },
  {
    id: 'AP-2024-003',
    title: '质量标准修订',
    type: '标准变更',
    category: '质量管理',
    submitter: '赵分析师',
    submitterDept: '质量控制部',
    submitDate: '2024-01-12',
    status: 'rejected',
    currentApprover: '',
    approverRole: '',
    priority: '低',
    description: '修订抗体纯度检测标准，将纯度要求从≥95%提高至≥98%',
    reason: '提高产品质量标准，与国际先进标准接轨',
    impact: '可能影响现有产品的合格率，需要工艺优化',
    attachments: ['标准修订申请.pdf', '对比分析报告.pdf'],
    approvalHistory: [
      { step: 1, approver: '赵分析师', role: '申请人', action: '提交申请', date: '2024-01-12', status: 'approved' },
      { step: 2, approver: '孙主管', role: '质量主管', action: '质量审批', date: '2024-01-13', status: 'rejected' }
    ],
    dueDate: '2024-01-22',
    estimatedDays: 10,
    rejectionReason: '当前工艺条件下难以稳定达到98%纯度要求，建议先进行工艺优化'
  },
  {
    id: 'AP-2024-004',
    title: '偏差调查结果审批',
    type: '偏差处理',
    category: '质量管理',
    submitter: '周工程师',
    submitterDept: '工艺开发部',
    submitDate: '2024-01-15',
    status: 'in_review',
    currentApprover: '吴主管',
    approverRole: '质量主管',
    priority: '高',
    description: '针对偏差DEV-2024-001的调查结果和纠正预防措施',
    reason: 'pH值偏差已查明原因，需要审批纠正预防措施',
    impact: '影响批次已隔离，纠正措施实施后可恢复正常生产',
    attachments: ['偏差调查报告.pdf', '纠正预防措施.pdf', '风险评估.pdf'],
    approvalHistory: [
      { step: 1, approver: '周工程师', role: '调查员', action: '提交调查结果', date: '2024-01-15', status: 'approved' },
      { step: 2, approver: '吴主管', role: '质量主管', action: '质量审批', date: '', status: 'in_review' }
    ],
    dueDate: '2024-01-25',
    estimatedDays: 10
  },
  {
    id: 'AP-2024-005',
    title: '新员工培训计划',
    type: '培训申请',
    category: '人力资源',
    submitter: '钱主管',
    submitterDept: '人力资源部',
    submitDate: '2024-01-16',
    status: 'pending',
    currentApprover: '孙总监',
    approverRole: '人力总监',
    priority: '中',
    description: '为新入职的5名研发人员制定专业培训计划',
    reason: '提升新员工专业技能，缩短适应期',
    impact: '培训费用预算：5万元，培训周期：2个月',
    attachments: ['培训计划.pdf', '预算申请.xlsx'],
    approvalHistory: [
      { step: 1, approver: '钱主管', role: '申请人', action: '提交申请', date: '2024-01-16', status: 'approved' },
      { step: 2, approver: '孙总监', role: '人力总监', action: '总监审批', date: '', status: 'pending' }
    ],
    dueDate: '2024-01-26',
    estimatedDays: 10
  },
  {
    id: 'AP-2024-006',
    title: '实验室扩建申请',
    type: '基建申请',
    category: '基础设施',
    submitter: '郑主管',
    submitterDept: '实验室管理部',
    submitDate: '2024-01-11',
    status: 'approved',
    currentApprover: '',
    approverRole: '',
    priority: '高',
    description: '扩建细胞培养实验室，增加500平方米实验空间',
    reason: '现有实验室空间不足，限制了研发项目的开展',
    impact: '预计投资：300万元，建设周期：6个月',
    attachments: ['扩建方案.pdf', '设计图纸.dwg', '预算报告.xlsx', '环评报告.pdf'],
    approvalHistory: [
      { step: 1, approver: '郑主管', role: '申请人', action: '提交申请', date: '2024-01-11', status: 'approved' },
      { step: 2, approver: '李总监', role: '技术总监', action: '技术审批', date: '2024-01-12', status: 'approved' },
      { step: 3, approver: '王总监', role: '财务总监', action: '财务审批', date: '2024-01-13', status: 'approved' },
      { step: 4, approver: '陈总经理', role: '总经理', action: '最终审批', date: '2024-01-14', status: 'approved' }
    ],
    dueDate: '2024-01-21',
    estimatedDays: 10
  }
];

const statusConfig = {
  pending: { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock, label: '待审批' },
  in_review: { color: 'text-blue-600', bg: 'bg-blue-50', icon: ClipboardCheck, label: '审批中' },
  approved: { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle, label: '已批准' },
  rejected: { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle, label: '已拒绝' }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

const typeColors = {
  '工艺变更': 'bg-blue-100 text-blue-800',
  '设备采购': 'bg-purple-100 text-purple-800',
  '标准变更': 'bg-orange-100 text-orange-800',
  '偏差处理': 'bg-red-100 text-red-800',
  '培训申请': 'bg-green-100 text-green-800',
  '基建申请': 'bg-indigo-100 text-indigo-800'
};

const stepStatusColors = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  in_review: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800'
};

export const ApprovalManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedApproval, setSelectedApproval] = useState<typeof approvals[0] | null>(null);

  const filteredApprovals = approvals.filter(approval => {
    return (searchTerm === '' || 
            approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedStatus === '' || approval.status === selectedStatus) &&
           (selectedType === '' || approval.type === selectedType);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审批管理</h1>
          <p className="text-gray-600">管理各类申请的审批流程和状态跟踪</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建申请</span>
        </button>
      </div>

      {/* 审批统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">待审批</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ClipboardCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">审批中</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'in_review').length}
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
              <p className="text-sm font-medium text-gray-600">已批准</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'approved').length}
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
              <p className="text-sm font-medium text-gray-600">已拒绝</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'rejected').length}
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
                placeholder="搜索申请标题、申请人或编号..."
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
              <option value="pending">待审批</option>
              <option value="in_review">审批中</option>
              <option value="approved">已批准</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有类型</option>
              <option value="工艺变更">工艺变更</option>
              <option value="设备采购">设备采购</option>
              <option value="标准变更">标准变更</option>
              <option value="偏差处理">偏差处理</option>
              <option value="培训申请">培训申请</option>
              <option value="基建申请">基建申请</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 审批列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">审批申请</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredApprovals.map((approval) => {
                const config = statusConfig[approval.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={approval.id}
                    onClick={() => setSelectedApproval(approval)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedApproval?.id === approval.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{approval.title}</h4>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>编号: {approval.id}</div>
                      <div>申请人: {approval.submitter}</div>
                      <div>提交日期: {approval.submitDate}</div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[approval.type as keyof typeof typeColors]}`}>
                        {approval.type}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[approval.priority as keyof typeof priorityColors]}`}>
                        {approval.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 审批详情 */}
        <div className="lg:col-span-2">
          {selectedApproval ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedApproval.title}</h3>
                  <p className="text-sm text-gray-600">{selectedApproval.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[selectedApproval.type as keyof typeof typeColors]}`}>
                    {selectedApproval.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedApproval.priority as keyof typeof priorityColors]}`}>
                    {selectedApproval.priority}优先级
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedApproval.status as keyof typeof statusConfig].bg} ${statusConfig[selectedApproval.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[selectedApproval.status as keyof typeof statusConfig].label}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">申请人:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedApproval.submitter}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">申请部门:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedApproval.submitterDept}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">提交日期:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedApproval.submitDate}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">当前审批人:</span>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedApproval.currentApprover || '无'}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">审批角色:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedApproval.approverRole || '无'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">截止日期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedApproval.dueDate}</div>
                  </div>
                </div>
              </div>

              {/* 申请描述 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">申请描述</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedApproval.description}
                </div>
              </div>

              {/* 申请原因 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">申请原因</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedApproval.reason}
                </div>
              </div>

              {/* 影响分析 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">影响分析</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedApproval.impact}
                </div>
              </div>

              {/* 拒绝原因 */}
              {selectedApproval.status === 'rejected' && selectedApproval.rejectionReason && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">拒绝原因</h4>
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    {selectedApproval.rejectionReason}
                  </div>
                </div>
              )}

              {/* 附件 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">相关附件</h4>
                <div className="space-y-2">
                  {selectedApproval.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{attachment}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">下载</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 审批流程 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">审批流程</h4>
                <div className="space-y-3">
                  {selectedApproval.approvalHistory.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'approved' ? 'bg-green-100' :
                          step.status === 'pending' ? 'bg-yellow-100' :
                          step.status === 'in_review' ? 'bg-blue-100' :
                          'bg-red-100'
                        }`}>
                          {step.status === 'approved' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : step.status === 'pending' ? (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          ) : step.status === 'in_review' ? (
                            <ClipboardCheck className="h-4 w-4 text-blue-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              步骤 {step.step}: {step.action}
                            </p>
                            <p className="text-xs text-gray-600">
                              {step.approver} ({step.role})
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stepStatusColors[step.status as keyof typeof stepStatusColors]}`}>
                              {step.status === 'approved' ? '已批准' :
                               step.status === 'pending' ? '待处理' :
                               step.status === 'in_review' ? '审批中' : '已拒绝'}
                            </span>
                            {step.date && (
                              <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                {selectedApproval.status === 'pending' && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      批准
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      拒绝
                    </button>
                  </>
                )}
                {selectedApproval.status === 'in_review' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    继续审批
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  查看详情
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  打印申请
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个审批申请查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};