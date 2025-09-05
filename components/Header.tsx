
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SparklesIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="ml-3 text-xl font-bold tracking-wider text-white">
              織帶花紋 Mockup 生成器
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
