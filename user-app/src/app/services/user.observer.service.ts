import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { UserModel } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserObserverService {
  private userSubject = new ReplaySubject<UserModel>(1);
  user$ = this.userSubject.asObservable();

  userLoged(user: UserModel): void {
    this.userSubject.next(user);
  }
}
