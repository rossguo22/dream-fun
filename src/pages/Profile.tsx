import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockUser } from '../data/mockData';
import { useDreams } from '../context/DreamsContext';
import DreamListItem from '../components/DreamListItem';
import { formatCurrency } from '../utils/format';
import { Dream } from '../types';

type TabType = 'participated' | 'created' | 'selected';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>('participated');
  const { dreams } = useDreams();

  const participatedDreams = useMemo(() => 
    dreams.filter(dream => mockUser.participatedDreams.includes(dream.id)),
    [dreams]
  );
  const createdDreams = useMemo(() => 
    dreams.filter(dream => mockUser.createdDreams.includes(dream.id)),
    [dreams]
  );
  const selectedDreams = useMemo(() => 
    dreams.filter(dream => mockUser.selectedDreams.includes(dream.id)),
    [dreams]
  );

  const getDreamsByTab = () => {
    switch (activeTab) {
      case 'participated':
        return participatedDreams;
      case 'created':
        return createdDreams;
      case 'selected':
        return selectedDreams;
      default:
        return [];
    }
  };

  const tabs: { value: TabType; label: string; count: number }[] = [
    { value: 'participated', label: 'Joined Dreams', count: participatedDreams.length },
    { value: 'created', label: 'Created Dreams', count: createdDreams.length },
    { value: 'selected', label: 'Selected Dreams', count: selectedDreams.length },
  ];

  const renderDream = (dream: Dream) => {
    return (
      <DreamListItem key={dream.id} dream={dream} />
    );
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
            <p className="text-gray-600">Dream Creator</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="text-sm text-gray-600 mb-1">Total Won</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(mockUser.totalWon || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">From selected dreams</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(mockUser.totalInvested || mockUser.totalContribution)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total contributions</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-sm text-gray-600 mb-1">Total Commission</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(mockUser.totalCommission || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">From created dreams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.value
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-gray-400">({tab.count})</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Dream Lists */}
      {getDreamsByTab().length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">
            {activeTab === 'participated' && 'No joined dreams yet'}
            {activeTab === 'created' && 'No created dreams yet'}
            {activeTab === 'selected' && 'No selected dreams yet'}
          </p>
          {activeTab === 'created' && (
            <Link
              to="/create"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Create your first dream →
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {getDreamsByTab().map(dream => renderDream(dream))}
        </div>
      )}
    </div>
  );
}
