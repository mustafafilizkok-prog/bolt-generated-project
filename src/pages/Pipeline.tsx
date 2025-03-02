import { Search, Filter, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const stages = [
  {
    title: 'New Leads',
    bgColor: 'bg-[#EEF6FF]',
    deals: [
      { name: 'Bill Murray', type: 'Home Loan', amount: 760000, agent: 'P. Abassi' },
      { name: 'John Smith', type: 'Investment Loan', amount: 950000, agent: 'C. Rogl' },
      { name: 'Sarah Parker', type: 'Home Loan', amount: 580000, agent: 'P. Oliver' }
    ]
  },
  {
    title: 'Attempted Contact',
    bgColor: 'bg-[#E0E7FF]',
    deals: [
      { name: 'Alice Johnson', type: 'Home Loan', amount: 450000, agent: 'S. Monaco' },
      { name: 'Charlie Brown', type: 'Investment Loan', amount: 600000, agent: 'P. Abassi' }
    ]
  },
  {
    title: 'Contacted WIP',
    bgColor: 'bg-[#C7D2FE]',
    deals: [
      { name: 'David Lee', type: 'Construction Loan', amount: 800000, agent: 'C. Rogl' },
      { name: 'Emily Davis', type: 'Home Loan', amount: 520000, agent: 'P. Oliver' }
    ]
  },
  {
    title: 'Application',
    bgColor: 'bg-[#CDD6FF]',
    deals: [
      { name: 'Brad Jones', type: 'Home Loan', amount: 320000, agent: 'P. Abassi' },
      { name: 'Penelope Hope', type: 'Investment Loan', amount: 1200000, agent: 'P. Oliver' },
      { name: 'George Ibrahim', type: 'Home Loan', amount: 770000, agent: 'S. Monaco' }
    ]
  },
  {
    title: 'Approved',
    bgColor: 'bg-[#02D9F8]',
    deals: [
      { name: 'Helen Smith', type: 'Home Loan', amount: 850000, agent: 'P. Abassi' },
      { name: 'Sam Harris', type: 'Investment Loan', amount: 1060000, agent: 'P. Oliver' }
    ]
  },
  {
    title: 'Settled',
    bgColor: 'bg-[#5271FF]',
    deals: [
      { name: 'Andre Agassi', type: 'Home Loan', amount: 735500, agent: 'P. Oliver' },
      { name: 'Pedro Alvarez', type: 'Construction Loan', amount: 510000, agent: 'A. Sneesby' },
      { name: 'Shanon Taylor', type: 'Home Loan', amount: 490500, agent: 'P. Abassi' }
    ]
  }
];

const formatTotalAmount = (amount: number) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}m`;
  }
  return `$${(amount / 1000).toFixed(0)}k`;
};

export default function Pipeline() {
  const [selectedAgent, setSelectedAgent] = useState('All');
  const staffList = ['A. Sneesby', 'P. Oliver', 'S. Monaco', 'C. Rogl', 'P. Abassi']; // Replace with actual staff list from settings

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Pipeline</h1>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
          >
            <option value="All">All Agents</option>
            {staffList.map((agent) => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-6">
        {stages.map((stage) => {
          const filteredDeals = selectedAgent === 'All'
            ? stage.deals
            : stage.deals.filter(deal => deal.agent === selectedAgent);

          const totalAmount = filteredDeals.reduce((sum, deal) => sum + deal.amount, 0);
          const isSettled = stage.title === 'Settled';
          
          return (
            <div key={stage.title} className={`flex-1 ${stage.bgColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`font-semibold ${isSettled ? 'text-white' : 'text-gray-900'}`}>
                    {stage.title}
                  </h3>
                  <div className={`mt-1 text-sm ${isSettled ? 'text-white/90' : 'text-gray-600'}`}>
                    {filteredDeals.length} deals • {formatTotalAmount(totalAmount)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredDeals.map((deal) => (
                  <Link 
                    key={deal.name}
                    to={`/clients/${encodeURIComponent(deal.name)}`}
                    className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-gray-900">{deal.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{deal.type}</p>
                    <div className="mt-2">
                      <span className="block text-sm font-medium text-[#5080FF]">
                        {formatCurrency(deal.amount)}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">{deal.agent}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
