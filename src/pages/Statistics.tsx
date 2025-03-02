import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const metrics = [
  { 
    title: 'Conversion Rate',
    value: '68%',
    change: 12,
    period: 'vs last month'
  },
  {
    title: 'Average Loan Size',
    value: formatCurrency(850000),
    change: -3,
    period: 'vs last month'
  },
  {
    title: 'Time to Settlement',
    value: '45 days',
    change: 15,
    period: 'vs last month'
  }
];

export default function Statistics() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Statistics</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            Last 30 Days
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5080FF] text-white rounded-lg hover:bg-[#4070EE]">
            <BarChart3 className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <div className="flex items-center mt-4">
              {metric.change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ml-1 ${
                metric.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {Math.abs(metric.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">{metric.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
        </div>
        <div className="p-6">
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </div>
      </div>
    </div>
  );
}
