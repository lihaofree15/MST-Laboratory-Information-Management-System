import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const productionData = [
  { name: '1月', 产量: 45, 目标: 50, 效价: 2.8 },
  { name: '2月', 产量: 52, 目标: 55, 效价: 3.1 },
  { name: '3月', 产量: 48, 目标: 50, 效价: 2.9 },
  { name: '4月', 产量: 61, 目标: 60, 效价: 3.4 },
  { name: '5月', 产量: 58, 目标: 65, 效价: 3.2 },
  { name: '6月', 产量: 67, 目标: 70, 效价: 3.6 },
];

export const ProductionChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">抗体生产趋势</h3>
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
          <option>本年度</option>
          <option>上年度</option>
          <option>季度对比</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="产量" fill="#059669" name="实际产量 (kg)" />
            <Bar yAxisId="left" dataKey="目标" fill="#0284c7" name="目标产量 (kg)" />
            <Line yAxisId="right" type="monotone" dataKey="效价" stroke="#dc2626" strokeWidth={2} name="平均效价 (g/L)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">实际产量</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">目标产量</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">平均效价</span>
        </div>
      </div>
    </div>
  );
};