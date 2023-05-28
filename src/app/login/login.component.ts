import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  loginForm!: FormGroup;
  state = 'idle';

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  result:any;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onClick() {
    this.state = 'clicked';
  }
  onLogin(){
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.Login(this.loginForm.value)
      .subscribe({
        next: (res) =>{
          this.result = res
          console.log(res);
          this.auth.storeToken(res.token);
          
         

          if(this.result.message == "Admin")
          {
          this.router.navigate(['/portal']);
          }
          else{
            this.router.navigate(['/home']);
          }
        },
        error: (err) =>{
          
          console.log(err);
        },

      });
    }
    else{
    }
  }
}
