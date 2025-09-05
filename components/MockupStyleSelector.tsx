import React from 'react';
import { MOCKUP_STYLES } from '../constants';
import type { MockupStyle } from '../types';

interface MockupStyleSelectorProps {
  selected: MockupStyle;
  onChange: (value: MockupStyle) => void;
}

export const MockupStyleSelector: React.FC<MockupStyleSelectorProps> = ({ selected, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">3. 選擇視角</label>
      <div className="grid grid-cols-2 gap-2">
        {MOCKUP_STYLES.map(style => (
          <button
            key={style.promptValue}
            onClick={() => onChange(style)}
            className={`px-3 py-2 text-sm font-semibold text-center rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500
              ${selected.promptValue === style.promptValue 
                ? 'bg-cyan-500 text-white shadow' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`
            }
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  );
};
