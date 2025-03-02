import { Search, Edit } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Documents have been submitted',
    time: '2:30 PM',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'Thanks for the update',
    time: '11:45 AM',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    lastMessage: 'When can we schedule a call?',
    time: 'Yesterday',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  }
];

export default function Messages() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5080FF] text-white rounded-lg hover:bg-[#4070EE]">
          <Edit className="w-4 h-4" />
          New Message
        </button>
      </div>

      <div className="mt-8 flex gap-6">
        {/* Conversations List */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
              />
            </div>
          </div>
          <div className="divide-y">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer"
              >
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && (
                  <div className="w-2 h-2 bg-[#5080FF] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col">
          <div className="p-4 border-b flex items-center gap-4">
            <img
              src={conversations[0].avatar}
              alt={conversations[0].name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-medium text-gray-900">{conversations[0].name}</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col space-y-4">
              {/* Message bubbles would go here */}
              <div className="flex justify-center items-center h-full text-gray-500">
                Select a conversation to view messages
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
