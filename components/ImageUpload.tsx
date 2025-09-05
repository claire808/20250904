
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, preview }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">1. 上傳花紋圖片</label>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-cyan-400' : 'border-gray-600'} border-dashed rounded-md cursor-pointer transition-colors duration-200`}
      >
        {preview ? (
          <img src={preview} alt="Pattern preview" className="object-contain h-full w-full rounded-md" />
        ) : (
          <div className="space-y-1 text-center">
            <UploadIcon className={`mx-auto h-12 w-12 ${isDragging ? 'text-cyan-400' : 'text-gray-500'}`} />
            <div className="flex text-sm text-gray-400">
              <p className="pl-1">點擊上傳或拖曳檔案至此</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
      </label>
    </div>
  );
};
