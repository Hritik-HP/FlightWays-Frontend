import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../Services/users.service'; 
import { AdminService } from '../Services/admin.service'; 
import { Flight } from '../flight-search-result/flight.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  
  users: User[] = [];
  flights: Flight[] = [];
  showUserDetails = false;
  showFlightDetails = false;
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
}
