import { Booking } from "@prisma/client";

// type OmittedBooking = Omit<Booking, "timing">;
export type ModifiedBooking = Omit<Booking, "timing"> & {
  timing: number;
};
// export type ModifiedBooking = OmittedBooking & {
//   timing: number;
// };
