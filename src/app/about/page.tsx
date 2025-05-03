'use client';

import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* 导航栏 */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-800">落叶生图</div>
            </div>
            <div className="flex items-center">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100">
                首页
              </Link>
              <Link href="/nine-grid" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100">
                九宫格
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 bg-indigo-100">
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <div className="max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
          <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">关于落叶生图</h1>
          
          <div className="space-y-6 text-indigo-800">
            <p>
              落叶生图是一款简单易用的图片处理工具，专注于帮助用户创建精美的照片墙。我们的目标是让每个人都能轻松地制作出具有创意的图片展示方式，无需专业的设计技能。
            </p>
            
            <h2 className="text-xl font-semibold mt-8">我们的故事</h2>
            <p>
              落叶生图源于创始人对社交媒体图片展示的思考。在现代社交媒体平台上，图片的展示方式往往决定了内容的吸引力。九宫格作为一种流行的展示方式，可以让一张大图化为九张小图，创造独特的视觉体验。
            </p>
            <p>
              然而，制作九宫格通常需要使用专业的图片编辑软件，对普通用户来说并不友好。因此，我们创建了落叶生图，一个专注于简化这一过程的工具，让每个人都能轻松地创建九宫格照片墙。
            </p>
            
            <h2 className="text-xl font-semibold mt-8">我们的团队</h2>
            <p>
              落叶生图背后是一群热爱设计和技术的年轻人。我们来自不同的背景，但都有一个共同的目标：用技术简化创意表达的过程，让更多人能够展示自己的故事。
            </p>
            
            <h2 className="text-xl font-semibold mt-8">联系我们</h2>
            <p>
              如果您对落叶生图有任何建议或反馈，欢迎联系我们：
            </p>
            <p className="font-medium">
              邮箱：contact@example.com<br />
              微信公众号：落叶生图
            </p>
          </div>
          
          <div className="mt-12">
            <div className="text-center">
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transition-all"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white bg-opacity-80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-indigo-500 text-sm">
              © {new Date().getFullYear()} 落叶生图. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 