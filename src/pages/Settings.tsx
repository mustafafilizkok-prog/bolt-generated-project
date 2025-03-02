import { useState } from 'react';
import { Edit } from 'lucide-react';

export default function Settings() {
  const [accountName, setAccountName] = useState('Abbasi Group');
  const [contactDetails, setContactDetails] = useState('Paul Abbasi');
  const [noticeRecipient, setNoticeRecipient] = useState('paul@lstag.com.au');
  const [bankAccountDetails, setBankAccountDetails] = useState('062-***   *****1234');
  const [staffList, setStaffList] = useState('A. Sneesby, P. Oliver, S. Monaco, C. Rogl, P. Abassi');

  const handleChangeAccountName = () => {
    // Implement change logic
  };

  const handleChangeContactDetails = () => {
    // Implement change logic
  };

  const handleChangeNoticeRecipient = () => {
    // Implement change logic
  };

  const handleChangeBankAccountDetails = () => {
    // Implement change logic with additional authentication
    alert('Additional authentication required for bank account changes.');
  };

  const handleChangeStaffList = () => {
    // Implement change logic
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>

        <div className="mb-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Name:</label>
            <p className="mt-1 text-gray-900">{accountName}</p>
          </div>
          <button onClick={handleChangeAccountName} className="p-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Details:</label>
            <p className="mt-1 text-gray-900">{contactDetails}</p>
          </div>
          <button onClick={handleChangeContactDetails} className="p-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Who will receive notices:</label>
            <p className="mt-1 text-gray-900">{noticeRecipient}</p>
          </div>
          <button onClick={handleChangeNoticeRecipient} className="p-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account Details:</label>
            <p className="mt-1 text-gray-900">{bankAccountDetails}</p>
          </div>
          <button onClick={handleChangeBankAccountDetails} className="p-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Staff List:</label>
            <p className="mt-1 text-gray-900">{staffList}</p>
          </div>
          <button onClick={handleChangeStaffList} className="p-2 text-[#5080FF] hover:bg-[#EEF6FF] rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
