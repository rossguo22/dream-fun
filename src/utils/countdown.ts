export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateCountdown(deadline: string): Countdown {
  const now = new Date().getTime();
  const deadlineTime = new Date(deadline).getTime();
  const difference = deadlineTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

export function formatCountdown(countdown: Countdown): string {
  if (countdown.isExpired) {
    return 'Expired';
  }
  // Format: Days:Hours:Minutes:Seconds
  // Days can be any number, hours/minutes/seconds are always 2 digits
  return `${countdown.days}:${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
}

