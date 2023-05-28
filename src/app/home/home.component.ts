import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightsearchService } from '../Services/flightsearch.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  flightSearchForm!: FormGroup;
  showReturnDate: boolean = false;
  subscription!: Subscription;
  flights: any[] = [];

  constructor(private fb: FormBuilder, private flightsearchService: FlightsearchService, private router: Router) { }

  ngOnInit() {
    this.flightSearchForm = this.fb.group({
      flightType: ['one-way'],
      departCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      departureTime: [null, Validators.required],
      returnDate: [null]
    });
  }
  

  onRadioChange(event: any) {
    this.showReturnDate = event.target.value === 'return';
  }
  searchFlights() {
    if (this.flightSearchForm.valid) {
      const formValue = this.flightSearchForm.value;
      const departure = formValue.departCity; // Updated variable name
      const arrival = formValue.arrivalCity;
      const departureTime = formValue.departureTime;
      const returnDate = formValue.returnDate;
  
      this.subscription = this.flightsearchService.getFlight(departure, arrival, departureTime)
        .subscribe({
          
          next: (data: any[]) => {
          debugger
            // Handle the flight search results
            console.log(data);
            this.flights = data;
            this.flightsearchService.setFlights(data)
            // Redirect to the search component
            this.router.navigate(['/search']);
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    } else {
      alert('Please fill out the form before submitting!');
    }
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
