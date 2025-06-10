import React, { useState } from 'react';
import { Plus, FileText, Search, Filter, Edit, Copy, Eye } from 'lucide-react';

const formulas = [
  {
    id: 'FORM-2024-001',
    name: 'DMEM完全培养基',
    category: '细胞培养',
    version: 'v2.1',
    status: '已发布',
    creator: '李技师',
    createDate: '2024-01-10',
    lastModified: '2024-01-15',
    description: '用于CHO细胞培养的完全培养基配方',
    totalVolume: '1000 mL',
    components: [
      { name: 'DMEM粉末', amount: 13.4, unit: 'g', percentage: 1.34, supplier: '赛默飞世尔', lotNo: 'TF240101' },
      { name: 'FBS血清', amount: 100, unit: 'mL', percentage: 10.0, supplier: 'Gibco', lotNo: 'GB240102' },
      { name: '青霉素-链霉素', amount: 10, unit: 'mL', percentage: 1.0, supplier: '赛默飞世尔', lotNo: 'TF240103' },
      { name: 'L-谷氨酰胺', amount: 10, unit: 'mL', percentage: 1.0, supplier: 'Sigma', lotNo: 'SG240104' },
      { name: '注射用水', amount: 866.6, unit: 'mL', percentage: 86.66, supplier: '华润双鹤', lotNo: 'HR240105' }
    ],
    instructions: [
      '1. 在无菌条件下，将DMEM粉末溶解在800mL注射用水中',
      '2. 调节pH至7.2-7.4',
      '3. 加入FBS血清，轻柔混匀',
      '4. 加入青霉素-链霉素溶液',
      '5. 加入L-谷氨酰胺溶液',
      '6. 用注射用水定容至1000mL',
      '7. 通过0.22μm滤膜过滤除菌',
      '8. 分装保存于2-8°C'
    ]
  },
  {
    id: 'FORM-2024-002',
    name: 'PBS缓冲液 (pH 7.4)',
    category: '缓冲液',
    version: 'v1.0',
    status: '已发布',
    creator: '王工程师',
    createDate: '2024-01-08',
    lastModified: '2024-01-08',
    description: '磷酸盐缓冲液，用于细胞洗涤和稀释',
    totalVolume: '1000 mL',
    components: [
      { name: 'NaCl', amount: 8.0, unit: 'g', percentage: 0.8, supplier: '国药集团', lotNo: 'GY240106' },
      { name: 'KCl', amount: 0.2, unit: 'g', percentage: 0.02, supplier: '国药集团', lotNo: 'GY240107' },
      { name: 'Na2HPO4·12H2O', amount: 2.9, unit: 'g', percentage: 0.29, supplier: '国药集团', lotNo: 'GY240108' },
      { name: 'KH2PO4', amount: 0.2, unit: 'g', percentage: 0.02, supplier: '国药集团', lotNo: 'GY240109' },
      { name: '注射用水', amount: 988.7, unit: 'mL', percentage: 98.87, supplier: '华润双鹤', lotNo: 'HR240105' }
    ],
    instructions: [
      '1. 将NaCl、KCl、Na2HPO4·12H2O、KH2PO4依次溶解在800mL注射用水中',
      '2. 用1M HCl或1M NaOH调节pH至7.4',
      '3. 用注射用水定容至1000mL',
      '4. 通过0.22μm滤膜过滤除菌',
      '5. 分装保存于室温或2-8°C'
    ]
  },
  {
    id: 'FORM-2024-003',
    name: '蛋白A洗脱缓冲液',
    category: '层析缓冲液',
    version: 'v1.2',
    status: '草稿',
    creator: '张分析师',
    createDate: '2024-01-12',
    lastModified: '2024-01-16',
    description: '用于蛋白A亲和层析的洗脱缓冲液',
    totalVolume: '500 mL',
    components: [
      { name: '柠檬酸', amount: 1.05, unit: 'g', percentage: 0.21, supplier: '国药集团', lotNo: 'GY240110' },
      { name: 'NaCl', amount: 2.92, unit: 'g', percentage: 0.584, supplier: '国药集团', lotNo: 'GY240106' },
      { name: '注射用水', amount: 496.03, unit: 'mL', percentage: 99.206, supplier: '华润双鹤', lotNo: 'HR240105' }
    ],
    instructions: [
      '1. 将柠檬酸溶解在400mL注射用水中',
      '2. 加入NaCl，搅拌至完全溶解',
      '3. 用1M NaOH调节pH至3.0±0.1',
      '4. 用注射用水定容至500mL',
      '5. 通过0.22μm滤膜过滤除菌',
      '6. 保存于2-8°C，有效期30天'
    ]
  },
  {
    id: 'FORM-2024-004',
    name: '无血清培养基',
    category: '细胞培养',
    version: 'v3.0',
    status: '测试中',
    creator: '赵研究员',
    createDate: '2024-01-14',
    lastModified: '2024-01-16',
    description: '用于抗体生产的无血清培养基配方',
    totalVolume: '1000 mL',
    components: [
      { name: 'CHO-S-SFM II', amount: 950, unit: 'mL', percentage: 95.0, supplier: 'Gibco', lotNo: 'GB240111' },
      { name: 'L-谷氨酰胺', amount: 20, unit: 'mL', percentage: 2.0, supplier: 'Sigma', lotNo: 'SG240104' },
      { name: '胰岛素', amount: 10, unit: 'mg', percentage: 0.001, supplier: 'Sigma', lotNo: 'SG240112' },
      { name: '转铁蛋白', amount: 5, unit: 'mg', percentage: 0.0005, supplier: 'Sigma', lotNo: 'SG240113' },
      { name: '亚硒酸钠', amount: 30, unit: 'mL', percentage: 3.0, supplier: 'Sigma', lotNo: 'SG240114' }
    ],
    instructions: [
      '1. 在无菌条件下，取CHO-S-SFM II基础培养基',
      '2. 加入L-谷氨酰胺溶液',
      '3. 分别溶解胰岛素和转铁蛋白，加入培养基中',
      '4. 加入亚硒酸钠溶液',
      '5. 轻柔混匀，避免产生泡沫',
      '6. 通过0.22μm滤膜过滤除菌',
      '7. 保存于2-8°C，使用前平衡至室温'
    ]
  }
];

const statusConfig = {
  '已发布': { color: 'text-green-600', bg: 'bg-green-50' },
  '草稿': { color: 'text-yellow-600', bg: 'bg-yellow-50' },
  '测试中': { color: 'text-blue-600', bg: 'bg-blue-50' },
  '已废弃': { color: 'text-red-600', bg: 'bg-red-50' }
};

const categoryColors = {
  '细胞培养': 'bg-blue-100 text-blue-800',
  '缓冲液': 'bg-green-100 text-green-800',
  '层析缓冲液': 'bg-purple-100 text-purple-800',
  '试剂': 'bg-orange-100 text-orange-800'
};

export const FormulaManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<typeof formulas[0] | null>(null);

  const filteredFormulas = formulas.filter(formula => {
    return (searchTerm === '' || formula.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            formula.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedCategory === '' || formula.category === selectedCategory);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">配方管理</h1>
          <p className="text-gray-600">管理培养基、缓冲液等配方的配制和版本控制</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建配方</span>
        </button>
      </div>

      {/* 配方统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">配方总数</p>
              <p className="text-2xl font-bold text-gray-900">{formulas.length}</p>
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
                {formulas.filter(f => f.status === '已发布').length}
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
                {formulas.filter(f => f.status === '草稿').length}
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
              <p className="text-sm font-medium text-gray-600">测试中</p>
              <p className="text-2xl font-bold text-gray-900">
                {formulas.filter(f => f.status === '测试中').length}
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
                placeholder="搜索配方名称或描述..."
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
              <option value="">所有分类</option>
              <option value="细胞培养">细胞培养</option>
              <option value="缓冲液">缓冲液</option>
              <option value="层析缓冲液">层析缓冲液</option>
              <option value="试剂">试剂</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 配方列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">配方列表</h3>
            <div className="space-y-4">
              {filteredFormulas.map((formula) => {
                const config = statusConfig[formula.status as keyof typeof statusConfig];

                return (
                  <div
                    key={formula.id}
                    onClick={() => setSelectedFormula(formula)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedFormula?.id === formula.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{formula.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[formula.category as keyof typeof categoryColors]}`}>
                        {formula.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>版本: {formula.version}</div>
                      <div>创建者: {formula.creator}</div>
                      <div>修改日期: {formula.lastModified}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                        {formula.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 配方详情 */}
        <div className="lg:col-span-2">
          {selectedFormula ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedFormula.name}</h3>
                  <p className="text-sm text-gray-600">{selectedFormula.id} - {selectedFormula.version}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">分类:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.category}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">状态:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.status}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">创建者:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.creator}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">总体积:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.totalVolume}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">创建日期:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.createDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">最后修改:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedFormula.lastModified}</div>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">配方描述</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedFormula.description}</p>
              </div>

              {/* 组分列表 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">配方组分</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">组分名称</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">用量</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">单位</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">百分比</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">供应商</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">批号</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedFormula.components.map((component, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{component.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{component.amount}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{component.unit}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{component.percentage}%</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{component.supplier}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{component.lotNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 操作步骤 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">操作步骤</h4>
                <div className="space-y-2">
                  {selectedFormula.instructions.map((instruction, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {instruction}
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  使用配方
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  复制配方
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  导出PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个配方查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};