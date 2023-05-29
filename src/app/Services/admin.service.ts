import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../flight-search-result/flight.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseApiUrl: string = 'https://localhost:44309/api/Flight';

  constructor(private http: HttpClient) { }

  getAllFlights(): Observable<Flight[]> {
    const url = `${this.baseApiUrl}`;
    return this.http.get<Flight[]>(url);
  }

  addFlight(flight: Flight): Observable<any> {
    const url = `${this.baseApiUrl}`;
    return this.http.post(url, flight);
  }

  updateFlight(flightId: string, flight: Flight): Observable<any> {
    const url = `${this.baseApiUrl}/${flightId}`;
    return this.http.put(url, flight);
  }

  deleteFlight(flightId: string): Observable<any> {
    const url = `${this.baseApiUrl}/${flightId}`;
    return this.http.delete(url);
  }
}
