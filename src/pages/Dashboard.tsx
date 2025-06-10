import React from 'react';
import { StatsCard } from '../components/StatsCard';
import { ProductionChart } from '../components/ProductionChart';
import { ProcessStatus } from '../components/ProcessStatus';
import { RecentActivity } from '../components/RecentActivity';
import { 
  Dna, 
  Microscope, 
  FlaskConical, 
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: '活跃抗体项目',
      value: '24',
      change: '+12%',
      trend: 'up' as const,
      icon: Dna,
      color: 'blue'
    },
    {
      title: '细胞株库存',
      value: '156',
      change: '+8%',
      trend: 'up' as const,
      icon: Microscope,
      color: 'green'
    },
    {
      title: '进行中工艺',
      value: '8',
      change: '+23%',
      trend: 'up' as const,
      icon: FlaskConical,
      color: 'purple'
    },
    {
      title: '生产批次',
      value: '12',
      change: '-5%',
      trend: 'down' as const,
      icon: Activity,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Chart */}
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>

        {/* Process Status */}
        <div>
          <ProcessStatus />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivity />
      </div>
    </div>
  );
};