import { Search, Filter, Phone, Mail, ChevronLeft } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New Lead' | 'Contacted' | 'Application' | 'Approved' | 'Settled';
  loanType: string;
  loanAmount: number;
  agent: string;
  statusUpdates: StatusUpdate[];
}

interface StatusUpdate {
  id: string;
  date: string;
  status: string;
}

const statusColors = {
  'New Lead': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Application': 'bg-purple-100 text-purple-800',
  'Approved': 'bg-green-100 text-green-800',
  'Settled': 'bg-gray-100 text-gray-800'
};

const clientsData: Client[] = [
  {
    id: '1',
    name: 'Bob Hawke',
    email: 'b.hawke123@gmail.com',
    phone: '+61 451 123 124',
    status: 'Contacted',
    loanType: 'Investment Loan',
    loanAmount: 1200000,
    agent: 'Christina Rogl',
    statusUpdates: [
      {
        id: '1',
        date: '2024-07-15',
        status: 'Lead Received'
      },
      {
        id: '2',
        date: '2024-07-16',
        status: 'Contacted'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 's.johnson@example.com',
    phone: '+61 422 555 777',
    status: 'Application',
    loanType: 'Home Loan',
    loanAmount: 650000,
    agent: 'Paul Abassi',
    statusUpdates: [
      {
        id: '3',
        date: '2024-07-20',
        status: 'Application Submitted'
      }
    ]
  },
  {
    id: '3',
    name: 'Bill Murray',
    email: 'bill.murray@example.com',
    phone: '+61 433 444 555',
    status: 'New Lead',
    loanType: 'Home Loan',
    loanAmount: 760000,
    agent: 'Paul Abassi',
    statusUpdates: []
  },
  {
    id: '4',
    name: 'Walter White',
    email: 'w.white@example.com',
    phone: '+61 444 555 666',
    status: 'Contacted',
    loanType: 'Home Loan',
    loanAmount: 810000,
    agent: 'Paul Abassi',
    statusUpdates: []
  },
  {
    id: '5',
    name: 'Phil Heath',
    email: 'p.heath@example.com',
    phone: '+61 455 666 777',
    status: 'Contacted',
    loanType: 'Construction Loan',
    loanAmount: 490000,
    agent: 'S. Monaco',
    statusUpdates: []
  },
  {
    id: '6',
    name: 'Roger Feder',
    email: 'r.feder@example.com',
    phone: '+61 466 777 888',
    status: 'Contacted',
    loanType: 'Home Loan',
    loanAmount: 1780000,
    agent: 'P. Oliver',
    statusUpdates: []
  },
  {
    id: '7',
    name: 'Brad Jones',
    email: 'b.jones@example.com',
    phone: '+61 477 888 999',
    status: 'Application',
    loanType: 'Home Loan',
    loanAmount: 320000,
    agent: 'P. Abassi',
    statusUpdates: []
  },
  {
    id: '8',
    name: 'Shanon Taylor',
    email: 's.taylor@example.com',
    phone: '+61 488 999 000',
    status: 'Approved',
    loanType: 'Home Loan',
    loanAmount: 490500,
    agent: 'P. Abassi',
    statusUpdates: []
  },
  {
    id: '9',
    name: 'Penelope Hope',
    email: 'p.hope@example.com',
    phone: '+61 499 000 111',
    status: 'Application',
    loanType: 'Investment Loan',
    loanAmount: 1200000,
    agent: 'P. Oliver',
    statusUpdates: []
  },
  {
    id: '10',
    name: 'Alice Johnson',
    email: 'a.johnson@example.com',
    phone: '+61 411 222 333',
    status: 'Attempted Contact',
    loanType: 'Home Loan',
    loanAmount: 450000,
    agent: 'S. Monaco',
    statusUpdates: []
  },
  {
    id: '11',
    name: 'Charlie Brown',
    email: 'c.brown@example.com',
    phone: '+61 422 333 444',
    status: 'Attempted Contact',
    loanType: 'Investment Loan',
    loanAmount: 600000,
    agent: 'P. Abassi',
    statusUpdates: []
  },
  {
    id: '12',
    name: 'David Lee',
    email: 'd.lee@example.com',
    phone: '+61 433 444 555',
    status: 'Contacted WIP',
    loanType: 'Construction Loan',
    loanAmount: 800000,
    agent: 'C. Rogl',
    statusUpdates: []
  },
  {
    id: '13',
    name: 'Emily Davis',
    email: 'e.davis@example.com',
    phone: '+61 444 555 666',
    status: 'Contacted WIP',
    loanType: 'Home Loan',
    loanAmount: 520000,
    agent: 'P. Oliver',
    statusUpdates: []
  }
];

const clients: Record<string, Client> = clientsData.reduce((acc, client) => {
  acc[client.name] = client;
  return acc;
}, {});

function getClientByName(name: string): Client | null {
  return clients[name] || null;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function Clients() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = id ? getClientByName(decodeURIComponent(id)) : null;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(Object.values(clients));

  useEffect(() => {
    const results = Object.values(clients).filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchTerm]);

  if (!id) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#5271FF] text-white">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Client</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Loan Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/clients/${client.name}`)}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.loanType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(client.loanAmount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!client) {
    return <div>Client not found</div>;
  }

  const sortedStatusUpdates = [...client.statusUpdates].sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());

  return (
    <div className="container mx-auto px-6 py-8">
      <button 
        onClick={() => navigate('/clients')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Clients
      </button>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
        
        <div className="mt-8 bg-[#EFF6FE] rounded-xl p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{client.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{client.email}</span>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <span className="text-gray-500">Status:</span>
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                  {client.status}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-gray-500">Loan Type:</span>
                <span className="ml-2 text-gray-900">{client.loanType}</span>
              </div>
              <div>
                <span className="text-gray-500">Loan Amount:</span>
                <span className="ml-2 text-gray-900">{formatCurrency(client.loanAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Updates</h2>
          <div className="space-y-4">
            {sortedStatusUpdates.map((update) => (
              <div key={update.id} className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{update.status}</h3>
                  <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 ml-2 rounded-full text-xs font-medium ${statusColors[update.status] || 'bg-gray-100 text-gray-800'}`}>
                  {update.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
