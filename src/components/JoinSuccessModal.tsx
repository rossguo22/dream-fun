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

  // Fixed role label and declaration - only select once on mount
  const [roleLabel] = useState(() => {
    const roleLabels = ['Dream Supporter', 'Dream Believer', 'Dream Backer'];
    return roleLabels[Math.floor(Math.random() * roleLabels.length)];
  });

  const [declaration] = useState(() => {
    const declarations = [
      "I believe this Dream can become real.",
      "I just helped make this Dream one step closer to reality.",
      "Together, we can turn this Dream into reality.",
    ];
    return declarations[Math.floor(Math.random() * declarations.length)];
  });

  useEffect(() => {
    // Hide particles after animation
    const timer = setTimeout(() => setShowParticles(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewDream = () => {
    if (onClose) {
      onClose();
    }
    // Scroll to top of dream detail page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    const shareText = `I just became a ${roleLabel} of "${dream.title}"! ${declaration} Join me in making this dream come true!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: `I'm a ${roleLabel} of "${dream.title}"`,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Declaration copied to clipboard!');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Declaration copied to clipboard!');
    }
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

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale-in overflow-hidden">
        {/* Dream Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={dream.image}
            alt={dream.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(dream.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">{dream.title}</h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Role Label */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-50 rounded-full border border-primary-200">
              <p className="text-sm font-semibold text-primary-700">{roleLabel}</p>
            </div>
          </div>

          {/* Declaration Text */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 italic leading-relaxed">
              "{declaration}"
            </p>
          </div>

          {/* Contribution Amount - Highlight */}
          <div className="mb-6 p-5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">My Contribution</p>
              <p className="text-4xl font-bold text-primary-600">{formatCurrency(contributionAmount)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleViewDream}
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md"
            >
              View Dream
            </button>
            <button
              onClick={handleShare}
              className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-colors"
            >
              Share My Declaration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
