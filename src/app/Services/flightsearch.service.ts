import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../flight-search-result/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {

  constructor(private http: HttpClient) { }

  getFlight(departure: string, arrival: string, departureTime: string): Observable<Flight[]> {
      const url = `https://localhost:44309/api/Flight/GetByCities/${departure}/${arrival}/${departureTime}`;
    return this.http.get<Flight[]>(url);
  }  
  private flights:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setFlights(data:any)
  {
    this.flights.next(data);
   
  }

  getFlights():Observable<any>
  {
    return this.flights.asObservable();
  }
}
