import React, { useState } from 'react';
import { UserCheck, Search, Filter, User, Calendar, FileText, Shield, Download } from 'lucide-react';

const signatures = [
  {
    id: 'ES-2024-001',
    document: '实验记录ELN-2024-001',
    documentType: '实验记录',
    signer: '张博士',
    signerRole: '项目负责人',
    signTime: '2024-01-15 16:30:00',
    signType: '实验记录签名',
    status: 'valid',
    ipAddress: '192.168.1.100',
    certificate: 'CERT-2024-001',
    reason: '确认实验数据准确性',
    location: '实验室A区',
    hashValue: 'SHA256:a1b2c3d4e5f6...',
    biometricData: '指纹验证通过'
  },
  {
    id: 'ES-2024-002',
    document: '质量报告QR-2024-001',
    documentType: '质量报告',
    signer: '王分析师',
    signerRole: '质量分析师',
    signTime: '2024-01-15 15:45:00',
    signType: '报告审核签名',
    status: 'valid',
    ipAddress: '192.168.1.102',
    certificate: 'CERT-2024-002',
    reason: '质量数据审核确认',
    location: '质控实验室',
    hashValue: 'SHA256:b2c3d4e5f6g7...',
    biometricData: '指纹验证通过'
  },
  {
    id: 'ES-2024-003',
    document: '工艺变更申请PC-2024-001',
    documentType: '变更申请',
    signer: '李主管',
    signerRole: '部门主管',
    signTime: '2024-01-15 14:20:00',
    signType: '审批签名',
    status: 'valid',
    ipAddress: '192.168.1.99',
    certificate: 'CERT-2024-003',
    reason: '工艺变更审批',
    location: '办公室',
    hashValue: 'SHA256:c3d4e5f6g7h8...',
    biometricData: '指纹验证通过'
  },
  {
    id: 'ES-2024-004',
    document: '偏差调查报告DEV-2024-001',
    documentType: '偏差报告',
    signer: '赵工程师',
    signerRole: '工艺工程师',
    signTime: '2024-01-15 13:10:00',
    signType: '调查确认签名',
    status: 'valid',
    ipAddress: '192.168.1.103',
    certificate: 'CERT-2024-004',
    reason: '偏差调查结果确认',
    location: '工艺开发部',
    hashValue: 'SHA256:d4e5f6g7h8i9...',
    biometricData: '指纹验证通过'
  },
  {
    id: 'ES-2024-005',
    document: '批生产记录BPR-2024-001',
    documentType: '生产记录',
    signer: '孙技师',
    signerRole: '生产技师',
    signTime: '2024-01-15 12:00:00',
    signType: '生产确认签名',
    status: 'expired',
    ipAddress: '192.168.1.104',
    certificate: 'CERT-2024-005',
    reason: '生产批次完成确认',
    location: '生产车间',
    hashValue: 'SHA256:e5f6g7h8i9j0...',
    biometricData: '指纹验证通过'
  },
  {
    id: 'ES-2024-006',
    document: '设备校准记录CAL-2024-001',
    documentType: '校准记录',
    signer: '周工程师',
    signerRole: '设备工程师',
    signTime: '2024-01-15 11:30:00',
    signType: '校准确认签名',
    status: 'revoked',
    ipAddress: '192.168.1.105',
    certificate: 'CERT-2024-006',
    reason: '设备校准结果确认',
    location: '设备间',
    hashValue: 'SHA256:f6g7h8i9j0k1...',
    biometricData: '指纹验证失败'
  }
];

const statusColors = {
  valid: 'bg-green-100 text-green-800',
  expired: 'bg-yellow-100 text-yellow-800',
  revoked: 'bg-red-100 text-red-800',
  pending: 'bg-blue-100 text-blue-800'
};

const typeColors = {
  '实验记录': 'bg-blue-100 text-blue-800',
  '质量报告': 'bg-green-100 text-green-800',
  '变更申请': 'bg-purple-100 text-purple-800',
  '偏差报告': 'bg-orange-100 text-orange-800',
  '生产记录': 'bg-indigo-100 text-indigo-800',
  '校准记录': 'bg-pink-100 text-pink-800'
};

const signTypeColors = {
  '实验记录签名': 'bg-blue-50 text-blue-700',
  '报告审核签名': 'bg-green-50 text-green-700',
  '审批签名': 'bg-purple-50 text-purple-700',
  '调查确认签名': 'bg-orange-50 text-orange-700',
  '生产确认签名': 'bg-indigo-50 text-indigo-700',
  '校准确认签名': 'bg-pink-50 text-pink-700'
};

export const ElectronicSignatures: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSignature, setSelectedSignature] = useState<typeof signatures[0] | null>(null);

  const filteredSignatures = signatures.filter(signature => {
    return (searchTerm === '' || 
            signature.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
            signature.signer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            signature.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedStatus === '' || signature.status === selectedStatus) &&
           (selectedType === '' || signature.documentType === selectedType);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">电子签名记录</h1>
          <p className="text-gray-600">管理和验证电子签名的完整性和有效性</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>导出签名记录</span>
        </button>
      </div>

      {/* 签名统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">有效签名</p>
              <p className="text-2xl font-bold text-gray-900">
                {signatures.filter(s => s.status === 'valid').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">过期签名</p>
              <p className="text-2xl font-bold text-gray-900">
                {signatures.filter(s => s.status === 'expired').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">撤销签名</p>
              <p className="text-2xl font-bold text-gray-900">
                {signatures.filter(s => s.status === 'revoked').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">今日签名</p>
              <p className="text-2xl font-bold text-gray-900">{signatures.length}</p>
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
                placeholder="搜索文档、签名人或签名ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="valid">有效</option>
              <option value="expired">过期</option>
              <option value="revoked">撤销</option>
              <option value="pending">待处理</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有文档类型</option>
              <option value="实验记录">实验记录</option>
              <option value="质量报告">质量报告</option>
              <option value="变更申请">变更申请</option>
              <option value="偏差报告">偏差报告</option>
              <option value="生产记录">生产记录</option>
              <option value="校准记录">校准记录</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 签名列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">电子签名记录</h3>
            <div className="space-y-4">
              {filteredSignatures.map((signature) => (
                <div
                  key={signature.id}
                  onClick={() => setSelectedSignature(signature)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedSignature?.id === signature.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{signature.document}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[signature.status as keyof typeof statusColors]}`}>
                      {signature.status === 'valid' ? '有效' : 
                       signature.status === 'expired' ? '过期' : 
                       signature.status === 'revoked' ? '撤销' : '待处理'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>签名ID: {signature.id}</div>
                    <div>签名人: {signature.signer}</div>
                    <div>签名时间: {signature.signTime}</div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[signature.documentType as keyof typeof typeColors]}`}>
                      {signature.documentType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 签名详情 */}
        <div className="lg:col-span-2">
          {selectedSignature ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedSignature.document}</h3>
                  <p className="text-sm text-gray-600">{selectedSignature.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[selectedSignature.documentType as keyof typeof typeColors]}`}>
                    {selectedSignature.documentType}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${signTypeColors[selectedSignature.signType as keyof typeof signTypeColors]}`}>
                    {selectedSignature.signType}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedSignature.status as keyof typeof statusColors]}`}>
                    {selectedSignature.status === 'valid' ? '有效' : 
                     selectedSignature.status === 'expired' ? '过期' : 
                     selectedSignature.status === 'revoked' ? '撤销' : '待处理'}
                  </span>
                </div>
              </div>

              {/* 签名基本信息 */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">签名人:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedSignature.signer}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">签名人角色:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedSignature.signerRole}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">签名时间:</span>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedSignature.signTime}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">签名位置:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedSignature.location}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">IP地址:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedSignature.ipAddress}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">数字证书:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedSignature.certificate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">哈希值:</span>
                    <div className="text-sm font-medium text-gray-900 font-mono text-xs">{selectedSignature.hashValue}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">生物识别:</span>
                    <div className="text-sm font-medium text-gray-900">{selectedSignature.biometricData}</div>
                  </div>
                </div>
              </div>

              {/* 签名原因 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">签名原因</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedSignature.reason}
                </div>
              </div>

              {/* 签名验证信息 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">签名验证</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">完整性验证</span>
                    </div>
                    <p className="text-xs text-green-600">✓ 文档未被篡改</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserCheck className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">身份验证</span>
                    </div>
                    <p className="text-xs text-green-600">✓ 签名人身份确认</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">时间戳验证</span>
                    </div>
                    <p className="text-xs text-green-600">✓ 时间戳有效</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">证书验证</span>
                    </div>
                    <p className="text-xs text-green-600">✓ 数字证书有效</p>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  验证签名
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  下载证书
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  查看文档
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">请选择一个电子签名记录查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};