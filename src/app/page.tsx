'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [gridPreview, setGridPreview] = useState<(string | null)[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      const newImages = await Promise.all(
        files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
        })
      );
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      const newImages = await Promise.all(
        files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
        })
      );
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleGenerateGrid = async () => {
    if (images.length === 0) return;
    
    setIsGenerating(true);
    try {
      // 计算需要多少个九宫格
      const gridCount = Math.ceil(images.length / 9);
      const paddedImages: (string | null)[] = [];
      
      for (let i = 0; i < gridCount * 9; i++) {
        paddedImages.push(i < images.length ? images[i] : null);
      }
      
      setGridPreview(paddedImages);
    } catch (error) {
      console.error('生成九宫格失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (index: number) => {
    if (!gridPreview[index]) return;
    
    const link = document.createElement('a');
    link.href = gridPreview[index] as string;
    link.download = `九宫格-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadGrid = async (gridIndex: number) => {
    const startIndex = gridIndex * 9;
    const endIndex = Math.min(startIndex + 9, gridPreview.length);
    const gridImages = gridPreview.slice(startIndex, endIndex);
    
    // 创建一个新的 canvas 来合并九宫格
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 大小（假设每个格子是 300x300）
    const cellSize = 300;
    canvas.width = cellSize * 3;
    canvas.height = cellSize * 3;

    // 绘制白色背景
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制每个格子
    const promises = gridImages.map((src, index) => {
      if (!src) return Promise.resolve();
      
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          ctx.drawImage(img, col * cellSize, row * cellSize, cellSize, cellSize);
          resolve();
        };
        img.src = src;
      });
    });

    // 等待所有图片绘制完成
    await Promise.all(promises);

    // 下载合并后的图片
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = `九宫格-第${gridIndex + 1}组.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (gridPreview.length === 0) return;
    
    setIsDownloadingAll(true);
    try {
      const gridCount = Math.ceil(gridPreview.length / 9);
      for (let i = 0; i < gridCount; i++) {
        await handleDownloadGrid(i);
        // 添加短暂延迟，避免浏览器同时下载太多文件
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">九宫格图片生成器</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 上传区域 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <div 
              ref={dropZoneRef}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                multiple
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer block"
              >
                <div className="space-y-2">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-600">点击或拖拽图片到这里</p>
                  <p className="text-sm text-gray-500">支持 JPG, PNG, GIF 格式</p>
                  <p className="text-sm text-gray-500">已上传 {images.length} 张图片</p>
                </div>
              </label>
            </div>

            {/* 已上传图片预览 */}
            {images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">已上传图片</h3>
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                  {images.map((src, index) => (
                    <div key={index} className="group aspect-square relative">
                      <Image
                        src={src}
                        alt={`上传的图片 ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleGenerateGrid}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  disabled={isGenerating}
                >
                  {isGenerating ? '生成中...' : '生成九宫格'}
                </button>
              </div>
            )}
          </div>

          {/* 预览区域 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">预览效果</h2>
              {gridPreview.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  disabled={isDownloadingAll}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloadingAll ? '下载中...' : '下载所有九宫格'}
                </button>
              )}
            </div>
            <div className="space-y-8">
              {isGenerating ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : gridPreview.length > 0 ? (
                // 将预览分成多个九宫格
                Array.from({ length: Math.ceil(gridPreview.length / 9) }).map((_, gridIndex) => (
                  <div key={gridIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">第 {gridIndex + 1} 组九宫格</h3>
                      <button
                        onClick={() => handleDownloadGrid(gridIndex)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        下载整组
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {gridPreview.slice(gridIndex * 9, (gridIndex + 1) * 9).map((src, index) => (
                        <div key={index} className="group aspect-square relative border border-gray-200">
                          {src ? (
                            <>
                              <Image
                                src={src}
                                alt={`九宫格 ${gridIndex * 9 + index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                onClick={() => handleDownload(gridIndex * 9 + index)}
                                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                              >
                                下载单张
                              </button>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              留白
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  上传图片后预览效果
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
