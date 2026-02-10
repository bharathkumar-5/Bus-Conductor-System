import type { Booking } from './types';

export function generateBookingId(date: string, existingCount: number): string {
  const dateStr = date.replace(/-/g, '');
  const sequence = String(existingCount + 1).padStart(3, '0');
  return `BK-${dateStr}-${sequence}`;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getSeatRow(seatCode: string): number {
  return parseInt(seatCode.substring(1), 10);
}

export function calculateOptimalBoardingSequence(bookings: Booking[]): Booking[] {
  return [...bookings].sort((a, b) => {
    const maxRowA = Math.max(...a.seats.map(getSeatRow));
    const maxRowB = Math.max(...b.seats.map(getSeatRow));
    return maxRowB - maxRowA;
  });
}

export function calculateBoardingTime(bookings: Booking[]): number {
  const sortedBookings = calculateOptimalBoardingSequence(bookings);

  if (sortedBookings.length === 0) return 0;

  return 60;
}

export function formatPhoneNumber(phone: string): string {
  if (phone.length === 10) {
    return phone.replace(/(\d{5})(\d{5})/, '$1-$2');
  }
  return phone;
}

export function validatePhoneNumber(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone);
}

export function generateSeatLayout(): string[] {
  const seats: string[] = [];
  const columns = ['A', 'B', 'C', 'D'];

  for (let row = 1; row <= 15; row++) {
    for (const col of columns) {
      seats.push(`${col}${row}`);
    }
  }

  return seats;
}
