import { useEffect, useState } from 'react';
import { Calendar, Phone, Check, Clock, AlertCircle, Edit2 } from 'lucide-react';
import { getBookingsByDate, toggleBoardedStatus } from '../services/booking.service';
import { formatDate, formatPhoneNumber } from '../lib/utils';

export function BookingList({ onEdit }) {
  const [travelDate, setTravelDate] = useState(formatDate(new Date()));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, [travelDate]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookingsByDate(travelDate);
      setBookings(data);
    } catch {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (booking) => {
    setUpdatingId(booking._id);
    await toggleBoardedStatus(booking._id);
    await loadBookings();
    setUpdatingId(null);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Boarding Tracker</h1>

      <div className="mb-6 relative max-w-xs">
        <Calendar className="absolute left-3 top-3 text-gray-400" />
        <input
          type="date"
          value={travelDate}
          onChange={e => setTravelDate(e.target.value)}
          className="pl-10 w-full border-2 rounded-xl p-3"
        />
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-xl flex gap-2 mb-4">
          <AlertCircle className="text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>#</th>
            <th>Booking ID</th>
            <th>Seats</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id} className="border-b text-center">
              <td>{i + 1}</td>
              <td>{b.booking_id}</td>
              <td>{b.seats.join(', ')}</td>
              <td>
                <Phone size={14} className="inline" />{' '}
                {formatPhoneNumber(b.mobile_number)}
              </td>
              <td>
                {b.boarded ? (
                  <span className="text-green-600 flex justify-center gap-1">
                    <Check size={14} /> Boarded
                  </span>
                ) : (
                  <span className="text-orange-600 flex justify-center gap-1">
                    <Clock size={14} /> Pending
                  </span>
                )}
              </td>
              <td className="flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(b)}
                  className="px-3 py-2 bg-gray-800 text-white rounded"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  disabled={updatingId === b._id}
                  onClick={() => handleToggle(b)}
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                  {b.boarded ? 'Undo' : 'Boarded'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
