import React, { useState } from 'react';
import { Plus, FileText, Search, Filter, Edit, Eye, Copy, Trash2, History, Download, Upload } from 'lucide-react';

const recordTemplates = [
  {
    id: 'TPL-001',
    name: '细胞培养记录',
    category: '上游工艺',
    version: 'v1.2',
    status: '已发布',
    fields: 12,
    createdBy: '张博士',
    createdDate: '2024-01-10',
    lastModified: '2024-01-15',
    description: '用于记录CHO细胞培养过程的标准模板',
    usageCount: 15,
    versions: [
      { version: 'v1.2', date: '2024-01-15', changes: '增加pH监控字段', status: '当前版本' },
      { version: 'v1.1', date: '2024-01-05', changes: '优化温度记录格式', status: '历史版本' },
      { version: 'v1.0', date: '2023-12-20', changes: '初始版本', status: '历史版本' }
    ],
    fieldGroups: [
      {
        name: '基本信息',
        fields: ['实验日期', '操作员', '细胞株', '培养基批号']
      },
      {
        name: '培养参数',
        fields: ['温度', 'pH值', '溶氧', '搅拌速度']
      },
      {
        name: '监测数据',
        fields: ['细胞密度', '活率', '葡萄糖', 'pH调节']
      }
    ]
  },
  {
    id: 'TPL-002',
    name: '物料称量记录',
    category: '称量配制',
    version: 'v2.0',
    status: '已发布',
    fields: 8,
    createdBy: '李技师',
    createdDate: '2024-01-08',
    lastModified: '2024-01-12',
    description: '用于记录物料称量和配制过程的标准模板',
    usageCount: 23,
    versions: [
      { version: 'v2.0', date: '2024-01-12', changes: '增加电子签名功能', status: '当前版本' },
      { version: 'v1.5', date: '2024-01-01', changes: '添加称量精度要求', status: '历史版本' }
    ],
    fieldGroups: [
      {
        name: '称量信息',
        fields: ['物料名称', '批号', '目标重量', '实际重量']
      },
      {
        name: '设备信息',
        fields: ['天平编号', '校准状态', '环境温湿度', '操作员签名']
      }
    ]
  },
  {
    id: 'TPL-003',
    name: '纯化工艺记录',
    category: '下游工艺',
    version: 'v1.5',
    status: '已发布',
    fields: 15,
    createdBy: '王教授',
    createdDate: '2023-12-15',
    lastModified: '2024-01-10',
    description: '用于记录蛋白纯化工艺过程的详细模板',
    usageCount: 8,
    versions: [
      { version: 'v1.5', date: '2024-01-10', changes: '优化层析参数记录', status: '当前版本' },
      { version: 'v1.4', date: '2023-12-28', changes: '增加压力监控', status: '历史版本' },
      { version: 'v1.3', date: '2023-12-20', changes: '添加缓冲液配制记录', status: '历史版本' }
    ],
    fieldGroups: [
      {
        name: '样品信息',
        fields: ['样品来源', '体积', '蛋白浓度', '纯度']
      },
      {
        name: '层析参数',
        fields: ['柱子信息', '流速', '压力', '温度', '缓冲液']
      },
      {
        name: '收集信息',
        fields: ['收集体积', '蛋白回收率', '纯度提升', '杂质去除', '质量评估', '储存条件']
      }
    ]
  },
  {
    id: 'TPL-004',
    name: '分析检测记录',
    category: '质量研究',
    version: 'v1.0',
    status: '已发布',
    fields: 10,
    createdBy: '刘分析师',
    createdDate: '2024-01-05',
    lastModified: '2024-01-05',
    description: '用于记录各类分析检测实验的标准模板',
    usageCount: 12,
    versions: [
      { version: 'v1.0', date: '2024-01-05', changes: '初始版本', status: '当前版本' }
    ],
    fieldGroups: [
      {
        name: '样品信息',
        fields: ['样品编号', '样品来源', '检测项目', '检测方法']
      },
      {
        name: '检测条件',
        fields: ['仪器设备', '检测参数', '标准品信息', '环境条件']
      },
      {
        name: '结果记录',
        fields: ['检测结果', '数据分析', '结论评价']
      }
    ]
  },
  {
    id: 'TPL-005',
    name: '种子复苏记录',
    category: '上游工艺',
    version: 'v1.1',
    status: '已发布',
    fields: 6,
    createdBy: '陈技师',
    createdDate: '2023-12-01',
    lastModified: '2024-01-03',
    description: '用于记录细胞库种子复苏过程的模板',
    usageCount: 6,
    versions: [
      { version: 'v1.1', date: '2024-01-03', changes: '增加复苏后活率检测', status: '当前版本' },
      { version: 'v1.0', date: '2023-12-01', changes: '初始版本', status: '历史版本' }
    ],
    fieldGroups: [
      {
        name: '种子信息',
        fields: ['细胞株名称', '冻存批号', '冻存日期', '复苏日期']
      },
      {
        name: '复苏过程',
        fields: ['复苏方法', '活率检测结果']
      }
    ]
  },
  {
    id: 'TPL-006',
    name: '制剂工艺记录',
    category: '下游工艺',
    version: 'v1.0',
    status: '草稿',
    fields: 9,
    createdBy: '赵工程师',
    createdDate: '2024-01-16',
    lastModified: '2024-01-16',
    description: '用于记录药物制剂工艺过程的模板（开发中）',
    usageCount: 0,
    versions: [
      { version: 'v1.0', date: '2024-01-16', changes: '初始版本（草稿）', status: '当前版本' }
    ],
    fieldGroups: [
      {
        name: '制剂信息',
        fields: ['产品名称', '批号', '规格', '制剂类型']
      },
      {
        name: '工艺参数',
        fields: ['配制条件', '过滤参数', '灌装参数', '包装信息', '质量检测']
      }
    ]
  }
];

const statusConfig = {
  '已发布': { color: 'text-green-600', bg: 'bg-green-50' },
  '草稿': { color: 'text-yellow-600', bg: 'bg-yellow-50' },
  '已归档': { color: 'text-gray-600', bg: 'bg-gray-50' }
};

const categoryColors = {
  '上游工艺': 'bg-blue-100 text-blue-800',
  '下游工艺': 'bg-green-100 text-green-800',
  '质量研究': 'bg-purple-100 text-purple-800',
  '研发分析': 'bg-orange-100 text-orange-800',
  '称量配制': 'bg-pink-100 text-pink-800'
};

export const RecordTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof recordTemplates[0] | null>(null);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const filteredTemplates = recordTemplates.filter(template => {
    return (searchTerm === '' || 
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedCategory === '' || template.category === selectedCategory) &&
           (selectedStatus === '' || template.status === selectedStatus);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">记录模板</h1>
          <p className="text-gray-600">管理实验记录模板，支持版本控制和自定义字段配置</p>
        </div>
        <button 
          onClick={() => setShowNewTemplateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>新建模板</span>
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
              <p className="text-sm font-medium text-gray-600">模板总数</p>
              <p className="text-2xl font-bold text-gray-900">{recordTemplates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已发布</p>
              <p className="text-2xl font-bold text-gray-900">
                {recordTemplates.filter(t => t.status === '已发布').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">草稿</p>
              <p className="text-2xl font-bold text-gray-900">
                {recordTemplates.filter(t => t.status === '草稿').length}
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
              <p className="text-sm font-medium text-gray-600">总使用次数</p>
              <p className="text-2xl font-bold text-gray-900">
                {recordTemplates.reduce((acc, t) => acc + t.usageCount, 0)}
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
                placeholder="搜索模板名称或编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
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
              <option value="称量配制">称量配制</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="已发布">已发布</option>
              <option value="草稿">草稿</option>
              <option value="已归档">已归档</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 模板列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">模板列表</h3>
            <div className="space-y-4">
              {filteredTemplates.map((template) => {
                const config = statusConfig[template.status as keyof typeof statusConfig];

                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                        {template.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>编号: {template.id}</div>
                      <div>版本: {template.version}</div>
                      <div>字段数: {template.fields}</div>
                      <div>使用次数: {template.usageCount}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[template.category as keyof typeof categoryColors]}`}>
                        {template.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 模板详情 */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-600">{selectedTemplate.id} - {selectedTemplate.version}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[selectedTemplate.category as keyof typeof categoryColors]}`}>
                    {selectedTemplate.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedTemplate.status as keyof typeof statusConfig].bg} ${statusConfig[selectedTemplate.status as keyof typeof statusConfig].color}`}>
                    {selectedTemplate.status}
                  </span>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">创建者:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.createdBy}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">创建时间:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.createdDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">最后修改:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.lastModified}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">字段数量:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.fields}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">使用次数:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.usageCount}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">当前版本:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedTemplate.version}</div>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">模板描述</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedTemplate.description}
                </div>
              </div>

              {/* 字段组 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">字段配置</h4>
                <div className="space-y-4">
                  {selectedTemplate.fieldGroups.map((group, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">{group.name}</h5>
                      <div className="flex flex-wrap gap-2">
                        {group.fields.map((field, fieldIndex) => (
                          <span key={fieldIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 版本历史 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">版本历史</h4>
                  <button 
                    onClick={() => setShowVersionHistory(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                  >
                    <History className="h-4 w-4" />
                    <span>查看全部</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedTemplate.versions.slice(0, 2).map((version, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{version.version}</div>
                        <div className="text-xs text-gray-600">{version.changes}</div>
                      </div>
                      <div className="text-xs text-gray-500">{version.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  使用模板
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  编辑模板
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  复制模板
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  导出模板
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个模板查看详情</p>
            </div>
          )}
        </div>
      </div>

      {/* 新建模板模态框 */}
      {showNewTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">新建记录模板</h2>
              <button 
                onClick={() => setShowNewTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    模板名称 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入模板名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    模板类别 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">请选择类别</option>
                    <option value="上游工艺">上游工艺</option>
                    <option value="下游工艺">下游工艺</option>
                    <option value="质量研究">质量研究</option>
                    <option value="研发分析">研发分析</option>
                    <option value="称量配制">称量配制</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板描述
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入模板描述"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  字段配置
                </label>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">基本信息</h4>
                      <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                        添加字段
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="字段名称"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="text">文本</option>
                        <option value="number">数字</option>
                        <option value="date">日期</option>
                        <option value="select">选择</option>
                        <option value="textarea">多行文本</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    + 添加字段组
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTemplateModal(false)}
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
                  创建并发布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 版本历史模态框 */}
      {showVersionHistory && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">版本历史 - {selectedTemplate.name}</h2>
              <button 
                onClick={() => setShowVersionHistory(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {selectedTemplate.versions.map((version, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-gray-900">{version.version}</span>
                      {version.status === '当前版本' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          当前版本
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{version.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{version.changes}</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                      查看详情
                    </button>
                    {version.status !== '当前版本' && (
                      <>
                        <button className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100">
                          恢复此版本
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                          下载
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};