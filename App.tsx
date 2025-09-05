import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { ApplicationSelector } from './components/ApplicationSelector';
import { MockupCountSlider } from './components/MockupCountSlider';
import { Loader } from './components/Loader';
import { ImageGallery } from './components/ImageGallery';
import { generateMockups } from './services/geminiService';
import { GeneratedImage, WebbingApplication } from './types';
import { WEBBING_APPLICATIONS } from './constants';
import { DownloadIcon, SparklesIcon } from './components/IconComponents';

export default function App() {
  const [patternImage, setPatternImage] = useState<{ file: File, preview: string } | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<WebbingApplication>(WEBBING_APPLICATIONS[0]);
  const [mockupCount, setMockupCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleImageUpload = (file: File) => {
    setPatternImage({
      file,
      preview: URL.createObjectURL(file),
    });
    setGeneratedImages([]);
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!patternImage) {
      setError('請先上傳一個花紋圖片。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const results = await generateMockups(patternImage.file, selectedApplication.promptValue, mockupCount);
      setGeneratedImages(results.map((base64, index) => ({ id: `img-${index}-${Date.now()}`, base64 })));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : '生成圖片時發生未知錯誤。');
    } finally {
      setIsLoading(false);
    }
  }, [patternImage, selectedApplication, mockupCount]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-4 xl:col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">設定</h2>
            <div className="space-y-8">
              <ImageUpload onImageUpload={handleImageUpload} preview={patternImage?.preview} />
              <ApplicationSelector
                selected={selectedApplication}
                onChange={setSelectedApplication}
              />
              <MockupCountSlider value={mockupCount} onChange={setMockupCount} />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !patternImage}
                className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    生成中...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    生成 Mockups
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8 xl:col-span-9 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 min-h-[600px]">
             <h2 className="text-2xl font-bold mb-6 text-cyan-400">生成結果</h2>
            {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">{error}</div>}
            
            {isLoading && <Loader />}

            {!isLoading && generatedImages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center py-16">
                    <SparklesIcon className="w-16 h-16 mb-4 text-gray-600"/>
                    <p className="text-xl">您的 Mockup 將會顯示在這裡</p>
                    <p className="mt-2">請上傳花紋圖片並點擊生成按鈕開始。</p>
                </div>
            )}

            {generatedImages.length > 0 && <ImageGallery images={generatedImages} />}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        由 Gemini API 強力驅動
      </footer>
    </div>
  );
}