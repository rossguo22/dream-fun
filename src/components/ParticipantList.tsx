import { useNavigate } from 'react-router-dom';
import { Participant } from '../types';
import { formatCurrency } from '../utils/format';

interface ParticipantListProps {
  participants: Participant[];
  maxDisplay?: number;
}

export default function ParticipantList({ participants, maxDisplay = 10 }: ParticipantListProps) {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const getDefaultAvatar = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`;
  };

  const displayParticipants = participants.slice(0, maxDisplay);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Top Contributors</h3>
      <div className="space-y-2">
        {displayParticipants.map((participant, index) => (
          <div
            key={participant.userId}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0 relative">
                <span className="absolute -top-1 -left-1 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </span>
                <button
                  onClick={handleAvatarClick}
                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={participant.avatar}
                    alt={participant.userName}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-primary-400 transition-colors"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getDefaultAvatar(participant.userName);
                    }}
                  />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={handleAvatarClick}
                  className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors truncate block"
                >
                  {participant.userName}
                </button>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-600">{formatCurrency(participant.amount)}</span>
                  <span className="text-xs text-primary-600 font-medium">
                    {participant.share.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all"
                  style={{ width: `${participant.share}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {participants.length > maxDisplay && (
        <p className="text-sm text-gray-500 text-center pt-2">
          +{participants.length - maxDisplay} more contributors
        </p>
      )}
    </div>
  );
}

