export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          booking_id: string;
          travel_date: string;
          mobile_number: string;
          seats: string[];
          boarded: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          travel_date: string;
          mobile_number: string;
          seats: string[];
          boarded?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          travel_date?: string;
          mobile_number?: string;
          seats?: string[];
          boarded?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

export interface Booking {
  id: string;
  booking_id: string;
  travel_date: string;
  mobile_number: string;
  seats: string[];
  boarded: boolean;
  created_at: string;
}

export type SeatStatus = 'available' | 'selected' | 'booked';

export interface SeatInfo {
  code: string;
  status: SeatStatus;
  bookingId?: string;
}
