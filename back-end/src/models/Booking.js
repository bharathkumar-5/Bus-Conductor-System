import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    booking_id: { type: String, required: true, unique: true },
    travel_date: { type: String, required: true },
    mobile_number: { type: String, required: true },
    seats: {
      type: [String],
      validate: [arr => arr.length <= 6, 'Max 6 seats allowed'],
    },
    boarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
