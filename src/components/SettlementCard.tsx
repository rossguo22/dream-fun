import { Settlement } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import { mockUser } from '../data/mockData';

interface SettlementCardProps {
  settlement: Settlement;
  dreamId: string;
}

export default function SettlementCard({ settlement }: SettlementCardProps) {
  const isSelected = settlement.selectedUserId === mockUser.id;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">Settlement Result</h4>
        <span className="text-xs text-gray-500">Settled {formatDate(settlement.settledAt)}</span>
      </div>
      
      <div className={`p-3 rounded-lg mb-4 ${isSelected ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{isSelected ? '🎉' : '💙'}</span>
          <div>
            <p className={`font-semibold ${isSelected ? 'text-green-800' : 'text-blue-800'}`}>
              {isSelected ? 'You were selected!' : 'You were not selected'}
            </p>
            <p className={`text-sm ${isSelected ? 'text-green-700' : 'text-blue-700'}`}>
              {isSelected 
                ? 'Congratulations! You will receive support to fulfill this dream.'
                : 'You will receive a full refund of your contribution.'}
            </p>
          </div>
        </div>
      </div>

      {settlement.selectedUserName && (
        <div className="mb-3 text-sm text-gray-600">
          <span className="font-medium">Selected participant:</span> {settlement.selectedUserName}
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total funds raised:</span>
          <span className="font-medium text-gray-900">{formatCurrency(settlement.totalFunds)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Platform fee (5%):</span>
          <span className="font-medium text-gray-900">{formatCurrency(settlement.platformFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Dream fulfillment:</span>
          <span className="font-medium text-gray-900">{formatCurrency(settlement.dreamAmount)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-600">Your refund:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(settlement.refundAmount)}</span>
        </div>
      </div>
    </div>
  );
}

