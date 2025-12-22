import { useEffect, useState } from 'react';
import { Dream } from '../types';
import { formatCurrency } from '../utils/format';

interface JoinSuccessModalProps {
  dream: Dream;
  contributionAmount: number;
  onClose?: () => void;
}

export default function JoinSuccessModal({ dream, contributionAmount, onClose }: JoinSuccessModalProps) {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    // Hide particles after animation
    const timer = setTimeout(() => setShowParticles(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const charityPercentage = 5;

  // Distribution breakdown
  const distribution = {
    winner: 90,
    charity: 5,
    creator: 1,
    share: 3,
    platformFee: 1,
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Particles effect */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all animate-scale-in">
        {/* Header with celebration */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-t-2xl">
          <div className="text-center">
            <div className="text-5xl mb-3 animate-bounce">🎉</div>
            <h2 className="text-xl font-bold mb-1">You've Made a Dream Come True!</h2>
            <p className="text-primary-100 text-sm">Thank you for your contribution</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Dream Image */}
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={dream.image}
              alt={dream.title}
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(dream.title)}`;
              }}
            />
          </div>

          {/* Dream Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{dream.title}</h3>

          {/* Contribution Amount */}
          <div className="mb-5 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Your Contribution</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(contributionAmount)}</p>
            </div>
          </div>

          {/* Distribution Breakdown */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Fund Distribution</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Winner</span>
                <span className="font-medium text-gray-900">{distribution.winner}%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Charity</span>
                <span className="font-semibold text-green-600">{distribution.charity}%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Creator</span>
                <span className="font-medium text-gray-900">{distribution.creator}%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Share</span>
                <span className="font-medium text-gray-900">{distribution.share}%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium text-gray-900">{distribution.platformFee}%</span>
              </div>
            </div>
          </div>

          {/* Charity Highlight */}
          <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-300 mb-5">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💚</span>
              <div>
                <p className="font-semibold text-green-800 text-sm">
                  You've contributed {charityPercentage}% to charity!
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  Your contribution supports charitable causes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
