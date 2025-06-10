import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('用户名或密码错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #021f63 0%, #0a2f7a 50%, #1e40af 100%)' }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-8 flex justify-center">
            <svg width="240" height="48" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <linearGradient x1="65.704%" y1="6.746%" x2="-24.776%" y2="71.321%" id="c">
                  <stop stopColor="#08FFDF" offset="0%"/>
                  <stop stopColor="#4894FF" offset="100%"/>
                </linearGradient>
                <path id="a" d="M0 0h240v48H0z"/>
              </defs>
              <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff">
                  <use xlinkHref="#a"/>
                </mask>
                <g mask="url(#b)">
                  <path d="M85.895 30.734v4.129h-13.686V13.913h4.721v16.821h8.965Zm30.329.27h4.662c2.241 0 3.585-.93 3.585-2.544 0-1.527-1.344-2.456-3.585-2.456h-4.662v4.999Zm0-8.651h4.662c1.763 0 2.868-.869 2.868-2.336 0-1.436-1.105-2.244-2.868-2.244h-4.662v4.58Zm4.901-8.441c4.602 0 7.47 2.006 7.47 5.238 0 2.274-1.374 4.041-3.615 4.61 2.69.509 4.362 2.544 4.362 5.298 0 3.591-3.018 5.805-7.889 5.805h-9.95V13.914h9.622Zm11.654 20.951h4.721V13.913h-4.721v20.95Zm23.039-4.13v4.13h-13.686V13.913h4.722v16.821h8.964Zm38.397-16.971c6.395 0 11.235 4.55 11.235 10.626 0 6.045-4.84 10.685-11.235 10.685s-11.235-4.61-11.235-10.685c0-6.105 4.84-10.626 11.235-10.626Zm-30.867.15v16.821h8.964v4.13h-13.685V13.913h4.721Zm14.436 6.654 6.062 14.298h-4.944l-5.811-14.298h4.693Zm16.491-2.673a6.44 6.44 0 0 0-6.455 6.495c0 3.681 2.958 6.555 6.455 6.555 3.495 0 6.335-2.874 6.335-6.555 0-3.683-2.84-6.495-6.335-6.495ZM174.96 13.913l2.229 5.259a6.944 6.944 0 0 1-6.431-4.332l-.377-.927h4.579Zm48.237 20.95-10.13-13.439v13.44h-4.512V13.911h4.302l10.16 13.469V13.911h4.484v20.952h-4.304Zm-127.37-19.665 2.142 5.409-2.601 6.386h5.13l1.506 3.801h-8.19l-1.644 4.07H87.3l8.528-19.666Zm8.25 5.37 6.06 14.295h-4.237l-5.813-14.295h4.695Zm-2.823-6.656 2.231 5.259a6.944 6.944 0 0 1-6.431-4.332l-.378-.927h4.578Z" fill="#FFF"/>
                  <path d="M32.501 27.69h-5.325l-1.661-4.026h6.986a3.743 3.743 0 0 0 .137-7.481h-4.676l-1.664-4.041h6.342a2.445 2.445 0 0 0-.14-4.886h-8.19l-1.68-4.027h9.87a6.476 6.476 0 0 1 6.464 6.474 6.45 6.45 0 0 1-1.556 4.205 7.763 7.763 0 0 1 2.85 6.012c0 4.284-3.48 7.77-7.758 7.77Zm-25.13.008H3.336V3.303h4.035v20.355h16.964l1.664 4.04H7.371Zm9.144-23.37 1.833 4.629-2.226 5.463h4.391l1.287 3.254h-6.793l-1.74 4.311H8.859l7.655-17.655Zm7.058 4.596 5.538 13.061h-4.244l-5.31-13.061h4.016Zm-2.415-5.694 1.91 4.5a5.94 5.94 0 0 1-5.502-3.707l-.323-.793h3.915ZM40.779 0H2.255C1.01 0 0 1.011 0 2.258v26.484c0 1.248 1.01 2.259 2.255 2.259h38.523c1.245 0 2.255-1.011 2.255-2.259V2.258C43.032 1.011 42.023 0 40.779 0Z" fill="url(#c)" transform="translate(12.5 8.5)"/>
                </g>
              </g>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">MST实验室信息化系统</h2>
          <p className="text-lg text-blue-200">Laboratory Information Management System</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  邮箱地址
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="请输入您的邮箱"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#021f63' }}
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                演示账号: admin@biotech.com / admin123
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};