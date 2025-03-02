import { useState } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { Link } from 'react-router-dom';

interface Deal {
  id: string;
  client: string;
  loanType: string;
  amount: number;
  status: 'New Lead' | 'Contacted' | 'Application' | 'Approved' | 'Settled';
  agent: string;
  source: string;
}

const statusColors = {
  'New Lead': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Application': 'bg-purple-100 text-purple-800',
  'Approved': 'bg-green-100 text-green-800',
  'Settled': 'bg-gray-100 text-gray-800'
};

const deals: Deal[] = [
  {
    id: '1',
    client: 'Bill Murray',
    loanType: 'Home Loan',
    amount: 760000,
    status: 'New Lead',
    agent: 'P. Abassi',
    source: 'Direct'
  },
  {
    id: '2',
    client: 'Bob Hawke',
    loanType: 'Investment Loan',
    amount: 1200000,
    status: 'Contacted',
    agent: 'C. Rogl',
    source: 'Funnel Marketing'
  },
  {
    id: '3',
    client: 'Walter White',
    loanType: 'Home Loan',
    amount: 810000,
    status: 'Contacted',
    agent: 'P. Abassi',
    source: 'Campaign A'
  },
  {
    id: '4',
    client: 'Phil Heath',
    loanType: 'Construction Loan',
    amount: 490000,
    status: 'Contacted',
    agent: 'S. Monaco',
    source: 'Customer Referral'
  },
  {
    id: '5',
    client: 'Roger Feder',
    loanType: 'Home Loan',
    amount: 1780000,
    status: 'Contacted',
    agent: 'P. Oliver',
    source: 'Open Home'
  },
  {
    id: '6',
    client: 'Brad Jones',
    loanType: 'Home Loan',
    amount: 320000,
    status: 'Application',
    agent: 'P. Abassi',
    source: 'Direct'
  },
  {
    id: '7',
    client: 'Shanon Taylor',
    loanType: 'Home Loan',
    amount: 490500,
    status: 'Approved',
    agent: 'P. Abassi',
    source: 'Open Home'
  },
  {
    id: '8',
    client: 'Walter White',
    loanType: 'Home Loan',
    amount: 810000,
    status: 'Contacted',
    agent: 'P. Abassi',
    source: 'Funnel Marketing'
  },
  {
    id: '9',
    client: 'Penelope Hope',
    loanType: 'Investment Loan',
    amount: 1200000,
    status: 'Application',
    agent: 'P. Oliver',
    source: 'Direct'
  }
];

const DummyLineChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 80; // Scale to 80% for visual padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{
      height: '100%',
      width: '100%',
      position: 'relative'
    }}>
      <svg style={{
        height: '100%',
        width: '100%',
      }}>
        <polyline
          points={points}
          style={{
            fill: 'none',
            stroke: color,
            strokeWidth: 3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        {/* Add x-axis labels */}
        {data.map((_, index) => (
          <text
            key={index}
            x={`${(index / (data.length - 1)) * 100}%`}
            y="100%"
            style={{
              fontSize: '8px',
              textAnchor: 'middle',
              transform: 'translateY(12px)',
              fill: '#666'
            }}
          >
            {index + 1}
          </text>
        ))}
        {/* Add y-axis labels */}
        <text
          x="0"
          y="0"
          style={{
            fontSize: '8px',
            textAnchor: 'start',
            fill: '#666'
          }}
        >
          {max}
        </text>
        <text
          x="0"
          y="80%"
          style={{
            fontSize: '8px',
            textAnchor: 'start',
            fill: '#666'
          }}
        >
          0
        </text>
      </svg>
    </div>
  );
};

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Dummy data for charts
  const leadsData = [5, 10, 15, 20, 12, 4, 16, 22, 18, 10, 14, 20];
  const applicationsData = [8, 12, 10, 14, 16, 10, 12, 14, 18, 12, 10, 16];
  const settledData = [3, 6, 9, 12, 9, 3, 9, 15, 12, 6, 9, 12];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5080FF] text-white rounded-lg hover:bg-[#4070EE]">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by client name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-[#5080FF]"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent((e.target.value))}
        >
          <option value="All">All Agents</option>
          <option value="P. Abassi">P. Abassi</option>
          <option value="C. Rogl">C. Rogl</option>
          <option value="P. Oliver">P. Oliver</option>
          <option value="S. Monaco">S. Monaco</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-[#5080FF]"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="New Lead">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Application">Application</option>
          <option value="Approved">Approved</option>
          <option value="Settled">Settled</option>
        </select>
        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From:</label>
        <input
          type="date"
          id="fromDate"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To:</label>
        <input
          type="date"
          id="toDate"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads</h2>
          <div className="h-48">
            <DummyLineChart data={leadsData} color="#5080FF" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Compared to previous period: [Previous Period Change]</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications</h2>
          <div className="h-48">
            <DummyLineChart data={applicationsData} color="#02D9F8" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Compared to previous period: [Previous Period Change]</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settled</h2>
          <div className="h-48">
            <DummyLineChart data={settledData} color="#8040FF" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Compared to previous period: [Previous Period Change]</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#5271FF] text-white">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Client</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Loan Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Agent</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link 
                    to={`/clients/${encodeURIComponent(deal.client)}`}
                    className="text-sm font-semibold text-gray-900 hover:text-[#5080FF]"
                  >
                    {deal.client}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{deal.loanType}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(deal.amount)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[deal.status]}`}>
                    {deal.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{deal.agent}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{deal.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
