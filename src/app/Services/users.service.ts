import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = 'https://localhost:44309/api/User';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl);
  }
  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseApiUrl}/${userId}`;
    return this.http.delete(url);
  }
  updateUser(userId: string, user: User): Observable<any> {
    const url = `${this.baseApiUrl}/${userId}`;
    return this.http.put(url, user);
  }
}
