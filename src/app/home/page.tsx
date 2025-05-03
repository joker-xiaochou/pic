'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: '九宫格生成',
      description: '将照片分割成九宫格，轻松制作精美的朋友圈照片墙',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      )
    },
    {
      title: '照片拼接',
      description: '多张照片自由拼接，创造独特的照片组合',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      title: '智能排版',
      description: '自动优化排版，让您的照片展示效果更佳',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      )
    }
  ];

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
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100">
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 头部区域 */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-indigo-900 sm:text-5xl">
                轻松制作精美<br />
                <span className="text-indigo-600">九宫格照片墙</span>
              </h1>
              <p className="mt-6 text-xl text-indigo-700">
                落叶生图，一款简单易用的图片处理工具，帮助您快速生成精美照片墙，让照片展示更有创意。
              </p>
              <div className="mt-10 flex space-x-4">
                <Link
                  href="/nine-grid"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transition-all"
                >
                  立即体验
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center px-6 py-3 border border-indigo-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all"
                >
                  了解更多
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative w-full h-[400px] lg:h-full overflow-hidden rounded-lg shadow-xl">
                <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4 bg-white rounded-lg h-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-indigo-100 rounded-md aspect-square relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-indigo-500">图片 {i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特性区域 */}
      <div id="features" className="py-16 bg-white bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-900">功能特点</h2>
            <p className="mt-4 text-xl text-indigo-600">我们提供多种图片处理功能，满足您的创意需求</p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-md transition-all ${
                    activeFeature === index 
                      ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 transform scale-105' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`inline-flex p-3 rounded-md ${
                    activeFeature === index ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-indigo-900">{feature.title}</h3>
                  <p className="mt-2 text-indigo-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 使用步骤 */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-900">简单三步，轻松搞定</h2>
            <p className="mt-4 text-xl text-indigo-600">使用落叶生图制作九宫格照片墙从未如此简单</p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '上传照片',
                  description: '通过拖拽或点击上传您的照片',
                  icon: '1'
                },
                {
                  title: '自动生成',
                  description: '系统自动生成九宫格布局',
                  icon: '2'
                },
                {
                  title: '下载分享',
                  description: '下载图片或直接分享到社交媒体',
                  icon: '3'
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {step.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-indigo-900">{step.title}</h3>
                  <p className="mt-2 text-indigo-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 号召行动 */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">开始制作您的九宫格照片墙</h2>
          <p className="mt-4 text-xl text-indigo-100">立即体验落叶生图，让您的照片更具创意</p>
          <div className="mt-8">
            <Link
              href="/nine-grid"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all shadow-lg"
            >
              立即开始
            </Link>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white bg-opacity-80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-800">落叶生图</div>
            <p className="mt-2 text-indigo-600">轻松制作，精美分享</p>
            <p className="mt-8 text-indigo-500 text-sm">
              © {new Date().getFullYear()} 落叶生图. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 