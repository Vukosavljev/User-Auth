import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from './../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {
  private BASE_URL = 'http://localhost:5000';
  private USER_ROUTE = this.BASE_URL + '/user';
  private LOGIN_ROUTE = this.BASE_URL + '/login';

  constructor(private http: HttpClient) { }

  loginUser(credentials) {
    return this.http.post(this.LOGIN_ROUTE, credentials);
  }

  updateUser(update: object, id: string) {
    return this.http.patch(`${this.USER_ROUTE}/${id}`, update);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get(this.USER_ROUTE) as Observable<UserModel[]>;
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post(this.USER_ROUTE, user) as Observable<UserModel>;
  }
}
