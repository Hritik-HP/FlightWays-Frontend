import { Component } from '@angular/core';
import { FlightsearchService } from '../Services/flightsearch.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Flight } from './flight.model';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.css']
})

export class FlightSearchResultComponent {

  flights: Flight[] = [] ;
  showPassengerForm: boolean = false;
  passengerForm: FormGroup;
  

  constructor(private flightSearchService: FlightsearchService, private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      passengerName: ['', Validators.required],
      passengerAge: ['', Validators.required]
    });
    this.flightSearchService.getFlights().subscribe
    ((res) => {this.flights = res
    console.log(this.flights);
  });
  }
    // getFlights(departure: string, arrival: string, departureTime: Date, returnDate: Date): Subscription {
  //   const departureTimeString = departureTime.toISOString(); // Convert Date to string
  //   return this.flightSearchService.getFlight(departure, arrival, departureTimeString)
  //     .subscribe({
  //       next: (data: any[]) => {
  //         this.flights = data;
  //         console.log('Flights:', this.flights);
  //       },
  //       error: (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     });
  // }

  bookFlight(flight: any): void {
    this.showPassengerForm = true;
  }

  // submitPassengerDetails(): void {
  //   if (this.passengerForm.valid) {
  //     const passengerName = this.passengerForm.value.passengerName;
  //     const passengerAge = this.passengerForm.value.passengerAge;
  //     // Add your logic to handle the submitted passenger details
  //     console.log('Passenger Name:', passengerName);
  //     console.log('Passenger Age:', passengerAge);
  //     // Reset the form fields if needed
  //     this.passengerForm.reset();
  //     this.showPassengerForm = false;
  //   } else {
  //     alert('Please fill out the form before submitting!');
  //   }
  // }
}
