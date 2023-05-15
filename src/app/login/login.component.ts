import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('buttonAnimation', [
      state('idle', style({
        transform: 'scale(1)'
      })),
      state('clicked', style({
        transform: 'scale(0.8)'
      })),
      transition('idle => clicked', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  state = 'idle';

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.state = 'clicked';
  }

}
