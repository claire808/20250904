
import React from 'react';
import { WEBBING_APPLICATIONS } from '../constants';
import type { WebbingApplication } from '../types';

interface ApplicationSelectorProps {
  selected: WebbingApplication;
  onChange: (value: WebbingApplication) => void;
}

export const ApplicationSelector: React.FC<ApplicationSelectorProps> = ({ selected, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = WEBBING_APPLICATIONS.find(app => app.promptValue === e.target.value);
    if (found) {
      onChange(found);
    }
  };

  return (
    <div>
      <label htmlFor="application" className="block text-sm font-medium text-gray-300 mb-2">2. 選擇織帶應用</label>
      <select
        id="application"
        name="application"
        className="block w-full pl-3 pr-10 py-2.5 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md text-white"
        value={selected.promptValue}
        onChange={handleChange}
      >
        {WEBBING_APPLICATIONS.map(app => (
          <option key={app.promptValue} value={app.promptValue}>
            {app.label}
          </option>
        ))}
      </select>
    </div>
  );
};
