import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { FileText, Download, Eye, Filter, Search, TrendingUp, BarChart3, Activity } from 'lucide-react';

// 层析数据
const chromatographyData = [
  { time: 0, absorbance: 0.02, conductivity: 5.2 },
  { time: 5, absorbance: 0.03, conductivity: 5.1 },
  { time: 10, absorbance: 0.05, conductivity: 5.0 },
  { time: 15, absorbance: 0.12, conductivity: 4.8 },
  { time: 20, absorbance: 0.85, conductivity: 4.5 },
  { time: 25, absorbance: 2.45, conductivity: 4.2 },
  { time: 30, absorbance: 3.82, conductivity: 3.8 },
  { time: 35, absorbance: 2.15, conductivity: 3.5 },
  { time: 40, absorbance: 0.68, conductivity: 3.2 },
  { time: 45, absorbance: 0.25, conductivity: 3.0 },
  { time: 50, absorbance: 0.08, conductivity: 2.8 },
  { time: 55, absorbance: 0.04, conductivity: 2.5 },
  { time: 60, absorbance: 0.02, conductivity: 2.2 }
];

// 质谱数据
const massSpecData = [
  { mz: 148500, intensity: 100, annotation: '完整抗体' },
  { mz: 149200, intensity: 85, annotation: '氧化形式' },
  { mz: 74250, intensity: 45, annotation: '重链' },
  { mz: 23100, intensity: 38, annotation: '轻链' },
  { mz: 147800, intensity: 25, annotation: '脱酰胺形式' },
  { mz: 150100, intensity: 15, annotation: '聚集体' }
];

// 分析结果
const analysisResults = [
  {
    id: 'ANA-2024-001',
    sampleId: 'SAM-2024-001',
    analysisType: 'SEC-HPLC',
    method: '分子排阻色谱',
    status: '已完成',
    analyst: '王分析师',
    date: '2024-01-16',
    results: {
      mainPeak: '98.5%',
      aggregates: '0.8%',
      fragments: '0.7%',
      retention: '12.5 min'
    },
    specification: {
      mainPeak: '≥95%',
      aggregates: '≤2%',
      fragments: '≤3%'
    },
    conclusion: '合格'
  },
  {
    id: 'ANA-2024-002',
    sampleId: 'SAM-2024-002',
    analysisType: 'LC-MS',
    method: '液相色谱-质谱联用',
    status: '已完成',
    analyst: '张研究员',
    date: '2024-01-15',
    results: {
      molecularWeight: '148,520 Da',
      purity: '97.8%',
      oxidation: '1.2%',
      deamidation: '0.8%'
    },
    specification: {
      molecularWeight: '148,500±50 Da',
      purity: '≥95%',
      oxidation: '≤3%'
    },
    conclusion: '合格'
  },
  {
    id: 'ANA-2024-003',
    sampleId: 'SAM-2024-003',
    analysisType: 'IEX-HPLC',
    method: '离子交换色谱',
    status: '进行中',
    analyst: '李技师',
    date: '2024-01-16',
    results: {
      mainPeak: '96.2%',
      acidicVariants: '2.1%',
      basicVariants: '1.7%'
    },
    specification: {
      mainPeak: '≥94%',
      acidicVariants: '≤4%',
      basicVariants: '≤4%'
    },
    conclusion: '待确认'
  }
];

const peaks = [
  { name: '主峰', startTime: 28, endTime: 38, area: 98.5, height: 3.82 },
  { name: '聚集体', startTime: 18, endTime: 25, area: 0.8, height: 0.85 },
  { name: '片段', startTime: 42, endTime: 50, area: 0.7, height: 0.25 }
];

const statusColors = {
  '已完成': 'bg-green-100 text-green-800',
  '进行中': 'bg-blue-100 text-blue-800',
  '待审核': 'bg-yellow-100 text-yellow-800',
  '异常': 'bg-red-100 text-red-800'
};

const conclusionColors = {
  '合格': 'bg-green-100 text-green-800',
  '不合格': 'bg-red-100 text-red-800',
  '待确认': 'bg-yellow-100 text-yellow-800'
};

export const AnalyticalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chromatography' | 'mass_spec' | 'results'>('chromatography');
  const [selectedResult, setSelectedResult] = useState(analysisResults[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">分析模块</h1>
          <p className="text-gray-600">层析和质谱结果分析，支持数据可视化和报告生成</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 分析统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">今日分析</p>
              <p className="text-2xl font-bold text-gray-900">{analysisResults.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">合格率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((analysisResults.filter(r => r.conclusion === '合格').length / analysisResults.length) * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">层析分析</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisResults.filter(r => r.analysisType.includes('HPLC')).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">质谱分析</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisResults.filter(r => r.analysisType.includes('MS')).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页切换 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('chromatography')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'chromatography'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            层析分析
          </button>
          <button
            onClick={() => setActiveTab('mass_spec')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'mass_spec'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            质谱分析
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            分析结果
          </button>
        </nav>
      </div>

      {activeTab === 'chromatography' && (
        /* 层析分析 */
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">SEC-HPLC 层析图谱</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">样品: SAM-2024-001</span>
                <span className="text-sm text-gray-600">方法: SEC_Method_v2.1</span>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chromatographyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: '时间 (min)', position: 'insideBottom', offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: '吸光度 (mAU)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: '电导率 (mS/cm)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="absorbance" stroke="#0284c7" strokeWidth={2} name="吸光度 (280nm)" />
                  <Line yAxisId="right" type="monotone" dataKey="conductivity" stroke="#dc2626" strokeWidth={2} name="电导率" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 峰识别结果 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">峰识别结果</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">峰名称</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">保留时间</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">面积%</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">峰高</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {peaks.map((peak, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">{peak.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{peak.startTime}-{peak.endTime} min</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{peak.area}%</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{peak.height} mAU</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 分析参数 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">分析条件</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">色谱柱:</span>
                  <span className="text-sm font-medium text-gray-900">TSKgel G3000SWXL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">流动相:</span>
                  <span className="text-sm font-medium text-gray-900">PBS pH 7.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">流速:</span>
                  <span className="text-sm font-medium text-gray-900">0.5 mL/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">检测波长:</span>
                  <span className="text-sm font-medium text-gray-900">280 nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">进样量:</span>
                  <span className="text-sm font-medium text-gray-900">20 μL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">柱温:</span>
                  <span className="text-sm font-medium text-gray-900">25°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mass_spec' && (
        /* 质谱分析 */
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">LC-MS 质谱图谱</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">样品: SAM-2024-002</span>
                <span className="text-sm text-gray-600">模式: ESI-TOF</span>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={massSpecData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mz" label={{ value: 'm/z', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: '相对强度 (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value}%`,
                      props.payload.annotation
                    ]}
                    labelFormatter={(label) => `m/z: ${label}`}
                  />
                  <Bar dataKey="intensity" fill="#0284c7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 质谱峰识别 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">质谱峰识别</h4>
              <div className="space-y-3">
                {massSpecData.map((peak, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{peak.annotation}</p>
                      <p className="text-xs text-gray-600">m/z: {peak.mz.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{peak.intensity}%</p>
                      <p className="text-xs text-gray-500">相对强度</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 质谱条件 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">质谱条件</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">离子化模式:</span>
                  <span className="text-sm font-medium text-gray-900">ESI+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">质量分析器:</span>
                  <span className="text-sm font-medium text-gray-900">TOF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">扫描范围:</span>
                  <span className="text-sm font-medium text-gray-900">100-200,000 m/z</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">毛细管电压:</span>
                  <span className="text-sm font-medium text-gray-900">3500 V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">干燥气温度:</span>
                  <span className="text-sm font-medium text-gray-900">300°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">脱溶剂化:</span>
                  <span className="text-sm font-medium text-gray-900">最大熵去卷积</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        /* 分析结果 */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 结果列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">分析结果</h3>
              <div className="space-y-4">
                {analysisResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => setSelectedResult(result)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedResult.id === result.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{result.analysisType}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[result.status as keyof typeof statusColors]}`}>
                        {result.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>样品: {result.sampleId}</div>
                      <div>分析员: {result.analyst}</div>
                      <div>日期: {result.date}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${conclusionColors[result.conclusion as keyof typeof conclusionColors]}`}>
                        {result.conclusion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 结果详情 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedResult.method}</h3>
                  <p className="text-sm text-gray-600">{selectedResult.id} - {selectedResult.sampleId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedResult.status as keyof typeof statusColors]}`}>
                    {selectedResult.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${conclusionColors[selectedResult.conclusion as keyof typeof conclusionColors]}`}>
                    {selectedResult.conclusion}
                  </span>
                </div>
              </div>

              {/* 分析结果对比 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">检测结果</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedResult.results).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600">{key}:</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">质量标准</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedResult.specification).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600">{key}:</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 分析信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-sm text-gray-600">分析员:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedResult.analyst}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">分析日期:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedResult.date}</div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>查看图谱</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>下载报告</span>
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  打印
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};