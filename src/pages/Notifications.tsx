import { useState, useEffect } from 'react';
import { Bell, Check, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'application' | 'document' | 'settlement' | 'approval' | 'info';
  isRead: boolean;
  clientId: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New Lead' | 'Contacted' | 'Application' | 'Approved' | 'Settled';
  loanType: string;
  loanAmount: number;
  agent: string;
}

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
  }
];

const clients: Record<string, Client> = clientsData.reduce((acc, client) => {
  acc[client.name] = client;
  return acc;
}, {});

const notificationsData: Notification[] = [
  {
    id: 1,
    title: 'New Application',
    message: 'Sarah Johnson has submitted a new loan application',
    time: '2 hours ago',
    type: 'application',
    isRead: false,
    clientId: '2'
  },
  {
    id: 2,
    title: 'Document Update',
    message: 'Bob Hawke uploaded new verification documents',
    time: '5 hours ago',
    type: 'document',
    isRead: true,
    clientId: '1'
  },
  {
    id: 3,
    title: 'Settlement Complete',
    message: 'Loan settlement completed for Bob Hawke',
    time: '1 day ago',
    type: 'settlement',
    isRead: true,
    clientId: '1'
  },
  {
    id: 4,
    title: 'Approval Notice',
    message: "Sarah Johnson's loan has been approved",
    time: '2 days ago',
    type: 'approval',
    isRead: false,
    clientId: '2'
  },
  {
    id: 5,
    title: 'Interest Rate Change',
    message: 'The interest rate for Bob Hawke\'s loan has been updated.',
    time: '3 days ago',
    type: 'info',
    isRead: true,
    clientId: '1'
  },
  {
    id: 6,
    title: 'New Message',
    message: 'You have a new message from Sarah Johnson regarding your application.',
    time: '4 days ago',
    type: 'info',
    isRead: false,
    clientId: '2'
  },
  {
    id: 7,
    title: 'Application Update',
    message: 'Your loan application for Bob Hawke is currently under review.',
    time: '5 days ago',
    type: 'application',
    isRead: true,
    clientId: '1'
  },
  {
    id: 8,
    title: 'Document Reminder',
    message: 'Please upload the required documents to complete your application for Sarah Johnson.',
    time: '6 days ago',
    type: 'document',
    isRead: false,
    clientId: '2'
  },
  {
    id: 9,
    title: 'Settlement Reminder',
    message: 'Your loan settlement for Bob Hawke is scheduled for next week.',
    time: '1 week ago',
    type: 'settlement',
    isRead: true,
    clientId: '1'
  },
  {
    id: 10,
    title: 'New Application',
    message: 'Bill Murray has submitted a new loan application',
    time: '2 hours ago',
    type: 'application',
    isRead: false,
    clientId: '3'
  },
  {
    id: 11,
    title: 'Contacted',
    message: 'Walter White has been contacted',
    time: '5 hours ago',
    type: 'info',
    isRead: true,
    clientId: '4'
  },
  {
    id: 12,
    title: 'Contacted',
    message: 'Phil Heath has been contacted',
    time: '1 day ago',
    type: 'info',
    isRead: true,
    clientId: '5'
  },
  {
    id: 13,
    title: 'Contacted',
    message: "Roger Feder has been contacted",
    time: '2 days ago',
    type: 'info',
    isRead: false,
    clientId: '6'
  },
  {
    id: 14,
    title: 'Application Update',
    message: 'Your loan application for Brad Jones is currently under review.',
    time: '5 days ago',
    type: 'application',
    isRead: true,
    clientId: '7'
  },
  {
    id: 15,
    title: 'Approval Notice',
    message: "Shanon Taylor's loan has been approved",
    time: '2 days ago',
    type: 'approval',
    isRead: false,
    clientId: '8'
  },
  {
    id: 16,
    title: 'Application Update',
    message: 'Your loan application for Penelope Hope is currently under review.',
    time: '5 days ago',
    type: 'application',
    isRead: true,
    clientId: '9'
  },
  {
    id: 17,
    title: 'Attempted Contact',
    message: 'Attempted Contact for Alice Johnson',
    time: '5 days ago',
    type: 'info',
    isRead: true,
    clientId: '10'
  },
  {
    id: 18,
    title: 'Attempted Contact',
    message: 'Attempted Contact for Charlie Brown',
    time: '5 days ago',
    type: 'info',
    isRead: true,
    clientId: '11'
  },
  {
    id: 19,
    title: 'Contacted WIP',
    message: 'Contacted WIP for David Lee',
    time: '5 days ago',
    type: 'info',
    isRead: true,
    clientId: '12'
  },
  {
    id: 20,
    title: 'Contacted WIP',
    message: 'Contacted WIP for Emily Davis',
    time: '5 days ago',
    type: 'info',
    isRead: true,
    clientId: '13'
  }
];

const typeIcons = {
  application: Bell,
  document: FileText,
  settlement: CheckCircle,
  approval: Check,
  info: AlertCircle
};

const typeStyles = {
  application: 'bg-blue-100 text-blue-800',
  document: 'bg-yellow-100 text-yellow-800',
  settlement: 'bg-green-100 text-green-800',
  approval: 'bg-green-100 text-green-800',
  info: 'bg-gray-100 text-gray-800'
};

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

export default function Notifications() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const client = id ? getClientByName(decodeURIComponent(id)) : null;

  useEffect(() => {
    let filteredNotifications = notificationsData;
    if (client) {
      filteredNotifications = notificationsData.filter(n => n.clientId === client.id);
    }
    setNotifications(filteredNotifications);
  }, [client, id]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'read') return notification.isRead;
    if (filter === 'unread') return !notification.isRead;
    return true;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg"
            onClick={handleMarkAllRead}
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="mt-4">
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm divide-y">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No notifications{client ? ' for this client' : ''}.</div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = typeIcons[notification.type] || Bell;
            return (
              <div key={notification.id} className={`p-6 flex items-start gap-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                <div className={`p-2 rounded-lg ${typeStyles[notification.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''} text-gray-900`}>{notification.title}</h3>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className={`mt-1 ${!notification.isRead ? 'font-medium' : ''} text-gray-600`}>{notification.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
