import React from 'react';
import { User, Mail, Shield, Edit, Trash2, UserPlus } from 'lucide-react';

const users = [
  {
    id: '1',
    name: '张博士',
    email: 'zhang.bo@biotech.com',
    role: 'admin',
    department: '抗体开发部',
    status: 'active',
    lastLogin: '2024-01-15 09:30',
    avatar: null
  },
  {
    id: '2',
    name: '李研究员',
    email: 'li.yan@biotech.com',
    role: 'researcher',
    department: '生物工艺部',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    avatar: null
  },
  {
    id: '3',
    name: '王分析师',
    email: 'wang.fen@biotech.com',
    role: 'analyst',
    department: '质量控制部',
    status: 'active',
    lastLogin: '2024-01-14 16:20',
    avatar: null
  },
  {
    id: '4',
    name: '刘主管',
    email: 'liu.zhu@biotech.com',
    role: 'manager',
    department: '生产管理部',
    status: 'inactive',
    lastLogin: '2024-01-10 14:15',
    avatar: null
  }
];

const roleConfig = {
  admin: { label: '系统管理员', color: 'bg-purple-100 text-purple-800' },
  manager: { label: '部门主管', color: 'bg-blue-100 text-blue-800' },
  researcher: { label: '研究员', color: 'bg-green-100 text-green-800' },
  analyst: { label: '分析师', color: 'bg-yellow-100 text-yellow-800' }
};

const statusConfig = {
  active: { label: '在线', color: 'bg-green-100 text-green-800' },
  inactive: { label: '离线', color: 'bg-gray-100 text-gray-800' }
};

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-gray-600">管理系统用户账户和权限设置</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <UserPlus className="h-4 w-4" />
          <span>添加用户</span>
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总用户数</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">在线用户</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">管理员</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Mail className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">研究员</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'researcher').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  角色
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  部门
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最后登录
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleConfig[user.role as keyof typeof roleConfig].color}`}>
                      {roleConfig[user.role as keyof typeof roleConfig].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[user.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[user.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">角色权限说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h4 className="font-medium text-gray-900">系统管理员</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 系统全部功能</li>
              <li>• 用户管理</li>
              <li>• 系统配置</li>
              <li>• 数据导出</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <h4 className="font-medium text-gray-900">部门主管</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 查看所有数据</li>
              <li>• 审核工艺结果</li>
              <li>• 生成报告</li>
              <li>• 质量管理</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <h4 className="font-medium text-gray-900">研究员</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 抗体开发</li>
              <li>• 工艺设计</li>
              <li>• 实验记录</li>
              <li>• 数据分析</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <h4 className="font-medium text-gray-900">分析师</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 质量检测</li>
              <li>• 分析测试</li>
              <li>• 结果记录</li>
              <li>• 检测报告</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};