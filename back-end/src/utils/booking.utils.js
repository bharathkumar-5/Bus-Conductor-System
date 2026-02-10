export const generateBookingId = (date, count) => {
  const d = date.replace(/-/g, '');
  return `BK-${d}-${String(count + 1).padStart(3, '0')}`;
};

export const calculateOptimalBoardingSequence = (bookings) => {
  return bookings.sort((a, b) => {
    const maxA = Math.max(...a.seats.map(s => parseInt(s.slice(1))));
    const maxB = Math.max(...b.seats.map(s => parseInt(s.slice(1))));
    return maxB - maxA;
  });
};
