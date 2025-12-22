import { Link } from 'react-router-dom';
import { Dream } from '../types';
import { formatCurrency, getStatusLabel, getStatusColor } from '../utils/format';

interface DreamListItemProps {
  dream: Dream;
}

export default function DreamListItem({ dream }: DreamListItemProps) {
  const progress = (dream.currentAmount / dream.targetAmount) * 100;
  const statusColor = getStatusColor(dream.status);

  return (
    <Link
      to={`/dream/${dream.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {dream.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusColor}`}>
              {getStatusLabel(dream.status)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Raised</p>
              <p className="font-semibold text-gray-900">{formatCurrency(dream.currentAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Target</p>
              <p className="font-semibold text-gray-900">{formatCurrency(dream.targetAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Participants</p>
              <p className="font-semibold text-gray-900">{dream.participants}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% funded</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
