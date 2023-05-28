import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.auth.Signup(this.signupForm.value).subscribe(item => {
        console.log(item);
        this.successMessage = 'Signup successful! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect after 2 seconds
      });
    } else {
      alert('Please fill out the form before submitting!');
    }
  }
}
