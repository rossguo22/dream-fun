export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Funding',
    ready: 'Ready',
    draw: 'Drawing',
    settle: 'Settled',
    completed: 'Completed',
  };
  return labels[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-blue-100 text-blue-700',
    ready: 'bg-green-100 text-green-700',
    draw: 'bg-purple-100 text-purple-700',
    settle: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-gray-100 text-gray-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

