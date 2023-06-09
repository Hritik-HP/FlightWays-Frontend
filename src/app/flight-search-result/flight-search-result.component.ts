import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Passenger } from './passenger.model';
import { PassengerService } from '../Services/passenger.service';
import { Flight } from './flight.model';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.css']
})
export class FlightSearchResultComponent {
  showPassenger = false;
  flights: Flight[] = [] ;

  passengers: Passenger[] = [];

  constructor(
    private builder: FormBuilder,
    private route: Router,
    private passengerService: PassengerService,
    private toastr: ToastrService
  ) {}

  AddPassengerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phonenumber: this.builder.control('', Validators.required),
    flightBookingId: [0]
  });

  convertToNumberFromString(value: string | null): number | null {
    if (value === null) {
      return null;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return null;
    }

    return parsedValue;
  }

  OnCancelPassengerAdd() {
    const passengerId: number | null = this.convertToNumberFromString(sessionStorage.getItem('flightBookingId'));

    if (passengerId !== null) {
      this.passengerService.onBookingCancel(passengerId).subscribe((res) => {
        console.log(res);
        this.toastr.success(res.message);
        this.route.navigate(['dashboard/flights']);
      });
    }
  }

  AddPassenger() {
    this.AddPassengerForm.value.flightBookingId = this.convertToNumberFromString(sessionStorage.getItem('flightBookingId'));
  
    if (this.AddPassengerForm.valid) {
      const passenger: Passenger = {
        passengerId: 0,
        flightId: null,
        firstName: this.AddPassengerForm.value.firstName ?? '',
        lastName: this.AddPassengerForm.value.lastName ?? '',
        age: this.AddPassengerForm.value.age ? parseInt(this.AddPassengerForm.value.age) : 0,
        gender: this.AddPassengerForm.value.gender ?? '',
        email: this.AddPassengerForm.value.email ?? '',
        phoneNumber: this.AddPassengerForm.value.phonenumber ?? '',
        userId: null,
        flightBookingId: 0,
        editMode: undefined
      };
  
      this.passengerService.onAddPassenger(passenger).subscribe((res: { data: Passenger[] }) => {
        this.passengers = res.data;
        console.log(res);
        console.log(this.passengers);
      });
    } else {
      this.toastr.error('Enter Required details');
    }
  }
  
  OnRemovePassenger(passengerId: number) {
    console.log('Passenger Id: ' + passengerId);

    this.passengerService.onDeletePassenger(passengerId).subscribe((res: { success: boolean; data: Passenger[]; message: string }) => {
      console.log(res);

      if (res.success) {
        this.passengers = res.data;
        this.toastr.success(res.message);
      } else {
        this.toastr.warning('Something went wrong');
      }
    });
  }
  showPassengerForm() {
    this.showPassenger = true;
  }
}
