import { User } from "./User.model";

export class FlightBooking {
  flightBookingId?: number = 0;
  departureCity?: string = '';
  arrivalCity?: string = '';
  departureDateTime?: Date = new Date();
  arrivalDateTime?: Date = new Date();
  noOfPassenger?: number = 0;
  flightId?: number = 0;
  userId?: number = 0;
  user?: User;
}
