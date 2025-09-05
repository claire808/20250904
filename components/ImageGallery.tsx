
import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './IconComponents';

interface ImageGalleryProps {
  images: GeneratedImage[];
}

const downloadImage = (base64: string, format: 'png' | 'jpeg') => {
  const link = document.createElement('a');
  const fileName = `mockup-${new Date().getTime()}.${format}`;

  if (format === 'jpeg') {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.download = fileName;
        link.click();
      }
    };
  } else {
    link.href = base64;
    link.download = fileName;
    link.click();
  }
};

const ImageCard: React.FC<{ image: GeneratedImage }> = ({ image }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-square bg-gray-700">
      <img src={image.base64} alt="Generated mockup" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col items-center justify-center p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
           <button
             onClick={() => downloadImage(image.base64, 'png')}
             className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-3 rounded-md text-sm transition-transform transform hover:scale-105"
           >
             <DownloadIcon className="w-4 h-4 mr-1.5" /> PNG
           </button>
           <button
             onClick={() => downloadImage(image.base64, 'jpeg')}
             className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-3 rounded-md text-sm transition-transform transform hover:scale-105"
           >
             <DownloadIcon className="w-4 h-4 mr-1.5" /> JPEG
           </button>
        </div>
      </div>
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};
