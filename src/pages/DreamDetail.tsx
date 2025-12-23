import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDreams } from '../context/DreamsContext';
import { formatCurrency, getStatusLabel, getStatusColor, formatDate } from '../utils/format';
import { calculateCountdown, formatCountdown } from '../utils/countdown';
import ParticipantList from '../components/ParticipantList';
import SelectedDreamer from '../components/SelectedDreamer';
import JoinSuccessModal from '../components/JoinSuccessModal';

export default function DreamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dreams } = useDreams();
  const dream = id ? dreams.find(d => d.id === id) : null;
  const [participated, setParticipated] = useState(false);
  const [participationAmount, setParticipationAmount] = useState('');
  const [countdown, setCountdown] = useState(dream ? calculateCountdown(dream.deadline) : null);
  const [imageError, setImageError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contributionAmount, setContributionAmount] = useState(0);

  // Update countdown every second
  useEffect(() => {
    if (!dream) return;
    
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(dream.deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [dream]);

  if (!dream) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Dream not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-primary-600 hover:text-primary-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const progress = (dream.currentAmount / dream.targetAmount) * 100;
  const statusColor = getStatusColor(dream.status);
  const isFunding = dream.status === 'active';
  const isReady = dream.status === 'ready';
  const isDraw = dream.status === 'draw';
  const isSettled = dream.status === 'settle';
  const showJoinButton = isFunding || isReady;
  const canParticipate = isFunding;
  const userShare = dream.userShare || 0;
  const userAmount = dream.userAmount || 0;

  // Get selected dreamer info from settlement or dream properties
  const selectedUserId = dream.settlement?.selectedUserId || dream.selectedUserId || undefined;
  const selectedUserName = dream.settlement?.selectedUserName || dream.selectedUserName || undefined;
  const selectedUserAvatar = dream.selectedUserAvatar;
  const drawDate = dream.settlement?.drawDate || dream.drawDate;
  const selectedAmount = dream.settlement?.selectedAmount;

  const handleParticipate = () => {
    if (!canParticipate) return;
    
    if (!participationAmount || parseFloat(participationAmount) <= 0) {
      return;
    }
    // Mock participation
    const amount = parseFloat(participationAmount);
    setContributionAmount(amount);
    setParticipated(true);
    setShowSuccessModal(true);
    setParticipationAmount('');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const getDefaultImage = () => {
    return `https://via.placeholder.com/1200x600/6366f1/ffffff?text=${encodeURIComponent(dream.title)}`;
  };

  return (
    <div className="max-w-4xl mx-auto" style={{ paddingBottom: showJoinButton ? '120px' : '24px' }}>
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Main Info Section */}
        <div className="p-6 md:p-8">
          {/* Header with Status */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dream.title}</h1>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                {getStatusLabel(dream.status)}
              </div>
            </div>
          </div>

          {/* Selected Dreamer - Show for Draw and Settled status */}
          {(isDraw || isSettled) && selectedUserId && selectedUserName && (
            <SelectedDreamer
              selectedUserId={selectedUserId}
              selectedUserName={selectedUserName}
              selectedUserAvatar={selectedUserAvatar}
              selectedAmount={selectedAmount}
              drawDate={drawDate}
            />
          )}

          {/* Progress and Stats Section - Show for Funding and Ready */}
          {(isFunding || isReady) && (
            <div className="mb-6 p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border border-primary-100">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">Funding Progress</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(dream.currentAmount)} / {formatCurrency(dream.targetAmount)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{progress.toFixed(1)}% funded</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Target Amount</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(dream.targetAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Raised</p>
                  <p className="text-xl font-bold text-primary-600">{formatCurrency(dream.currentAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Remaining Time</p>
                  <p className={`text-lg font-bold font-mono ${countdown?.isExpired ? 'text-red-500' : 'text-gray-900'}`}>
                    {countdown ? formatCountdown(countdown) : '--'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Current Participants</p>
                  <p className="text-xl font-bold text-purple-600">{dream.participants}</p>
                </div>
              </div>

              {/* User Share Display */}
              {userAmount > 0 && (
                <div className="mt-4 pt-4 border-t border-primary-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Your Contribution</p>
                      <p className="text-xl font-bold text-primary-600">{formatCurrency(userAmount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Win Probability</p>
                      <p className="text-xl font-bold text-primary-600">{userShare.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats for Draw and Settled - Simplified view */}
          {(isDraw || isSettled) && (
            <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Target Amount</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dream.targetAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Raised</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(dream.currentAmount)}</p>
                </div>
                {isSettled && drawDate && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Draw Date</p>
                    <p className="text-lg font-bold text-gray-900">{formatDate(drawDate)}</p>
                  </div>
                )}
                {isSettled && selectedAmount !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Selected Amount</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(selectedAmount)}</p>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Creator Info */}
          <div className="mb-6 flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <img
              src={dream.creator.avatar}
              alt={dream.creator.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dream.creator.name)}&background=6366f1&color=fff&size=128`;
              }}
            />
            <div>
              <p className="text-sm text-gray-600">Created by</p>
              <p className="font-medium text-gray-900">{dream.creator.name}</p>
            </div>
          </div>

          {/* Dream Image */}
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={imageError ? getDefaultImage() : dream.image}
              alt={dream.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Dream Story */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Dream Story</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{dream.story}</p>
          </div>

          {/* Participants List */}
          {dream.participantList && dream.participantList.length > 0 && (
            <div className="mb-6">
              <ParticipantList participants={dream.participantList} maxDisplay={10} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Join Button - Show for Funding and Ready, different states */}
      {showJoinButton && (
        <div className="fixed left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:px-8 bottom-0">
          <div className="max-w-4xl mx-auto">
            {participated ? (
              <div className="flex items-center justify-center py-2">
                <p className="text-sm text-green-600 font-medium">✓ You've successfully joined this dream!</p>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={participationAmount}
                    onChange={(e) => setParticipationAmount(e.target.value)}
                    placeholder="Enter amount"
                    disabled={!canParticipate}
                    className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      !canParticipate ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                    }`}
                  />
                </div>
                <button
                  onClick={handleParticipate}
                  disabled={!canParticipate}
                  className={`px-6 md:px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap shadow-md ${
                    canParticipate
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  {isReady ? 'Frozen' : 'Make It Real'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Join Success Modal */}
      {showSuccessModal && dream && (
        <JoinSuccessModal
          dream={dream}
          contributionAmount={contributionAmount}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
