import { Check } from 'lucide-react';
import type { SeatInfo } from '../lib/types';

interface SeatLayoutProps {
  seats: SeatInfo[];
  onSeatClick: (seatCode: string) => void;
  disabled?: boolean;
}

export function SeatLayout({ seats, onSeatClick, disabled = false }: SeatLayoutProps) {
  const rows = 15;
  const leftColumns = ['A', 'B'];
  const rightColumns = ['C', 'D'];

  const getSeat = (col: string, row: number): SeatInfo => {
    const seatCode = `${col}${row}`;
    return seats.find(s => s.code === seatCode) || { code: seatCode, status: 'available' };
  };

  const renderSeat = (seat: SeatInfo) => {
    const isAvailable = seat.status === 'available';
    const isSelected = seat.status === 'selected';
    const isBooked = seat.status === 'booked';

    return (
      <button
        key={seat.code}
        onClick={() => !disabled && isAvailable || isSelected ? onSeatClick(seat.code) : null}
        disabled={disabled || isBooked}
        className={`
          relative w-12 h-12 rounded-lg font-semibold text-xs transition-all
          ${isAvailable ? 'bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50' : ''}
          ${isSelected ? 'bg-blue-600 text-white border-2 border-blue-700 shadow-lg' : ''}
          ${isBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300' : ''}
          ${!disabled && (isAvailable || isSelected) ? 'cursor-pointer' : ''}
        `}
      >
        {seat.code}
        {isSelected && (
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
            <Check size={12} className="text-white" />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Select Seats</h3>
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Driver
          </div>
        </div>

        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded"></div>
            <span className="text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
          <div key={row} className="flex items-center gap-4">
            <div className="flex gap-2">
              {leftColumns.map((col) => renderSeat(getSeat(col, row)))}
            </div>

            <div className="w-8 flex-shrink-0 text-center">
              <span className="text-xs font-medium text-gray-400">{row}</span>
            </div>

            <div className="flex gap-2">
              {rightColumns.map((col) => renderSeat(getSeat(col, row)))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
