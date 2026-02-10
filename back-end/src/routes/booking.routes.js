import express from 'express';
import {
  createBooking,
  getBookingsByDate,
  toggleBoarded,
  updateBooking, // ✅ import the new controller function
} from '../controllers/booking.controller.js';

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get bookings by travel date
router.get('/:date', getBookingsByDate);

// Toggle boarded status
router.patch('/:id/boarded', toggleBoarded);

// Update/Edit booking by ID (Screen 1 feature)
router.put('/:id', updateBooking); // ✅ new route added

export default router;
