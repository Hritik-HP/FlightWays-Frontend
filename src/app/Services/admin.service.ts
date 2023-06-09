import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../flight-search-result/flight.model';
import { Passenger } from '../flight-search-result/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseApiUrl: string = 'https://localhost:44309/api/Flight';
  private baseApiPassenger: string = 'https://localhost:44309/api/Passenger';

  constructor(private http: HttpClient) { }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.baseApiUrl);
  }

  addFlight(flight: Flight): Observable<any> {
    return this.http.post(this.baseApiUrl, flight);
  }

  updateFlight(flightId: string, flight: Flight): Observable<any> {
    const url = `${this.baseApiUrl}/${flightId}`;
    return this.http.put(url, flight);
  }

  deleteFlight(flightId: string): Observable<any> {
    const url = `${this.baseApiUrl}/${flightId}`;
    return this.http.delete(url);
  }

  getAllPassengers(): Observable<Passenger[]> {
    debugger
    return this.http.get<Passenger[]>(this.baseApiPassenger);
  }

  addPassenger(passenger: Passenger): Observable<any> {
    return this.http.post(this.baseApiPassenger, passenger);
  }

  updatePassenger(passengerId: string, passenger: Passenger): Observable<any> {
    const url = `${this.baseApiPassenger}/${passengerId}`;
    return this.http.put(url, passenger);
  }

  deletePassenger(passengerId: string): Observable<any> {
    const url = `${this.baseApiPassenger}/${passengerId}`;
    return this.http.delete(url);
  }
}
