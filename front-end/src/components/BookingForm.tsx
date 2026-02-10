import { useEffect, useState } from 'react';
import { Calendar, Phone, AlertCircle, Loader2, Edit2 } from 'lucide-react';
import { SeatLayout } from './SeatLayout';
import { ConfirmationModal } from './ConfirmationModal';
import {
  createBooking,
  updateBooking,
  getBookingsByDate,
} from '../services/booking.service';
import {
  formatDate,
  validatePhoneNumber,
  generateSeatLayout,
} from '../lib/utils';

/**
 * Screen 1: Book / Update / Edit Booking
 */
export function BookingForm({ editBooking, clearEdit }) {
  const [travelDate, setTravelDate] = useState(formatDate(new Date()));
  const [mobileNumber, setMobileNumber] = useState('');
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  /* 🔹 Load seats whenever date changes */
  useEffect(() => {
    loadSeats();
  }, [travelDate]);

  /* 🔹 Prefill form when Edit is triggered */
  useEffect(() => {
    if (editBooking) {
      setTravelDate(editBooking.travel_date);
      setMobileNumber(editBooking.mobile_number);
      setSelectedSeats(editBooking.seats);
    }
  }, [editBooking]);

  const loadSeats = async () => {
    try {
      const allSeats = generateSeatLayout();
      const bookings = await getBookingsByDate(travelDate);

      const bookedSeats = new Set();
      bookings.forEach(b => {
        if (!editBooking || b._id !== editBooking._id) {
          b.seats.forEach(seat => bookedSeats.add(seat));
        }
      });

      setSeats(
        allSeats.map(code => ({
          code,
          status: bookedSeats.has(code) ? 'booked' : 'available',
        }))
      );
    } catch {
      setError('Failed to load seats');
    }
  };

  const handleSeatClick = (seatCode) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatCode)) {
        return prev.filter(s => s !== seatCode);
      }
      if (prev.length >= 6) {
        setError('Maximum 6 seats allowed');
        return prev;
      }
      return [...prev, seatCode];
    });
    setError('');
  };

  const resetForm = async () => {
    setMobileNumber('');
    setSelectedSeats([]);
    clearEdit && clearEdit();
    await loadSeats();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(mobileNumber)) {
      setError('Enter valid 10-digit mobile number');
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Select at least one seat');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        travel_date: travelDate,
        mobile_number: mobileNumber,
        seats: selectedSeats,
      };

      const booking = editBooking
        ? await updateBooking(editBooking._id, payload)
        : await createBooking(payload);

      setConfirmedBooking(booking);
      await resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const seatsWithSelection = seats.map(seat => ({
    ...seat,
    status: selectedSeats.includes(seat.code) ? 'selected' : seat.status,
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          {editBooking ? (
            <>
              <Edit2 /> Update Booking
            </>
          ) : (
            'Book Bus Tickets'
          )}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={travelDate}
                  min={formatDate(new Date())}
                  onChange={e => {
                    setTravelDate(e.target.value);
                    setSelectedSeats([]);
                  }}
                  className="pl-10 w-full border-2 rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={e =>
                    setMobileNumber(
                      e.target.value.replace(/\D/g, '').slice(0, 10)
                    )
                  }
                  className="pl-10 w-full border-2 rounded-xl p-3"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-xl flex gap-2">
              <AlertCircle className="text-red-500" />
              <span className="text-red-600">{error}</span>
            </div>
          )}

          <SeatLayout
            seats={seatsWithSelection}
            onSeatClick={handleSeatClick}
            disabled={loading}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold"
            >
              {loading ? (
                <span className="flex justify-center gap-2">
                  <Loader2 className="animate-spin" /> Processing
                </span>
              ) : editBooking ? (
                'Update Booking'
              ) : (
                'Confirm Booking'
              )}
            </button>

            {editBooking && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-4 rounded-xl border font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {confirmedBooking && (
        <ConfirmationModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  );
}
