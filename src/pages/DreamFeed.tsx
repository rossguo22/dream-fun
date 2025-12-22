import { useState } from 'react';
import DreamCard from '../components/DreamCard';
import BannerCarousel from '../components/BannerCarousel';
import { useDreams } from '../context/DreamsContext';
import { DreamStatus } from '../types';

export default function DreamFeed() {
  const { dreams } = useDreams();
  const [filter, setFilter] = useState<DreamStatus | 'all'>('all');

  const filteredDreams = filter === 'all'
    ? dreams
    : dreams.filter(dream => dream.status === filter);

  const filters: { value: DreamStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Funding' },
    { value: 'ready', label: 'Ready' },
    { value: 'draw', label: 'Drawing' },
    { value: 'settle', label: 'Settled' },
    { value: 'completed', label: 'Completed' },
  ];

  const bannerSlides = [
    {
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div>
      {/* Top Banner Carousel */}
      <BannerCarousel
        title="Make Dreams Come True Together"
        description="Join our community and support amazing dreams. Every contribution counts!"
        slides={bannerSlides}
        autoPlayInterval={5000}
      />

      {/* Filter buttons */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === value
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dreams grid */}
      {filteredDreams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No dreams found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDreams.map(dream => (
            <DreamCard key={dream.id} dream={dream} />
          ))}
        </div>
      )}
    </div>
  );
}
