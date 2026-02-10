import api from '../lib/api';

export const createBooking = async (payload) => {
  const res = await api.post('/bookings', payload);
  return res.data;
};

export const updateBooking = async (id, payload) => {
  const res = await api.put(`/bookings/${id}`, payload);
  return res.data;
};

export const getBookingsByDate = async (date) => {
  const res = await api.get(`/bookings/${date}`);
  return res.data;
};

export const toggleBoardedStatus = async (id) => {
  const res = await api.patch(`/bookings/${id}/boarded`);
  return res.data;
};
