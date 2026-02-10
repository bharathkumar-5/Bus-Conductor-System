import { useState } from 'react';
import { BookOpen, List, Bus } from 'lucide-react';
import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';

function App() {
  const [activeScreen, setActiveScreen] = useState('booking');
  const [editBooking, setEditBooking] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Bus className="text-white" size={30} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bus Conductor System</h1>
              <p className="text-sm text-gray-500">
                Ticket Booking & Boarding Management
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveScreen('booking')}
              className={`px-6 py-3 rounded-xl font-semibold ${
                activeScreen === 'booking'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <BookOpen size={18} /> Book Tickets
            </button>

            <button
              onClick={() => setActiveScreen('list')}
              className={`px-6 py-3 rounded-xl font-semibold ${
                activeScreen === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <List size={18} /> Boarding Tracker
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8">
        {activeScreen === 'booking' ? (
          <BookingForm
            editBooking={editBooking}
            clearEdit={() => setEditBooking(null)}
          />
        ) : (
          <BookingList
            onEdit={(booking) => {
              setEditBooking(booking);
              setActiveScreen('booking');
            }}
          />
        )}
      </main>

      <footer className="text-center text-gray-600 pb-6">
        Boarding is organized to ensure a smooth and pleasant journey.
      </footer>
    </div>
  );
}

export default App;
