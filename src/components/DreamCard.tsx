import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dream } from '../types';
import { formatCurrency, getStatusLabel, getStatusColor } from '../utils/format';
import { calculateCountdown, formatCountdown } from '../utils/countdown';
import { useDreams } from '../context/DreamsContext';

interface DreamCardProps {
  dream: Dream;
}

export default function DreamCard({ dream }: DreamCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useDreams();
  const [countdown, setCountdown] = useState(calculateCountdown(dream.deadline));
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const favorite = isFavorite(dream.id);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(dream.deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [dream.deadline]);

  const progress = (dream.currentAmount / dream.targetAmount) * 100;
  const statusColor = getStatusColor(dream.status);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(dream.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/dream/${dream.id}`;
    const text = `Check out this dream: ${dream.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: dream.title,
        text: text,
        url: url,
      }).catch(() => {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // Last resort: show URL
        prompt('Share this dream:', url);
      });
    }
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/profile');
  };

  const getDefaultImage = () => {
    return `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(dream.title)}`;
  };

  const getDefaultAvatar = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(dream.creator.name)}&background=6366f1&color=fff&size=128`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <Link to={`/dream/${dream.id}`} className="block">
        <div className="relative h-48 bg-gray-200">
          <img
            src={imageError ? getDefaultImage() : dream.image}
            alt={dream.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {getStatusLabel(dream.status)}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Link to={`/dream/${dream.id}`} className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
              {dream.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 ml-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                favorite
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
              }`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-5 h-5"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full text-gray-400 hover:text-primary-600 hover:bg-gray-50 transition-colors"
              aria-label="Share dream"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span className="font-medium">
              {formatCurrency(dream.currentAmount)} / {formatCurrency(dream.targetAmount)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAvatarClick}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img
                src={avatarError ? getDefaultAvatar() : dream.creator.avatar}
                alt={dream.creator.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-primary-400 transition-colors"
                onError={() => setAvatarError(true)}
              />
            </button>
            <div>
              <button
                onClick={handleAvatarClick}
                className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {dream.creator.name}
              </button>
              <p className="text-xs text-gray-500">{dream.participants} joined</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={`${countdown.isExpired ? 'text-red-500' : 'text-gray-700'} font-medium font-mono`}>
              {formatCountdown(countdown)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
