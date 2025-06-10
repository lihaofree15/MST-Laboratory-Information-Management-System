import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Download, Share, Filter } from 'lucide-react';

const antibodyProductionData = [
  { name: '1月', 抗体产量: 45, 目标产量: 50, 平均效价: 2.8, 纯度: 98.2 },
  { name: '2月', 抗体产量: 52, 目标产量: 55, 平均效价: 3.1, 纯度: 98.5 },
  { name: '3月', 抗体产量: 48, 目标产量: 50, 平均效价: 2.9, 纯度: 98.1 },
  { name: '4月', 抗体产量: 61, 目标产量: 60, 平均效价: 3.4, 纯度: 98.7 },
  { name: '5月', 抗体产量: 58, 目标产量: 65, 平均效价: 3.2, 纯度: 98.3 },
  { name: '6月', 抗体产量: 67, 目标产量: 70, 平均效价: 3.6, 纯度: 98.9 },
];

const equipmentUtilizationData = [
  { name: '生物反应器', 本月: 85, 上月: 78 },
  { name: 'HPLC系统', 本月: 92, 上月: 88 },
  { name: '层析系统', 本月: 76, 上月: 82 },
  { name: '离心机', 本月: 68, 上月: 71 },
  { name: '显微镜', 本月: 45, 上月: 52 },
];

const qualityTrendData = [
  { name: '第1周', 纯度: 98.1, 活性: 95.2, 聚集体: 1.8 },
  { name: '第2周', 纯度: 98.3, 活性: 96.1, 聚集体: 1.6 },
  { name: '第3周', 纯度: 98.5, 活性: 95.8, 聚集体: 1.5 },
  { name: '第4周', 纯度: 98.7, 活性: 96.5, 聚集体: 1.3 },
];

const processEfficiencyData = [
  { name: '细胞培养', 效率: 94, 目标: 95 },
  { name: '发酵生产', 效率: 88, 目标: 90 },
  { name: '纯化工艺', 效率: 92, 目标: 95 },
  { name: '质量检测', 效率: 96, 目标: 98 },
  { name: '制剂工艺', 效率: 89, 目标: 92 },
];

export const DataAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">统计分析</h1>
          <p className="text-gray-600">分析生物工艺数据趋势和关键性能指标</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Share className="h-4 w-4" />
            <span>分享</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月抗体产量</p>
              <p className="text-2xl font-bold text-gray-900">67 kg</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均抗体效价</p>
              <p className="text-2xl font-bold text-gray-900">3.6 g/L</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">产品纯度</p>
              <p className="text-2xl font-bold text-gray-900">98.9%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">+0.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">设备利用率</p>
              <p className="text-2xl font-bold text-gray-900">73.2%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">+5.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Antibody Production Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">抗体生产趋势</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={antibodyProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="抗体产量" stroke="#0284c7" strokeWidth={2} name="实际产量 (kg)" />
                <Line type="monotone" dataKey="目标产量" stroke="#059669" strokeWidth={2} name="目标产量 (kg)" />
                <Line type="monotone" dataKey="平均效价" stroke="#dc2626" strokeWidth={2} name="平均效价 (g/L)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Utilization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">设备利用率对比</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="本月" fill="#0284c7" name="本月 (%)" />
                <Bar dataKey="上月" fill="#94a3b8" name="上月 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">质量指标趋势</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="纯度" stroke="#059669" strokeWidth={2} name="纯度 (%)" />
                <Line type="monotone" dataKey="活性" stroke="#0284c7" strokeWidth={2} name="相对活性 (%)" />
                <Line type="monotone" dataKey="聚集体" stroke="#dc2626" strokeWidth={2} name="聚集体 (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Process Efficiency */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">工艺效率分析</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="效率" fill="#059669" name="当前效率 (%)" />
                <Bar dataKey="目标" fill="#0284c7" name="目标效率 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">最近生产数据</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">批次编号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">抗体类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">产量 (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">效价 (g/L)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">纯度 (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">生产日期</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BATCH-CD20-005</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Anti-CD20 mAb</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12.5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98.9</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BATCH-PD1-003</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Anti-PD1 mAb</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8.2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98.5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-14</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BATCH-HER2-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Anti-HER2 ADC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6.8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.9</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98.2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};