import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../utils/format';

interface SelectedDreamerProps {
  selectedUserId: string;
  selectedUserName: string;
  selectedUserAvatar?: string;
  selectedAmount?: number;
  drawDate?: string;
}

export default function SelectedDreamer({
  selectedUserName,
  selectedUserAvatar,
  selectedAmount,
  drawDate,
}: SelectedDreamerProps) {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const getDefaultAvatar = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`;
  };

  return (
    <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Dreamer</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleAvatarClick}
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src={selectedUserAvatar || getDefaultAvatar(selectedUserName)}
            alt={selectedUserName}
            className="w-16 h-16 rounded-full border-3 border-purple-400 hover:border-purple-600 transition-colors shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getDefaultAvatar(selectedUserName);
            }}
          />
        </button>
        <div className="flex-1">
          <button
            onClick={handleAvatarClick}
            className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
          >
            {selectedUserName}
          </button>
          {selectedAmount !== undefined && (
            <p className="text-sm text-gray-600 mt-1">
              Selected Amount: <span className="font-semibold text-purple-600">{formatCurrency(selectedAmount)}</span>
            </p>
          )}
          {drawDate && (
            <p className="text-xs text-gray-500 mt-1">
              Draw Date: {formatDate(drawDate)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

