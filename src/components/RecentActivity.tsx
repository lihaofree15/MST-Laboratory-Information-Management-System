import React from 'react';
import { Clock, User, TestTube, FileText, FlaskConical, Microscope } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const activities = [
  {
    id: 1,
    type: 'cell_culture',
    title: 'CHO细胞培养启动',
    description: 'CHO-K1细胞株复苏培养，批次 BATCH-CHO-001',
    user: '李技师',
    time: new Date(Date.now() - 30 * 60 * 1000),
    icon: Microscope
  },
  {
    id: 2,
    type: 'purification',
    title: '蛋白A纯化完成',
    description: 'Anti-CD20抗体纯化工艺完成，纯度98.5%',
    user: '张工程师',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: FlaskConical
  },
  {
    id: 3,
    type: 'quality_control',
    title: 'SEC-HPLC检测完成',
    description: '样品 SAM-2024-001 纯度检测合格',
    user: '王分析师',
    time: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: TestTube
  },
  {
    id: 4,
    type: 'batch_record',
    title: '生产批记录审核',
    description: '批次 BATCH-PD1-003 生产记录已审核通过',
    user: '刘主管',
    time: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: FileText
  },
  {
    id: 5,
    type: 'fermentation',
    title: '发酵罐接种完成',
    description: '50L生物反应器接种，预计培养7天',
    user: '赵研究员',
    time: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: FlaskConical
  },
  {
    id: 6,
    type: 'stability',
    title: '稳定性样品取样',
    description: '3个月稳定性研究样品已取样送检',
    user: '孙分析师',
    time: new Date(Date.now() - 12 * 60 * 60 * 1000),
    icon: TestTube
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">最近活动</h3>
      
      <div className="space-y-4">
        {activities.slice(0, 4).map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {formatDistanceToNow(activity.time, { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          查看所有活动
        </button>
      </div>
    </div>
  );
};