import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showReturnDate: boolean = false;

  onRadioChange(event: any) {
    this.showReturnDate = event.target.value === 'return';
  }
}
