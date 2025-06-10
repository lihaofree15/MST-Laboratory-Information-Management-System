import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, CheckCircle, AlertTriangle } from 'lucide-react';

const bookings = [
  {
    id: 'BOOK-2024-001',
    equipmentId: 'BIO-001',
    equipmentName: '5L生物反应器',
    user: '李技师',
    project: 'PRJ-2024-001',
    purpose: 'CHO细胞培养实验',
    startTime: '2024-01-16 09:00',
    endTime: '2024-01-18 17:00',
    duration: 56,
    status: '进行中',
    priority: '高',
    notes: '需要无菌操作环境',
    approver: '张主管',
    approvalDate: '2024-01-15'
  },
  {
    id: 'BOOK-2024-002',
    equipmentId: 'HPLC-001',
    equipmentName: 'SEC-HPLC系统',
    user: '王分析师',
    project: 'PRJ-2024-002',
    purpose: '抗体纯度检测',
    startTime: '2024-01-17 14:00',
    endTime: '2024-01-17 18:00',
    duration: 4,
    status: '已预约',
    priority: '中',
    notes: '需要SEC色谱柱',
    approver: '李主管',
    approvalDate: '2024-01-16'
  },
  {
    id: 'BOOK-2024-003',
    equipmentId: 'CHROM-001',
    equipmentName: '层析系统',
    user: '张工程师',
    project: 'PRJ-2024-001',
    purpose: '蛋白A亲和层析',
    startTime: '2024-01-18 08:00',
    endTime: '2024-01-18 16:00',
    duration: 8,
    status: '待审批',
    priority: '高',
    notes: '需要蛋白A介质',
    approver: null,
    approvalDate: null
  },
  {
    id: 'BOOK-2024-004',
    equipmentId: 'CENT-001',
    equipmentName: '高速离心机',
    user: '赵研究员',
    project: 'PRJ-2024-003',
    purpose: '细胞收集',
    startTime: '2024-01-19 10:00',
    endTime: '2024-01-19 12:00',
    duration: 2,
    status: '已完成',
    priority: '中',
    notes: '4°C离心',
    approver: '王主管',
    approvalDate: '2024-01-18'
  },
  {
    id: 'BOOK-2024-005',
    equipmentId: 'MICRO-001',
    equipmentName: '倒置显微镜',
    user: '孙分析师',
    project: 'PRJ-2024-004',
    purpose: '细胞形态观察',
    startTime: '2024-01-20 09:00',
    endTime: '2024-01-20 11:00',
    duration: 2,
    status: '冲突',
    priority: '低',
    notes: '需要相差镜头',
    approver: null,
    approvalDate: null
  }
];

const equipment = [
  { id: 'BIO-001', name: '5L生物反应器', location: '发酵车间-A区', status: '使用中' },
  { id: 'HPLC-001', name: 'SEC-HPLC系统', location: '分析实验室-B区', status: '空闲' },
  { id: 'CHROM-001', name: '层析系统', location: '纯化车间-C区', status: '空闲' },
  { id: 'CENT-001', name: '高速离心机', location: '纯化车间-C区', status: '维护中' },
  { id: 'MICRO-001', name: '倒置显微镜', location: '细胞培养室-D区', status: '空闲' }
];

const statusConfig = {
  '进行中': { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  '已预约': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  '待审批': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
  '已完成': { color: 'text-gray-600', bg: 'bg-gray-50', icon: CheckCircle },
  '冲突': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  '已取消': { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
};

const priorityColors = {
  '高': 'bg-red-100 text-red-800',
  '中': 'bg-yellow-100 text-yellow-800',
  '低': 'bg-green-100 text-green-800'
};

export const EquipmentScheduling: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-17');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = booking.startTime.split(' ')[0];
    return (selectedDate === '' || bookingDate === selectedDate) &&
           (selectedEquipment === '' || booking.equipmentId === selectedEquipment);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设备预约排程</h1>
          <p className="text-gray-600">管理设备使用预约和时间安排</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              列表视图
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              日历视图
            </button>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>新建预约</span>
          </button>
        </div>
      </div>

      {/* 预约统计 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">进行中</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === '进行中').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已预约</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === '已预约').length}
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
              <p className="text-sm font-medium text-gray-600">待审批</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === '待审批').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">冲突</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === '冲突').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总时长</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.reduce((acc, b) => acc + b.duration, 0)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="sm:w-48">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有设备</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* 列表视图 */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    预约信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    设备
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => {
                  const config = statusConfig[booking.status as keyof typeof statusConfig];
                  const StatusIcon = config.icon;

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                          <div className="text-sm text-gray-500">{booking.purpose}</div>
                          <div className="text-xs text-gray-400">项目: {booking.project}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[booking.priority as keyof typeof priorityColors]}`}>
                              {booking.priority}优先级
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.equipmentName}</div>
                        <div className="text-sm text-gray-500">{booking.equipmentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{booking.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.startTime}</div>
                        <div className="text-sm text-gray-500">至 {booking.endTime}</div>
                        <div className="text-xs text-gray-400">{booking.duration}小时</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon className={`h-4 w-4 mr-2 ${config.color}`} />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                            {booking.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {booking.status === '待审批' && (
                            <>
                              <button className="text-green-600 hover:text-green-900">
                                批准
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                拒绝
                              </button>
                            </>
                          )}
                          <button className="text-blue-600 hover:text-blue-900">
                            查看
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
      ) : (
        /* 日历视图 */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">设备预约日历</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 时间轴 */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">今日预约 ({selectedDate})</h4>
              <div className="space-y-3">
                {filteredBookings.map((booking) => {
                  const config = statusConfig[booking.status as keyof typeof statusConfig];
                  const StatusIcon = config.icon;

                  return (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`h-4 w-4 ${config.color}`} />
                          <span className="text-sm font-medium text-gray-900">{booking.equipmentName}</span>
                        </div>
                        <span className="text-xs text-gray-500">{booking.duration}h</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{booking.purpose}</div>
                      <div className="text-xs text-gray-500">
                        {booking.startTime.split(' ')[1]} - {booking.endTime.split(' ')[1]} | {booking.user}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 设备状态 */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">设备状态</h4>
              <div className="space-y-3">
                {equipment.map((eq) => {
                  const currentBooking = bookings.find(b => 
                    b.equipmentId === eq.id && 
                    b.status === '进行中'
                  );

                  return (
                    <div key={eq.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{eq.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          eq.status === '使用中' ? 'bg-red-100 text-red-800' :
                          eq.status === '维护中' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {eq.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{eq.location}</div>
                      {currentBooking && (
                        <div className="text-xs text-blue-600">
                          当前使用: {currentBooking.user} - {currentBooking.purpose}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};