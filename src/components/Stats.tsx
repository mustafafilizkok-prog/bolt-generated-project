import { formatCurrency } from '../utils/format';
import { ChevronDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  count: number;
  amount: number;
  percentage: number;
  monthlyAmount: number;
  bgColor: string;
}

function StatCard({ title, count, amount, percentage, monthlyAmount, bgColor }: StatCardProps) {
  const isSettled = title === 'Settled';
  return (
    <div className={`p-6 rounded-xl shadow-sm ${bgColor}`}>
      <h3 className={`text-sm font-bold ${isSettled ? 'text-white' : 'text-gray-700'}`}>{title}</h3>
      <p className={`text-2xl font-semibold mt-2 ${isSettled ? 'text-white' : 'text-gray-900'}`}>{count}</p>
      <p className={`text-3xl font-bold mt-4 ${isSettled ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(amount)}</p>
      <div className="mt-4">
        <span className={`text-sm font-medium ${percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentage >= 0 ? '+' : ''}{percentage}%
        </span>
        <span className={`text-sm font-medium ml-2 ${isSettled ? 'text-white/80' : 'text-gray-500'}`}>
          {formatCurrency(monthlyAmount)} this month
        </span>
      </div>
    </div>
  );
}

interface AgentRowProps {
  agent: string;
  leads: number;
  applications: number;
  approved: number;
  settled: number;
}

function AgentRow({ agent, leads, applications, approved, settled }: AgentRowProps) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 px-4 text-sm text-gray-900">{agent}</td>
      <td className="py-4 px-4 text-sm text-gray-600 text-center">{leads}</td>
      <td className="py-4 px-4 text-sm text-gray-600 text-center">{applications}</td>
      <td className="py-4 px-4 text-sm text-gray-600 text-center">{approved}</td>
      <td className="py-4 px-4 text-sm text-gray-600 text-center">{settled}</td>
    </tr>
  );
}

interface NotificationProps {
  title: string;
  message: string;
  time: string;
}

function Notification({ title, message, time }: NotificationProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-b">
      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{message}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    { title: 'Leads', count: 21, amount: 17650000, percentage: 18, monthlyAmount: 3800000, bgColor: 'bg-[#EEF6FF]' },
    { title: 'Applications', count: 9, amount: 7500000, percentage: 11, monthlyAmount: 2800000, bgColor: 'bg-[#CDD6FF]' },
    { title: 'Approved', count: 8, amount: 6950000, percentage: 23, monthlyAmount: 7800000, bgColor: 'bg-[#02D9F8]' },
    { title: 'Settled', count: 10, amount: 9250000, percentage: 9, monthlyAmount: 1200000, bgColor: 'bg-[#5271FF]' },
  ];

  const agents = [
    { agent: 'A. Sneesby', leads: 4, applications: 0, approved: 1, settled: 3 },
    { agent: 'P. Oliver', leads: 1, applications: 1, approved: 2, settled: 0 },
    { agent: 'S. Monaco', leads: 0, applications: 0, approved: 1, settled: 0 },
    { agent: 'C. Rogl', leads: 7, applications: 3, approved: 2, settled: 5 },
    { agent: 'P. Abassi', leads: 9, applications: 5, approved: 2, settled: 2 },
    { agent: 'Kredi', leads: 0, applications: 0, approved: 0, settled: 0 },
    { agent: 'Total', leads: 21, applications: 9, approved: 8, settled: 10 },
  ];

  const notifications = [
    {
      title: 'Approved: J. Bennet',
      message: 'Approved with lender',
      time: '2 hours ago'
    },
    {
      title: 'More Info: A McManus',
      message: 'Awaiting on client for more for.',
      time: '3 hours ago'
    },
    {
      title: 'Settled: B. Abdul',
      message: 'Congratulation on the settlem',
      time: '5 hours ago'
    },
    {
      title: 'Settlement Book: J. Smith',
      message: 'Booked in for 12/3/24',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Agent Breakdown and Notifications side by side */}
      <div className="flex gap-6">
        {/* Agent Breakdown - 2/3 width */}
        <div className="flex-[2] bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Agent Breakdown</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#5271FF]">
                  <th className="py-4 px-4 text-left text-xs font-bold text-white uppercase">Agent</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-white uppercase">Leads</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-white uppercase">Applications</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-white uppercase">Approved</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-white uppercase">Settled</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <AgentRow key={agent.agent} {...agent} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications - 1/3 width */}
        <div className="flex-1 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Notification</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                See All
              </button>
            </div>
          </div>
          <div>
            {notifications.map((notification) => (
              <Notification key={notification.title} {...notification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
