import React from 'react';

interface MockupCountSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const MockupCountSlider: React.FC<MockupCountSliderProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="mockup-count" className="block text-sm font-medium text-gray-300 mb-2">
        3. 選擇生成總數量: <span className="font-bold text-cyan-400">{value}</span>
      </label>
      <input
        id="mockup-count"
        type="range"
        min="5"
        max="25"
        step="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>5</span>
        <span>25</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        將生成 5 種不同視角 (正面、側面、背面、特寫、平拍) 的圖片。
      </p>
    </div>
  );
};