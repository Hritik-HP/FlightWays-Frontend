import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../Services/users.service'; 
import { AdminService } from '../Services/admin.service'; 
import { Flight } from '../flight-search-result/flight.model';
import { Passenger } from '../flight-search-result/passenger.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: User[] = [];
  flights: Flight[] = [];
  passengers: Passenger[] = [];
  showUserDetails = false;
  showFlightDetails = false;
  showPassengerDetails = false;
  newFlight: Flight = {
    flightId: 0,
    flightName: '',
    flightNumber: '',
    departureCity: '',
    arrivalCity: '',
    departureDateTime: '',
    arrivalDateTime: '',
    departureCityCode: '',
    arrivalCityCode: '',
    basePrice: 0,
    totalSeats: 0,
    availableSeats: 0
  };
  newPassenger: Passenger = {
    passengerId: 0,
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    phoneNumber: '',
    userId: 0,
    flightBookingId: 0,
    flightId: 0,
    email: '',
    editMode: undefined
  };

  constructor(
    private usersService: UsersService,
    private adminService: AdminService
  ) {}

  hideUserDetails(): void {
    this.showUserDetails = false;
  }

  hideFlightDetails(): void {
    this.showFlightDetails = false;
  }

  hidePassengerDetails(): void {
    this.showPassengerDetails = false;
  }

  toggleUserDetails(): void {
    this.showUserDetails = !this.showUserDetails;

    if (this.showUserDetails && this.users.length === 0) {
      this.usersService.getAllUsers().subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (response) => {
          console.log(response);
        }
      });
    }
  }

  toggleFlightDetails(): void {
    this.showFlightDetails = !this.showFlightDetails;

    if (this.showFlightDetails && this.flights.length === 0) {
      this.adminService.getAllFlights().subscribe({
        next: (flights) => {
          this.flights = flights;
        },
        error: (response) => {
          console.log('Error retrieving flights:', response);
        }
      });
    }
  }

  deleteUser(userId: string): void {
    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        // Remove the deleted user from the users array
        this.users = this.users.filter((user) => user.userId !== userId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteFlight(flightId: number): void {
    const flightIdString = flightId.toString(); // Convert the flightId to a string
    this.adminService.deleteFlight(flightIdString).subscribe({
      next: () => {
        // Remove the deleted flight from the flights array
        this.flights = this.flights.filter((flight) => flight.flightId !== flightId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleEditMode(user: User): void {
    user.editMode = !user.editMode;
  }

  toggleFlightEditMode(flight: Flight): void {
    flight.editMode = !flight.editMode;
  }

  saveUser(user: User): void {
    this.usersService.updateUser(user.userId, user).subscribe({
      next: () => {
        console.log('User updated successfully.');
        user.editMode = false;
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  saveFlight(flight: Flight): void {
    const flightIdStr = flight.flightId.toString(); // Convert flightId to string
    this.adminService.updateFlight(flightIdStr, flight).subscribe({
      next: () => {
        console.log('Flight updated successfully.');
        flight.editMode = false;
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  addFlight(): void {
    this.adminService.addFlight(this.newFlight).subscribe({
      next: (flight) => {
        console.log('Flight added successfully.');
        this.flights.push(flight);
        this.newFlight = {
          flightId: 0,
          flightName: '',
          flightNumber: '',
          departureCity: '',
          arrivalCity: '',
          departureDateTime: '',
          arrivalDateTime: '',
          departureCityCode: '',
          arrivalCityCode: '',
          basePrice: 0,
          totalSeats: 0,
          availableSeats: 0
        };
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  togglePassengerDetails(): void {
    this.showPassengerDetails = !this.showPassengerDetails;
    debugger
    if (this.showPassengerDetails && this.passengers.length === 0) {
      debugger
      this.adminService.getAllPassengers().subscribe({
        next: (passengers) => {
          this.passengers = passengers;
        },
        error: (response) => {
          console.log('Error retrieving passengers:', response);
        }
      });
    }
  }

  deletePassenger(passengerId: number): void {
    const passengerIdString = passengerId.toString();
    this.adminService.deletePassenger(passengerIdString).subscribe({
      next: () => {
        this.passengers = this.passengers.filter((passenger) => passenger.passengerId !== passengerId);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  togglePassengerEditMode(passenger: Passenger): void {
    passenger.editMode = !passenger.editMode;
  }

  savePassenger(passenger: Passenger): void {
    const passengerIdStr = passenger.passengerId.toString();
    this.adminService.updatePassenger(passengerIdStr, passenger).subscribe({
      next: () => {
        console.log('Passenger updated successfully.');
        passenger.editMode = false;
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  addPassenger(): void {
    // Retrieve flightId and userId from local storage
    const flightId = localStorage.getItem('flightId');
    const userId = localStorage.getItem('userId');

    if (!flightId || !userId) {
      console.log('Flight ID or User ID is missing. Cannot add passenger.');
      return;
    }

    // Set the flightId and userId for the new passenger
    this.newPassenger.flightId = parseInt(flightId, 10);
    this.newPassenger.userId = parseInt(userId, 10);

    this.adminService.addPassenger(this.newPassenger).subscribe({
      next: (passenger) => {
        console.log('Passenger added successfully.');
        this.passengers.push(passenger);
        this.newPassenger = {
          passengerId: 0,
          firstName: '',
          lastName: '',
          age: 0,
          gender: '',
          phoneNumber: '',
          email:'',
          userId: 0,
          flightBookingId: 0,
          flightId: 0,
          editMode: undefined
        };
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
}
