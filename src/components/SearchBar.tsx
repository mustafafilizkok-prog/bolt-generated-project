import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [period, setPeriod] = useState('Monthly');

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Select period:</span>
        <select
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={period}
          onChange={handlePeriodChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Financial YTD">Financial YTD</option>
          <option value="Calendar YTD">Calendar YTD</option>
        </select>
      </div>
    </div>
  );
}
