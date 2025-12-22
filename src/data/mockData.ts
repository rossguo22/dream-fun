import { Dream, User } from '../types';

export const mockDreams: Dream[] = [
  {
    id: '1',
    title: 'See Northern Lights in Iceland',
    story: 'I\'ve always dreamed of seeing the Northern Lights under the Icelandic sky, experiencing the wonders of nature. I hope to fulfill this dream with friends.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    creator: {
      id: 'user1',
      name: 'Alice',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    targetAmount: 50000,
    currentAmount: 32500,
    deadline: '2026-03-15',
    status: 'active',
    participants: 42,
    createdAt: '2024-01-10',
    userShare: 2.46,
    userAmount: 800,
    participantList: [
      { userId: 'user6', userName: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=6', amount: 5000, share: 15.38 },
      { userId: 'user7', userName: 'Mike', avatar: 'https://i.pravatar.cc/150?img=7', amount: 4500, share: 13.85 },
      { userId: 'user8', userName: 'Emma', avatar: 'https://i.pravatar.cc/150?img=8', amount: 3200, share: 9.85 },
      { userId: 'current-user', userName: 'You', avatar: 'https://i.pravatar.cc/150?img=5', amount: 800, share: 2.46 },
      { userId: 'user9', userName: 'John', avatar: 'https://i.pravatar.cc/150?img=9', amount: 600, share: 1.85 },
      { userId: 'user10', userName: 'Lisa', avatar: 'https://i.pravatar.cc/150?img=10', amount: 500, share: 1.54 },
    ],
  },
  {
    id: '2',
    title: 'Learn to Surf in Hawaii',
    story: 'I want to learn surfing in Hawaii and experience the freedom of riding the waves. This is a dream about courage and challenge.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
    creator: {
      id: 'user2',
      name: 'Bob',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    targetAmount: 30000,
    currentAmount: 30000,
    deadline: '2026-02-20',
    status: 'ready',
    participants: 38,
    createdAt: '2024-01-05',
    participantList: [
      { userId: 'user11', userName: 'Alex', avatar: 'https://i.pravatar.cc/150?img=11', amount: 8000, share: 26.67 },
      { userId: 'user12', userName: 'Maria', avatar: 'https://i.pravatar.cc/150?img=12', amount: 6000, share: 20.00 },
      { userId: 'user13', userName: 'David', avatar: 'https://i.pravatar.cc/150?img=13', amount: 5000, share: 16.67 },
      { userId: 'user14', userName: 'Sophia', avatar: 'https://i.pravatar.cc/150?img=14', amount: 4000, share: 13.33 },
      { userId: 'user15', userName: 'James', avatar: 'https://i.pravatar.cc/150?img=15', amount: 3000, share: 10.00 },
    ],
  },
  {
    id: '3',
    title: 'Open a Cozy Coffee Shop',
    story: 'I dream of opening a warm coffee shop in a corner of the city, where every passerby can feel the warmth and comfort.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    creator: {
      id: 'user3',
      name: 'Charlie',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    targetAmount: 100000,
    currentAmount: 100000,
    deadline: '2026-02-15',
    status: 'draw',
    participants: 67,
    createdAt: '2024-01-15',
    selectedUserId: 'user19',
    selectedUserName: 'Lucas',
    selectedUserAvatar: 'https://i.pravatar.cc/150?img=19',
    drawDate: '2026-02-15',
  },
  {
    id: '4',
    title: 'Travel Around the World',
    story: 'I want to travel around the world for a year, experiencing different cultures and capturing every beautiful moment.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    creator: {
      id: 'user1',
      name: 'Alice',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    targetAmount: 200000,
    currentAmount: 200000,
    deadline: '2024-02-10',
    status: 'settle',
    participants: 89,
    createdAt: '2023-12-20',
    selectedUserId: 'user5',
    selectedUserName: 'Emma',
    selectedUserAvatar: 'https://i.pravatar.cc/150?img=8',
    drawDate: '2024-02-10',
    settlement: {
      selectedUserId: 'user5',
      selectedUserName: 'Emma',
      totalFunds: 200000,
      platformFee: 10000,
      refundAmount: 5000,
      dreamAmount: 190000,
      settledAt: '2024-02-12',
      drawDate: '2024-02-10',
      selectedAmount: 190000,
    },
  },
  {
    id: '5',
    title: 'Learn to Play Piano',
    story: 'I\'ve wanted to learn piano since childhood, hoping to play beautiful music and add elegance to life.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800',
    creator: {
      id: 'user4',
      name: 'Diana',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    targetAmount: 25000,
    currentAmount: 18000,
    deadline: '2026-03-30',
    status: 'active',
    participants: 25,
    createdAt: '2024-01-20',
    userShare: 3.33,
    userAmount: 600,
    participantList: [
      { userId: 'user16', userName: 'Olivia', avatar: 'https://i.pravatar.cc/150?img=16', amount: 3000, share: 16.67 },
      { userId: 'user17', userName: 'Noah', avatar: 'https://i.pravatar.cc/150?img=17', amount: 2500, share: 13.89 },
      { userId: 'current-user', userName: 'You', avatar: 'https://i.pravatar.cc/150?img=5', amount: 600, share: 3.33 },
      { userId: 'user18', userName: 'Ava', avatar: 'https://i.pravatar.cc/150?img=18', amount: 500, share: 2.78 },
    ],
  },
];

export const mockUser: User = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://i.pravatar.cc/150?img=5',
  participatedDreams: ['1', '3', '4', '5'],
  createdDreams: ['2'],
  selectedDreams: ['3'],
  totalContribution: 8500,
  totalWon: 95000, // Won from dream #3
  totalInvested: 8500, // Total contributions
  totalCommission: 1500, // Commission from created dreams (5% of 30000)
};

export const getDreamById = (id: string): Dream | undefined => {
  return mockDreams.find(dream => dream.id === id);
};

export const getUserDreams = (_userId: string, type: 'participated' | 'created' | 'selected'): Dream[] => {
  const user = mockUser;
  const dreamIds = type === 'participated' 
    ? user.participatedDreams 
    : type === 'created' 
    ? user.createdDreams 
    : user.selectedDreams;
  
  return mockDreams.filter(dream => dreamIds.includes(dream.id));
};

