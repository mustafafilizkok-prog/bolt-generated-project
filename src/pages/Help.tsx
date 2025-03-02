import { Search, Book, MessageCircle, FileText, ExternalLink } from 'lucide-react';

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of using the platform',
    articles: 5
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Detailed guides and references',
    articles: 12
  },
  {
    icon: MessageCircle,
    title: 'FAQs',
    description: 'Common questions and answers',
    articles: 8
  }
];

const popularArticles = [
  {
    title: 'How to submit a new application',
    views: '1.2k views',
    time: '5 min read'
  },
  {
    title: 'Understanding the approval process',
    views: '956 views',
    time: '8 min read'
  },
  {
    title: 'Required documentation checklist',
    views: '847 views',
    time: '3 min read'
  }
];

export default function Help() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5080FF] text-white rounded-lg hover:bg-[#4070EE]">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>
      </div>

      <div className="mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5080FF]"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {helpCategories.map((category) => (
          <div key={category.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="p-2 w-fit rounded-lg bg-[#EEF6FF]">
              <category.icon className="w-6 h-6 text-[#5080FF]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">{category.title}</h2>
            <p className="mt-2 text-gray-600">{category.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">{category.articles} articles</span>
              <button className="text-[#5080FF] text-sm font-medium hover:underline">
                View All
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900">Popular Articles</h2>
        <div className="mt-4 bg-white rounded-xl shadow-sm divide-y">
          {popularArticles.map((article) => (
            <div key={article.title} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-900">{article.title}</h3>
                <div className="mt-1 flex items-center gap-4">
                  <span className="text-sm text-gray-500">{article.views}</span>
                  <span className="text-sm text-gray-500">{article.time}</span>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
