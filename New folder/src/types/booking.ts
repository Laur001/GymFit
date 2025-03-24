export type Booking = {
    id: string;
    booked_at: string;
    classes: { name: string; schedule: string; trainer: string };
  };