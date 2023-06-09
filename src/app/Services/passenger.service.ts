import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../flight-search-result/passenger.model';
import { FlightBooking } from '../flight-search-result/flightBooking.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl: string = 'https://localhost:44309/api';

  constructor(private http: HttpClient) { }

  onAddPassenger(passenger: Passenger): Observable<any> {
    let token = sessionStorage.getItem("Token");
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(`${this.apiUrl}/Passenger`, passenger, { headers });
  }

  onDeletePassenger(id: number): Observable<any> {
    let token = sessionStorage.getItem("Token");
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(`${this.apiUrl}/Passenger/${id}`, { headers });
  }

  onBooking(bookingData: FlightBooking): Observable<any> {
    let token = sessionStorage.getItem("Token");
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(`${this.apiUrl}/FlightBooking`, bookingData, { headers });
  }

  onBookingCancel(bookingId: number): Observable<any> {
    let token = sessionStorage.getItem("Token");
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(`${this.apiUrl}/FlightBooking/${bookingId}`, { headers });
  }

  onSelectFlights(response: any): Observable<any> {
    let token = sessionStorage.getItem("Token");
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(`${this.apiUrl}/FlightBooking`, response, { headers });
  }
}
