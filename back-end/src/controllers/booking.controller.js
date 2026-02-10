import Booking from '../models/Booking.js';
import { generateBookingId, calculateOptimalBoardingSequence } from '../utils/booking.utils.js';

/**
 * CREATE BOOKING
 */
export const createBooking = async (req, res) => {
  try {
    const { travel_date, mobile_number, seats } = req.body;

    if (!seats || seats.length === 0) {
      return res.status(400).json({ message: 'Select at least one seat' });
    }

    // Mobile number limit (6 seats per day)
    const existing = await Booking.find({ travel_date, mobile_number });
    const bookedCount = existing.reduce((sum, b) => sum + b.seats.length, 0);

    if (bookedCount + seats.length > 6) {
      return res.status(400).json({
        message: 'This mobile number already booked 6 seats for this date',
      });
    }

    const totalBookings = await Booking.countDocuments({ travel_date });
    const booking_id = generateBookingId(travel_date, totalBookings);

    const booking = await Booking.create({
      booking_id,
      travel_date,
      mobile_number,
      seats,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

/**
 * GET BOOKINGS BY DATE
 */
export const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const bookings = await Booking.find({ travel_date: date }).sort({
      createdAt: 1,
    });

    const sorted = calculateOptimalBoardingSequence(bookings);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

/**
 * TOGGLE BOARDED STATUS
 */
export const toggleBoarded = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.boarded = !booking.boarded;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update boarding status' });
  }
};

// Update/Edit booking
export const updateBooking = async (req, res) => {
  try {
    const { mobile_number, seats, travel_date } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.mobile_number = mobile_number;
    booking.seats = seats;
    booking.travel_date = travel_date;

    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Operation failed' });
  }
};
