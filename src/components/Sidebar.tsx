import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban,
  FileText,
  Package,
  TestTube,
  Settings,
  Scale,
  BarChart3,
  Shield,
  Users,
  Microscope,
  ChevronDown,
  ChevronRight,
  Activity,
  AlertTriangle,
  ClipboardCheck,
  Eye,
  UserCheck
} from 'lucide-react';

const menuStructure = [
  {
    category: '总览',
    items: [
      { path: '/', icon: LayoutDashboard, label: '仪表盘' }
    ]
  },
  {
    category: '项目管理',
    items: [
      { path: '/projects', icon: FolderKanban, label: '项目管理' }
    ]
  },
  {
    category: '实验管理',
    items: [
      { path: '/experiment-execution', icon: FileText, label: '实验执行' },
      { path: '/task-management', icon: Settings, label: '工序任务' },
      { path: '/formula-management', icon: Package, label: '配方管理' }
    ]
  },
  {
    category: '电子实验记录',
    items: [
      { path: '/records', icon: FileText, label: '实验记录' },
      { path: '/record-templates', icon: FileText, label: '记录模板' }
    ]
  },
  {
    category: '物料管理',
    items: [
      { path: '/materials', icon: Package, label: '实验物料管理' },
      { path: '/samples', icon: TestTube, label: '实验样本管理' },
      { path: '/consumables', icon: Package, label: '实验耗材管理' },
      { path: '/chromatography-columns', icon: Package, label: '色谱柱管理' },
      { path: '/resin-management', icon: Package, label: '层析介质管理' }
    ]
  },
  {
    category: '设备管理',
    items: [
      { path: '/equipment', icon: Settings, label: '设备状态管理' },
      { path: '/equipment-maintenance', icon: Settings, label: '设备维保' },
      { path: '/equipment-calibration', icon: Settings, label: '设备校准' },
      { path: '/equipment-scheduling', icon: Settings, label: '设备预约排程' },
      { path: '/equipment-data', icon: Settings, label: '设备数据读写' }
    ]
  },
  {
    category: '细胞库管理',
    items: [
      { path: '/cell-bank', icon: Microscope, label: '细胞库管理' }
    ]
  },
  {
    category: '专业功能',
    items: [
      { path: '/weighing', icon: Scale, label: '称量配料站' }
    ]
  },
  {
    category: '偏差管理',
    items: [
      { path: '/deviation-management', icon: AlertTriangle, label: '偏差管理' }
    ]
  },
  {
    category: '数据分析',
    items: [
      { path: '/statistics', icon: BarChart3, label: '统计分析' },
      { path: '/analytical-module', icon: Activity, label: '分析模块' }
    ]
  },
  {
    category: '系统管理',
    items: [
      { path: '/audit-logs', icon: Eye, label: '审计日志' },
      { path: '/approval-management', icon: ClipboardCheck, label: '审批管理' },
      { path: '/electronic-signatures', icon: UserCheck, label: '电子签名记录' },
      { path: '/users', icon: Users, label: '用户管理' }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['总览']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-64 h-full overflow-y-auto" style={{ backgroundColor: '#021f63' }}>
      <div className="p-6 border-b border-blue-800">
        <div className="flex flex-col items-center">
          <svg width="160" height="32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="mb-3">
            <defs>
              <linearGradient x1="65.704%" y1="6.746%" x2="-24.776%" y2="71.321%" id="c">
                <stop stopColor="#08FFDF" offset="0%"/>
                <stop stopColor="#4894FF" offset="100%"/>
              </linearGradient>
              <path id="a" d="M0 0h160v32H0z"/>
            </defs>
            <g fill="none" fillRule="evenodd">
              <mask id="b" fill="#fff">
                <use xlinkHref="#a"/>
              </mask>
              <g mask="url(#b)">
                <path d="M57.263 20.489v2.753h-9.124V9.275h3.147v11.214h5.977Zm20.219.18h3.108c1.494 0 2.39-.62 2.39-1.696 0-1.018-.896-1.637-2.39-1.637h-3.108v3.333Zm0-5.767h3.108c1.175 0 1.912-.579 1.912-1.557 0-.957-.737-1.496-1.912-1.496h-3.108v3.053Zm3.267-5.627c3.068 0 4.98 1.337 4.98 3.492 0 1.516-.916 2.694-2.41 3.073 1.793.339 2.908 1.696 2.908 3.532 0 2.394-2.012 3.87-5.259 3.87h-6.633V9.276h6.414Zm7.769 13.967h3.147V9.275h-3.147v13.967Zm15.359-2.753v2.753h-9.124V9.275h3.148v11.214h5.976Zm25.598-11.314c4.263 0 7.49 3.033 7.49 7.084 0 4.03-3.227 7.123-7.49 7.123s-7.49-3.073-7.49-7.123c0-4.07 3.227-7.084 7.49-7.084Zm-20.578.1v11.214h5.976v2.753h-9.123V9.275h3.147Zm9.624 4.436 4.041 9.532h-3.296l-3.874-9.532h3.129Zm10.994-1.782a4.293 4.293 0 0 0-4.303 4.33c0 2.454 1.972 4.37 4.303 4.37 2.33 0 4.223-1.916 4.223-4.37 0-2.455-1.893-4.33-4.223-4.33ZM116.64 9.275l1.486 3.506a4.629 4.629 0 0 1-4.287-2.888l-.251-.618h3.052Zm32.158 13.967-6.753-8.959v8.96h-3.008V9.274h2.868l6.773 8.979v-8.98h2.989v13.968h-2.869Zm-84.913-13.11 1.428 3.606-1.734 4.257h3.42l1.004 2.534h-5.46l-1.096 2.713H58.2l5.685-13.11Zm5.5 3.58 4.04 9.53H70.13l-3.875-9.53h3.13Zm-1.882-4.437 1.487 3.506a4.629 4.629 0 0 1-4.287-2.888l-.252-.618h3.052Z" fill="#FFF"/>
                <path d="M21.667 18.46h-3.55l-1.107-2.684h4.657a2.495 2.495 0 0 0 .091-4.987h-3.117l-1.109-2.694h4.228a1.63 1.63 0 0 0-.093-3.257h-5.46l-1.12-2.685h6.58a4.317 4.317 0 0 1 4.309 4.316 4.3 4.3 0 0 1-1.037 2.803 5.175 5.175 0 0 1 1.9 4.008c0 2.856-2.32 5.18-5.172 5.18Zm-16.753.005H2.224V2.202h2.69v13.57h11.309l1.109 2.693H4.914Zm6.096-15.58 1.222 3.086-1.484 3.642h2.927l.858 2.169H9.862l-1.16 2.874H5.906l5.103-11.77Zm4.705 3.064 3.692 8.707h-2.829l-3.54-8.707h2.677Zm-1.61-3.796 1.273 3a3.96 3.96 0 0 1-3.668-2.471l-.215-.529h2.61ZM27.186 0H1.503C.673 0 0 .674 0 1.505v17.656c0 .832.673 1.506 1.503 1.506h25.682c.83 0 1.503-.674 1.503-1.506V1.505C28.688.674 28.015 0 27.185 0Z" fill="url(#c)" transform="translate(8.333 5.667)"/>
              </g>
            </g>
          </svg>
          <div className="text-center">
            <h2 className="text-white text-sm font-medium">MST实验室信息化系统</h2>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuStructure.map((section) => (
          <div key={section.category} className="mb-2">
            <button
              onClick={() => toggleCategory(section.category)}
              className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-blue-200 hover:bg-blue-800 transition-colors"
            >
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                {section.category}
              </span>
              {expandedCategories.includes(section.category) ? (
                <ChevronDown className="h-4 w-4 text-blue-300" />
              ) : (
                <ChevronRight className="h-4 w-4 text-blue-300" />
              )}
            </button>
            
            {expandedCategories.includes(section.category) && (
              <div className="pb-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-8 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-700 text-white border-r-2 border-blue-400'
                          : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};