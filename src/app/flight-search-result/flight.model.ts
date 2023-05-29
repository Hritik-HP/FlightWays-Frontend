export interface Flight {
  flightId: number;
  flightName: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDateTime: string;
  arrivalDateTime: string;
  departureCityCode: string;
  arrivalCityCode: string;
  basePrice: number;
  totalSeats: number;
  availableSeats: number;
  editMode?: boolean;
}
