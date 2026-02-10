import { CheckCircle2, X } from 'lucide-react';
import type { Booking } from '../lib/types';
import { formatPhoneNumber } from '../lib/utils';

interface ConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
}

export function ConfirmationModal({ booking, onClose }: ConfirmationModalProps) {
  const formattedDate = new Date(booking.travel_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
                <p className="text-sm text-gray-500">Your seats have been reserved</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Booking ID</span>
              <span className="text-lg font-bold text-blue-600">{booking.booking_id}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Travel Date</span>
              <span className="font-semibold text-gray-800">{formattedDate}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Mobile Number</span>
              <span className="font-semibold text-gray-800">
                {formatPhoneNumber(booking.mobile_number)}
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-600 block mb-2">Selected Seats</span>
              <div className="flex flex-wrap gap-2">
                {booking.seats.map((seat) => (
                  <span
                    key={seat}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold text-sm"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
