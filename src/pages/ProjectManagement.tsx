import React, { useState } from 'react';
import { Plus, Search, Filter, User, Calendar, MoreHorizontal, CheckCircle, Clock, AlertTriangle, Edit, Eye, Trash2 } from 'lucide-react';

const projects = [
  {
    id: 'PRJ-2024-001',
    name: 'Anti-CD20单抗工艺开发',
    type: '工艺开发',
    status: '进行中',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    manager: '张博士',
    team: ['李研究员', '王技师', '刘分析师'],
    tasks: 12,
    completedTasks: 8,
    priority: '高',
    description: '开发Anti-CD20单克隆抗体的上游和下游工艺',
    department: '抗体开发部',
    budget: '500万',
    actualCost: '320万',
    customFields: {
      '治疗领域': '肿瘤',
      '靶点': 'CD20',
      '抗体类型': '单克隆抗体',
      '表达系统': 'CHO细胞',
      '项目阶段': '工艺开发'
    }
  },
  {
    id: 'PRJ-2024-002',
    name: 'CHO细胞株稳定性验证',
    type: '稳定性研究',
    status: '计划中',
    progress: 0,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    manager: '李主管',
    team: ['陈研究员', '赵技师'],
    tasks: 8,
    completedTasks: 0,
    priority: '中',
    description: '验证CHO-K1细胞株的长期稳定性和表达能力',
    department: '细胞工程部',
    budget: '300万',
    actualCost: '0万',
    customFields: {
      '细胞株': 'CHO-K1',
      '验证周期': '6个月',
      '检测指标': '表达量、活率、遗传稳定性',
      '培养条件': '无血清培养',
      '项目阶段': '计划阶段'
    }
  },
  {
    id: 'PRJ-2024-003',
    name: '纯化工艺优化项目',
    type: '工艺优化',
    status: '已完成',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    manager: '王教授',
    team: ['孙研究员', '周技师', '吴分析师'],
    tasks: 15,
    completedTasks: 15,
    priority: '高',
    description: '优化蛋白A亲和层析和离子交换层析工艺',
    department: '工艺开发部',
    budget: '400万',
    actualCost: '380万',
    customFields: {
      '纯化策略': '三步纯化',
      '目标纯度': '>95%',
      '回收率': '>80%',
      '工艺规模': '200L',
      '项目阶段': '已完成'
    }
  },
  {
    id: 'PRJ-2024-004',
    name: '新型ADC抗体开发',
    type: '新产品开发',
    status: '进行中',
    progress: 35,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    manager: '赵博士',
    team: ['钱研究员', '孙技师', '李分析师', '周工程师'],
    tasks: 20,
    completedTasks: 7,
    priority: '高',
    description: '开发新型抗体药物偶联物，用于肿瘤治疗',
    department: '新药研发部',
    budget: '800万',
    actualCost: '280万',
    customFields: {
      '药物类型': 'ADC',
      '连接子': 'Cleavable linker',
      '载药量': 'DAR 3-4',
      '适应症': '实体瘤',
      '项目阶段': '早期开发'
    }
  },
  {
    id: 'PRJ-2024-005',
    name: '质量体系升级',
    type: '质量改进',
    status: '延期',
    progress: 20,
    startDate: '2023-11-01',
    endDate: '2024-03-31',
    manager: '吴主管',
    team: ['郑分析师', '王技师'],
    tasks: 10,
    completedTasks: 2,
    priority: '中',
    description: '升级质量管理体系，符合最新GMP要求',
    department: '质量保证部',
    budget: '200万',
    actualCost: '40万',
    customFields: {
      '合规标准': 'GMP',
      '认证机构': 'FDA',
      '升级范围': '全厂区',
      '完成时间': '2024年6月',
      '项目阶段': '执行阶段'
    }
  }
];

const statusConfig = {
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '计划中': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '已完成': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '暂停': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  '延期': { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

export const ProjectManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  const filteredProjects = projects.filter(project => {
    return (searchTerm === '' || 
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.manager.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedStatus === '' || project.status === selectedStatus) &&
           (selectedType === '' || project.type === selectedType);
  });

  const handleViewProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
          <p className="text-gray-600">管理实验项目进度，支持多维度监控和团队协作</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              卡片视图
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              列表视图
            </button>
          </div>
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>新建项目</span>
          </button>
        </div>
      </div>

      {/* 项目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总项目数</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">进行中</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === '进行中').length}
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
              <p className="text-sm font-medium text-gray-600">计划中</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === '计划中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均进度</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
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
                placeholder="搜索项目名称、编号或负责人..."
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
              <option value="进行中">进行中</option>
              <option value="计划中">计划中</option>
              <option value="已完成">已完成</option>
              <option value="暂停">暂停</option>
              <option value="延期">延期</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有类型</option>
              <option value="工艺开发">工艺开发</option>
              <option value="稳定性研究">稳定性研究</option>
              <option value="工艺优化">工艺优化</option>
              <option value="新产品开发">新产品开发</option>
              <option value="质量改进">质量改进</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        /* 卡片视图 */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const config = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* 项目头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.id}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* 状态和优先级 */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                    {project.priority}优先级
                  </span>
                </div>

                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>项目进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">项目类型:</span>
                    <span className="text-sm font-medium text-gray-900">{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">项目经理:</span>
                    <span className="text-sm font-medium text-gray-900">{project.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">开始时间:</span>
                    <span className="text-sm font-medium text-gray-900">{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">结束时间:</span>
                    <span className="text-sm font-medium text-gray-900">{project.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">预算:</span>
                    <span className="text-sm font-medium text-gray-900">{project.budget}</span>
                  </div>
                </div>

                {/* 团队成员 */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">团队成员:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.team.map((member, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewProject(project)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    查看详情
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    编辑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 列表视图 */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目编号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    开始时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    结束时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目负责人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    团队成员
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    进度
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => {
                  const config = statusConfig[project.status as keyof typeof statusConfig];

                  return (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {project.startDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {project.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          {project.manager}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {project.team.slice(0, 2).map((member, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {member}
                            </span>
                          ))}
                          {project.team.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{project.team.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleViewProject(project)}
                            className="text-blue-600 hover:text-blue-900"
                            title="查看"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900" title="编辑">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900" title="删除">
                            <Trash2 className="h-4 w-4" />
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
      )}

      {/* 新建项目模态框 */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">新建项目</h2>
              <button 
                onClick={() => setShowNewProjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      项目编号 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="系统自动生成或手动输入"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      项目名称 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入项目名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      项目类型 *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择项目类型</option>
                      <option value="工艺开发">工艺开发</option>
                      <option value="稳定性研究">稳定性研究</option>
                      <option value="工艺优化">工艺优化</option>
                      <option value="新产品开发">新产品开发</option>
                      <option value="质量改进">质量改进</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      项目责任人 *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择项目责任人</option>
                      <option value="张博士">张博士</option>
                      <option value="李主管">李主管</option>
                      <option value="王教授">王教授</option>
                      <option value="赵博士">赵博士</option>
                      <option value="吴主管">吴主管</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      所属部门
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择所属部门</option>
                      <option value="抗体开发部">抗体开发部</option>
                      <option value="细胞工程部">细胞工程部</option>
                      <option value="工艺开发部">工艺开发部</option>
                      <option value="新药研发部">新药研发部</option>
                      <option value="质量保证部">质量保证部</option>
                    </select>
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
              </div>

              {/* 时间和预算 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">时间和预算</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      开始时间 *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      结束时间 *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      项目预算
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入预算金额"
                    />
                  </div>
                </div>
              </div>

              {/* 项目描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  项目描述
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入项目描述"
                ></textarea>
              </div>

              {/* 自定义字段 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">自定义字段</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        治疗领域
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="如：肿瘤、自免等"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        靶点
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="如：CD20、PD-1等"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        表达系统
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">请选择表达系统</option>
                        <option value="CHO细胞">CHO细胞</option>
                        <option value="HEK293细胞">HEK293细胞</option>
                        <option value="大肠杆菌">大肠杆菌</option>
                        <option value="酵母">酵母</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        项目阶段
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">请选择项目阶段</option>
                        <option value="早期开发">早期开发</option>
                        <option value="工艺开发">工艺开发</option>
                        <option value="工艺优化">工艺优化</option>
                        <option value="工艺验证">工艺验证</option>
                        <option value="技术转移">技术转移</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    + 添加自定义字段
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  保存草稿
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  创建项目
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 项目详情模态框 */}
      {showProjectDetail && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.name}</h2>
                <p className="text-sm text-gray-600">{selectedProject.id}</p>
              </div>
              <button 
                onClick={() => setShowProjectDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 基本信息 */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">项目类型:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.type}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">项目状态:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.status}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">项目经理:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.manager}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">所属部门:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.department}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">开始时间:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.startDate}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">结束时间:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.endDate}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">项目预算:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.budget}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">实际成本:</span>
                      <div className="text-sm font-medium text-gray-900">{selectedProject.actualCost}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">项目描述</h3>
                  <p className="text-sm text-gray-700">{selectedProject.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">自定义字段</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.customFields).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm text-gray-600">{key}:</span>
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 侧边栏信息 */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">项目进度</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600">{selectedProject.progress}%</div>
                    <div className="text-sm text-gray-600">完成进度</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    已完成任务: {selectedProject.completedTasks}/{selectedProject.tasks}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">团队成员</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{selectedProject.manager}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">项目经理</span>
                    </div>
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      编辑项目
                    </button>
                    <button className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      添加任务
                    </button>
                    <button className="w-full px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      生成报告
                    </button>
                    <button className="w-full px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      项目归档
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};