import React, { useState } from 'react';
import { Eye, Search, Filter, User, Calendar, Shield, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const auditLogs = [
  {
    id: 'AL-2024-001',
    timestamp: '2024-01-16 14:30:15',
    user: '张博士',
    userId: 'user001',
    action: '用户登录',
    module: '系统登录',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_abc123',
    status: 'success',
    details: '用户成功登录系统',
    affectedResource: 'N/A',
    oldValue: '',
    newValue: '',
    riskLevel: 'low'
  },
  {
    id: 'AL-2024-002',
    timestamp: '2024-01-16 14:25:22',
    user: '李研究员',
    userId: 'user002',
    action: '数据修改',
    module: '实验记录',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_def456',
    status: 'success',
    details: '修改实验记录ELN-2024-001的温度参数',
    affectedResource: 'ELN-2024-001',
    oldValue: '36.5°C',
    newValue: '37.0°C',
    riskLevel: 'medium'
  },
  {
    id: 'AL-2024-003',
    timestamp: '2024-01-16 14:20:33',
    user: '王分析师',
    userId: 'user003',
    action: '文件下载',
    module: '报告中心',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_ghi789',
    status: 'success',
    details: '下载质量控制报告QR-2024-003',
    affectedResource: 'QR-2024-003',
    oldValue: '',
    newValue: '',
    riskLevel: 'low'
  },
  {
    id: 'AL-2024-004',
    timestamp: '2024-01-16 14:15:10',
    user: '系统管理员',
    userId: 'admin001',
    action: '权限变更',
    module: '用户管理',
    ipAddress: '192.168.1.99',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_jkl012',
    status: 'success',
    details: '修改用户权限级别：李研究员',
    affectedResource: 'user002',
    oldValue: 'researcher',
    newValue: 'senior_researcher',
    riskLevel: 'high'
  },
  {
    id: 'AL-2024-005',
    timestamp: '2024-01-16 14:10:45',
    user: '赵工程师',
    userId: 'user004',
    action: '数据删除',
    module: '样本管理',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_mno345',
    status: 'failed',
    details: '尝试删除样本记录SAM-2024-001失败：权限不足',
    affectedResource: 'SAM-2024-001',
    oldValue: '',
    newValue: '',
    riskLevel: 'high'
  },
  {
    id: 'AL-2024-006',
    timestamp: '2024-01-16 14:05:18',
    user: '孙分析师',
    userId: 'user005',
    action: '批记录创建',
    module: '生产管理',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_pqr678',
    status: 'success',
    details: '创建新的生产批记录BATCH-2024-005',
    affectedResource: 'BATCH-2024-005',
    oldValue: '',
    newValue: 'BATCH-2024-005',
    riskLevel: 'medium'
  },
  {
    id: 'AL-2024-007',
    timestamp: '2024-01-16 14:00:55',
    user: '周技师',
    userId: 'user006',
    action: '设备状态变更',
    module: '设备管理',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_stu901',
    status: 'success',
    details: '将生物反应器BIO-001状态从"空闲"变更为"使用中"',
    affectedResource: 'BIO-001',
    oldValue: '空闲',
    newValue: '使用中',
    riskLevel: 'medium'
  },
  {
    id: 'AL-2024-008',
    timestamp: '2024-01-16 13:55:30',
    user: '吴主管',
    userId: 'user007',
    action: '审批操作',
    module: '审批管理',
    ipAddress: '192.168.1.106',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_vwx234',
    status: 'success',
    details: '批准工艺变更申请PC-2024-001',
    affectedResource: 'PC-2024-001',
    oldValue: '待审批',
    newValue: '已批准',
    riskLevel: 'high'
  },
  {
    id: 'AL-2024-009',
    timestamp: '2024-01-16 13:50:12',
    user: '郑分析师',
    userId: 'user008',
    action: '配方修改',
    module: '配方管理',
    ipAddress: '192.168.1.107',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_yzab567',
    status: 'success',
    details: '修改DMEM培养基配方FORM-2024-001的组分比例',
    affectedResource: 'FORM-2024-001',
    oldValue: 'FBS 10%',
    newValue: 'FBS 15%',
    riskLevel: 'high'
  },
  {
    id: 'AL-2024-010',
    timestamp: '2024-01-16 13:45:40',
    user: '钱研究员',
    userId: 'user009',
    action: '电子签名',
    module: '电子记录',
    ipAddress: '192.168.1.108',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_cdef890',
    status: 'success',
    details: '对实验记录ELN-2024-002进行电子签名',
    affectedResource: 'ELN-2024-002',
    oldValue: '未签名',
    newValue: '已签名',
    riskLevel: 'medium'
  }
];

const statusColors = {
  success: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800'
};

const riskColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const actionColors = {
  '用户登录': 'bg-blue-100 text-blue-800',
  '数据修改': 'bg-orange-100 text-orange-800',
  '文件下载': 'bg-green-100 text-green-800',
  '权限变更': 'bg-red-100 text-red-800',
  '数据删除': 'bg-red-100 text-red-800',
  '批记录创建': 'bg-purple-100 text-purple-800',
  '设备状态变更': 'bg-indigo-100 text-indigo-800',
  '审批操作': 'bg-pink-100 text-pink-800',
  '配方修改': 'bg-yellow-100 text-yellow-800',
  '电子签名': 'bg-teal-100 text-teal-800'
};

export const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [selectedLog, setSelectedLog] = useState<typeof auditLogs[0] | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    return (searchTerm === '' || 
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedModule === '' || log.module === selectedModule) &&
           (selectedRisk === '' || log.riskLevel === selectedRisk);
  });

  const modules = [...new Set(auditLogs.map(log => log.module))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审计日志</h1>
          <p className="text-gray-600">系统操作的完整审计追踪记录</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>导出日志</span>
        </button>
      </div>

      {/* 审计统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">今日操作</p>
              <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">成功操作</p>
              <p className="text-2xl font-bold text-gray-900">
                {auditLogs.filter(log => log.status === 'success').length}
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
              <p className="text-sm font-medium text-gray-600">失败操作</p>
              <p className="text-2xl font-bold text-gray-900">
                {auditLogs.filter(log => log.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">高风险操作</p>
              <p className="text-2xl font-bold text-gray-900">
                {auditLogs.filter(log => log.riskLevel === 'high').length}
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
                placeholder="搜索用户、操作或详情..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有模块</option>
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有风险级别</option>
              <option value="low">低风险</option>
              <option value="medium">中风险</option>
              <option value="high">高风险</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 日志列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">审计日志</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedLog?.id === log.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[log.status as keyof typeof statusColors]}`}>
                      {log.status === 'success' ? '成功' : log.status === 'failed' ? '失败' : '警告'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>用户: {log.user}</div>
                    <div>模块: {log.module}</div>
                    <div>时间: {log.timestamp}</div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${actionColors[log.action as keyof typeof actionColors] || 'bg-gray-100 text-gray-800'}`}>
                      {log.action}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${riskColors[log.riskLevel as keyof typeof riskColors]}`}>
                      {log.riskLevel === 'low' ? '低风险' : log.riskLevel === 'medium' ? '中风险' : '高风险'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 日志详情 */}
        <div className="lg:col-span-2">
          {selectedLog ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedLog.action}</h3>
                  <p className="text-sm text-gray-600">{selectedLog.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${actionColors[selectedLog.action as keyof typeof actionColors] || 'bg-gray-100 text-gray-800'}`}>
                    {selectedLog.action}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedLog.status as keyof typeof statusColors]}`}>
                    {selectedLog.status === 'success' ? '成功' : selectedLog.status === 'failed' ? '失败' : '警告'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskColors[selectedLog.riskLevel as keyof typeof riskColors]}`}>
                    {selectedLog.riskLevel === 'low' ? '低风险' : selectedLog.riskLevel === 'medium' ? '中风险' : '高风险'}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">操作用户:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedLog.user} ({selectedLog.userId})
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">操作时间:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedLog.timestamp}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">操作模块:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedLog.module}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">IP地址:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedLog.ipAddress}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">会话ID:</span>
                    <div className="text-sm font-medium text-gray-900 font-mono">{selectedLog.sessionId}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">影响资源:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedLog.affectedResource}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">操作状态:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedLog.status}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">风险级别:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedLog.riskLevel}</div>
                  </div>
                </div>
              </div>

              {/* 操作详情 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">操作详情</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedLog.details}
                </div>
              </div>

              {/* 数据变更 */}
              {(selectedLog.oldValue || selectedLog.newValue) && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">数据变更</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">变更前</div>
                      <div className="text-sm font-medium text-gray-900">{selectedLog.oldValue || '无'}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">变更后</div>
                      <div className="text-sm font-medium text-gray-900">{selectedLog.newValue || '无'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 用户代理 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">用户代理</h4>
                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                  {selectedLog.userAgent}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  查看相关日志
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  导出详情
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  标记为重要
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个审计日志查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};