import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserObserverService } from '../services/user.observer.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userDetails: UserModel;
  private subs = new Subscription();

  constructor(
    private userObserverService: UserObserverService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subs.add(this.userObserverService.user$
      .subscribe((user: UserModel) => this.userDetails = user));
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  editUser() {
    this.router.navigate(['/edit-user']);
  }

  hidePassword(password) {
    return password.split('').map((char: string) => '*').join('');
  }
}
