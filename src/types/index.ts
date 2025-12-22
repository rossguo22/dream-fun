export type DreamStatus = 'active' | 'ready' | 'draw' | 'settle' | 'completed';

export interface Dream {
  id: string;
  title: string;
  story: string;
  image: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: DreamStatus;
  participants: number;
  createdAt: string;
  settlement?: Settlement;
  participantList?: Participant[]; // Top participants sorted by amount
  userShare?: number; // Current user's share percentage
  userAmount?: number; // Current user's contribution amount
  selectedUserId?: string; // For Draw and Settled status
  selectedUserName?: string;
  selectedUserAvatar?: string;
  drawDate?: string; // For Draw and Settled status
}

export interface Settlement {
  selectedUserId: string | null;
  selectedUserName: string | null;
  totalFunds: number;
  platformFee: number;
  refundAmount: number;
  dreamAmount: number;
  settledAt: string;
  drawDate?: string; // Date when the draw happened
  selectedAmount?: number; // Amount received by selected dreamer
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  participatedDreams: string[];
  createdDreams: string[];
  selectedDreams: string[];
  totalContribution: number;
  totalWon?: number; // Total amount won from selected dreams
  totalInvested?: number; // Total amount invested/contributed
  totalCommission?: number; // Total commission earned from created dreams
}

export interface Participation {
  dreamId: string;
  amount: number;
  timestamp: string;
}

export interface Participant {
  userId: string;
  userName: string;
  avatar: string;
  amount: number;
  share: number; // percentage of total funds
}

