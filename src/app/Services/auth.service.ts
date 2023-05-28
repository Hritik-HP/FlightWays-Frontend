import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl: string ="https://localhost:44309/api/Auth/"
  constructor(private http:HttpClient) { }

  Login(loginobj:any):Observable<any>{

    return this.http.post("https://localhost:44309/api/Auth/Login",loginobj);

  }
  storeToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }
  Signup(Signupobj:any):Observable<any>{
    return this.http.post("https://localhost:44309/api/Auth/Register",Signupobj);

  }

}
